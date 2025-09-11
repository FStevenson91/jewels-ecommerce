import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
    example: 'Laptop Pro',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'A description of the product',
    example: 'High-performance laptop with 16GB RAM and 512GB SSD.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The price of the product', example: 1200.5 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    description: 'The available stock of the product',
    example: 50,
  })
  @IsNumber()
  @IsPositive()
  stock: number;
}
