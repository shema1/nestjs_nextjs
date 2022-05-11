import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { UsersModule } from "src/users/users.module";
import { ChatController } from "./chat.controller";
import { ChatGeteway } from "./chat.geteway";
import { ChatService } from "./chat.service";
import { Chat, ChatSchema } from "./schemas/chat.schema";



@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    AuthModule,
    UsersModule
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGeteway],
})

export class ChatModule {

}