import { Router } from 'express';
import ForgotPasswordController from '../Controllers/forgotPasswordController';
import ResetPasswordController from '../Controllers/resetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;