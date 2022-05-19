
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ChatDocument = Chat & Document

export interface Message {
  chatId: string
  message: string
  sender: string
  recipient: string
  sendDate: string
  isRead: boolean
}
@Schema()
export class Chat {

  _id: string
  @Prop()
  messages: Message[]
  @Prop()
  sender: string
  @Prop()
  recipient: string
  @Prop({ type: [{ type: Types.ObjectId, required: false, ref: () => "User" }] })
  users: User[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat)
