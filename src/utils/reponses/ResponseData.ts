import { HttpStatus } from '@nestjs/common';

export class ResponseData {
  response: any;
  code: HttpStatus;
  message?: string;

  constructor(response: any, code: HttpStatus, message?: string) {
    this.code = code;
    this.response = response;
    this.message = message;
  }
}
