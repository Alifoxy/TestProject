import { Injectable, forwardRef, Inject, Res, Req } from "@nestjs/common";
import { CreateCarDto } from "./dto/cars.dto";
import { PrismaService } from "../core/orm/prisma.service";
import { UsersService } from "../users/users.service";
import { Cars } from "@prisma/client";
@Injectable()
export class CarService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService
  ) {}

  async checkUser(userId: string) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async createCar(carData: CreateCarDto, userId: string) {
    const user = await this.checkUser(userId);
    return this.prismaService.cars.create({
      data: {
        model: carData.model,
        brand: carData.brand,
        sellerId: user.id,
        sellerName: carData.sellerName,
        year: carData.year,
        price: carData.price,
        city: carData.city,
        image: carData.image,
      },
    });
  }

  async updateCar(carData: any): Promise<Cars> {
    return this.prismaService.cars.create({
      data: {
        model: carData.model,
        brand: carData.brand,
        sellerId: carData.sellerId,
        sellerName: carData.sellerName,
        year: carData.year,
        price: carData.price,
        city: carData.city,
        image: carData.image,
      },
    });
  }

  async deleteCar(id: string) {
    const car = this.prismaService.cars.find(
      (item: { id: string }) => item.id === id
    );
    return this.cars;
  }

  async getCarsList(): Promise<Cars[]> {
    return this.prismaService.cars.findMany({
      orderBy: {
        name: "asc",
      },
      take: 5,
    });
  }

  async getCarByBrand(brand: string) {
    const car = this.prismaService.cars.find(
      (item: { brand: string }) => item.brand === brand
    );
    return this.cars;
  }
}
