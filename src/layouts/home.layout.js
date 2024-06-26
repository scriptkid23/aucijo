import React from "react";
import { BackgroundColorContext } from "../context/background-color.context";
import PerfectScrollbar from "perfect-scrollbar";
import { getRoutes } from "../helper/utils";
import { HomeRoute } from "../router/router";
import Sidebar from "../components/sidebar.component";
import AdminNavbar from "../components/admin-navbar.component";
import logo from '../assets/img/spirity-logo.png';
import { Switch, useLocation, useHistory } from "react-router-dom";
import WrapperDrizzleComponent from "../components/wrapper-drizzle.component";
import CustomHook from "../helper/hook";
import { compose } from "redux";


var ps;
function HomeLayout(props) {
  const location = useLocation();
  const history = useHistory();
  const {fetchMemberDetail, fetchAuctionList, updateAuction, updateItem, updateToken} = CustomHook();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };
  const getBrandText = (path) => {
    for (let i = 0; i < HomeRoute.length; i++) {
      if (location.pathname.indexOf(HomeRoute[i].path) !== -1) {
        return HomeRoute[i].name;
      }
    }
    return "Brand";
  };
  // const checkRegistered = async () => {
  //   const flag = await props.methods.wasRegistered().call({from:props.owner});
  //   if(!flag) history.push('/register');
  // }
  const fetchData = async() => {
    try {
      const data = await props.methods.getProfile().call({from:props.owner});
      const balance = await props.methods.balanceOf(props.owner).call({from:props.owner});
      const auctionList = await props.methods.getAllAuction().call({from:props.owner});
      if(data){
        fetchMemberDetail(data,balance);
        fetchAuctionList(auctionList);
      }
    } catch (error) {
      alert(error.message)
    }
   
  }
  React.useEffect(() => {
    // checkRegistered();
    fetchData();
    props.events.CoinCharge(
      {
        filter: { owner: localStorage.getItem('address') },
        fromBlock:'latest'
      },
      (err, event) => {
        updateToken(event.returnValues.value);
      }
    );
    props.events.Withdrawal(
      {
        filter: { owner: localStorage.getItem('address') },
        fromBlock:'latest'
      },
      (err, event) => {
        updateToken(event.returnValues.value);
      }
    );
    props.events.AddItem(
      {
        filter: { _from: localStorage.getItem('address')},
        fromBlock:'latest'
      },
      (err, event) => {
        let newItem = {
          id: event.returnValues._id,
          content: event.returnValues._value,
          owner: event.returnValues._from,
        };
        updateItem(newItem);
      }
    );
    window.ethereum.on("accountsChanged", (data) => {
      if(data.length === 0){
        localStorage.clear();
        history.push("/login")
      }
      else{
        localStorage.setItem("address",data[0])
      }
    });
  },[])
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <Sidebar
              toggleSidebar={toggleSidebar}
              logo={{
                outterLink: "https://google.com",
                text: "Spirity",
                imgSrc: logo,
              }}
            />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <AdminNavbar
                brandText={getBrandText(location.pathname)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
                refreshData = {fetchData}
              />
              <Switch>
                {getRoutes(HomeRoute)}
              </Switch>
            </div>
          </div>
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}
export default compose(
  WrapperDrizzleComponent,
)(HomeLayout)

