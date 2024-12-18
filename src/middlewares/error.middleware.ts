import { Request, Response, NextFunction } from "express";

// Error handling middleware
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Middleware running");

  // Log the size of the request
  const contentLength = req.headers["content-length"];
  console.log("Request size: ", contentLength, "bytes");
  if (contentLength) {
    console.log("Request size: ", contentLength, "bytes");
  } else {
    console.log("Request size: Not available");
  }

  if (err && err.status === 413) {
    res.status(413).send({ error: "Payload Too Large" });
  }

  // Handle other errors
  console.error("Stack error", err.stack); // Log the error stack for debugging
  res.status(500).send({ error: "Internal Server Error" });
};

export default errorHandler;
