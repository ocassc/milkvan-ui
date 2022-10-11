import { Col, Row, Form, Button, Input, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const { Option } = Select;
const CustomerEditScreen = () => {
  let { id } = useParams();
  var customerObj = {
    id: id,
    name: "",
    referenceBy: "",
    mapLocation: "",
    lattitude: "",
    longitude: "",
    registerDate: "",
    mobile: "",
    addressLine1: "",
    addressLine2: "",
    landmark: "",
    city: "",
    state: "",
    email: "",
  };

  const [customerData, setCustomerData] = useState(customerObj);
  const [cityList, setCityList] = useState();
  const [stateList, setStateList] = useState();

  useEffect(() => {
    let mounted = true;
    if (mounted) onReadCustomer(id);
    getState();
    return () => (mounted = false);
  }, []);

  const getState = () => {
    axiosInstance.get("/state").then((response) => {
      setStateList(response.data.data);
    });
  };
  const onStateChange = (stateid, e) => {
    axiosInstance.get(`/city/state/${stateid}`).then((response) => {
      setCityList(response.data.data);
      setCustomerData({ ...customerData, state: stateid });
    });
  };

  const onCityChange = (e) => {
    console.log(e);
    setCustomerData({ ...customerData, city: e });
  };

  const onReadCustomer = (id) => {
    axiosInstance.get(`/customer/${id}`).then((response) => {
      setCustomerData(response.data.data);
      console.log(response.data.data);
    });
  };

  const onNameChange = (e) => {
    setCustomerData({ ...customerData, name: e.target.value });
  };
  const onEmailChange = (e) => {
    setCustomerData({ ...customerData, email: e.target.value });
  };

  const onMobileChange = (e) => {
    setCustomerData({ ...customerData, mobile: e.target.value });
  };
  const onRegistrationDateChange = (e) => {
    setCustomerData({ ...customerData, registerDate: e.target.value });
  };
  const onReferenceByChange = (e) => {
    setCustomerData({ ...customerData, referenceBy: e.target.value });
  };
  const onLandmarkChange = (e) => {
    setCustomerData({ ...customerData, landmark: e.target.value });
  };
  const onAddressLine1Change = (e) => {
    setCustomerData({ ...customerData, addressLine1: e.target.value });
  };
  const onAddressLine2Change = (e) => {
    setCustomerData({ ...customerData, addressLine2: e.target.value });
  };
  const onLattitudeChange = (e) => {
    setCustomerData({ ...customerData, lattitude: e.target.value });
  };
  const onLongitudeChange = (e) => {
    setCustomerData({ ...customerData, longitude: e.target.value });
  };

  const onUpdateCustomer = () => {
    axiosInstance.put(`/customer/${id}`, customerData).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record Update successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };

  return (
    <Row>
      <Col span={15}></Col>
      <Col span={10}>
        <div className="login-page-form">
          <h1 className="head">Edit-Customer</h1>
          <Form>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="Full Name">
                  <Input
                    placeholder="Full-Name"
                    value={customerData.name}
                    onChange={onNameChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} label="Email">
                  <Input
                    placeholder="Email"
                    value={customerData.email}
                    onChange={onEmailChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="Mobile">
                  <Input
                    placeholder="Mobile"
                    value={customerData.mobile}
                    onChange={onMobileChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} label="Registration-Date">
                  <Input
                    placeholder="Registration-Date"
                    value={customerData.registerDate}
                    onChange={onRegistrationDateChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="ReferenceBy">
                  <Input
                    placeholder="ReferenceBy"
                    value={customerData.referenceBy}
                    onChange={onReferenceByChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} label="Landmark">
                  <Input
                    placeholder="Landmark"
                    value={customerData.landmark}
                    onChange={onLandmarkChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="Address-Line 1">
                  <Input
                    placeholder="Address-Line 1"
                    value={customerData.addressLine1}
                    onChange={onAddressLine1Change}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} label="Address-Line 2">
                  <Input
                    placeholder="Address-Line 2"
                    value={customerData.addressLine2}
                    onChange={onAddressLine2Change}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="State">
                  <Select
                    placeholder="State"
                    value={customerData.state}
                    onChange={onStateChange}
                  >
                    {stateList &&
                      stateList.map((stateList) => (
                        <Option key={stateList.id}>{stateList.name}</Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} label="City">
                  <Select
                    placeholder="City"
                    value={customerData.city}
                    onChange={onCityChange}
                  >
                    {cityList &&
                      cityList.map((cityList) => (
                        <Option key={cityList.id}>{cityList.name}</Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="Lattitude">
                  <Input
                    placeholder="lattitude"
                    value={customerData.lattitude}
                    onChange={onLattitudeChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} label="Longitude">
                  <Input
                    placeholder="longitude"
                    value={customerData.longitude}
                    onChange={onLongitudeChange}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={7}>
                <Button type="primary" onClick={() => onUpdateCustomer()}>
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default CustomerEditScreen;
