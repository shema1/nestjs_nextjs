import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors, Request, UsePipes, ValidationPipe } from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ObjectId } from 'mongoose'
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UsersService } from "./users.service";


@ApiTags('Users')
@Controller('/users')
export class UsersController {

  constructor(
    private usersService: UsersService
  ) { }


  // @Post()
  // @ApiOperation({ summary: 'Create user' })
  // @ApiResponse({ status: 200, type: User })
  // create(@Body() dto: CreateUserkDto) {
  //   return this.usersService.createUser(dto)
  // }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  getUsers() {
    return this.usersService.getAllUsers()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: User })
  @ApiParam({ name: 'id', required: true, description: 'User id', schema: { type: 'string' } })
  getUser(@Param("id") id: ObjectId) {
    return this.usersService.getUser(id)
  }

  @Put('/update')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  // @UsePipes(new ValidationPipe({ whitelist: true }))
  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  updateUser(@UploadedFiles() file: any, @Body() dto: UpdateUserDto) {
    const { avatar } = file
    return this.usersService.updateUser(avatar, dto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', required: true, description: 'User id', schema: { type: 'string' } })
  @ApiResponse({ status: 200, type: "6262aba2761d957e6e06b47b" })
  deleteUser(@Param('id') id: ObjectId) {
    return this.deleteUser(id)
  }
}