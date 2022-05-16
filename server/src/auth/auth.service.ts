import { HttpException, HttpStatus, Injectable, UsePipes } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/schemas/user.schema';
import _ from "lodash"
import { jwtSecret } from './constants';
import { CreateUserkDto } from 'src/users/dto/create-user.dto';
import { ValidationPipe } from 'src/pipes/validationPipe';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async validate(dto: LoginUserDto): Promise<User> | null {
    const user = await this.usersService.getUserByEmail(dto.email)

    if (!user) {
      return null
    }

    const passwordIsValid = dto.password === user.password;
    return passwordIsValid ? user : null;
  }

  async login(user: User): Promise<{ access_token: string, user: any }> {
    const payload = { _id: user._id, name: user.name, email: user.email }
    return { access_token: this.jwtService.sign(payload), user: payload }
  }

  async registration(dto: CreateUserkDto): Promise<User> {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('Email alredy exist', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.createUser(dto)
    return user
  }

  async verify(token: string): Promise<User> {
    const decoded = this.jwtService.verify(token, {
      secret: jwtSecret
    })
    const user = this.usersService.getUserByEmail(decoded.email);

    if (!user) {
      throw new Error('Unable to get the user')
    }

    return user
  }

  async decode(token: string): Promise<User> {
    console.log("token", token)
    const decoded = await this.jwtService.verify(token, {
      secret: jwtSecret
    })

    if (!decoded) {
      throw new Error('Unable to get the user')
    }

    return decoded
  }
}
