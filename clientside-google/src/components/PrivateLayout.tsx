import React from "react";
import Sidebar from "./Sidebar";
import { IRouterParams } from "../interfaces/interface";
import { Button, Layout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";

const { Content } = Layout;

const PrivateLayout: React.FC<IRouterParams> = ({ children }) => {
  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "transparent" }}>
      <Sidebar />
      <Layout>
        <Content
          style={{
            padding: "100px",
          }}>
          {children}
          <Button
            type="link"
            onClick={handleLogout}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              fontSize: "16px",
            }}>
            <LogoutOutlined /> Logout
          </Button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
