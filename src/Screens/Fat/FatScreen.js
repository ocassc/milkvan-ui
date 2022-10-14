import { Col, Form, Row, Button, Input, message, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

const FatScreen = () => {
  const [value, setValue] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [fatData, setFatData] = useState([]);
  const [readFatObj, setReadFatObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) getFat();
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
                  readFat(row);
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
                  removeFat(row);
                }}
              />
            </>
          );
        },
      },
  ];

  const getFat = () => {
    axiosInstance.get(`/fat`).then((response) => {
      setFatData(response.data.data);
    });
  };
  const readFat = (obj) => {
    axiosInstance.get(`/fat/${obj.id}`).then((response) => {
      setReadFatObj(response.data.data);
    });
    setIsModalOpen(true);
  };
  const onSave = () => {
    const data = {
      value: value,
      companyId: companyId,
    };
    axiosInstance.post(`/fat`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };
  const removeFat = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/fat/${obj.id}`).then((res) => {
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
      <div>FatScreen</div>
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
            <Col span={12}>
              <Form.Item colon={false} label="Company-Id">
                <Input
                  placeholder="Company-Id"
                  value={companyId}
                  onChange={(e) => setCompanyId(e.target.value)}
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
        <Table columns={columns} dataSource={fatData} />
      </div>
      <Modal
        title="Fat-List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readFatObj.id}</li>
          <li className="list-group-item"> Value : {readFatObj.value}</li>
          <li className="list-group-item"> CompanyId : {readFatObj.companyId}</li>
         
        </ul>
      </Modal>
    </div>
  );
};

export default FatScreen;
