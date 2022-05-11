import { ApiProperty } from "@nestjs/swagger";

export class CreateTrackDto {
  @ApiProperty({ example: 'name' })
  readonly name;

  @ApiProperty({ example: 'artist' })
  readonly artist;

  @ApiProperty({ example: 'text'})
  readonly text;
}

export class CreateTrackFileDto {
  @ApiProperty({ example: 'image/0b405d9b-4d35-44b7-bf51-5bb9389e1444.jpeg' })
  readonly picture;

  @ApiProperty({ example: 'audio/c87e1213-0b66-4590-a1fc-81d6a0e48f2a.mp3' })
  readonly audio;
}