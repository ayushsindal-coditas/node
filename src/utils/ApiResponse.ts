/**
 * Every successful response in this API follows the same shape, so the
 * frontend consuming it only ever has to handle one envelope format.
 */
export class ApiResponse {
  static success<T>(data: T, message = "Success", meta?: Record<string, unknown>) {
    return {
      success: true,
      message,
      data,
      ...(meta ? { meta } : {}),
    };
  }
}
