import {
  Body,
  Controller,
  Delete,
  Get,
  MessageEvent,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { EkubStatus } from '../generated/prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EkubsService } from './ekubs.service';
import { CreateEkubDto } from './dto/create-ekub.dto';
import { CreateMemberDto, RegisterMembersDto } from './dto/create-member.dto';
import {
  AssignMemberQuotaDto,
  UpdateEkubDto,
  UpdateMemberDto,
} from './dto/update-ekub.dto';

@Controller('ekubs')
export class EkubsController {
  constructor(private ekubs: EkubsService) {}

  @Get()
  findAll() {
    return this.ekubs.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ekubs.findOne(id);
  }

  /** Public who-pays-who plan for the drawn rounds (no auth). */
  @Get(':id/payment-plan')
  paymentPlan(@Param('id', ParseIntPipe) id: number) {
    return this.ekubs.paymentPlan(id);
  }

  /** Public realtime stream (no auth) so anyone can watch the live draw. */
  @Sse(':id/events')
  drawEvents(@Param('id', ParseIntPipe) id: number): Observable<MessageEvent> {
    return this.ekubs.drawStream(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateEkubDto) {
    return this.ekubs.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/members')
  registerMember(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateMemberDto,
  ) {
    return this.ekubs.registerMember(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/members/bulk')
  registerMembers(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: RegisterMembersDto,
  ) {
    return this.ekubs.registerMembers(id, dto.members);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/members/:memberId')
  removeMember(
    @Param('id', ParseIntPipe) id: number,
    @Param('memberId', ParseIntPipe) memberId: number,
  ) {
    return this.ekubs.removeMember(id, memberId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/members/:memberId')
  updateMember(
    @Param('id', ParseIntPipe) id: number,
    @Param('memberId', ParseIntPipe) memberId: number,
    @Body() dto: UpdateMemberDto,
  ) {
    return this.ekubs.updateMember(id, memberId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/members/:memberId/quota')
  assignMemberToQuota(
    @Param('id', ParseIntPipe) id: number,
    @Param('memberId', ParseIntPipe) memberId: number,
    @Body() dto: AssignMemberQuotaDto,
  ) {
    return this.ekubs.assignMemberToQuota(id, memberId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateEkub(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEkubDto,
  ) {
    return this.ekubs.updateEkub(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/generate')
  generateQuotas(@Param('id', ParseIntPipe) id: number) {
    return this.ekubs.generateQuotas(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/rebalance')
  rebalanceQuotas(@Param('id', ParseIntPipe) id: number) {
    return this.ekubs.rebalanceQuotas(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/quotas/:quotaId/members')
  setQuotaMembers(
    @Param('id', ParseIntPipe) id: number,
    @Param('quotaId', ParseIntPipe) quotaId: number,
    @Body() body: { members?: { memberId: number; amount: number }[] },
  ) {
    return this.ekubs.setQuotaMembers(id, quotaId, body.members ?? []);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/draw')
  drawWinner(@Param('id', ParseIntPipe) id: number) {
    return this.ekubs.drawWinner(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/quotas/:quotaId/reverse')
  reverseDraw(
    @Param('id', ParseIntPipe) id: number,
    @Param('quotaId', ParseIntPipe) quotaId: number,
  ) {
    return this.ekubs.reverseDraw(id, quotaId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('reset-draws')
  resetAllDraws() {
    return this.ekubs.resetAllDraws();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { status: EkubStatus },
  ) {
    return this.ekubs.updateStatus(id, body.status);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.ekubs.delete(id);
  }
}
