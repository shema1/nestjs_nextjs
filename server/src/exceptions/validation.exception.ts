import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidationException extends HttpException {

  messeges;

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST)
    this.messeges = response
  }
}