import React, { useState, useEffect } from "react";
import { Col, Form, Row, Button, Input, message, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";

const UserRoleScreen = () => {
  const [userId, setUserId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [companyId, setCompanyId] = useState("");
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
      title: "UserId",
      dataIndex: "userId",
      key: "userId",
    },
    {
        title: "RoleId",
        dataIndex: "roleId",
        key: "roleId",
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
      userId: userId,
      roleId:roleId,
      companyId: companyId,
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
      <div>UserRoleScreen</div>
      <div>
        <Form>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item colon={false} label="UserId">
                <Input
                  placeholder="UserId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Role-Id">
                <Input
                  placeholder="Role-Id"
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
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
        <Table columns={columns} dataSource={userRoleData} />
      </div>
      <Modal
        title="Role-List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {userRoleObj.id}</li>
          <li className="list-group-item"> User-Id : {userRoleObj.userId}</li>
          <li className="list-group-item"> Role-Id : {userRoleObj.roleId}</li>
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
