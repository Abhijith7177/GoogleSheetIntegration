import React, { useState } from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  notification,
  Typography,
  Row,
  Col,
} from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../Redux/Actions/UserAction";
import { LoginFormValues } from "../../interfaces/interface";

export default function Login() {
  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const onFinish = () => {
    dispatch(LoginUser(formValues))
      .then((data: any) => {
        if (data.payload.status === 200) {
          api.success({
            message: data.payload.data.Message,
            placement: "topRight",
            duration: 1000,
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch(() => {
        api.error({
          message: "Invalid credentials entered",
          placement: "topRight",
        });
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <>
      {contextHolder}
      <div className="login-container">
        <div className="login-img-container">
          <img
            src="https://app.nexaflow.xyz/logo.png"
            className="auth-login-logo"
            alt="logo"
          />
          <img
            src="https://app.nexaflow.xyz/loginIllustration.png"
            className="login-illustration-img"
            alt="illustration"
          />
        </div>
        <div className="login-content-container">
          <div className="title">Login</div>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              className="login-field-email"
              name="email"
              // label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email",
                },
              ]}>
              <Input
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                placeholder="Enter the email"
                className="custom-input custom-border-bottom"
                autoComplete="off"
              />
            </Form.Item>
            <div className="field-divider"></div>
            <Form.Item
              name="password"
              // label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter your password",
                },
              ]}>
              <Input.Password
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
                placeholder="Enter the Password"
                className="custom-input custom-border-top"
              />
            </Form.Item>
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                justifyContent: "space-between",
              }}>
              <Link to="/register"> Don't have an account?</Link>{" "}
              <Typography>Forgot Password</Typography>
            </div>{" "}
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
          <Row
            justify="center"
            align="middle"
            style={{ width: "100%", flexDirection: "column", gap: "10px" }}>
            <Col>
              <Typography>— or login with —</Typography>
            </Col>
            <Col>
              <a href="http://localhost:9000/auth/google">
                <img
                  src="https://app.nexaflow.xyz/googleIcon.png"
                  className="google-login-img"
                  alt="google"
                  style={{
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                />
              </a>
            </Col>
          </Row>
        </div>
        <img
          src="https://app.nexaflow.xyz/wave.png"
          className="login-wave-img"
          alt="wave"></img>
      </div>
    </>
  );
}
