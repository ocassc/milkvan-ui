import React, { useState, useEffect,useContext } from "react";
import { Col, Form, Row, Button, Input, message, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
import { PageTitle } from "../../PageTitle";
const UserRoleScreen = () => {
  const user = useContext(UserContext);
  const [roleId, setRoleId] = useState("");
  const [userRoleData, setUserRoleData] = useState([]);
  const [userRoleObj, setUserRoleObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) getUserRole();
    return () => (mounted = false);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
    },
    {
        title: "Role Id",
        dataIndex: "roleId",
        key: "roleId",
      },
    {
      title: "Company Id",
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
                readUserRole(row);
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
                removeUserRole(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getUserRole = () => {
    axiosInstance.get(`/userrole`).then((response) => {
      setUserRoleData(response.data.data);
    });
  };

  const readUserRole = (obj) => {
    axiosInstance.get(`/userrole/${obj.id}`).then((response) => {
      setUserRoleObj(response.data.data);
    });
    setIsModalOpen(true);
  };

  const onSave = () => {
    const data = {
      userId: parseInt(user.userId),
      roleId:roleId,
      companyId: 1,
    };
    axiosInstance.post(`/userrole`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };

  const removeUserRole = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/userrole/${obj.id}`).then((res) => {
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
       <Row>
      <Col span={10}>
      <PageTitle title="User Role Screen">
        </PageTitle>
        </Col>
      </Row>
      
      <div>
        <Form name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}>
          <Row gutter={5}>
            <Col span={10}>
              <Form.Item colon={false} label="Role Id">
                <Input
                  placeholder="Role Id"
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col>
              <Button type="primary" onClick={onSave}>
                Save
              </Button>
            </Col>
          </Row>
  
        </Form>
      </div>
      <div>
        <Table columns={columns} dataSource={userRoleData} />
      </div>
      <Modal
        title="User Role List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {userRoleObj.id}</li>
          <li className="list-group-item"> User Id : {userRoleObj.userId}</li>
          <li className="list-group-item"> Role Id : {userRoleObj.roleId}</li>
          <li className="list-group-item">
            {" "}
            CompanyId : {userRoleObj.companyId}
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default UserRoleScreen;
