import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Comment } from "./comment.schema";
import * as mongoose from 'mongoose'
import { ApiProperty } from "@nestjs/swagger";

export type TrackDocument = Track & Document
@Schema()
export class Track {

  @ApiProperty({ example: 'name' })
  @Prop()
  name: string;

  @ApiProperty({ example: 'artist' })
  @Prop()
  artist: string;

  @ApiProperty({ example: 'text' })
  @Prop()
  text: string;

  @ApiProperty({ example: '1' })
  @Prop()
  listens: string;

  @ApiProperty({ example: 'src/image.png' })
  @Prop()
  picture: string;

  @ApiProperty({ example: 'src/audio.png' })
  @Prop()
  audio: string;

  @ApiProperty({ example: [] })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];
}

export const TrackSchema = SchemaFactory.createForClass(Track)