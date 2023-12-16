import { Module } from '@nestjs/common';
import { MagasinService } from './magasin.service';
import { MagasinController } from './magasin.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [MagasinController],
  providers: [MagasinService, PrismaService],
})
export class MagasinModule {}
