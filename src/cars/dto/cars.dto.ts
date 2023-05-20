import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";

export class CreateCarDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  brand: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  year: number;

  @ApiProperty()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  // @IsEnum(CityEnum)
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sellerName: string;
}
