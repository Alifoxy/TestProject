import { forwardRef, Module } from "@nestjs/common";
import { CarsController } from "./cars.controller";
import { CarService } from "./cars.service";
import { UsersModule } from "../users/users.module";
import { PrismaService } from "../core/orm/prisma.service";
import { UsersService } from "../users/users.service";
import { PrismaModule } from "../core/orm/prisma.module";
import { APP_GUARD } from "@nestjs/core";
import { PermissionsGuard } from "../permissions/permissions.guard";

@Module({
  imports: [forwardRef(() => UsersModule), PrismaModule],
  controllers: [CarsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
    CarService,
    UsersService,
    PrismaService,
  ],
  exports: [CarService],
})
export class CarsModule {}
