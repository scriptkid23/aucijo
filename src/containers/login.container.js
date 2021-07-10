import React from "react";
import { useHistory } from "react-router-dom";
import { compose } from "redux";
import MetamaskButton from "../components/metamask-button.component";
import WrapperDrizzleComponent from "../components/wrapper-drizzle.component";
import WrapperLoadingComponent from "../components/wrapper-loading.component";


function LoginContainer({setLoading, isLoading, methods}) {
  const history = useHistory();
  const onLogin = async() => {
    setLoading({flag: true, title:'Waiting connect to Metamask'});
    try {
        const data = await window.ethereum.request({ method: 'eth_requestAccounts' })
        if(data){
          console.log(methods)
          const flag = await methods.wasRegistered().call({from:data[0]});
          setLoading({flag: false, title:''});
          if(!flag) history.push('/register');
          else {
            history.push('/home/dashboard');
            localStorage.setItem("address",data[0]);
          }
        }
    } catch (error) {
      setLoading({flag: false, title:''});
    }
    
  }
  return (
    <div className="index-page">
      <nav
        className="navbar navbar-expand-lg fixed-top navbar-transparent"
      >
        <div className="container">
          <div className="navbar-translate">
            <a
              className="navbar-brand"
              href="https://demos.creative-tim.com/blk-design-system/index.html"
              rel="tooltip"
              title="Designed and Coded by Creative Tim"
              data-placement="bottom"
            >
              <span className='font-weight-bold'>Spirity</span> Inc.<br/>
            </a>
          </div>
        </div>
      </nav>
      <div className="wrapper">
        <div className="page-header header-filter">
          <div className="squares square1"></div>
          <div className="squares square2"></div>
          <div className="squares square3"></div>
          <div className="squares square4"></div>
          <div className="squares square5"></div>
          <div className="squares square6"></div>
          <div className="squares square7"></div>
          <div className="container h-100">
          {!isLoading && <div className="content-center login-form">
            <div className='login-form-header mb-2'>
              <h1 className='mb-1'>Welcome to the <span className="text-danger">aucijo</span></h1>
              <span>Please login with metamask to using service</span>
            </div>
            <div>
              <MetamaskButton onClick={onLogin}/>
            </div>
              
          </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default compose(
  WrapperDrizzleComponent,
  WrapperLoadingComponent,
)(LoginContainer)
