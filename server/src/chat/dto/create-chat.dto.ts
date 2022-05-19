
import { IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

export class CreateChatDto {
  @IsNotEmpty({ message: "sender is required" })
  sender
  @IsNotEmpty({ message: "recipient is required" })
  recipient
} 