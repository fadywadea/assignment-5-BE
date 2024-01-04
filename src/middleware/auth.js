import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  let token = req.header('token');
  jwt.verify(token, "myNameFady", async (error, decoded) => {
    if (error) return res.status(401).json({ message: 'error', error });
    next();
  });
} 