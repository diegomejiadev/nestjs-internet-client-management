import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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

  @Get()
  list(@Query() query: ListAdminDto) {
    return this.adminService.listAdmin(query);
  }
}
