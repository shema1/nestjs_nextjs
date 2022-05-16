import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";
export class CreateUserkDto {

  @ApiProperty({ example: 'name', required: true })
  // @IsString({ message: "field name must be string" })
  @IsNotEmpty({ message: "name is required" })
  readonly name;

  @ApiProperty({ example: 'LastName', required: true })
  // @IsString({ message: "field name must be string" })
  @IsNotEmpty({ message: "lastName is required" })
  readonly lastName

  @ApiProperty({ example: 'src/image.png' })
  readonly avatar;

  @ApiProperty({ example: 'email@mail.com', required: true })
  // @IsEmail({ message: "wrong email format" })
  @IsNotEmpty({ message: "email is required" })
  readonly email;

  @ApiProperty({ example: 'password', required: true })
  @Length(4, 16, { message: "Min pasword length 4 symbol" })
  @IsNotEmpty({ message: "password is required" })
  readonly password;
}
