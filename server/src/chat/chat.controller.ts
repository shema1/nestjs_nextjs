import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ChatService } from "./chat.service";
import { ObjectId } from 'mongoose'
import { Request } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateChatDto } from "./dto/create-chat.dto";



@ApiTags('Chat')
@Controller('/chat')
export class ChatController {

  constructor(
    private chatService: ChatService
  ) { }


  @Get(':id')
  getChat(id: ObjectId) {
    return this.chatService.getChat(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getChats(@Req() request: Request) {
    return this.chatService.getChats(request)
  }

  @Post()
  createChat(@Body() params: CreateChatDto) {
    console.log("params", params)
    return this.chatService.createChat(params)
  }
}