import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/users/schemas/user.schema";
import { UsersService } from "src/users/users.service";
import { jwtSecret } from "../constants";

@Injectable()
export class JwtStategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret
    })
  }

  async validate(validationPayload: User): Promise<User> | null {
    return await this.usersService.getUserByEmail(validationPayload.email)
  }
}