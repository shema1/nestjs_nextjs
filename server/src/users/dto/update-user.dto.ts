import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { plainToClass, Transform, Type } from 'class-transformer';
export class UpdateUserDto {
  @ApiProperty({ example: 'id' })
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty({ example: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'lastName' })
  lastName: string;

  @IsOptional()
  @ApiProperty({ example: 'avatar' })
  avatar?: string;
}
