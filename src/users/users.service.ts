import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/user.dto";
import { PrismaService } from "../core/orm/prisma.service";

@Injectable()
export class UsersService {
  private users: Promise<any>;
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    return this.prismaService.users.create({
      data: {
        name: userData.name,
        city: userData.city,
        password: userData.password,
        age: userData.age,
        email: userData.email,
        premium: userData.isPremium,
        isAdmin: userData.isAdmin,
      },
    });
  }

  async getUserList(): Promise<User[]> {
    return this.prismaService.users.findMany({
      orderBy: {
        name: "asc",
      },
      take: 5,
    });
  }

  async getUserById(userId: string) {
    return this.prismaService.users.findFirst({
      where: { id: Number(userId) },
      select: {
        id: true,
        name: true,
        city: true,
        age: true,
      },
    });
  }

  async deleteUser(id: string) {
    const user = this.prismaService.users.find((item) => item.id === id);
    return this.users;
  }

  async findByUsername(userEmail: string) {
    return this.prismaService.users.findFirst({
      where: { email: userEmail },
    });
  }

}
