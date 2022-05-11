import { NestGateway } from "@nestjs/websockets/interfaces/nest-gateway.interface"
import { WebSocketGateway, ConnectedSocket, MessageBody, SubscribeMessage, OnGatewayConnection, WebSocketServer } from "@nestjs/websockets"
import { ChatService } from "./chat.service"
import { Bind } from "@nestjs/common";
import { Chat, Message } from "./schemas/chat.schema";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ChatGeteway implements OnGatewayConnection {

  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) { }

  afterInit(server: any) {
    // console.log("Init", server)
    console.log("Init")
  }

  async handleConnection(socket: any) {
    // console.log('Connect', socket);
    console.log('Connect');

    // const chats = await this.chatService.getChats()
    // socket.emit("all", chats)
    // console.log("chats test", chats)
    // process.nextTick(() => {
    // })
  }

  handleDisconnect(socket: any) {
    // console.log("Disconnect", socket)
    console.log("Disconnect")
  }


  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('chat')
  async handleNewMessage(message: Message, socket: any) {
    // console.log("socket", socket)
    // console.log('message', message);
    const result = await this.chatService.addMessage(message)

    // console.log("result", result)
    // socket.emit('newChat', result)

    // socket.emit('newChat', "asdasdasdadasdas")
    this.server.sockets.emit("newChat", result)


    // if (!chat) {
    // this.chatService.saveChat(chat)
    // }
    // console.log('New Chat', chat);
    // const isNewChat = 
    // this.chatService.saveChat(chat);
    // sender.emit('newChat', chat);
    // sender.broadcast.emit('newChat', chat);
  }
}

// import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

// @WebSocketGateway()
// export class ChatGeteway {
//   @WebSocketServer()
//   server;

//   @SubscribeMessage('message')
//   handleMessage(@MessageBody() message: string): void {
//     this.server.emit('message', message);
//   }
// }