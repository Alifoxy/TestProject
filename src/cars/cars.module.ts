import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarService } from './cars.service';

@Module({
    controllers: [CarsController],
    providers: [CarService],
    exports: [CarService]
})
export class CarsModule {}