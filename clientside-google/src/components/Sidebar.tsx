import React from "react";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  InteractionOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = props => {
  const location = useLocation();

  return (
    <Sider width={200} style={{ backgroundColor: "#90a0d0" }}>
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <img
          src="https://app.nexaflow.xyz/logo.png"
          alt="Logo"
          style={{ width: "100%", maxWidth: 200, marginBottom: 20 }}
        />
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{
          borderRight: 0,
          backgroundColor: "#90a0d0",
          fontSize: "16px",
        }}>
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/settings" icon={<SettingOutlined />}>
          <Link to="/settings">Settings</Link>
        </Menu.Item>
        <Menu.Item key="/integration" icon={<InteractionOutlined />}>
          <Link to="/integration">Integration</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
