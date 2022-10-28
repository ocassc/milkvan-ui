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
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";
const { Option } = Select;

const CompanyScreen = () => {
  
  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate());


  const [companyData, setCompanyData] = useState([]);
  const [stateList, setStateList] = useState();
  const [cityList, setCityList] = useState();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [registerDate, setRegisterDate] = useState(defaultDate);
  const [country, setCountry] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [lattitude, setLattitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [readCompanyObj, setReadCompanyObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) getCompany();
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
      setStateName(stateid);
    });
  };
  const onCityChange = (e) => {
    setCityName(e);
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
      title: "RegisterDate",
      dataIndex: "registerDate",
      key: "registerDate",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },

    {
      title: "Action",
      key: "id",
      render: (row) => {
        return (
          <>
            <EyeOutlined
              onClick={() => {
                readCompany(row);
              }}
            />
            <EditOutlined
              style={{ marginLeft: 12 }}
              onClick={() => {
                modify(row);
              }}
            />
            <DeleteOutlined
              style={{ color: "red", marginLeft: 12 }}
              onClick={() => {
                removeCompany(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getCompany = () => {
    axiosInstance.get(`/company`).then((response) => {
      setCompanyData(response.data.data);
    });
  };

  const readCompany = (obj) => {
    axiosInstance.get(`/company/${obj.id}`).then((response) => {
      setReadCompanyObj(response.data.data);
    });
    setIsModalOpen(true);
  };
  const removeCompany = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/company/${obj.id}`).then((res) => {
          if (res.data && res.data.responseCode === 1) {
            message.success("Record Deleted successfully");
          } else message.error("Something wrong. Please try again...!");
        });
      },
      onCancel() {},
    });
  };
  const modify = (obj) => {
    window.location.href = `ComapnyEditScreen/${obj.id}`;
  };
  const onSave = () => {
    const data = {
      name: name,
      address: address,
      registerDate: registerDate,
      cityName: cityName,
      stateName: stateName,
      country: country,
      lattitude: lattitude,
      longitude: longitude,
    };
    axiosInstance.post(`/company`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };

  const onSetDate = (event) => {
    setRegisterDate(new Date(event.target.value));
  };

  return (
    <div>
      <div>
        <h1 className="head">Company</h1>
      </div>
      <div>
        <Form>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item colon={false} label=" Name">
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Register-Date">
                <Input
                  disabled={true}
                  value={registerDate.toLocaleDateString("en-CA")}
                  onChange={onSetDate}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Address">
                <Input
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Country">
                <Input
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item colon={false} label="State">
                <Select
                  placeholder="State"
                  value={stateName}
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
                  value={cityName}
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
              <Form.Item colon={false} label="Lattitude">
                <Input
                  placeholder="Lattitude"
                  value={lattitude}
                  onChange={(e) => setLattitude(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item colon={false} label="Longitude">
                <Input
                  placeholder="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
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
        <Table columns={columns} dataSource={companyData} />
      </div>

      <Modal
        title="Company-List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readCompanyObj.id}</li>
          <li className="list-group-item"> Name : {readCompanyObj.name}</li>
          <li className="list-group-item">
            {" "}
            Address : {readCompanyObj.address}
          </li>
          <li className="list-group-item">
            {" "}
            REgister-Date : {readCompanyObj.registerDate}
          </li>
          <li className="list-group-item"> City : {readCompanyObj.cityName}</li>
          <li className="list-group-item">
            {" "}
            State: {readCompanyObj.stateName}
          </li>
          <li className="list-group-item">
            {" "}
            Country : {readCompanyObj.country}
          </li>
          <li className="list-group-item">
            {" "}
            Lattitude: {readCompanyObj.lattitude}
          </li>
          <li className="list-group-item">
            {" "}
            Longitude: {readCompanyObj.longitude}
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default CompanyScreen;
