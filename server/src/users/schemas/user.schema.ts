import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { Chat, ChatSchema } from "src/chat/schemas/chat.schema";
import { Exclude } from "class-transformer";

export type UserDocument = User & Document

@Schema()
export class User {

  _id: string

  @ApiProperty({ example: 'name' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'lastNaeme' })
  @Prop()
  lastName: string;

  @ApiProperty({ example: 'src/image.png' })
  @Prop({ default: null })
  avatar: string;

  @ApiProperty({ example: 'email@mail.com' })
  @Prop()
  email: string;

  @ApiProperty({ example: 'password' })
  @Prop()
  password: string;

  // @Prop({ type: [{ type: Types.ObjectId, ref: "chat" }] })
  // chats: Chat[];
  @Prop({ type: [{ type: Types.ObjectId, required: false, ref: () => "Chat" }] })
  chats: Chat[];
}

export const UserSchema = SchemaFactory.createForClass(User)