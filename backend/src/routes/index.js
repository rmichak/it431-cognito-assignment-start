import { loginRoute } from './loginRoute';
import { signUpRoute } from './signUpRoute';
import { signUpVerifyRoute } from './signupVerifyRoute';
import { forgotPasswordRoute } from './forgotPasswordRoutes';
import { forgotPasswordConfirmRoute } from './confirmPasswordRoute';
import { getTestRoute } from './testRoute';

export const routes = [
    loginRoute,
    signUpRoute,
    signUpVerifyRoute,
    forgotPasswordRoute,
    forgotPasswordConfirmRoute,
    getTestRoute
];
