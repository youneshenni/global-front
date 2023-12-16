import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { compareSync } from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { sign } from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return { status: 404, error: 'User not found' };
    }
    if (compareSync(password, user.password)) {
      return { status: 200, data: sign(user, process.env.SECRET) };
    }
    return { status: 401, error: 'Wrong password' };
  }
}
