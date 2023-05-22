import { forwardRef, Module } from "@nestjs/common";
import { PrismaService } from "../core/orm/prisma.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { CarService } from "../cars/cars.service";
import { CarsModule } from "../cars/cars.module";
import { PrismaModule } from "../core/orm/prisma.module";
import { PermissionsGuard } from "../permissions/permissions.guard";
import { APP_GUARD } from "@nestjs/core";

@Module({
  imports: [PrismaModule, forwardRef(() => CarsModule)],
  controllers: [UsersController],
  providers: [
    { provide: APP_GUARD, useClass: PermissionsGuard },
    PrismaService,
    UsersService,
    CarService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
