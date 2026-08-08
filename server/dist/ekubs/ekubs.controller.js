"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EkubsController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const ekubs_service_1 = require("./ekubs.service");
const create_ekub_dto_1 = require("./dto/create-ekub.dto");
const create_member_dto_1 = require("./dto/create-member.dto");
const update_ekub_dto_1 = require("./dto/update-ekub.dto");
let EkubsController = class EkubsController {
    ekubs;
    constructor(ekubs) {
        this.ekubs = ekubs;
    }
    findAll() {
        return this.ekubs.findAll();
    }
    findOne(id) {
        return this.ekubs.findOne(id);
    }
    paymentPlan(id) {
        return this.ekubs.paymentPlan(id);
    }
    drawEvents(id) {
        return this.ekubs.drawStream(id);
    }
    create(dto) {
        return this.ekubs.create(dto);
    }
    registerMember(id, dto) {
        return this.ekubs.registerMember(id, dto);
    }
    registerMembers(id, dto) {
        return this.ekubs.registerMembers(id, dto.members);
    }
    removeMember(id, memberId) {
        return this.ekubs.removeMember(id, memberId);
    }
    updateMember(id, memberId, dto) {
        return this.ekubs.updateMember(id, memberId, dto);
    }
    assignMemberToQuota(id, memberId, dto) {
        return this.ekubs.assignMemberToQuota(id, memberId, dto);
    }
    updateEkub(id, dto) {
        return this.ekubs.updateEkub(id, dto);
    }
    generateQuotas(id) {
        return this.ekubs.generateQuotas(id);
    }
    rebalanceQuotas(id) {
        return this.ekubs.rebalanceQuotas(id);
    }
    setQuotaMembers(id, quotaId, body) {
        return this.ekubs.setQuotaMembers(id, quotaId, body.members ?? []);
    }
    drawWinner(id) {
        return this.ekubs.drawWinner(id);
    }
    reverseDraw(id, quotaId) {
        return this.ekubs.reverseDraw(id, quotaId);
    }
    resetAllDraws() {
        return this.ekubs.resetAllDraws();
    }
    updateStatus(id, body) {
        return this.ekubs.updateStatus(id, body.status);
    }
    delete(id) {
        return this.ekubs.delete(id);
    }
};
exports.EkubsController = EkubsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/payment-plan'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "paymentPlan", null);
__decorate([
    (0, common_1.Sse)(':id/events'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], EkubsController.prototype, "drawEvents", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ekub_dto_1.CreateEkubDto]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/members'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_member_dto_1.CreateMemberDto]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "registerMember", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/members/bulk'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_member_dto_1.RegisterMembersDto]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "registerMembers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id/members/:memberId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('memberId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "removeMember", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id/members/:memberId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('memberId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_ekub_dto_1.UpdateMemberDto]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "updateMember", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id/members/:memberId/quota'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('memberId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, update_ekub_dto_1.AssignMemberQuotaDto]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "assignMemberToQuota", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_ekub_dto_1.UpdateEkubDto]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "updateEkub", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/generate'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "generateQuotas", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/rebalance'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "rebalanceQuotas", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id/quotas/:quotaId/members'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('quotaId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "setQuotaMembers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/draw'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "drawWinner", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id/quotas/:quotaId/reverse'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('quotaId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "reverseDraw", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('reset-draws'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "resetAllDraws", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EkubsController.prototype, "delete", null);
exports.EkubsController = EkubsController = __decorate([
    (0, common_1.Controller)('ekubs'),
    __metadata("design:paramtypes", [ekubs_service_1.EkubsService])
], EkubsController);
//# sourceMappingURL=ekubs.controller.js.map