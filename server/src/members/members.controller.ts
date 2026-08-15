import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MemberJwtAuthGuard } from '../auth/member-jwt-auth.guard';
import { receiptStorage } from '../uploads/receipt-uploads';
import { MembersService, type MemberAuthUser } from './members.service';

/** Member-scoped endpoints. Every route requires a member JWT (issued by
 *  `POST /api/auth/member/login`) and is locked to the signed-in member's own
 *  ekub. */
@UseGuards(MemberJwtAuthGuard)
@Controller('me')
export class MembersController {
  constructor(private members: MembersService) {}

  @Get()
  me(@Req() req: { user: MemberAuthUser }) {
    return this.members.me(req.user);
  }

  @Post('receipts')
  @UseInterceptors(
    FileInterceptor('receipt', {
      storage: receiptStorage(),
    }),
  )
  uploadReceipt(
    @Req() req: { user: MemberAuthUser },
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body()
    body: {
      quotaId: string;
      recipientId: string;
      amount: string;
      note?: string;
    },
  ) {
    return this.members.uploadReceipt(req.user, file, {
      quotaId: parseInt(body.quotaId, 10),
      recipientId: parseInt(body.recipientId, 10),
      amount: parseInt(body.amount, 10),
      note: body.note,
    });
  }

  @Patch('receipts/:id')
  @UseInterceptors(
    FileInterceptor('receipt', {
      storage: receiptStorage(),
    }),
  )
  updateReceipt(
    @Req() req: { user: MemberAuthUser },
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File | undefined,
    @Body()
    body: { amount: string; note?: string },
  ) {
    return this.members.updateReceipt(req.user, id, file, {
      amount: parseInt(body.amount, 10),
      note: body.note,
    });
  }

  @Delete('receipts/:id')
  deleteReceipt(
    @Req() req: { user: MemberAuthUser },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.members.deleteReceipt(req.user, id);
  }

  @Post('receipts/:id/confirm')
  confirmReceipt(
    @Req() req: { user: MemberAuthUser },
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.members.confirmReceipt(req.user, id);
  }
}
