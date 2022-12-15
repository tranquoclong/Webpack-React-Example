import React from "react";
import { Form, Input, Row, Col, Button, message, Popconfirm } from "antd";
import CustomUpload from "../../CustomUpload/CustomUpload";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { SET_INFO_DATA } from "../../../store/constants/Info.constant";
function CustomerInfo({ inputInfo, setInputInfo, toggleVisible }) {
  const dispatch = useDispatch();
  const listInfo = useSelector((state) => state.infoReducer.listInfo);
  const [form] = Form.useForm();
  const fieldValidation = [
    {
      type: "text",
      name: "name",
      rules: ["required"],
    },
    {
      type: "text",
      name: "email",
      rules: ["required", "email"],
    },
    {
      type: "text",
      name: "hobbies",
      rules: [],
    },
    {
      type: "text",
      name: "phone",
      rules: ["required", "phone"],
    },
    {
      type: "text",
      name: "address",
      rules: [],
    },
    {
      type: "text",
      name: "birthday",
      rules: [],
    },
    {
      type: "upload",
      name: "avatar",
      rules: [],
    },
  ];
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const validatePhone = (phone) => {
    const re = /^\d{9}$/g;
    return re.test(parseInt(phone, 10));
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setInputInfo({
      ...inputInfo,
      [name]: value,
    });
  };
  const handleChangeAvatar = (info) => {
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    setInputInfo({
      ...inputInfo,
      avatar: info.fileList.length > 0 ? fileList : "",
    });
  };

  const handleChangeNumber = (e) => {
    const isInteger = /^[0-9]+$/;
    if (e.target.value === "" || isInteger.test(parseInt(e.target.value, 10))) {
      if (parseInt(inputInfo.phone, 10) !== parseInt(e.target.value, 10)) {
        setInputInfo({ ...inputInfo, phone: e.target.value });
      }
    }
  };
  const submitForm = async () => {
    const data = {};
    const validationResults = [];
    fieldValidation.map((field) => {
      let fieldData =
        field.type === "upload" ? inputInfo.avatar : inputInfo[field.name];
      if (field.name === "birthday" && inputInfo.birthday !== "") {
        fieldData = moment(Date.parse(fieldData)).format("Y-M-D HH:mm:ss");
      }
      data[field.name] = fieldData;
      if (field.rules.includes("required")) {
        field.type === "upload"
          ? validationResults.push(fieldData !== undefined)
          : validationResults.push(fieldData !== "");
      } else {
        validationResults.push(true);
      }
      if (field.rules.includes("email")) {
        if (!validateEmail(fieldData)) {
          validationResults.push("email");
        }
      }
      if (field.rules.includes("phone")) {
        if (!validatePhone(fieldData)) {
          validationResults.push("phone");
        }
      }
    });

    if (validationResults.includes(false)) {
      message.error("Please fill in all required fields!");
    } else if (validationResults.includes("email")) {
      message.error("Please recheck Email field!");
    } else if (validationResults.includes("phone")) {
      message.error("Please recheck phone field!");
    } else {
      message.success("Created new Ticket");
      if (inputInfo.status === "save") {
        dispatch({
          type: SET_INFO_DATA,
          payload: [
            ...listInfo,
            { ...data, id: Math.floor(Math.random() * 10000) },
          ],
        });
        form.resetFields();
        setInputInfo({
          id: "",
          name: "",
          hobbies: "",
          phone: "",
          address: "",
          email: "",
          birthday: "",
          avatar: "",
          status: "save",
        });
      } else {
        let indexUpdate = "";
        indexUpdate = listInfo.findIndex((info) => info.id === inputInfo.id);
        listInfo[indexUpdate] = { ...data, id: inputInfo.id};
        dispatch({
          type: SET_INFO_DATA,
          payload: listInfo
        });
        toggleVisible(false);
      }
    }
  };

  const confirm = (id) => {
    dispatch({
      type: SET_INFO_DATA,
      payload: listInfo.filter((info) => info.id !== id),
    });
    toggleVisible(false);
    message.success("Click on Yes");
  };
  const cancel = () => {
    message.error("Click on No");
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6, offset: 0 }}
      labelAlign="left"
      id="myForm"
    >
      <div className="info__content">
        <div className="create-info__right" style={{ paddingTop: "30px" }}>
          <div className="create-right__info">
            <CustomUpload
              handleChangeAvatar={handleChangeAvatar}
              inputInfo={inputInfo}
            />
          </div>
        </div>
        <div className="create-info__left" style={{ paddingTop: "40px" }}>
          <div className="create-left__first-info">
            <div className="create-ticket-form-group">
              <Row gutter={[20, 0]}>
                <Col span={12}>
                  <Form.Item label="Name" required>
                    <Input
                      name="name"
                      value={inputInfo.name}
                      onChange={handleChange}
                      placeholder="Name"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" required>
                    <Input
                      name="email"
                      value={inputInfo.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[20, 0]}>
                <Col span={12}>
                  <Form.Item label="Hobbies">
                    <Input
                      name="hobbies"
                      value={inputInfo.hobbies}
                      onChange={handleChange}
                      placeholder="Hobbies"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone" required>
                    <Input
                      name="phone"
                      value={inputInfo.phone}
                      onChange={handleChangeNumber}
                      placeholder="Phone"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[20, 0]}>
                <Col span={12}>
                  <Form.Item label="Address">
                    <Input
                      name="address"
                      value={inputInfo.address}
                      onChange={handleChange}
                      placeholder="Address"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Birthday">
                    <Input
                      name="birthday"
                      value={inputInfo.birthday}
                      onChange={handleChange}
                      type="datetime-local"
                      allowClear
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div style={{ display: "flex", justifyContent: "end"}}>
                {inputInfo.status !== "save" && (
                  <Popconfirm
                    className="closeButton"
                    title="Are you sure to delete this info?"
                    placement="topRight"
                    onConfirm={() => confirm(inputInfo.id)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    Delete
                  </Popconfirm>
                )}
                <Button
                  onClick={() => submitForm()}
                  type="primary"
                  className="confirmButton"
                  style={{ width: "20%", height: "40px", marginLeft:"10px" }}
                >
                  {inputInfo.status === "save" ? "Create info" : "Update info"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default CustomerInfo;
