import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose'
import {Document} from 'mongoose';
import { Track } from "./track.schema";
import { ApiProperty } from "@nestjs/swagger";

export type CommentDocument = Comment & Document

@Schema()
export class Comment {

  @ApiProperty({ example: 'Tom' })
  @Prop()
  username: string;

  @ApiProperty({ example: 'comment' })
  @Prop()
  text: string;

  @ApiProperty({ example: '6262aba2761d957e6e06b47b' })
  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "Track"  })
  track: Track;

}

export const CommentSchema = SchemaFactory.createForClass(Comment)