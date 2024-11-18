export const SUCCESS_HTTP_CODES = [200, 201];
export const checkHttpStatus = (code: number): boolean => SUCCESS_HTTP_CODES.includes(code);
