import { STATUS_CODES } from 'http';

// LA Wrap the http error
export class HttpError extends Error {
  constructor(status) {
    super(STATUS_CODES[status]);
    this.status = status;
  }
}
