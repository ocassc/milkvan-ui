import React, { useContext, useEffect, useState } from "react";
import {
  Col,
  Form,
  Row,
  Button,
  Input,
  message,
  Table,
  Modal,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
const { Option } = Select;
const VehicleScreen = () => {
  const user= useContext(UserContext);
  const [name, setName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [vehcleType, setVehcleType] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [vehicleData, setVehicleData] = useState([]);
  const [readVehicleObj, setReadVehicleObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vechicleTypeList, setVechicleTypeList] = useState();

  useEffect(() => {
    let mounted = true;
    if (mounted) getVehicle();
    getVehicleType();
    return () => (mounted = false);
  }, []);

  const getVehicleType = () => {
    axiosInstance.get(`/vehicleType`).then((response) => {
      setVechicleTypeList(response.data.data);
    });
  };

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
      title: "RegistrationNo",
      dataIndex: "registrationNo",
      key: "registrationNo",
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

  const getVehicle = () => {
    axiosInstance.get(`/vehicle`).then((response) => {
      setVehicleData(response.data.data);
    });
  };
  const readVehicleType = (obj) => {
    axiosInstance.get(`/vehicle/${obj.id}`).then((response) => {
      setReadVehicleObj(response.data.data);
    });
    setIsModalOpen(true);
  };

  const onVehicletypeChange = (e) => {
    setVehcleType(e);
  };

  const onSave = () => {
    const data = {
      name: name,
      registrationNo: registrationNo,
      contactNumber: contactNumber,
      contactPerson: contactPerson,
      vehcleType: vehcleType,
      userId:parseInt(user.userId),
      companyId:1,
    };
    axiosInstance.post(`/vehicle`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };

  const removeVehicleType = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/vehicle/${obj.id}`).then((res) => {
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
      <div><h1>VehicleScreen</h1></div>

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
                placeholder="Nmae"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item colon={false} label="RegistrationNo">
              <Input
                placeholder="registrationNo"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item colon={false} label="Contact-Person">
              <Input
                placeholder="Contact-Person"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item colon={false} label="Contact-Number">
              <Input
                placeholder="Contact-Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item colon={false} label="Vehicle-Type">
              <Select
                placeholder="Vehicle-Type"
                value={vehcleType}
                onChange={onVehicletypeChange}
              >
                {vechicleTypeList &&
                  vechicleTypeList.map((vechicleTypeList) => (
                    <Option key={vechicleTypeList.name}>
                      {vechicleTypeList.name}
                    </Option>
                  ))}
              </Select>
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
        <Table columns={columns} dataSource={vehicleData} />
      </div>
      <Modal
        title="Role-List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readVehicleObj.id}</li>
          <li className="list-group-item"> Name: {readVehicleObj.name}</li>
          <li className="list-group-item">
            {" "}
            RegistrationNo: {readVehicleObj.registrationNo}
          </li>
          <li className="list-group-item">
            {" "}
            Person: {readVehicleObj.contactPerson}
          </li>
          <li className="list-group-item">
            {" "}
            Number: {readVehicleObj.contactNumber}
          </li>
          <li className="list-group-item">
            {" "}
            Vehicle-Type: {readVehicleObj.vehcleType}
          </li>
          <li className="list-group-item">
            {" "}
            CompanyId : {readVehicleObj.companyId}
          </li>
          <li className="list-group-item">
            {" "}
            UserId : {readVehicleObj.userId}
          </li>
         
        </ul>
      </Modal>
    </div>
  );
};

export default VehicleScreen;
