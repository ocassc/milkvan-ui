import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Button, Input, message, Table, Modal, Select } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
import { PageTitle } from "../../PageTitle";

const { Option } = Select;
const RouteScreen = () => {
  const user = useContext(UserContext);
  const [name, setName] = useState("");
  const [routeData, setRouteData] = useState([]);
  const [readRouteObj, setReadRouteObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerList, setCustomerList] = useState("");
  const [arrCustomers, setArrCustomers] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) getRoute();
    getCustomer();
    return () => (mounted = false);
  }, []);

  const getCustomer = () => {
    axiosInstance.get(`/customer/user/${user.userId}`).then((res) => {
      setCustomerList(res.data.data);
    });
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
      title: "Customers",
      dataIndex: "customers",
      key: "customers",
      render: (customers) => {
        return <div>{customers.length}</div>;
      },
    },
    {
      title: "Action",
      key: "id",
      render: (row) => {
        return (
          <>
            <EyeOutlined
              onClick={() => {
                readRoute(row);
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
                removeRoute(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getRoute = () => {
    axiosInstance.get(`/route/user/${user.userId}`).then((response) => {
      setRouteData(response.data.data);
    });
  };
  const readRoute = (obj) => {
    setReadRouteObj(obj);
    setIsModalOpen(true);
  };
  const modify = (obj) => {
    window.location.href = `RouteEditScreen/${obj.id}`;
  };
  const onSave = () => {
    const data = {
      name: name,
      companyId: 1,
      userId: parseInt(user.userId),
      customers: arrCustomers,
    };
    axiosInstance.post(`/route`, data).then((res) => {
      if (res.data && res.data.responseCode === -1) {
        message.error("Record Already Exists");
      } else if (res.data && res.data.responseCode === 1) {
        message.success("Record saved successfully");
      } else message.error("Something wrong. Please try again...!");
    });
  };

  const removeRoute = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/route/${obj.id}`).then((res) => {
          if (res.data && res.data.responseCode === 1) {
            message.success("Record Deleted successfully");
          } else message.error("Something wrong. Please try again...!");
        });
      },
      onCancel() {},
    });
  };

  const handleAddClick = () => {
    let tempArrCustomer = arrCustomers;
    tempArrCustomer.push("");

    setArrCustomers([...tempArrCustomer]);
  };
  const handleOnChange = (e, i) => {
  
    let tempArrCustomer = arrCustomers;
    tempArrCustomer[i] = e;

    setArrCustomers([...tempArrCustomer]);

    
  };
  return (
    <div>
      <Row>
        <Col span={10}>
          <PageTitle title="Route Screen"></PageTitle>
        </Col>
      </Row>

      <div>
        <Row>
          <Col span={10}>
            <Input
              placeholder="Route Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <label>Add Customer</label>
            {arrCustomers.map((c, index) => {
              return (
                <Row key={index}>
                  <Col span={12}>
                    <label>Customer {index + 1}</label>
                    <Select
                      style={{ minWidth: "60%" }}
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
                  </Col>
                </Row>
              );
            })}

            <Button onClick={handleAddClick}>Add</Button>
          </Col>
        </Row>
        <Row gutter={5}>
          <Col>
            <Button type="primary" onClick={onSave}>
              Save
            </Button>
          </Col>
        </Row>
      </div>

      <div>
        <Table rowKey="id" columns={columns} dataSource={routeData} />
      </div>
      <Modal
        title={readRouteObj.name}
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Customer Name</th>
              </tr>
            </thead>
            <tbody>
              {readRouteObj.customers &&
                readRouteObj.customers.map((cust, index) => {
                  return (
                    <tr key={index}>
                      <td>{cust.name}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default RouteScreen;
