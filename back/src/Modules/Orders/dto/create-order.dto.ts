import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'The UUID of the user placing the order',
    example: 'e3f0c11d-2f8e-4a9c-9c9e-5c4e0f0c11d2',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
