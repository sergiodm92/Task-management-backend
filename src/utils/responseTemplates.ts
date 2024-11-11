export function successResponse(message: string, data: any = null, statusCode: number = 200) {
  return {
    status: "success",
    statusCode,
    message,
    data,
  };
}

export function errorResponse(message: string, error: any = null, statusCode: number = 400) {
  const response: { status: string; message: string; error?: any; statusCode: number } = {
    status: "error",
    statusCode,
    message,
  };

  if (error) {
    response.error = error;
  }

  return response;
}
