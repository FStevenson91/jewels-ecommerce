import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoryDto {
  @ApiProperty({
    description: 'The updated name of the category',
    required: false,
    example: 'Smart Devices',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The updated description of the category',
    required: false,
    example: 'Modern and connected electronic devices.',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
