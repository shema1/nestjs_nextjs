
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { IMessage, MessageSchema } from './message.schema';
export type ChatDocument = Chat & Document

@Schema()
export class Chat {

  _id: string
  @Prop({ type: [MessageSchema], default: [] })
  messages: IMessage[]
  @Prop()
  sender: string
  @Prop()
  recipient: string
  @Prop({ type: [{ type: Types.ObjectId, required: false, ref: () => "User" }] })
  users: User[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat)
