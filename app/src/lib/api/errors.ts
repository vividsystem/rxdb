export class APIError extends Error {
  public status: number;
  public url: string;
  public method: string;
  public response?: unknown;

  constructor(
    message: string,
    options: {
      status: number;
      url: string;
      method?: string;
      response?: unknown;
      cause?: unknown;
    }
  ) {
    super(message, { cause: options.cause });
    this.name = "ApiError";

    this.status = options.status;
    this.url = options.url;
    this.method = options.method ?? "GET";
    this.response = options.response;

    Object.setPrototypeOf(this, APIError.prototype);
  }
	static async fromResponse(res: Response): Promise<APIError> {
    let body: unknown;
    try {
      // Try to parse JSON first, fallback to text if it fails
      const contentType = res.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        body = await res.json();
      } else {
        body = await res.text();
      }
    } catch {
      body = undefined;
    }

    return new APIError(`Request failed with status ${res.status}`, {
      status: res.status,
      url: res.url,
      method: (res as any).method ?? "GET", // fetch Response doesn’t expose method directly
      response: body,
    });
  }
}
