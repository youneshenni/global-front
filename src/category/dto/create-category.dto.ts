import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'The name of the category',
    example: 'Batata',
  })
  name: string;

  @ApiProperty({
    description: 'The image of the category',
    example: '/images/batata.jpg',
  })
  image: string;
}
