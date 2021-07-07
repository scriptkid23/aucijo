import HomeContainer from "../containers/home.container"
import LoginContainer from "../containers/login.container"
import RegisterContainer from "../containers/register.container"

export const AuthenticationRoute = [
    {
      path: '/login',
      name: 'login',
      component: LoginContainer,
    },

    {
      path: '/register',
      name: 'register',
      component: RegisterContainer,
    },
  ]
export const HomeRoute = [
  {
    path: '/home',
    name: 'home',
    component: HomeContainer,
  },
]