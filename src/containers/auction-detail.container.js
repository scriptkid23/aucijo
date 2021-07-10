import React from "react";
import { useHistory } from "react-router-dom";

export default function AcutionDetail() {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="content">
      <i
        className="tim-icons icon-minimal-left text-info pointer"
        onClick={goBack}
      />
    </div>
  );
}
