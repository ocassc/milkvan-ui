import React, { useEffect, useState, useContext } from "react";
import { Col, Form, Row, Button, Input, message, Select } from "antd";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
const { Option } = Select;

const PickupAddScreen = () => {
  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate());
  defaultDate.setTime(defaultDate.getTime());
  const user = useContext(UserContext);
  const [routeList, setRouteList] = useState("");
  const [customerList, setCustomerList] = useState("");
  const [vehicleList, setVehicleList] = useState("");
  const [milkType, setMilkType] = useState("");
  const [pickupShift, setPickupShift] = useState("");
  const [uom, setUom] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [transactionDate, setTransactionDate] = useState(defaultDate);
  const [fat, setFat] = useState("");
  const [snf, setSnf] = useState("");
  const [routeId, setRouteId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [vehicleId, setVehicleId] = useState("");

  useEffect(() => {
    let mounted = true;
    if (mounted) getRoute();
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
      quantity: quantity,
      milkType: milkType,
      pickupShift: pickupShift,
      transactionDate: new Date(transactionDate),
      routeId: routeId,
      customerId: customerId,
      vehicleId: vehicleId,
      userId: parseInt(user.userId),
      companyId: 1,
    };
    axiosInstance.post(`/pickup`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
        window.location.href = "/PickupListScreen";
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

  const onFatChange = (e) => {
    setFat(e);
    axiosInstance
      .post(`fatsnfRateMatrix/rate`, {
        fat: e,
        snf: snf,
        userId: parseInt(user.userId),
      })
      .then((res) => {
        setRate(res.data.rate);
      });
  };
  const onQuantityChange = (e) => {
    setQuantity(e);

    var amount = e * rate;
    setAmount(amount);
  };
  const onUOMChange = (e) => {
    setUom(e);
  };

  const onSetDate = (event) => {
    setTransactionDate(new Date(event.target.value));
  };
  const onShiftChange = (e) => {
    setPickupShift(e);
  };

  return (
    <div>
      <h1 className="head">Add Pickup</h1>
      <Form  name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}>
        <Row gutter={15}>
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
                onChange={(e) => onFatChange(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item colon={false} disabled label="Rate">
              <Input placeholder="Rate" disabled={true} value={rate} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item colon={false} label="Quantity">
              <Input
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => onQuantityChange(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item colon={false} label="Amount">
              <Input placeholder="Amount" disabled={true} value={amount} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item colon={false} label="UOM">
              <Select placeholder="UOM" value={uom} onChange={onUOMChange}>
                <Option key={"Kg"}>Kg</Option>
                <Option key={"Litre"}>Litre</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item colon={false} label="Milk Type">
              <Input
                placeholder="Milk Type"
                value={milkType}
                onChange={(e) => setMilkType(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item colon={false} label="Pickup Shift">
              <Select
                placeholder="Pickup Shift"
                value={pickupShift}
                onChange={onShiftChange}
              >
                <Option key={"Morning Shift"}>Morning Shift</Option>
                <Option key={"Evening Shift"}>Evening Shift</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Form.Item colon={false} label="RouteId">
              <Select
                placeholder="RouteId"
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
            <Form.Item colon={false} label="VehicleId">
              <Select
                placeholder="VehicleId"
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
            <Form.Item colon={false} label=" CustomerId">
              <Select
                placeholder="CustomerId"
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
          <Col span={12}>
            <Form.Item colon={false} label="Date">
              <Input
                disabled={true}
                value={transactionDate.toLocaleDateString("CA")}
                onChange={onSetDate}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={23}>
            <Button type="primary" onClick={onSave}>
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PickupAddScreen;
