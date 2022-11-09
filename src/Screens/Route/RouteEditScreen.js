import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Input, Button, message, Select } from "antd";
import { PageTitle } from "../../PageTitle";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
const { Option } = Select;
const RouteEditScreen = () => {
  let { id } = useParams();
  const user = useContext(UserContext);

  var routeObj = {
    id: id,
    name: "",
    customers: [""],
  };
  const [routeData, setRouteData] = useState(routeObj);
  const [arrCustomers, setArrCustomers] = useState([]);
  const [customerList, setCustomerList] = useState("");

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getCustomer();
      onReadRoute(id);
    }
    return () => (mounted = false);
  }, []);

  const onReadRoute = (id) => {
    axiosInstance.get(`/route/${id}`).then((response) => {
      if (response.data.data.length > 0) {
        setRouteData(response.data.data[0]);
        let cData = response.data.data[0].customers.map((c) => {
          return c._id;
        });
        setArrCustomers(cData);
      } else {
        setRouteData({});
        setArrCustomers([]);
      }
    });
  };
  const getCustomer = () => {
    axiosInstance.get(`/customer/user/${user.userId}`).then((res) => {
      setCustomerList(res.data.data);
    });
  };

  const onUpdateRoute = () => {
    routeData.customers = arrCustomers;

    axiosInstance.put(`/route/${id}`, routeData).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record Update successfully");
        window.location.href = "/RouteScreen";
      } else message.error("Something wrong. Please try again...!");
    });
  };
  const handleAddClick = () => {
    let tempArrCustomer = arrCustomers;
    tempArrCustomer.push("");

    setArrCustomers([...tempArrCustomer]);
  };
  const onDelete = (e, i) => {
    var array = arrCustomers;
    var index = (array.indexOf[i] = e);
    if (index !== -1) {
      array.splice(index, 1);
      setArrCustomers([...arrCustomers]);
    }
  };

  const handleOnChange = (e, i) => {
    let tempArrCustomer = arrCustomers;
    tempArrCustomer[i] = e;

    setArrCustomers([...tempArrCustomer]);
  };

  const onNameChange = (e) => {
    setRouteData({ ...routeData, name: e.target.value });
  };

  return (
    <div>
      <Row>
        <Col span={10}>
          <PageTitle title="Edit Route"></PageTitle>
        </Col>
      </Row>
      <div>
        <Row gutter={20}>
          <Col span={10}>
            <Input
              placeholder="Route Name"
              onChange={onNameChange}
              value={routeData.name}
            />
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            {arrCustomers.map((c, index) => {
              return (
                <Row key={index}>
                  <Col span={12}>
                    <label>Customer {index + 1}</label>
                    <Select
                      style={{ minWidth: "50%" }}
                      placeholder="Customer"
                      key={c}
                      value={c}
                      onChange={(e) => handleOnChange(e, index)}
                    >
                      {customerList &&
                        customerList.map((cl) => (
                          <Option key={cl._id}>{cl.name}</Option>
                        ))}
                    </Select>
                    <Button type="danger" onClick={onDelete}>Clear</Button>
                  </Col>
                </Row>
              );
            })}

            <Button onClick={handleAddClick}>Add</Button>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={12}>
            <Button type="primary" onClick={() => onUpdateRoute()}>
              Save
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default RouteEditScreen;
