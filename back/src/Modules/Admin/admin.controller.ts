import {
  Controller,
  Get,
  UseGuards,
  HttpException,
  HttpStatus,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
// Importa el guard de autenticación y el decorador para roles
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('admin')
@ApiBearerAuth()
@Controller('admin')
// @UseGuards(JwtAuthGuard, RolesGuard) // Descomenta si ya tienes los guards
// @Roles('admin') // Descomenta si ya tienes el decorador de roles
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard-summary')
  @ApiOperation({ summary: 'Get an administrative summary for the dashboard' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved dashboard summary.',
  })
  getDashboardSummary() {
    return this.adminService.getDashboardSummary();
  }
}
