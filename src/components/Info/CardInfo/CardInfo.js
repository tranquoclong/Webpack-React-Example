import React, { useState } from "react";
import CustomerInfo from "../CustomerInfo/CustomerInfo";
import "./CardInfo.scss";
function CardInfo({ info, setReview, toggleVisible,}) {
  return (
    <>
      <div className="create-ticket__left">
        <div className="create-left__customer-info">
          <div className="customer-info__title">
            <img
              src={
                info.avatar === "" || info.avatar === null
                  ? "https://wrld-se-prod.b-cdn.net/images/user-empty.svg?width=640&height=640"
                  : URL.createObjectURL(info.avatar[0].originFileObj)
              }
              alt="Thumb"
              style={{ width: "30%" }}
            />
          </div>
          <div className="customer-info__content customer-info__content--open">
            <div className="customer-info__item customer-info__full-name">
              <span className="title">Full name: </span>
              <span className="content">{info.name}</span>
            </div>
            <div className="customer-info__item">
              <span className="title">Email: </span>
              <span className="content">{info.email}</span>
            </div>
            <div className="customer-info__item">
              <span className="title">Hobbies: </span>
              <span className="content">
                {info.hobbies === "" ? "pls update hobbies" : info.hobbies}
              </span>
            </div>
            <div className="customer-info__item">
              <span className="title">Birthday: </span>
              <span className="content">
                {info.birthday === "" ? "pls update birthday" : info.birthday}
              </span>
            </div>
            <div className="customer-info__item">
              <span className="title">Phone: </span>
              <span className="content">{info.phone}</span>
            </div>
            <div className="customer-info__item customer-info__address">
              <span className="title">Address: </span>
              <span className="content">
                {info.address === "" ? "pls update address" : info.address}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="create-ticket__right">
        <div className="create-right__customer-info">
        <CustomerInfo inputInfo={info} setInputInfo={setReview} toggleVisible={toggleVisible}/>
        </div>
      </div>
    </>
  );
}

export default CardInfo;
