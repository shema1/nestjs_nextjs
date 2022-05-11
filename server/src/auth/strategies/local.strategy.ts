import { HttpException, HttpStatus, Injectable, UnauthorizedException, UsePipes } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { ValidationPipe } from "src/pipes/validationPipe";
import { LoginUserDto } from "src/users/dto/login-user.dto";
import { User } from "src/users/schemas/user.schema";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validate({email, password})
    if (!user) {
      throw new UnauthorizedException("Wrong email or password")
    }

    return user;
  }
}