import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { MagasinService } from './magasin.service';
import { CreateMagasinDto } from './dto/create-magasin.dto';
import { UpdateMagasinDto } from './dto/update-magasin.dto';
import { ApiBody, ApiHeader, ApiResponse } from '@nestjs/swagger';

@Controller('magasin')
export class MagasinController {
  constructor(private readonly magasinService: MagasinService) {}

  @Post('')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    schema: {
      example: {
        id: 1,
        name: 'Batata Store',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description:
      'Bad Request. The request was invalid or cannot be otherwise served.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict. A magasin with the same name already exists.',
  })
  async create(@Body() createMagasinDto: CreateMagasinDto, @Res() res) {
    const response = await this.magasinService.create(createMagasinDto);
    if (response['status'] !== undefined) {
      return res.status(response['status']).send(response['error']);
    }
    return res.status(201).json(response);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'The records have been successfully retrieved.',
    schema: {
      example: [
        {
          id: 1,
          name: 'Batata Store',
        },
      ],
    },
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Bearer token',

    required: true,
  })
  findAll() {
    return this.magasinService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.magasinService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMagasinDto: UpdateMagasinDto) {
    return this.magasinService.update(+id, updateMagasinDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.magasinService.remove(+id);
  }

  @Post(':id/addArticle/:articleId') // POST /magasin/1/addArticle/1
  @ApiResponse({
    status: 201,
    description: 'The article has been successfully added to the store.',
    schema: {
      example: {
        id: 1,
        magasin_id: 1,
        article_id: 1,
        quantite: 1,
        article: {
          id: 1,
          name: 'Batata',
          photo: '/images/batata.jpg',
          category_id: 10,
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found. The magasin or the article does not exist.',
  })
  @ApiBody({
    schema: {
      example: {
        quantite: 1,
      },
    },
  })
  async addArticle(
    @Param('id') id: string,
    @Param('articleId') articleId: string,
    @Body('quantite') quantite: number,
    @Res() res,
  ) {
    console.log(quantite);
    const response = await this.magasinService.addArticle(
      +id,
      +articleId,
      quantite,
    );
    if (response?.['status'] !== undefined) {
      return res.status(response['status']).send(response['error']);
    }
    console.log(response);
    return res.status(201).json(response);
  }
}
