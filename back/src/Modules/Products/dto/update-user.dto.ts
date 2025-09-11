import { IsString, IsOptional, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    description: 'The updated name of the product',
    example: 'Laptop Pro 2024',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The updated description of the product',
    example: 'Latest model with improved battery life.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The updated price of the product',
    example: 1250.0,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  price?: number;

  @ApiProperty({
    description: 'The updated stock of the product',
    example: 45,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  stock?: number;
}
