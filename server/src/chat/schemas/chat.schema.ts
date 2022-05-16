
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';

export type ChatDocument = Chat & Document

console.log("ssss", User)
export interface Message {
  chatId: string
  message: string
  sender: string
  recipient: string
  sendDate: string
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
  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }] })
  // users: User[];
  @Prop({ type: [{ type: Types.ObjectId, required: false, ref: () => "User" }] })
  users: User[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat)
