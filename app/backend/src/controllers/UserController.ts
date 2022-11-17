import { Request, Response } from 'express';
import { IUserService } from '../interfaces/User';

export default class UserController {
  constructor(private userService: IUserService) {}

  async createUser(req: Request, res: Response) {
    const { username, password, repassword } = req.body;
    const response = await this.userService.createUser(
      { username, password, repassword }
    );
    return res.status(201).json({ token: response });
  }

  async tryLogin(req: Request, res: Response) {
    const { username, password } = req.body;
    const response = await this.userService.login({username, password});
    return res.status(200).json(response);
  }
}