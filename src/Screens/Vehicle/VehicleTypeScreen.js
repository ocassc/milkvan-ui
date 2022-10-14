import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button, Input, message, Table, Modal } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";

const VehicleTypeScreen = () => {
  const [name, setName] = useState("");
  const [companyId, setCompanyId] = useState("");
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
      companyId: companyId,
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
      <div>VehicleTypeScreen</div>
      <div>
        <Form>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item colon={false} label="Name">
              <Input
                placeholder="Nmae"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
        <Table columns={columns} dataSource={vehicleTypeData} />
      </div>
      <Modal
        title="Role-List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readVehicleObj.id}</li>
          <li className="list-group-item"> Type : {readVehicleObj.name}</li>
          <li className="list-group-item"> CompanyId : {readVehicleObj.companyId}</li>
         
        </ul>
      </Modal>

    </div>
  );
};

export default VehicleTypeScreen;
