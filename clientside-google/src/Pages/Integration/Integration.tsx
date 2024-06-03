import React from "react";
import { Row, Col, Typography } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

export default function Integration() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/integration/google-sheet");
  };

  return (
    <div>
      <Title level={3}>Integration</Title>

      <div onClick={handleClick} style={{ cursor: "pointer" }}>
        <Row
          justify="start"
          align="middle"
          style={{ marginBottom: "10px", gap: "0.75rem" }}>
          <Col>
            <img
              src="https://app.nexaflow.xyz/googlesheets-logo.png"
              width="32px"
              height="48px"
              alt=""
            />
          </Col>
          <Col flex="auto">
            <Text strong style={{ fontSize: "18px" }}>
              Google Sheet
            </Text>
          </Col>
        </Row>
      </div>
      <div style={{ borderBottom: "1px solid #ccc", marginTop: "10px" }}></div>
    </div>
  );
}
