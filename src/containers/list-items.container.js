import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import WrapperLoadingComponent from "../components/wrapper-loading.component";

function ListItemsContainer({setLoading}) {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  useEffect(() => {
    setLoading({flag: true, title:'Loading data'})
    setTimeout(() => {
      setLoading({flag: false, title:''})
    },3000)
    
  },[])
  return (
    <div className="content">
      <i
        className="tim-icons icon-minimal-left text-info pointer"
        onClick={goBack}
      />
    </div>
  );
}

export default WrapperLoadingComponent(ListItemsContainer);