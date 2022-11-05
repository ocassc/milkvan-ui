import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row, Button, Input, message, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";

const RouteScreen = () => {
  const user = useContext(UserContext);
    const [name, setName] = useState("");
  const [routeData, setRouteData] = useState([]);
  const [readRouteObj, setReadRouteObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) getRoute();
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
              readRoute(row);
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
                removeRoute(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getRoute = () => {
    axiosInstance.get(`/route`).then((response) => {
      setRouteData(response.data.data);
    });
  };
  const readRoute=(obj)=>{
    axiosInstance.get(`/route/${obj.id}`).then((response)=>{
        setReadRouteObj(response.data.data);
    });
    setIsModalOpen(true);
  }

  const onSave = () => {
    const data = {
      name: name,
      companyId:1,
      userId: parseInt(user.userId)
    };
    axiosInstance.post(`/route`, data).then((res) => {
        if (res.data && res.data.responseCode === -1) {
          message.error("Record Already Exists");
        } else if (res.data && res.data.responseCode === 1) {
          message.success("Record saved successfully");
        } else message.error("Something wrong. Please try again...!");
      });
  };

  const removeRoute=(obj)=>{
    Modal.confirm({
        title: "Do you want to remove this Member?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          axiosInstance.delete(`/route/${obj.id}`).then((res) => {
            if (res.data && res.data.responseCode === 1) {
              message.success("Record Deleted successfully");
            } else message.error("Something wrong. Please try again...!");
          });
        },
        onCancel() {},
      });
  }
  return (
    <div>
       
      <Row >
      <Col span={5}>
      <div ><h1>Route Screen</h1></div></Col>
      </Row>
   
    <div>
        <Form name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 16,
            }}>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item colon={false} label="Name">
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
        <Table columns={columns} dataSource={routeData} />
      </div>
      <Modal
        title="Route List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readRouteObj.id}</li>
          <li className="list-group-item"> Type : {readRouteObj.name}</li>
          <li className="list-group-item"> Company Id : {readRouteObj.companyId}</li>
          <li className="list-group-item"> User Id : {readRouteObj.userId}</li>
         
        </ul>
      </Modal>
    </div>
  )
}

export default RouteScreen