export interface ApiErrorDetail {
  field: string;
  message: string;
}

/**
 * A custom error type that carries an HTTP status code and optional field-level
 * details. Throw this anywhere in a service/controller and the centralized
 * errorHandler middleware will turn it into a consistent JSON error response.
 */
export class ApiError extends Error {
  statusCode: number;
  errors: ApiErrorDetail[];

  constructor(statusCode: number, message: string, errors: ApiErrorDetail[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
