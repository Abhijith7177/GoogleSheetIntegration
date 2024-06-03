import React, { useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";

interface ModalFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
  isEditMode?: boolean;
}

const ModalForm: React.FC<ModalFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  isEditMode = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  return (
    <Modal
      title={isEditMode ? "Edit Spreadsheet" : "Create Spreadsheet"}
      centered
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="submit" type="primary" onClick={handleOk}>
          {isEditMode ? "Save" : "Create"}
        </Button>,
      ]}>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        preserve={false}>
        <Form.Item
          label="Spreadsheet Name"
          name="sheetName"
          rules={[{ required: true, message: "Please enter worksheet name" }]}>
          <Input placeholder="Enter worksheet name" />
        </Form.Item>
        <Form.Item
          label="Spreadsheet Id"
          name="sheetId"
          rules={[{ required: true, message: "Please enter spreadsheet id" }]}>
          <Input placeholder="Enter spreadsheet id" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
