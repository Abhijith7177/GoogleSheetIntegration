import React, { useState } from "react";
import {
  Form,
  Input,
  Checkbox,
  Button,
  notification,
  Row,
  Col,
  Typography,
} from "antd";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../Redux/Actions/UserAction";
import { RegisterFormValues } from "../../interfaces/interface";

export default function Register() {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<RegisterFormValues>({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const onFinish = () => {
    dispatch(RegisterUser(formValues))
      .then((data: any) => {
        if (data.payload.status === 201) {
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
      <div className="register-page">
        <div className="register-container">
          <img
            src="https://app.nexaflow.xyz/logo.png"
            className="auth-register-logo"
            alt="logo"
          />
          <div className="register-description-container">
            <p className="register-description">
              Welcome to xyz<br></br>
              <br></br>
              Bring Your Customise website to life in rocket speed
            </p>
          </div>
          <div className="register-content-container">
            <div className="register-field-container">
              <div className="title">Register</div>
              <Form name="register-form" layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="username"
                  className="register-field-name"
                  // label="Username"
                  rules={[
                    { required: true, message: "Please enter your username" },
                  ]}>
                  <Input
                    name="username"
                    value={formValues.username}
                    onChange={handleInputChange}
                    placeholder="Enter the username"
                    className="custom-input custom-border-bottom"
                  />
                </Form.Item>
                <div className="field-divider"></div>
                <Form.Item
                  name="email"
                  // label="Email"
                  className="register-field-email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                  ]}>
                  <Input
                    name="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="custom-input custom-border-top"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  // label="Password"
                  className="register-field-password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}>
                  <Input.Password
                    name="password"
                    value={formValues.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="custom-input custom-border-bottom"
                  />
                </Form.Item>
                <div className="field-divider"></div>
                <Form.Item
                  name="confirm_password"
                  // label="Confirm Password"
                  rules={[
                    { required: true, message: "Please confirm your password" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("The two passwords do not match");
                      },
                    }),
                  ]}>
                  <Input.Password
                    name="confirm_password"
                    value={formValues.confirm_password}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="custom-input custom-border-top"
                  />
                </Form.Item>
                {/* <div style={{ marginTop: "1rem" }}>
                  <Link to="/login"> Already have an Account?</Link>{" "}
                </div>{" "} */}

                <div className="register-checkbox-container">
                  <section>
                    <label className="ant-checkbox-wrapper css-1vtf12y">
                      <span className="ant-checkbox css-1vtf12y">
                        <input className="ant-checkbox-input" type="checkbox" />
                        <span className="ant-checkbox-inner"></span>
                      </span>
                      <span></span>
                    </label>
                    <p className="termsCondition-text">
                      I agree to the{" "}
                      <a target="_blank">Terms &amp; Condition</a>
                    </p>
                  </section>
                  <Link to="/login"> Already have an Account?</Link>{" "}
                </div>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form>
              <Row
                justify="center"
                align="middle"
                style={{ width: "100%", flexDirection: "column", gap: "10px" }}>
                <Col>
                  <Typography>— or register with —</Typography>
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
          </div>
        </div>
        <img
          src="https://app.nexaflow.xyz/wave.png"
          className="login-wave-img"
          alt="wave"></img>
      </div>
    </>
  );
}
