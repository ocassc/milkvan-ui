import React, { useState, useEffect, useContext } from "react";
import { Col, Form, Row, Input, Button, Select, message } from "antd";
import axiosInstance from "../../axiosInstance";
import FormItem from "antd/es/form/FormItem";
import { UserContext } from "./../../globalContext";

const { Option } = Select;

const CustomerAddScreen = () => {
  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate());
  const user = useContext(UserContext);

  const [cityList, setCityList] = useState();
  const [stateList, setStateList] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [addressLine1, setAddressLine1] = useState();
  const [addressLine2, setAddressLine2] = useState();
  const [landmark, setLandmark] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState("India");
  const [registerDate, setRegisterDate] = useState(defaultDate);
  const [referenceBy, setReferenceBy] = useState();
  const [lattitude, setLattitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    let mounted = true;
    if (mounted) getState();
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
      setState(stateid);
    });
  };

  const onCityChange = (e) => {
    console.log(e);
    setCity(e);
  };

  const onAdd = () => {
    const data = {
      email: email,
      name: name,
      mobile: mobile,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      landmark: landmark,
      registerDate: registerDate,
      referenceBy: referenceBy,
      city: city,
      state: state,
      country: country,
      lattitude: lattitude,
      longitude: longitude,
      userId: parseInt(user.userId),
      companyId: 1,
    };
    axiosInstance.post("/customer", data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
        window.location.href = "/CustomerListScreen";
      } else message.error("Something wrong. Please try again...!");
    });
  };
  const onSetDate = (event) => {
    setRegisterDate(new Date(event.target.value));
  };

  return (
    <div>
      <div>
        <h1>Add New Customer</h1>

        <div>
          <Form
            name="basic"
            labelCol={{
              span: 7,
            }}
            wrapperCol={{
              span: 16,
            }}
          >
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  colon={false}
                  label="Full Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Full-Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus={true}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  colon={false}
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                      message: "Please input valid Email!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={12}>
                <Form.Item
                  colon={false}
                  label="Mobile"
                  name="mobile"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Mobile!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} label="Registration Date">
                  <Input
                    disabled={true}
                    value={registerDate.toLocaleDateString("CA")}
                    onChange={onSetDate}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="Reference By">
                  <Input
                    placeholder="Reference By"
                    value={referenceBy}
                    onChange={(e) => setReferenceBy(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} label="Landmark">
                  <Input
                    placeholder="Landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="Address Line 1">
                  <Input
                    placeholder="Address Line 1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} label="Address Line 2">
                  <Input
                    placeholder="Address Line 2"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="Country">
                  <Input
                    placeholder="India"
                    value={country}
                    onChange={(e) => setCountry("India")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} label="State">
                  <Select
                    placeholder="State"
                    value={state}
                    onChange={onStateChange}
                  >
                    {stateList &&
                      stateList.map((stateList) => (
                        <Option key={stateList.id}>{stateList.name}</Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="City">
                  <Select
                    placeholder="City"
                    value={city}
                    onChange={onCityChange}
                  >
                    {cityList &&
                      cityList.map((cityList) => (
                        <Option key={cityList.id}>{cityList.name}</Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} label="lattitude">
                  <Input
                    placeholder="lattitude"
                    value={lattitude}
                    onChange={(e) => setLattitude(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={20}>
              <Col span={12}>
                <Form.Item colon={false} label="longitude">
                  <Input
                    placeholder="longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <FormItem colon={false} label=" Map Location">
                  <iframe
                    title="Map location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28450.546553129665!2d75.68522088150291!3d26.956817166570143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4cd47d26a84b%3A0xaca32f17838b07d0!2sGovindpura%2C%20Jaipur%2C%20Rajasthan%20302012!5e0!3m2!1sen!2sin!4v1664946376325!5m2!1sen!2sin"
                    style={{
                      width: "300px",
                      height: "150px",
                      style: "border:0",
                      allowfullscreen: "",
                      loading: "lazy",
                      referrerpolicy: "no-referrer-when-downgrade",
                    }}
                  ></iframe>
                </FormItem>
              </Col>
            </Row>

            <Row gutter={20}>
              <Col span={23}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => onAdd()}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CustomerAddScreen;
