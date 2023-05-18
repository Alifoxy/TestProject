import { Injectable } from "@nestjs/common";
import { CreateCarDto } from "./dto/cars.dto";
import { PrismaService } from "../core/orm/prisma.service";

@Injectable()
export class CarService {
  private cars: any = [];

  async createCar(carData: CreateCarDto) {
    this.cars.push(carData);
    return this.cars;
  }

  async deleteCar(id: string) {
    const car = this.cars.find((item: { id: string }) => item.id === id);
    return this.cars;
  }

  async patch(id: string, carData: CreateCarDto) {
    const car = this.cars.find((item: { id: string }) => item.id === id);
    this.cars.push(carData);
    return this.cars;
  }

  async getCar(brand: string) {
    const car = this.cars.find(
      (item: { brand: string }) => item.brand === brand
    );
    return this.cars;
  }
}
