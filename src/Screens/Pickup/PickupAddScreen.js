import React, { useEffect, useState, useContext } from "react";
import { Col, Form, Row, Button, Input, message, Select } from "antd";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
const { Option } = Select;

const PickupAddScreen = () => {
  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate());

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

  const onSetDate = (event) => {
    setTransactionDate(new Date(event.target.value));
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
              <Form.Item colon={false} label="Umo">
                <Input
                  placeholder="Umo"
                  value={uom}
                  onChange={(e) => setUom(e.target.value)}
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
              <Form.Item colon={false} label="Pickup-Shift">
                <Input
                  placeholder="Pickup-Shift"
                  value={pickupShift}
                  onChange={(e) => setPickupShift(e.target.value)}
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
            <Col span={12}>
              <Form.Item colon={false} label="Date">
                <Input
                  disabled={true}
                  value={transactionDate.toLocaleDateString("en-CA")}
                  onChange={onSetDate}
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
    </div>
  );
};

export default PickupAddScreen;
