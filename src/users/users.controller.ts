import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/user.dto";
import { CreateCarDto } from "../cars/dto/cars.dto";
import { UsersService } from "./users.service";
import { CarService } from "../cars/cars.service";
import { ApiParam, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @Inject(forwardRef(() => CarService))
    private readonly carsService: CarService
  ) {}

  @Get()
  async getUsersList(@Req() req: any, @Res() res: any) {
    return res.status(HttpStatus.OK).json(await this.userService.getUserList());
  }

  @ApiParam({ name: "userId", required: true })
  @Get("/:userId")
  async getById(
    @Req() req: any,
    @Res() res: any,
    @Param("userId") userId: string
  ) {
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.getUserById(userId));
  }

  @Post()
  async createUser(
    @Req() req: any,
    @Body() body: CreateUserDto,
    @Res() res: any,
  ) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.userService.createUser(body));
  }

  @Delete("/:userId")
  async deleteUser(
    @Req() req: any,
    @Res() res: any,
    @Param("userId") userId: string
  ) {
    console.log(userId);
    return res
      .status(HttpStatus.OK)
      .json(await this.userService.deleteUser(userId));
  }

  @ApiParam({ name: "userId", required: true })
  @Patch("/:userId")
  async updateUser(
    @Req() req: any,
    @Res() res: any,
    @Param("userId") userId: string
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}

  @Post("/cars/:userId")
  async addNewCar(
    @Req() req: any,
    @Res() res: any,
    @Body() body: CreateCarDto,
    @Param("userId") userId: string
  ) {
    const user = await this.userService.getUserById(userId);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: `User with id: ${userId} not found` });
    }
    return res
      .status(HttpStatus.OK)
      .json(await this.carsService.createCar(body, userId));
  }
}
