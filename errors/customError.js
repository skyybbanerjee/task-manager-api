//custom Error Class 

export class CustomAPIError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const createCustomError = (message, statusCode) => {
  return new CustomAPIError(message, statusCode);
};
