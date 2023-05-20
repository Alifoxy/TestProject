import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CarsModule } from "./cars/cars.module";
import { PrismaModule } from "./core/orm/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ServeStaticModule } from "@nestjs/serve-static/dist/serve-static.module";
import { join } from "path";
import { AuthController } from "./auth/auth.controller";
import { UsersService } from "./users/users.service";
import { UsersController } from "./users/users.controller";

@Module({
  imports: [
    UsersModule,
    CarsModule,
    PrismaModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [AppService, UsersService, PrismaModule],
})
export class AppModule {}
