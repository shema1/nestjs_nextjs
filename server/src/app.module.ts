import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { resolve } from "path";
import { FileModule } from "./file/file.module";
import { TrackModule } from "./track/track.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { ChatModule } from "./chat/chat.module";



@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    MongooseModule.forRoot('mongodb+srv://shema:vbrjkf1@cluster0.qqhgt.mongodb.net/test-aplication?retryWrites=true&w=majority'),
    TrackModule,
    FileModule,
    UsersModule,
    AuthModule,
    ChatModule
  ]
})
export class AppModule {

}
