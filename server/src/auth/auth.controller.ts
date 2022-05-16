import { Body, ClassSerializerInterceptor, Controller, Post, Req, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { User } from "src/users/schemas/user.schema";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Request } from "express";
import { CreateUserkDto } from "src/users/dto/create-user.dto";
import { ValidationPipe } from "src/pipes/validationPipe";
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Req() req: Request): Promise<{ access_token: string }> {
    return this.authService.login(req.user as User)
  }

  
  @Post('registration')
  @UsePipes(ValidationPipe)
  registration(@Body() dto: CreateUserkDto) {
    return this.authService.registration(dto)
  }
}