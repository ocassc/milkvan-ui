import React, { useEffect, useState, useContext } from "react";
import {
  Col,
  Form,
  Row,
  Button,
  Input,
  message,
  Table,
  Modal,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
const DefaultUserSetting = () => {
  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate());
  const user = useContext(UserContext);
  const [snf, setSnf] = useState("");
  const [fat, setFat] = useState("");
  const [dateFormate, setDateFormate] = useState(defaultDate);
  const [showCompanyName, setShowCompanyName] = useState("");
  const [showUserName, setShowUserName] = useState("");
  const [deafultUser, setDefaulteUser] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readDefaultUserObj, setReadDefaultUserObj] = useState({});

  useEffect(() => {
    let mounted = true;
    if (mounted) getDefaultUser();
    return () => (mounted = false);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "SNF",
      dataIndex: "snf",
      key: "snf",
    },
    {
      title: "FAT",
      dataIndex: "fat",
      key: "fat",
    },
    {
      title: "Comapny-Name",
      dataIndex: "showCompanyName",
      key: "showCompanyName",
    },
    {
      title: "User-Name",
      dataIndex: "showUserName",
      key: "showUserName",
    },
    {
      title: "Date",
      dataIndex: "dateFormate",
      key: "dateFormate",
    },
    {
      title: "Action",
      key: "id",
      render: (row) => {
        return (
          <>
            <EyeOutlined
              onClick={() => {
                readDefaultUser(row);
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
                removeDefaultUser(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getDefaultUser = () => {
    axiosInstance.get(`/defaultUserSetting`).then((res) => {
      setDefaulteUser(res.data.data);
    });
  };
  const readDefaultUser = (obj) => {
    axiosInstance.get(`/defaultUserSetting/${obj.id}`).then((response) => {
      setReadDefaultUserObj(response.data.data);
    });
    setIsModalOpen(true);
  };
  const onSave = () => {
    const data = {
      snf: snf,
      fat: fat,
      dateFormate: dateFormate,
      showCompanyName: showCompanyName,
      showUserName: showUserName,
      userId: parseInt(user.userId),
      companyId:1
    };
    axiosInstance.post(`/defaultUserSetting`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };

  const removeDefaultUser = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/defaultUserSetting/${obj.id}`).then((res) => {
          if (res.data && res.data.responseCode === 1) {
            message.success("Record Deleted successfully");
          } else message.error("Something wrong. Please try again...!");
        });
      },
      onCancel() {},
    });
  };
  const onSetDate = (event) => {
    setDateFormate(new Date(event.target.value));
  };

  return (
    <div>
      <div><h1>Default User Setting</h1></div>
      <div>
        <Form  name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item colon={false} label="SNF">
                <Input
                  placeholder="SNF"
                  value={snf}
                  onChange={(e) => setSnf(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="FAT">
                <Input
                  placeholder="FAT"
                  value={fat}
                  onChange={(e) => setFat(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Comapny-Name">
                <Input
                  placeholder="Comapny-Name"
                  value={showCompanyName}
                  onChange={(e) => setShowCompanyName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="User-Name">
                <Input
                  placeholder="User-Name"
                  value={showUserName}
                  onChange={(e) => setShowUserName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Date">
                <Input disabled={true} value={dateFormate.toLocaleDateString("CA")} onChange={onSetDate}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={24}>
              <Button type="primary" onClick={onSave}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <Table columns={columns} dataSource={deafultUser} />
      </div>
      <Modal
        title="Role-List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readDefaultUserObj.id}</li>
          <li className="list-group-item"> SNF : {readDefaultUserObj.snf}</li>
          <li className="list-group-item"> FAT : {readDefaultUserObj.fat}</li>
          <li className="list-group-item">
            {" "}
            Comapny-Name : {readDefaultUserObj.showCompanyName}
          </li>
          <li className="list-group-item">
            {" "}
            User-Name : {readDefaultUserObj.showUserName}
          </li>
          <li className="list-group-item">
            {" "}
            Date : {readDefaultUserObj.dateFormate}
          </li>
          <li className="list-group-item">
            {" "}
            CompanyId : {readDefaultUserObj.companyId}
          </li>
          <li className="list-group-item">
            {" "}
            UserId : {readDefaultUserObj.userId}
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default DefaultUserSetting;
