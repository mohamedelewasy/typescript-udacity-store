class ApiError extends Error {
  constructor(msg: string, public statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
  }
}

export default ApiError;
