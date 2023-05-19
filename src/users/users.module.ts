import { forwardRef, Module } from "@nestjs/common";
import { PrismaService } from "../core/orm/prisma.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CarService } from "../cars/cars.service";
import { CarsModule } from "../cars/cars.module";
import { PrismaModule } from "../core/orm/prisma.module";

@Module({
  imports: [PrismaModule, forwardRef(() => CarsModule)],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, CarService],
  exports: [UsersService],
})
export class UsersModule {}
