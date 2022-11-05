import { Col, Form, Row, Button, Input, message, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
import { PageTitle } from "../../PageTitle";

const RoleScreen = () => {
  const user =useContext(UserContext)
  const [name, setName] = useState("");
  
  const [roleData, setRoleData] = useState([]);
  const [readRoleObj, setReadRoleObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) getRole();
    return () => (mounted = false);
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
              readRole(row);
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
                removeRole(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getRole = () => {
    axiosInstance.get(`/role`).then((response) => {
      setRoleData(response.data.data);
    });
  };

  const readRole = (obj) => {
    axiosInstance.get(`/role/${obj.id}`).then((response) => {
      setReadRoleObj(response.data.data);
    });
    setIsModalOpen(true);
  };

  const onSave = () => {
    const data = {
      name: name,
      userId:parseInt(user.userId),
      companyId: 1,
    };
    axiosInstance.post(`/role`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };

  const removeRole = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/role/${obj.id}`).then((res) => {
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
      <PageTitle title="Fat Screen">
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
            <Form.Item colon={false} label="Name">
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
        <Table columns={columns} dataSource={roleData} />
      </div>
      <Modal
        title="Role-List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readRoleObj.id}</li>
          <li className="list-group-item"> Value : {readRoleObj.name}</li>
          <li className="list-group-item"> UserId : {readRoleObj.userId}</li>
          <li className="list-group-item"> CompanyId : {readRoleObj.companyId}</li>
         
        </ul>
      </Modal>
    </div>
  );
};

export default RoleScreen;
