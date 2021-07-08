import DashboardContainer from "../containers/dashboard.container"
import HomeContainer from "../containers/home.container"
import LoginContainer from "../containers/login.container"
import RegisterContainer from "../containers/register.container"
import Tables from "../containers/test.container"

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
    path: '/home/dashboard',
    name: 'home',
    component: DashboardContainer,
  },
  {
    path: '/home/test',
    name: 'home',
    component: Tables,
  },
]