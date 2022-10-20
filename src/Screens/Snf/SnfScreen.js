import { Col, Form, Row, Button, Input, message, Table, Modal } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";

const SnfScreen = () => {
  const user=useContext(UserContext)
  const [value, setValue] = useState("");
  const [snfData, setSnfData] = useState([]);
  const [readSnfObj, setReadSnfObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    let mounted = true;
    if (mounted) getSnf();
    return () => (mounted = false);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "CompanyId",
      dataIndex: "companyId",
      key: "companyId",
    },
    {
      title: "Action",
      key: "id",
      render: (row) => {
        return (
          <>
            <EyeOutlined
              onClick={() => {
                readSnf(row);
              }}
            />
            <EditOutlined
              style={{ marginLeft: 12 }}
              // onClick={() => {
              //   modify(row);
              // }}
            />
            <DeleteOutlined
              style={{ color: "red", marginLeft: 12 }}
              onClick={() => {
                removeSnf(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getSnf = () => {
    axiosInstance.get(`/snf`).then((response) => {
      setSnfData(response.data.data);
    });
  };

  const readSnf = (obj) => {
    axiosInstance.get(`/snf/${obj.id}`).then((response) => {
      setReadSnfObj(response.data.data);
    });
    setIsModalOpen(true);
  };
  const onSave = () => {
    const data = {
      value: value,
      companyId: 1,
      userId:parseInt(user.userId)
    };
    axiosInstance.post(`/snf`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };

  const removeSnf = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/snf/${obj.id}`).then((res) => {
          if (res.data && res.data.responseCode === 1) {
            message.success("Record Deleted successfully");
          } else message.error("Something wrong. Please try again...!");
        });
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <div>SnfScreen</div>
      <div>
        <Form>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item colon={false} label="Value">
                <Input
                  placeholder="Value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              </Form.Item>
            </Col>
           
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Button type="primary" onClick={onSave}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <Table columns={columns} dataSource={snfData} />
      </div>
      
      <Modal
        title="SNF-List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readSnfObj.id}</li>
          <li className="list-group-item"> Value : {readSnfObj.value}</li>
          <li className="list-group-item"> CompanyId : {readSnfObj.companyId}</li>
          <li className="list-group-item"> UserId : {readSnfObj.userId}</li>
         
        </ul>
      </Modal>
    </div>
  );
};

export default SnfScreen;
