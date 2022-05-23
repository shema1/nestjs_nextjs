import { ObjectId } from "mongoose"
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
  @ApiProperty({ example: 'Tom' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 'comment' })
  @IsNotEmpty()
  readonly text: string;

  @ApiProperty({ example: '6262aba2761d957e6e06b47b' })
  @IsNotEmpty()
  readonly trackId: ObjectId
}