import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateAdminDto } from '../../domain/dto/create-admin.dto';
import { AdminService } from '../services/admin.service';
import { ListAdminDto } from '../../domain/dto/list-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post()
  create(@Body() body: CreateAdminDto) {
    return this.adminService.createAdmin(body);
  }

  @Get(':adminId')
  getById(@Param('adminId') adminId: string) {
    return this.adminService.getAdminById(adminId);
  }

  @Get()
  list(@Query() query: ListAdminDto) {
    return this.adminService.listAdmin(query);
  }
}
