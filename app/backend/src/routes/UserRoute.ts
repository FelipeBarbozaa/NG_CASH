import { Router } from 'express';
import UserFactory from '../factories/UserFactory';
import registerCredencials from '../middlewares/registerCredencials';

const router = Router();

router.post('/register', registerCredencials,
  (req, res) => UserFactory().createUser(req, res));

export default router;