
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export interface IMessage {
  _id: ObjectId
  chatId: string
  message: string
  sender: string
  recipient: string
  sendDate: string
  isRead: boolean
}


@Schema()
export class Message extends Document {
  _id: ObjectId
  @Prop()
  chatId: string
  @Prop()
  message: string
  @Prop()
  sender: string
  @Prop()
  recipient: string
  @Prop()
  sendDate: string
  @Prop()
  isRead: boolean
}

export const MessageSchema = SchemaFactory.createForClass(Message)