import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chat, ChatDocument, Message } from "./schemas/chat.schema";
import { Model, ObjectId } from "mongoose";
import { User, UserDocument } from "src/users/schemas/user.schema";
import { Request } from "express";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
    private userService: UsersService
  ) { }

  async getChats(request: Request): Promise<Chat[]> {
    // const test = '/Bearer /i'
    const jwt = request.headers.authorization.replace(/Bearer /i, '');
    console.log("jwt", jwt)
    const decodeUser = await this.authService.decode(jwt)
    const chatsIds = await this.userService.getUserChats(decodeUser._id)
    const chats = await this.chatModel.find({ '_id': { $in: chatsIds } }).populate("users")
    return chats
  }

  async getChatsByUser(): Promise<Chat[]> {
    const chats = await this.chatModel.find();
    // console.log("chats test", chats)
    return chats
  }

  async getChat(id: ObjectId): Promise<Chat> {
    return await this.chatModel.findById(id).populate("users")
  }

  async addMessage(message: Message): Promise<Chat> {
    const chat = await this.chatModel.findByIdAndUpdate(message.chatId, { $push: { messages: message } })
    const updatedChat = await this.chatModel.findById(message.chatId)
    return updatedChat
  }

  async setChatToUsers(senderId: string, recipientId: string, newChat: Chat): Promise<void> {
    const sender = await this.userModel.findByIdAndUpdate(senderId, { $push: { chats: newChat._id } }, { new: true, useFindAndModify: false })
    const recipient = await this.userModel.findByIdAndUpdate(recipientId, { $push: { chats: newChat._id } }, { new: true, useFindAndModify: false })
  }

  async saveChat(chat: any): Promise<void> {
    // const sender = await this.userModel.findById(chat.sender)
    // const recipient = await this.userModel.findById(chat.recipient)
    if (!chat._id) {
      const newChat = await this.chatModel.create(chat)
      this.setChatToUsers(chat.sender, chat.recipient, newChat)
    } else {
      // this.addMessage(chat._id, chat.)
    }
    // sender.chats.push(chat);
    // recipient.chats.push(chat);
    // await sender.save()
    // await recipient.save()
    try {
      //   if (!sender || !recipient) {
      //     await this.chatModel.create(chat)
      //     await this.addNewMessage(sender, recipient, chat)
      //   } else {
      //     // await this.addNewMessage(sender, recipient, chat)
      //     // await sender.save()
      //     // await recipient.save()
      // }
    } catch (error) {
      console.log(" error", error)
    }

  }

  async checkChat() {

  }

  // async addMessage(chat: Chat): Promise<void> {
  //   const chatItem = await this.chatModel.findById(chat._id)
  //   // chat.messages.push({
  //   //   message: "test",
  //   //   sender: "6273805f872d99cb25594e19",
  //   //   recipient: "6273991fcb62cde1019ed22e",
  //   //   sendDate: "11111"
  //   // });
  //   // await chatItem.save();
  // }
}