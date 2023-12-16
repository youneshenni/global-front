import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { MagasinModule } from './magasin/magasin.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [MagasinModule, ArticleModule, CategoryModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('magasin', 'category', 'article');
  }
}
