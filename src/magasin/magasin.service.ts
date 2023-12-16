import { Injectable } from '@nestjs/common';
import { CreateMagasinDto } from './dto/create-magasin.dto';
import { UpdateMagasinDto } from './dto/update-magasin.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MagasinService {
  constructor(private prisma: PrismaService) {}

  async create(createMagasinDto: CreateMagasinDto) {
    try {
      const creationResponse = await this.prisma.magasin.create({
        data: createMagasinDto,
      });
      return creationResponse;
    } catch (e) {
      // Catch unique constraint exception error
      if (e.code === 'P2002') {
        return {
          status: 409,
          error: `A magasin with the same name already exists.`,
        };
      }
      return { status: 500, error: e };
    }
  }

  findAll() {
    return this.prisma.magasin.findMany();
  }

  findOne(id: number) {
    return this.prisma.magasin.findUnique({ where: { id } });
  }

  update(id: number, updateMagasinDto: UpdateMagasinDto) {
    return this.prisma.magasin.update({
      where: { id },
      data: updateMagasinDto,
    });
  }

  remove(id: number) {
    return this.prisma.magasin.delete({ where: { id } });
  }

  async addArticle(id: number, articleId: number, quantite: number) {
    try {
      // Check if article exists
      const article = await this.prisma.article.findUnique({
        where: { id: articleId },
      });
      if (!article) {
        return { status: 404, error: 'Article not found' };
      }
      const magasin = await this.prisma.magasin.findUnique({
        where: { id },
        include: {
          articles_en_stock: {
            include: { article: true },
          },
        },
      });
      const foundArticleEnStock = magasin.articles_en_stock.find(
        (articleEnStock) => articleEnStock.id === articleId,
      );
      if (foundArticleEnStock) {
        return this.prisma.articleEnStock.update({
          where: { id: foundArticleEnStock.id },
          data: { quantite: foundArticleEnStock.quantite + quantite },
        });
      }
      return this.prisma.articleEnStock.create({
        data: {
          magasin: { connect: { id } },
          article: { connect: { id: articleId } },
          quantite: quantite,
        },
      });
    } catch (e) {
      return { status: 500, error: e };
    }
  }
}
