import React, { useState } from "react";
import "./Info.scss";
import TableInfo from "./TableInfo/TableInfo";
import ModalInfo from "./ModalInfo/ModalInfo";
import CustomerInfo from "./CustomerInfo/CustomerInfo";

function Info() {
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [review, setReview] = useState(null);
  const [inputInfo, setInputInfo] = useState({
    id:"",
    name: "",
    hobbies: "",
    phone: "",
    address: "",
    email: "",
    birthday: "",
    avatar: "",
    status: "save"
  });


  return (
    <div className="create-info-container">
      <div className="info__board-item">
        <div className="info__title">Info</div>
        <CustomerInfo inputInfo={inputInfo} setInputInfo={setInputInfo}/> 
      </div>
      <div className="info__board-item">
        <div className="info__title">Tech Status</div>
        <TableInfo setReview={setReview} setVisibleCreate={setVisibleCreate}/>
      </div>
      {review && <ModalInfo toggleVisible={(e) => setVisibleCreate(e)}
        visible={visibleCreate} info={review} setReview={setReview}/>}
    </div>
  );
}

export default Info;
