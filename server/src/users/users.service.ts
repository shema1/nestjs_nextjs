import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Chat } from "src/chat/schemas/chat.schema";
import { CreateUserkDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";
import {omit} from "lodash"
var _ = require('lodash');
@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) { }

  async createUser(dto: CreateUserkDto): Promise<User> {
    const newUser = await this.userModel.create({ ...dto });
    return await this.userModel.findById(newUser._id).select('-password')
  }

  async getUser(id: ObjectId | string): Promise<User> {
    const user = await this.userModel.findById(id);
    return user
  }

  async getUserChats(id: ObjectId | string): Promise<Chat[]> {
    const user = await this.userModel.findById(id)
    return user.chats
  }

  async getUserByEmail(email: string): Promise<User> | undefined {
    const user = await this.userModel.findOne({ email: email });
    return user
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().populate("chats").exec()
    return users
  }


  async updateUser(id: ObjectId, dto: UpdateUserDto): Promise<User> {
    await this.userModel.findByIdAndUpdate(id, dto)
    const user = await this.userModel.findById(id)
    return user
  }

  async deleteUser(id: ObjectId): Promise<ObjectId> {
    const user = await this.userModel.findByIdAndDelete(id)
    return user._id
  }

  async setNewChatToUser(userId: ObjectId, chatId: ObjectId): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { $push: chatId }, { new: true, useFindAndModify: false })
  }
}