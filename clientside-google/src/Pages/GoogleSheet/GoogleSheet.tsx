import React, { useState, useEffect } from "react";
import {
  Button,
  Dropdown,
  MenuProps,
  Space,
  Typography,
  notification,
} from "antd";
import { ArrowLeftOutlined, MoreOutlined } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import {
  createAccess,
  deleteAccess,
  googleAccessList,
} from "../../Redux/Actions/UserAction";
import { useDispatch } from "react-redux";

const { Title } = Typography;

const GoogleSheet: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [accessList, setAccessList] = useState<any[]>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [selectedAccessId, setSelectedAccessId] = useState(null);

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchAccessList = async () => {
    try {
      const response = await dispatch(googleAccessList());
      setAccessList(response.payload.data.access);
    } catch (error) {
      console.error("Error fetching access list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessList();
  }, []);

  const googleLogin = async (token: any) => {
    if (!token?.access_token) {
      return;
    }

    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );

      const { email } = response.data;
      const tokenCookie = Cookies.get("token");

      const putResponse = await dispatch(createAccess({ email: email }));
      console.log("🚀 ~ googleLogin ~ putResponse:", putResponse);

      fetchAccessList();

      if (putResponse.payload.status == 200) {
        notification.success({
          message: putResponse.payload.data.message,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      notification.error({
        message: "Error Occured",
      });
    }
  };

  const handleDeleteClick = async () => {
    try {
      const deleted = await dispatch(deleteAccess(selectedAccessId));
      fetchAccessList();
      if (deleted.payload.status == 200) {
        notification.success({
          message: deleted.payload.data.message,
        });
      }
    } catch (error) {
      console.error("Error deleting access:", error);
      notification.error({
        message: "Error Occured",
      });
    }
  };

  const login = useGoogleLogin({
    onSuccess: googleLogin,
  });

  const handleEmailClick = (email: string) => {
    navigate(`/integration/spreadsheet?account=${email}`);
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          onClick={handleDeleteClick}
          style={{
            fontSize: "16px",
          }}>
          Delete
        </div>
      ),
      key: "0",
    },
  ];

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}>
          <ArrowLeftOutlined
            style={{ fontSize: "24px", cursor: "pointer" }}
            onClick={handleGoBack}
          />
          <Title
            level={3}
            style={{ flexGrow: 1, textAlign: "left", marginLeft: "16px" }}>
            GoogleSheets
          </Title>
          {!loading && accessList?.length === 0 && (
            <Button
              className="googleSheet-signin-btn btnStyle"
              onClick={() => login()}
              style={{
                height: "fitContent",
                padding: "0 4px 0 0",
                alignItems: "center",
                backgroundColor: "#1976d2",
                borderRadius: "5px",
                boxShadow:
                  "0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12)",
                color: "#fff",
                display: "flex",
                gap: ".75rem",
                justifyContent: "center",
              }}>
              <img
                src="https://app.nexaflow.xyz/googleIcon.png"
                className="googleSheet-signin-icon"
                alt="google"
                style={{
                  backgroundColor: "#fff",
                  borderBottomLeftRadius: "5px",
                  borderTopLeftRadius: "5px",
                  height: "30px",
                  objectFit: "contain",
                  padding: "2px 12px",
                  width: "45px",
                  overflowClipMargin: "contentBox",
                  overflow: "clip",
                }}
              />
              Sign In with Google
            </Button>
          )}
        </div>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}>
            <Loader />
          </div>
        ) : accessList?.length > 0 ? (
          <div>
            {accessList.map(list => (
              <>
                <div
                  key={list._id}
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    justifyContent: "space-between",
                  }}>
                  <div
                    onClick={() => handleEmailClick(list._id)}
                    style={{
                      cursor: "pointer",
                      // flex: 1,
                      width: "100%",
                      textAlign: "left",
                      fontSize: "18px",
                    }}>
                    {list.email}
                  </div>
                  <div
                    onClick={() => {
                      setShowDeleteButton(!showDeleteButton);
                      setSelectedAccessId(list._id);
                    }}
                    style={{ cursor: "pointer", marginLeft: "10px" }}>
                    <Dropdown menu={{ items }} trigger={["click"]}>
                      <Space>
                        <MoreOutlined
                          style={{
                            cursor: "pointer",
                            fontSize: "30px",
                            fontWeight: "bolder",
                          }}
                        />
                      </Space>
                    </Dropdown>
                  </div>
                </div>
                <div
                  style={{
                    borderBottom: "1px solid #ccc",
                    marginTop: "10px",
                  }}></div>
              </>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: "18px", color: "#555" }}>
            No Accounts Found
          </div>
        )}
      </div>
    </>
  );
};

export default GoogleSheet;
