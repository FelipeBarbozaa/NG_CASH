import { Request, Response, NextFunction } from 'express';

const registerCredencials = async (
  req: Request, res: Response, next: NextFunction
  ) => {
    const { username, password, repassword } = req.body;
    if (username.length < 3) {
      return res.status(400).json(
        { message: 'username must be at least 3 characters long'}
      );
    }
    if (password !== repassword) {
      return res.status(400).json({ message: 'password must be the same'});
    } 

    const regex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z$*&@#]{8,}$/;
    if (!(regex.test(password))) {
      return res.status(400).json(
        { message:
          'password must have 8 digits, a capital letter and a number'});
    }
    next();
};

export default registerCredencials;