import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Permission } from "../../core/enums/permission.enum";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty({ required: true, example: "user@mail.com" })
  @IsString()
  @IsEmail()
  // @Matches('')
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  // @IsEnum(CityEnum)
  city: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isPremium: boolean;

  permissions: Permission[];

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}
