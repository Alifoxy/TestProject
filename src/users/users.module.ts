import { Module } from '@nestjs/common';
import { PrismaService } from '../core/orm/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from '../core/orm/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [PrismaService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
