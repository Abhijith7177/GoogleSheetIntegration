import React, { useState } from "react";
import { Input, Button, Typography, notification } from "antd";
import {
  EyeTwoTone,
  EyeInvisibleOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { Axios } from "../../ServerConfig/Axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { generateAccessToken } from "../../Redux/Actions/UserAction";
const { Title, Text } = Typography;

const Settings: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const dispatch = useDispatch<any>();

  const handleGenerate = async () => {
    try {
      const tokenCookie = Cookies.get("token");

      const response = await dispatch(generateAccessToken());

      const newToken = response.payload.data.token;
      setToken(newToken);
      notification.success({
        message: "Token Generated",
        description: "A new access token has been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating token:", error);
      notification.error({
        message: "Error",
        description: "Failed to generate access token.",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    notification.success({
      message: "Token Copied",
      description: "Access token has been copied to clipboard.",
    });
  };

  return (
    <div className="access-token-container">
      <Title style={{ fontSize: "1.5em" }} level={3}>
        Access Token
      </Title>
      <Text style={{ color: "#8d919f", fontSize: "14px" }}>
        To access our API, generate a unique key by clicking the "Generate"
        button. If you ever suspect that your key has been compromised, you can
        generate a new key, which will automatically revoke the old one.
      </Text>
      <Input.Password
        value={token}
        iconRender={visible =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        style={{ marginTop: 16, marginBottom: 16 }}
        addonAfter={
          <CopyOutlined onClick={handleCopy} style={{ cursor: "pointer" }} />
        }
        visibilityToggle
        readOnly
      />
      <div style={{ width: "100%" }}>
        <Button
          type="primary"
          size="small"
          onClick={handleGenerate}
          style={{ width: "10%", marginInline: "auto" }}>
          Generate
        </Button>
      </div>
    </div>
  );
};

export default Settings;
