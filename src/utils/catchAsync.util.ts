export const HTTP_RESPONSE_CODE = {
  // Generally used on a POST request is successful. This does not contain any res body
  CREATED: 201,

  // Bad Request
  BAD_REQUEST: 400,

  // User is logged in but not authorized to perform the actions
  UNAUTHORIZED: 401,

  // User needs to opt for a subscription plan
  PAYMENT_REQURED: 402,

  // User needs to login
  AUTH_REQUIRED: 403,

  // Request not Found
  NOT_FOUND: 404,
};

const catchAsync = (fn: any) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    let errName = err.name;
    let errMessage = err.message;

    console.error({ errName });
    if (!errMessage) errMessage = err;

    if (req.timestamp) {
      // logErrorToAxiom({
      //     timestamp: req.timestamp,
      //     payload: {
      //         method: req.method,
      //         params: req.params,
      //         body: JSON.stringify(req.body),
      //     },
      //     error: {
      //         message: errMessage,
      //         statusCode: err?.statusCode,
      //         stack: err?.stack,
      //     }
      // })
    }

    if (errName === "CastError") {
      return res.status(400).json({
        success: false,
        level: "high",
        message: "Invalid payload",
        error: err?.message,
      });
    }

    if (errName === "ErrorWarning") {
      return res.status(200).json({
        success: false,
        level: "warning",
        message: errMessage,
        data: err?.public_data,
      });
    }

    if (errName === "InvalidPayload") {
      return res.status(400).json({
        success: false,
        level: "high",
        message: errMessage,
        data: err?.public_data,
        error: err?.error,
      });
    }

    console.error("CaughtError:", err);
    console.error("ErrorStack:", err.stack);
    console.error("ErrorPayload:", JSON.stringify(req.body));
    console.error("ErrorParams:", req.params);
    console.error("--------------------xxxxxx--------------------");
    console.error(err.stack);

    let responseStatusCode = 500;
    if (err.statusCode) responseStatusCode = err.statusCode;

    // Sentry.captureException(err, {
    //     req: req,
    // });

    try {
      errMessage = JSON.parse(errMessage);
      errMessage = errMessage.map((ex: any) => ex.message).join(",");
    } catch (e) {}

    return res.status(responseStatusCode).json({
      success: false,
      message: errMessage,
    });
  });
};

export { catchAsync };
