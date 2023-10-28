import { StatusCodes } from "http-status-codes";

const ErrorHandler = (err, req, res, next) =>
{
    let customError = {
        statusCode : err.status || StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message || "Some thing went wrong",
    }
     if (err.code === 11000) {
       customError.msg = `this ${
         Object.keys(err.keyPattern)[0]
       } is already in use`;
       customError.statusCode = StatusCodes.NOT_ACCEPTABLE;
     }
     if (err.name === "ValidationError") {
       customError.msg = Object.values(err.errors)
         .map((item) => item.message)
         .join(" , ");
       customError.statusCode = StatusCodes.NOT_ACCEPTABLE;
     }
    //  if (err.name === "CastError") {
    //    customError.msg = `No item found with id : ${err.value}`;
    //    customError.statusCode = StatusCodes.NOT_FOUND;
    //  }
    res.status(customError.statusCode).json({ msg: customError.msg });
}

export default ErrorHandler; 