import { Router } from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';
import { adminOnly } from '../middlewares/admin.middleware.js';

const userRouter = Router();

userRouter.get('/', authorize, adminOnly, getUsers);

userRouter.get('/:id', authorize, adminOnly, getUser);

userRouter.put('/:id', authorize, adminOnly, updateUser);

userRouter.delete('/:id', authorize, adminOnly, deleteUser);

export default userRouter;