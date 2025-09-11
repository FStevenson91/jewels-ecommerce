import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The updated name of the user',
    example: 'Jane Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The updated email of the user',
    example: 'jane.doe@example.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'The updated user password (min length: 6)',
    example: 'newpassword456',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;
}
