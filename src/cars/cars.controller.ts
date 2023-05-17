import {
  Controller,
  Get,
  Post,
  Param,
  Req,
  Res,
  Patch,
  Delete,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiParam } from '@nestjs/swagger';
import { CarService } from './cars.service';
import { CreateCarDto } from './dto/cars.dto';

@ApiTags('Cars')
@Controller('cars')

export class CarsController {
    constructor(
        private readonly carService: CarService,
    ) {}

    @Get()
    async getCarsList() {}


    @Get('/:brand')
    async getCar(
        @Req() req: any,
        @Res() res: any,
        @Param('brand') brand: string
    ) {
        console.log(brand);
        return res.status(HttpStatus.FOUND).json(await this.carService.getCar(brand))
    }

    @Post()
    async createCar(
        @Req() req: any,
        @Body() body: CreateCarDto,
        @Res() res: any,
    ) {
        return res.status(HttpStatus.CREATED).json(await this.carService.createCar(body));
    }

    @Delete('/:carId')
    async deleteCar(
        @Req() req: any,
        @Res() res: any,
        @Param('carId') carId: string,
    ) {
        console.log(carId);
        return res.status(HttpStatus.OK).json(await this.carService.deleteCar(carId))
    }

    @ApiParam({ name: 'id', required: true })
    @Patch('/:carId')
    async updateCar(
        @Req() req: any,
        @Res() res: any,
        @Body() body: CreateCarDto,
        @Param('carId') carId: any,
    ){

        console.log(carId);
    return res
      .status(HttpStatus.ACCEPTED)
      .json(await this.carService.patch(carId, body));
    }


}