import { BadRequestError, UnauthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/jwt-token.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthorizedError("authentication invalid");
  }
  try {
    const user = verifyJWT(token);
    const { role, userId } = user;
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthorizedError("authentication invalid");
  }
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.role === "demo") {
    throw new BadRequestError("Demo User. Read Only!");
  }
  next();
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};
