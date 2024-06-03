import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Tooltip,
  Space,
  Dropdown,
  MenuProps,
  notification,
} from "antd";
import {
  ArrowLeftOutlined,
  CopyOutlined,
  InfoCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Axios } from "../../ServerConfig/Axios";
import Loader from "../../components/Loader";
import ModalForm from "./ModalForm";
import { useDispatch } from "react-redux";
import {
  allSheets,
  createSheet,
  deleteSheet,
} from "../../Redux/Actions/UserAction";

const { Title } = Typography;

const Spreadsheet: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [accessList, setAccessList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAccess, setSelectedAccess] = useState<any>(null);

  const handleCreate = async (values: any) => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const account = urlParams.get("account");
      const requestData = {
        ...values,
        accessId: account,
      };
      const tokenCookie = Cookies.get("token");

      const createdSheet = await dispatch(createSheet(requestData));

      if (createdSheet.payload.data.success) {
        fetchAccessList();
        setModalVisible(false);
        notification.success({
          message: createdSheet.payload.data.message,
        });
      } else {
        console.error(
          "Failed to create sheet:",
          createdSheet.payload.data.error
        );
      }
    } catch (error) {
      console.error("Error creating sheet:", error);
    }
  };

  const handleEdit = async (values: any) => {
    try {
      const tokenCookie = Cookies.get("token");

      const response = await Axios.put(
        `/access/edit?id=${selectedAccess._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${tokenCookie}`,
          },
        }
      );
      if (response.data.success) {
        fetchAccessList();
        setModalVisible(false);
        notification.success({
          message: response.data.message,
        });
      } else {
        console.error("Failed to edit sheet:", response.data.error);
      }
    } catch (error) {
      console.error("Error editing sheet:", error);
    }
  };

  const fetchAccessList = async () => {
    try {
      const tokenCookie = Cookies.get("token");
      const urlParams = new URLSearchParams(window.location.search);
      const account = urlParams.get("account");

      const fetchAllSheets = await dispatch(allSheets(account));
      setAccessList(fetchAllSheets.payload.data.sheet);
    } catch (error) {
      console.error("Error fetching access list:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessList();
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDeleteClick = async () => {
    try {
      const tokenCookie = Cookies.get("token");

      const deletedSheet = await dispatch(deleteSheet(selectedAccess._id));

      fetchAccessList();
    } catch (error) {
      console.error("Error deleting access:", error);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div
          onClick={() => {
            setIsEditMode(true);
            setModalVisible(true);
          }}
          style={{
            fontSize: "16px",
          }}>
          Edit
        </div>
      ),
      key: "0",
    },
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
      key: "1",
    },
  ];

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    notification.success({
      message: "Sheet Id Copied",
      description: "Sheet Id has been copied to clipboard.",
    });
  };

  return (
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
          Spreadsheets
        </Title>

        <Button
          className="googleSheet-signin-btn btnStyle"
          onClick={() => {
            setIsEditMode(false);
            setModalVisible(true);
            setSelectedAccess(null);
          }}
          style={{
            height: "fitContent",
            padding: "6px 12px",
            alignItems: "center",
            backgroundColor: "#1976d2",
            borderRadius: "5px",
            boxShadow:
              "0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12)",
            color: "#fff",
            display: "flex",
            gap: ".75rem",
            justifyContent: "center",
            fontSize: "16px",
          }}>
          + Add Spreadsheet
        </Button>
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
            <div style={{ marginTop: "40px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                key={list._id}>
                <div style={{ display: "flex", gap: "5px" }}>
                  <div
                    key={list._id}
                    style={{ cursor: "pointer", fontSize: "18px" }}>
                    {list.sheetName}
                  </div>
                  <Tooltip
                    title={
                      <div>
                        <span>Sheet ID: {list._id}</span>
                        <CopyOutlined
                          onClick={() => handleCopy(list._id)}
                          style={{
                            cursor: "pointer",
                            marginLeft: "8px",
                            fontSize: "20px",
                          }}
                        />
                      </div>
                    }>
                    <InfoCircleOutlined
                      style={{ fontSize: "20px", marginRight: "8px" }}
                    />
                  </Tooltip>
                </div>
                <div
                  onClick={() => {
                    setSelectedAccess(list);
                  }}
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    fontSize: "18px",
                  }}>
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
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}>
          <div style={{ fontSize: "18px", color: "#555" }}>
            Spreadsheets not Found
          </div>
        </div>
      )}
      <ModalForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={isEditMode ? handleEdit : handleCreate}
        initialValues={isEditMode && selectedAccess ? selectedAccess : {}}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default Spreadsheet;
