import React from "react";
import { Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./CustomUpload.scss";

function CustomUpload({ handleChangeAvatar, inputInfo }) {
  return (
    <Form.Item valuePropName="fileList">
      <Upload
        name="upload"
        listType="picture-card"
        className="upload"
        fileList={inputInfo.avatar}
        onChange={handleChangeAvatar}
      >
        {inputInfo.avatar === "" ? (
          <>
            <img
              src="https://wrld-se-prod.b-cdn.net/images/user-empty.svg?width=640&height=640"
              alt="avatarDefault"
              style={{ width: "100%" }}
            />
          </>
        ) : (
          <UploadOutlined />
        )}
      </Upload>
    </Form.Item>
  );
}

export default CustomUpload;
