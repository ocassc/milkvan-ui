import React, { useEffect, useState, useContext} from "react";
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
const VehicleService = () => {

  const user = useContext(UserContext);

  const [vehicleService, setVehicleService] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readVehicleServiceObj, setReadVehicleServiceObj] = useState({});
  const [routeList, setRouteList] = useState("");
  const [customerList, setCustomerList] = useState("");
  const [vehicleList, setVehicleList] = useState("");
  const [milkType, setMilkType] = useState("");
  const [vehicleShift, setVehicleShift] = useState("");
  const [uom, setUom] = useState("");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState("");
  const [fat, setFat] = useState("");
  const [snf, setSnf] = useState("");
  const [routeId, setRouteId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  useEffect(() => {
    let mounted = true;
    if (mounted) getVehicleService();
    getRoute();
    getCustomer();
    getVehicle();
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
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },

    {
      title: "MilkType",
      dataIndex: "milkType",
      key: "milkType",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Action",
      key: "id",
      render: (row) => {
        return (
          <>
            <EyeOutlined
              onClick={() => {
                readVehicleService(row);
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
                removeVehicleService(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getVehicleService = () => {
    axiosInstance.get(`/vehicleService`).then((res) => {
      setVehicleService(res.data.data);
    });
  };

  const getRoute = () => {
    axiosInstance.get(`/route`).then((res) => {
      setRouteList(res.data.data);
    });
  };
  const getCustomer = () => {
    axiosInstance.get(`/customer`).then((res) => {
      setCustomerList(res.data.data);
    });
  };
  const getVehicle = () => {
    axiosInstance.get(`/vehicle`).then((res) => {
      setVehicleList(res.data.data);
    });
  };
  const readVehicleService = (obj) => {
    axiosInstance.get(`/vehicleService/${obj.id}`).then((response) => {
      setReadVehicleServiceObj(response.data.data);
    });
    setIsModalOpen(true);
  };

  const onSave = () => {
    const data = {
      fat: fat,
      snf: snf,
      rate: rate,
      amount: amount,
      uom: uom,
      milkType: milkType,
      vehicleShift: vehicleShift,
      date: date,
      routeId: routeId,
      customerId: customerId,
      vehicleId: vehicleId,
      userId: parseInt(user.userId),
    };
    axiosInstance.post(`/vehicleService`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };

  const removeVehicleService = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/vehicleService/${obj.id}`).then((res) => {
          if (res.data && res.data.responseCode === 1) {
            message.success("Record Deleted successfully");
          } else message.error("Something wrong. Please try again...!");
        });
      },
      onCancel() {},
    });
  };

  const onRouteChange = (e) => {
    setRouteId(e);
  };
  const onCustomeridChange = (e) => {
    setCustomerId(e);
  };
  const onVehicleidChange = (e) => {
    setVehicleId(e);
  };
  return (
    <div>
      <div>VehicleService</div>
      <div>
        <Form>
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
              <Form.Item colon={false} label="Rate">
                <Input
                  placeholder="Rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Amount">
                <Input
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Umo">
                <Input
                  placeholder="Umo"
                  value={uom}
                  onChange={(e) => setUom(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Date">
                <Input
                  placeholder="Date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Milk-Type">
                <Input
                  placeholder="Milk-Type"
                  value={milkType}
                  onChange={(e) => setMilkType(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Vehicle-Shift">
                <Input
                  placeholder="Vehicle-Shift"
                  value={vehicleShift}
                  onChange={(e) => setVehicleShift(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item colon={false} label="Route-Id">
                <Select
                  placeholder="Route-Id"
                  value={routeId}
                  onChange={onRouteChange}
                >
                  {routeList &&
                    routeList.map((routeList) => (
                      <Option key={routeList.id}>{routeList.id}</Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Vehicle-Id">
                <Select
                  placeholder="Vehicle-Id"
                  value={vehicleId}
                  onChange={onVehicleidChange}
                >
                  {vehicleList &&
                    routeList.map((vehicleList) => (
                      <Option key={vehicleList.id}>{vehicleList.id}</Option>
                    ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label=" Customer-Id">
                <Select
                  placeholder=" Customer-Id"
                  value={customerId}
                  onChange={onCustomeridChange}
                >
                  {customerList &&
                    customerList.map((customerList) => (
                      <Option key={customerList.id}>{customerList.id}</Option>
                    ))}
                </Select>
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
        <Table columns={columns} dataSource={vehicleService} />
      </div>
      <Modal
        title="Role-List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readVehicleServiceObj.id}</li>
          <li className="list-group-item">
            {" "}
            User-ID : {readVehicleServiceObj.userId}
          </li>
          <li className="list-group-item">
            {" "}
            Route-Id : {readVehicleServiceObj.routeId}
          </li>
          <li className="list-group-item">
            {" "}
            Vehicle-Id : {readVehicleServiceObj.vehicleId}
          </li>
          <li className="list-group-item">
            {" "}
            Customer-Id : {readVehicleServiceObj.customerId}
          </li>
          <li className="list-group-item">
            {" "}
            SNF : {readVehicleServiceObj.snf}
          </li>
          <li className="list-group-item">
            {" "}
            FAT : {readVehicleServiceObj.fat}
          </li>
          <li className="list-group-item">
            {" "}
            Rate : {readVehicleServiceObj.rate}
          </li>
          <li className="list-group-item">
            {" "}
            Amount : {readVehicleServiceObj.amount}
          </li>
          <li className="list-group-item">
            {" "}
            UMO : {readVehicleServiceObj.uom}
          </li>
          <li className="list-group-item">
            {" "}
            Milk-Type : {readVehicleServiceObj.milkType}
          </li>
          <li className="list-group-item">
            {" "}
            Vehicle-Shif : {readVehicleServiceObj.vehicleShift}
          </li>

          <li className="list-group-item">
            {" "}
            Date : {readVehicleServiceObj.date}
          </li>
          <li className="list-group-item">
            CompanyId : {readVehicleServiceObj.companyId}
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default VehicleService;
