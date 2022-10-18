import React, { useEffect, useState, useContext} from "react";
import {
  Col,
  Form,
  Row,
  Button,
  Input,
  message,
  Select,
} from "antd";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
const { Option } = Select;

const PickupAddScreen = () => {
    const user = useContext(UserContext);
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
        if (mounted) 
        getRoute();
        getCustomer();
        getVehicle();
        return () => (mounted = false);
      }, []);


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
    </div>
  )
}

export default PickupAddScreen
