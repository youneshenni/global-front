import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    description: 'The name of the article',
    example: 'Batata',
  })
  name: string;
  @ApiProperty({
    description: 'The image of the article',
    example: '/images/batata.jpg',
  })
  photo: string;
  @ApiProperty({
    description: "Article's category",
    example: 10,
  })
  category_id: number;
}
