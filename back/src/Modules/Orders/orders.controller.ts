import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/orders.entity';
// Importa el guard de autenticación si ya lo tienes
// import { AuthGuard } from '../auth/auth.guard';

// ... imports ...
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new order from a user's cart" })
  @ApiCreatedResponse({
    description: 'The order has been successfully created.',
    type: Order,
  })
  @ApiBadRequestResponse({
    description: 'Bad request, e.g., empty cart or insufficient stock',
  })
  @ApiBody({
    type: CreateOrderDto,
    examples: {
      a: {
        summary: 'Example Order Creation',
        value: {
          userId: 'e3f0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
        },
      },
    },
  })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrderFromCart(createOrderDto.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all orders' })
  @ApiOkResponse({
    description: 'Successfully retrieved a list of all orders.',
    type: [Order],
  })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single order by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the order',
    example: 'f8e0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the order.',
    type: Order,
  })
  @ApiNotFoundResponse({ description: 'Order not found' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }
}
