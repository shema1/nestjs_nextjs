import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Chat, ChatDocument } from "./schemas/chat.schema";
import { Model, ObjectId } from "mongoose";
import { Request } from "express";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "src/users/users.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import _ from "lodash"
import { IMessage } from "./schemas/message.schema";
@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<ChatDocument>,
    private authService: AuthService,
    private userService: UsersService
  ) { }

  async getChats(request: Request): Promise<Chat[]> {
    const jwt = request.headers.authorization.replace(/Bearer /i, '');
    const decodeUser = await this.authService.decode(jwt);
    const userChatIds = await this.userService.getUserChats(decodeUser._id);
    const chats = await this.chatModel.find({ _id: { $in: userChatIds } }).populate("users", "-chats");

    return chats
  }

  async getChatsByUser(): Promise<Chat[]> {
    const chats = await this.chatModel.find();
    return chats
  }

  async readMessages(request: Request, chatId: ObjectId,): Promise<Chat> {
    const jwt = request.headers.authorization.replace(/Bearer /i, '');
    const decodeUser = await this.authService.decode(jwt);
    const chat = await this.chatModel.findById(chatId);
    console.log("decodeUser._id", decodeUser._id)
    try {
      await this.chatModel.findByIdAndUpdate(
        chatId,
        {
          $set: {
            'messages.$[element].isRead': true
          }
        },
        {
          arrayFilters: [{
            'element.recipient': decodeUser._id
          }],
          new: true
        }
      )

      return await this.chatModel.findById(chatId).populate("users");
    } catch (error) {
      console.log("error", error)
    }

  }

  async getChat(id: ObjectId): Promise<Chat> {
    return await this.chatModel.findById(id).populate("users", "-chats")
  }

  async addMessage(message: IMessage): Promise<Chat> {
    // _id: mongoose.Types.ObjectId() 
    console.log("message", message)
    await this.chatModel.findByIdAndUpdate(message.chatId, { $push: { messages: { ...message, isRead: false } } })
    const updatedChat = await this.chatModel.findById(message.chatId).populate("users")
    return updatedChat
  }

  async setUsersToChat(chatId: string, senderId: ObjectId, recipientId: ObjectId): Promise<void> {
    await this.chatModel.findByIdAndUpdate(chatId, { $push: { users: { $each: [senderId, recipientId] } } }, { new: true, useFindAndModify: false })
  }

  async createChat(chat: CreateChatDto): Promise<Chat> {
    const newChat = await this.chatModel.create({ messages: [], sender: chat.sender, recipient: chat.recipient })

    await this.userService.setNewChatToUser(chat.sender, newChat._id)
    await this.userService.setNewChatToUser(chat.recipient, newChat._id)

    await this.setUsersToChat(newChat._id, chat.sender, chat.recipient)

    return await this.chatModel.findById(newChat._id).populate("users")
  }

  async saveChat(chat: any): Promise<void> {
    // const sender = await this.userModel.findById(chat.sender)
    // const recipient = await this.userModel.findById(chat.recipient)
    if (!chat._id) {
      const newChat = await this.chatModel.create(chat)
      // this.setChatToUsers(chat.sender, chat.recipient, newChat._id)
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
      console.log("error", error)
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