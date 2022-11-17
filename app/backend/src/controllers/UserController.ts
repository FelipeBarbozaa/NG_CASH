import { Request, Response } from 'express';
import { IUserService } from '../interfaces/User';

export default class UserController {
  constructor(private userService: IUserService) {}

  async createUser(req: Request, res: Response) {
    const { username, password, repassword } = req.body;
    await this.userService.createUser(
      { username, password, repassword }
    );
    return res.status(201).end();
  }
}