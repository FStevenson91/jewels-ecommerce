import { Controller, Post, Get, Body, Delete, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Cart } from './entities/cart.entity';
// import { AuthGuard } from '../auth/auth.guard'; // Descomentar al tener la autenticación

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':userId')
  // @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Add a product to the user's cart" })
  @ApiParam({ name: 'userId', description: 'The UUID of the user' })
  @ApiCreatedResponse({
    description: 'The product has been successfully added to the cart.',
    type: Cart,
  })
  @ApiBadRequestResponse({
    description: 'Insufficient stock or invalid product/user ID.',
  })
  @ApiBody({ type: AddToCartDto })
  addToCart(
    @Param('userId') userId: string,
    @Body() addToCartDto: AddToCartDto,
  ) {
    return this.cartService.addToCart(userId, addToCartDto);
  }

  @Get(':userId')
  // @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Retrieve the user's cart" })
  @ApiParam({ name: 'userId', description: 'The UUID of the user' })
  @ApiOkResponse({
    description: "Successfully retrieved the user's cart.",
    type: Cart,
  })
  @ApiNotFoundResponse({ description: 'User or cart not found.' })
  getCart(@Param('userId') userId: string) {
    return this.cartService.findOrCreateCart(userId);
  }

  @Delete(':userId/:productId')
  // @UseGuards(AuthGuard)
  @ApiOperation({ summary: "Remove a product from the user's cart" })
  @ApiParam({ name: 'userId', description: 'The UUID of the user' })
  @ApiParam({
    name: 'productId',
    description: 'The UUID of the product to remove',
  })
  @ApiOkResponse({
    description: 'The product has been successfully removed from the cart.',
  })
  @ApiNotFoundResponse({ description: 'Product or cart not found.' })
  removeFromCart(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.cartService.removeFromCart(userId, productId);
  }
}
