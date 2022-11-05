import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button, Input, message,  } from "antd";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { PageTitle } from "../../PageTitle";

const PickupEditScreen = () => {
  let { id } = useParams();

  var pickupObj = {
    id: id,
    snf: "",
    fat: "",
    rate: "",
    amount:'',
    uom: "",
    quantity: "",
    milkType: "",
    pickupShift: "",
  };
  const [pickupData, setPickupData] = useState(pickupObj);
  useEffect(() => {
    let mounted = true;
    if (mounted) onReadPickup(id);
    return () => (mounted = false);
  }, []);

  const onReadPickup = () => {
    axiosInstance.get(`/pickup/${id}`).then((res) => {
      setPickupData(res.data.data);
    });
  };

  const onSnfChange = (e) => {
    setPickupData({ ...pickupData, snf: e.target.value });
  };
  const onFatChange = (e) => {
    setPickupData({ ...pickupData, fat: e.target.value });
  };
  const onRateChange = (e) => {
    setPickupData({ ...pickupData, rate: e.target.value });
  };
  const onQuantityChange = (e) => {
    setPickupData({ ...pickupData, quantity: e.target.value });
  };
  const onAmountChange = (e) => {
    setPickupData({ ...pickupData, amount: e.target.value });
  };
  const onUomChange = (e) => {
    setPickupData({ ...pickupData, uom: e.target.value });
  };
  const onMilktypeChange = (e) => {
    setPickupData({ ...pickupData, milkType: e.target.value });
  };
  const onPickupShiftChange = (e) => {
    setPickupData({ ...pickupData, pickupShift: e.target.value });
  };
  const onUpdateCustomer = () => {
    axiosInstance.put(`/pickup/${id}`, pickupData).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record Update successfully");
        window.location.href = "/PickupListScreen";
      } else message.error("Something wrong. Please try again...!");
    });
  };
  return (
    <div>
      <div>
      <Row>
      <Col span={4}>
      <div ><h1 className="head">Edit Pickup</h1></div></Col>
      </Row>
        
      <div>
        <Form  name="basic"
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 16,
            }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item colon={false} label="Snf">
                <Input value={pickupData.snf} onChange={onSnfChange} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Fat">
                <Input value={pickupData.fat} onChange={onFatChange} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Rate">
                <Input value={pickupData.rate} onChange={onRateChange} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Quantity">
                <Input
                  value={pickupData.quantity}
                  onChange={onQuantityChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Amount">
                <Input
                  value={pickupData.amount}
                  onChange={onAmountChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="UOM">
                <Input value={pickupData.uom} onChange={onUomChange} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Milk Type">
                <Input
                  value={pickupData.milkType}
                  onChange={onMilktypeChange}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item colon={false} label="Pickup Shift">
                <Input
                  value={pickupData.pickupShift}
                  onChange={onPickupShiftChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
              <Col span={24}>
              <Button type="primary" onClick={() => onUpdateCustomer()}>
                Save
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default PickupEditScreen;
