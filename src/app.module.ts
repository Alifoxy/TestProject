import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CarService } from "./cars/cars.service";
import { CarsController } from "./cars/cars.controller";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, CarsController],
  providers: [AppService, CarService],
})
export class AppModule {}
