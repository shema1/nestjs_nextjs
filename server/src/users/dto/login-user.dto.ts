import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
  @ApiProperty({ example: 'email@mail.com' })
  // @IsEmail({ message: "wrong email format" })
  @IsNotEmpty({ message: "email is required" })
  readonly email;

  @IsNotEmpty({ message: "password is required" })
  @ApiProperty({ example: 'password' })
  readonly password;
}
