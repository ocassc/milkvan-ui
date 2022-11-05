import React, { useContext, useEffect, useState } from "react";
import { Col, Form, Row, Button, Input, message, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";

const VehicleTypeScreen = () => {
  const user= useContext(UserContext)
  const [name, setName] = useState("");
  const [vehicleTypeData, setVehicleTypeData] = useState([]);
  const [readVehicleObj, setReadVehicleObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) getVehicleType();
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
              readVehicleType(row);
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
                removeVehicleType(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getVehicleType = () => {
    axiosInstance.get(`/vehicleType`).then((response) => {
      setVehicleTypeData(response.data.data);
    });
  };
  const readVehicleType=(obj)=>{
    axiosInstance.get(`/vehicleType/${obj.id}`).then((response)=>{
        setReadVehicleObj(response.data.data);
    });
    setIsModalOpen(true);
  }

  const onSave = () => {
    const data = {
      name: name,
      companyId:1,
      userId:parseInt(user.userId)
    };
    axiosInstance.post(`/vehicleType`, data).then((res) => {
        if (res.data && res.data.responseCode === -1) {
          message.error("Record Already Exists");
        } else if (res.data && res.data.responseCode === 1) {
          message.success("Record saved successfully");
        } else message.error("Something wrong. Please try again...!");
      });
  };

  const removeVehicleType=(obj)=>{
    Modal.confirm({
        title: "Do you want to remove this Member?",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk() {
          axiosInstance.delete(`/vehicleType/${obj.id}`).then((res) => {
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
      <div ><h1>Vehicle Type Screen</h1></div></Col>
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
        <Table columns={columns} dataSource={vehicleTypeData} />
      </div>
      <Modal
        title="Vehicle Type List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readVehicleObj.id}</li>
          <li className="list-group-item"> Type : {readVehicleObj.name}</li>
          <li className="list-group-item"> Company Id : {readVehicleObj.companyId}</li>
          <li className="list-group-item"> User Id : {readVehicleObj.userId}</li>
         
        </ul>
      </Modal>

    </div>
  );
};

export default VehicleTypeScreen;
