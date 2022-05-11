import { ObjectId } from "mongoose"
import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
  @ApiProperty({ example: 'Tom' })
  readonly username: string;

  @ApiProperty({ example: 'comment' })
  readonly text: string;

  @ApiProperty({ example: '6262aba2761d957e6e06b47b' })
  readonly trackId: ObjectId
}