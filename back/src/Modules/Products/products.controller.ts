import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-user.dto';
import { UpdateProductDto } from './dto/update-user.dto';
import { Product } from './entities/products.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({
    description: 'The product has been successfully created.',
    type: Product,
  })
  @ApiBody({
    type: CreateProductDto,
    examples: {
      a: {
        summary: 'Example Product Creation',
        value: {
          name: 'Wireless Mouse',
          description: 'Ergonomic mouse with long battery life.',
          price: 25.99,
          stock: 200,
        },
      },
    },
  })
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiOkResponse({
    description: 'Successfully retrieved a list of all products.',
    type: [Product],
  })
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single product by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the product',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the product.',
    type: Product,
  })
  @ApiNotFoundResponse({ description: 'Product not found' })
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the product',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  @ApiOkResponse({
    description: 'The product has been successfully updated.',
    type: Product,
  })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @ApiBody({
    type: UpdateProductDto,
    examples: {
      a: {
        summary: 'Example Product Update',
        value: {
          price: 22.5,
          stock: 180,
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({
    name: 'id',
    description: 'The UUID of the product',
    example: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
  })
  @ApiOkResponse({ description: 'The product has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  remove(@Param('id') id: string): Promise<void> {
    return this.productsService.remove(id);
  }
}
