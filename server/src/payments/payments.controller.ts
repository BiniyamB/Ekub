import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomBytes } from 'crypto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private payments: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('receipt', {
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (_req, file, cb) => {
          const name = `${Date.now()}-${randomBytes(4).toString('hex')}${extname(file.originalname)}`;
          cb(null, name);
        },
      }),
    }),
  )
  createReceipt(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body()
    body: {
      quotaId: string;
      memberId: string;
      recipientId?: string;
      amount: string;
      note?: string;
    },
  ) {
    const receiptUrl = file ? `/uploads/${file.filename}` : null;
    return this.payments.createReceipt({
      quotaId: parseInt(body.quotaId, 10),
      memberId: parseInt(body.memberId, 10),
      recipientId: body.recipientId
        ? parseInt(body.recipientId, 10)
        : undefined,
      amount: parseInt(body.amount, 10),
      note: body.note,
      receiptUrl: receiptUrl ?? '',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    body: {
      amount?: number;
      note?: string;
      recipientId?: number | null;
    },
  ) {
    return this.payments.updatePayment(id, {
      amount: body.amount,
      note: body.note,
      recipientId: body.recipientId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.payments.delete(id);
  }
}
