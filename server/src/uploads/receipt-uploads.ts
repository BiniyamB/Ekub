import { mkdirSync } from 'fs';
import { unlink } from 'fs/promises';
import { diskStorage, memoryStorage } from 'multer';
import { extname, join } from 'path';
import { randomBytes } from 'crypto';
import { v2 as cloudinary } from 'cloudinary';
import { BadRequestException, Logger } from '@nestjs/common';

const logger = new Logger('ReceiptUploads');

export const UPLOADS_DIR = join(process.cwd(), 'uploads');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET,
  );
}

/** Multer storage: memory when Cloudinary is configured (buffer gets uploaded
 *  to Cloudinary), disk otherwise (kept on the local `uploads/` folder for dev). */
export function receiptStorage() {
  if (isCloudinaryConfigured()) {
    return memoryStorage();
  }
  mkdirSync(UPLOADS_DIR, { recursive: true });
  return diskStorage({
    destination: UPLOADS_DIR,
    filename: (_req, file, cb) => {
      const name = `${Date.now()}-${randomBytes(4).toString('hex')}${extname(file.originalname)}`;
      cb(null, name);
    },
  });
}

/** Turn an uploaded file into a public URL: a Cloudinary CDN url when
 *  Cloudinary is in use, otherwise a `/uploads/<filename>` local path. */
export async function resolveReceiptUrl(
  file: Express.Multer.File | undefined,
): Promise<string | null> {
  if (!file) return null;
  if (file.buffer) {
    return uploadReceiptBuffer(file);
  }
  return `/uploads/${file.filename}`;
}

/** Remove an old receipt image (Cloudinary asset or local file). Never throws. */
export async function deleteReceiptImage(
  url: string | null | undefined,
): Promise<void> {
  if (!url) return;
  if (/^https?:\/\//i.test(url)) {
    const publicId = publicIdFromCloudinaryUrl(url);
    if (publicId) {
      await cloudinary.uploader.destroy(publicId).catch(() => undefined);
    }
    return;
  }
  const filename = url.replace(/^\/uploads\//, '');
  await unlink(join(UPLOADS_DIR, filename)).catch(() => undefined);
}

function uploadToCloudinary(file: Express.Multer.File): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'ekub-receipts' },
      (error, result) => {
        if (error) return reject(new Error(error.message));
        resolve(result?.secure_url ?? '');
      },
    );
    stream.end(file.buffer);
  });
}

/** Upload a receipt buffer to Cloudinary, turning failures into a readable
 *  HTTP error so the client (and logs) show the real reason instead of a
 *  generic 500. */
async function uploadReceiptBuffer(file: Express.Multer.File): Promise<string> {
  try {
    const url = await uploadToCloudinary(file);
    if (!url) throw new Error('Cloudinary returned no URL');
    return url;
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'unknown Cloudinary error';
    logger.error(`Cloudinary receipt upload failed: ${message}`);
    throw new BadRequestException(
      `Receipt upload to Cloudinary failed: ${message}`,
    );
  }
}

function publicIdFromCloudinaryUrl(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
  if (!match) return null;
  return match[1].replace(/\.[a-zA-Z0-9]+$/, '');
}
