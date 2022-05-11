import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { ApiProperty } from "@nestjs/swagger";
import { Chat } from "src/chat/schemas/chat.schema";
import * as mongoose from 'mongoose'

export type UserDocument = User & Document
@Schema()
export class User {

  _id: string

  @ApiProperty({ example: 'name' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'email@mail.com' })
  @Prop()
  email: string;

  @ApiProperty({ example: 'password' })
  @Prop()
  password: string;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: "chat" }
  })
  chats: Chat[];
}

export const UserSchema = SchemaFactory.createForClass(User)