import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/orders.entity';
// Importa el guard de autenticación si ya lo tienes
// import { AuthGuard } from '../auth/auth.guard';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  // @UseGuards(AuthGuard) // Descomenta si ya tienes el guard de autenticación
  @ApiOperation({ summary: "Create a new order from a user's cart" })
  @ApiCreatedResponse({
    description: 'The order has been successfully created.',
    type: Order,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, e.g., empty cart or insufficient stock',
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrderFromCart(createOrderDto.userId);
  }

  @Get()
  // @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiOkResponse({
    description: 'Successfully retrieved a list of all orders.',
    type: [Order],
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  // @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Retrieve a single order by ID' })
  @ApiParam({ name: 'id', description: 'The UUID of the order' })
  @ApiOkResponse({
    description: 'Successfully retrieved the order.',
    type: Order,
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
