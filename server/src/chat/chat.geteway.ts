import { WebSocketGateway, ConnectedSocket, MessageBody, SubscribeMessage, OnGatewayConnection, WebSocketServer } from "@nestjs/websockets"
import { ChatService } from "./chat.service"
import { Bind } from "@nestjs/common";
import { Server } from 'socket.io';
import { IMessage } from "./schemas/message.schema";

@WebSocketGateway({ cors: true })
export class ChatGeteway implements OnGatewayConnection {

  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) { }

  afterInit(server: any) {
    console.log("Init")
  }

  async handleConnection(socket: any) {
    console.log('Connect');
  }

  handleDisconnect(socket: any) {
    console.log("Disconnect")
  }


  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('chat')
  async handleNewMessage(message: IMessage, socket: any) {
    const result = await this.chatService.addMessage(message)
    this.server.sockets.emit("newChat", result)
  }
}
