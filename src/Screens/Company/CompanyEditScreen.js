import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button, Input, Select, message } from "antd";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

const CompanyEditScreen = () => {
  let { id } = useParams();

  var companyObj = {
    name: "",
    lattitude: "",
    longitude: "",
    registerDate: "",
    cityName: "",
    stateName: "",
    address: "",
  };
  const [companyData, setCompanyData] = useState(companyObj);

  useEffect(() => {
    let mounted = true;
    if (mounted) onReadCompany(id);
    return () => (mounted = false);
  }, []);

  const onReadCompany = (id) => {
    axiosInstance.get(`/company/${id}`).then((response) => {
      setCompanyData(response.data.data);
      console.log(response.data.data);
    });
  };

  const onNameChange = (e) => {
    setCompanyData({ ...companyData, name: e.target.value });
  };
  const onRegisterDateChange = (e) => {
    setCompanyData({ ...companyData, registerDate: e.target.value });
  };
  const onAddressChange = (e) => {
    setCompanyData({ ...companyData, address: e.target.value });
  };
  const onStateChange = (e) => {
    setCompanyData({ ...companyData, stateName: e.target.value });
  };
  const onCityChange = (e) => {
    setCompanyData({ ...companyData, cityName: e.target.value });
  };
  const onLattitudeChange = (e) => {
    setCompanyData({ ...companyData, lattitude: e.target.value });
  };
  const onLongitudeChange = (e) => {
    setCompanyData({ ...companyData, longitude: e.target.value });
  };
  const onUpdate = () => {
    axiosInstance.put(`/company/${id}`, companyData).then((res) => {
        if (res.data && res.data.responseCode === -1) {
          message.error("Record Already Exists");
        } else if (res.data && res.data.responseCode === 1) {
          message.success("Record Update successfully");
        } else message.error("Something wrong. Please try again...!");
      });
  };
  return (
    <div>
      <div><h1>CompanyEditScreen</h1></div>
      <div>
        <Form>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item colon={false} label=" Name">
                <Input
                  placeholder="Name"
                  value={companyData.name}
                  onChange={onNameChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Register-Date">
                <Input
                  placeholder="Register-Date"
                  value={companyData.registerDate}
                  onChange={onRegisterDateChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Address">
                <Input
                  placeholder="Address"
                  value={companyData.address}
                  onChange={onAddressChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="State">
                <Input
                  placeholder="State"
                  value={companyData.stateName}
                  onChange={onStateChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item colon={false} label="City">
                <Input
                  placeholder="City"
                  value={companyData.cityName}
                  onChange={onCityChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Lattitude">
                <Input
                  placeholder="Lattitude"
                  value={companyData.lattitude}
                  onChange={onLattitudeChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Longitude">
                <Input
                  placeholder="Longitude"
                  value={companyData.longitude}
                  onChange={onLongitudeChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Button type="primary" onClick={onUpdate}>
                UPDATE
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default CompanyEditScreen;
