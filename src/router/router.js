import AcutionDetail from "../containers/auction-detail.container";
import AcutionContainer from "../containers/auction.container";
import DashboardContainer from "../containers/dashboard.container";
import ItemsDetailContainer from "../containers/items-detail.container";
import LoginContainer from "../containers/login.container";
import ProfileContainer from "../containers/profile.container";
import RegisterContainer from "../containers/register.container";
import Tables from "../containers/test.container";

export const AuthenticationRoute = [
  {
    path: "/login",
    name: "login",
    component: LoginContainer,
  },

  {
    path: "/register",
    name: "register",
    component: RegisterContainer,
  },
];
export const HomeRoute = [
  {
    path: "/home/dashboard",
    name: "dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: DashboardContainer,
  },
  {
    path: "/home/auction",
    name: "auction",
    icon: "tim-icons icon-cart",
    component: AcutionContainer,
  },
  {
    path: "/home/auction/:id",
    name: "auction",
    icon: "tim-icons icon-cart",
    component: AcutionDetail,
  },
  {
    path: "/home/dashboard/items",
    name: "auction",
    icon: "tim-icons icon-cart",
    component: ItemsDetailContainer,
  },
  {
    path: "/home/profile",
    name: "profile",
    icon: "tim-icons icon-cart",
    component: ProfileContainer,
  },
  {
    path: "/home/test",
    name: "test",
    icon: "tim-icons icon-vector",
    component: Tables,
  },
];
