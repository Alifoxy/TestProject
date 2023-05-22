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
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { ApiTags, ApiParam } from "@nestjs/swagger";
import { CarService } from "./cars.service";
import { CreateCarDto } from "./dto/cars.dto";
import { RequirePermissions } from "../permissions/permissions.decorator";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { editFileName, imageFileFilter } from "../core/file-upload/file.upload";
import { diskStorage } from "multer";
import { Permission } from "../core/enums/permission.enum";

@ApiTags("Cars")
@Controller("cars")
export class CarsController {
  private userId: string;
  constructor(private readonly carService: CarService) {}

  @Get()
  @RequirePermissions(Permission.Read)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async findMany(@Req() req: any, @Res() res: any) {
    return res.status(HttpStatus.OK).json(await this.carService.getCarsList(cars));
  }

  @Get("/:carBrand")
  @RequirePermissions(Permission.Read)
  async getCar(
    @Req() req: any,
    @Res() res: any,
    @Param("carBrand") carBrand: string
  ) {
    console.log(carBrand);
    return res
      .status(HttpStatus.FOUND)
      .json(await this.carService.getCarByBrand(carBrand));
  }

  @Post()
  @RequirePermissions(Permission.Create)
  async createCar(
    @Req() req: any,
    @Body() body: CreateCarDto,
    @Res() res: any,
    @Param("userId") userId: string
  ) {
    return res
      .status(HttpStatus.CREATED)
      .json(await this.carService.createCar(body, userId));
  }

  @Delete("/:carId")
  @RequirePermissions(Permission.Delete)
  async deleteCar(
    @Req() req: any,
    @Res() res: any,
    @Param("carId") carId: string
  ) {
    console.log(carId);
    return res
      .status(HttpStatus.OK)
      .json(await this.carService.deleteCar(carId));
  }

  @ApiParam({ name: "id", required: true })
  @Patch("/:carId")
  @RequirePermissions(Permission.Create)
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "image", maxCount: 1 }], {
      storage: diskStorage({
        destination: "./public/cars",
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  async updateCar(
    @Req() req: any,
    @Body() body: any,
    @Res() res: any,
    @Param("carId") carId: any,
    @UploadedFiles()
    files: { image?: Express.Multer.File[] }
  ) {
    if (files?.image) {
      body.image = `/public/cars/${files.image[0].filename}`;
    }
    return res
      .status(HttpStatus.OK)
      .json(await this.carService.updateCar(body));
  }
}
