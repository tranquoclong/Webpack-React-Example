import React from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";

function TableInfo({ setReview, setVisibleCreate}) {
  const listInfo = useSelector((state) => state.infoReducer.listInfo);
  const columns = [
    {
      title: "Avatar",
      dataIndex: "",
      render:  (record) =>  <img  src={
        record.avatar === "" || record.avatar === null
          ? "https://wrld-se-prod.b-cdn.net/images/user-empty.svg?width=640&height=640"
          : URL.createObjectURL(record.avatar[0].originFileObj)
      } alt="avatar" style={{width: "100px", height: "100px"}}/>,
      key: "x",
      ellipsis: true,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      align: "center",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      align: "center"
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
      align: "center"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      align: "center"
    },
    {
      title: "Hobbies",
      dataIndex: "",
      render:  (record) =>  <span>{record.hobbies === "" ? "pls update hobbies" : record.hobbies}</span>
      ,
      key: "x",
      ellipsis: true,
      align: "center"
    },
    {
      title: "Birthday",
      dataIndex: "",
      render:  (record) =>  <span>{record.birthday === "" ? "pls update birthday" : record.birthday}</span>,
      key: "x",
      ellipsis: true,
      align: "center"
    }
  ];

  return (
    <div className="info__content">
      <Table rowKey="id"
        onRow={(record, rowIndex) => ({
          onClick: (e) => {
            e.preventDefault();
            setReview({id: record.id,
              name: record.name,
              hobbies: record.hobbies,
              phone: record.phone,
              address: record.address,
              email: record.email,
              birthday: record.birthday,
              avatar: record.avatar,
              status: "update"}) ; setVisibleCreate(true);
          }
        })}
        pagination={{ pageSize: 4 }} columns={columns} dataSource={[...listInfo]}/> 
    </div>
  );
}

export default TableInfo;