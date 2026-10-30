import { createStart } from "@tanstack/react-start";
import { errorCaptureFunctionMiddleware, errorCaptureRequestMiddleware } from "@/lib/error-capture";

export const startInstance = createStart(() => ({
  requestMiddleware: [errorCaptureRequestMiddleware],
  functionMiddleware: [errorCaptureFunctionMiddleware],
}));
