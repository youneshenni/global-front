import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMagasinDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the store',
    example: 'Batata Store',
  })
  name: string;
}
