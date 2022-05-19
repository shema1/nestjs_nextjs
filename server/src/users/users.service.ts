import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Chat } from "src/chat/schemas/chat.schema";
import { CreateUserkDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User, UserDocument } from "./schemas/user.schema";
import { omit } from "lodash"
import { FileService, FileType } from "src/file/file.service";
var _ = require('lodash');
@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private fileService: FileService
  ) { }

  async createUser(dto: CreateUserkDto): Promise<User> {
    const newUser = await this.userModel.create({ ...dto });
    return await this.userModel.findById(newUser._id).select('-password')
  }

  async getUser(id: ObjectId | string): Promise<User> {
    const user = await this.userModel.findById(id).select('-password');
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
    const users = await this.userModel.find().populate("chats", "-users")
    return users
  }


  async updateUser(avatar: any, dto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(dto._id, dto);
    if (avatar) {
      const picturePath = this.fileService.createFile(FileType.IMAGE, avatar[0]);
      await user.update({ $set: { avatar: picturePath } })
      await user.save()
    }


    const updatedUser = await this.getUser(dto._id)
    return updatedUser
  }

  async deleteUser(id: ObjectId): Promise<ObjectId> {
    const user = await this.userModel.findByIdAndDelete(id)
    return user._id
  }

  async setNewChatToUser(userId: ObjectId, chatId: ObjectId): Promise<void> {
    const user = await this.userModel.findByIdAndUpdate(userId, { $push: { chats: chatId } })
  }
}