import { Router } from 'express';
import UserFactory from '../factories/UserFactory';
import loginCredencials from '../middlewares/loginCredencials';
import registerCredencials from '../middlewares/registerCredencials';

const router = Router();

router.post('/register', registerCredencials,
  (req, res) => UserFactory().createUser(req, res));
router.post('/login', loginCredencials, 
  (req, res) => UserFactory().tryLogin(req, res));

export default router;