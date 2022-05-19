import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, ChatSchema } from "src/chat/schemas/chat.schema";
import { FileService } from "src/file/file.service";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";




@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, FileService],
  exports: [UsersService]
})
export class UsersModule {

}