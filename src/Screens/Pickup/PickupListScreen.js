import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Modal,
  message,
  Form,
  Row,
  Col,
  Button,
  DatePicker,
  Space,
} from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { PageTitle } from "../../PageTitle";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
import moment from "moment";

const PickupListScreen = () => {
  const user = useContext(UserContext);
  let defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate());

  let defaultOldDate = new Date();
  defaultOldDate.setDate(defaultOldDate.getDate() - 30);

  const [pickupService, setPickupService] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readPickupObj, setReadPickupObj] = useState({});
  const [fromDate, setFromDate] = useState(defaultOldDate);
  const [toDate, setToDate] = useState(defaultDate);

  useEffect(() => {
    let mounted = true;
    if (mounted) getPickup();

    return () => (mounted = false);
  }, []);

  const columns1 = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: "customers",
      key: "customers",
      render: (customers) => {
        return customers.length > 0 ? (
          <div>{customers[0].name}</div>
        ) : (
          <div> </div>
        );
      },
    },

    {
      title: "Snf",
      dataIndex: "snf",
      key: "snf",
    },
    {
      title: "Fat",
      dataIndex: "fat",
      key: "fat",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },

    {
      title: "Milk Type",
      dataIndex: "milkType",
      key: "milkType",
    },
    {
      title: "Vehicle",
      dataIndex: "vehicles",
      key: "vehicles",
      render: (vehicles) => {
        return vehicles.length > 0 ? (
          <div>{vehicles[0].name}</div>
        ) : (
          <div> </div>
        );
      },
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (transactionDate) => {
        return <div>{moment(transactionDate).format("DD-MMM-yyyy")}</div>;
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
                readPickup(row);
              }}
            />
            <EditOutlined
              style={{ marginLeft: 12 }}
              onClick={() => {
                modifyPickup(row);
              }}
            />
            <DeleteOutlined
              style={{ color: "red", marginLeft: 12 }}
              onClick={() => {
                removePickup(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getPickup = () => {
    axiosInstance.get(`/pickup/user/${user.userId}`).then((res) => {
      setPickupService(res.data.data);
      console.log(res.data.data);
    });
  };

  const readPickup = (obj) => {
    axiosInstance.get(`/pickup/${obj.id}`).then((response) => {
      setReadPickupObj(response.data.data);
    });
    setIsModalOpen(true);
  };

  const modifyPickup = (obj) => {
    window.location.href = `PickupEditScreen/${obj.id}`;
  };

  const removePickup = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/pickup/${obj.id}`).then((res) => {
          if (res.data && res.data.responseCode === 1) {
            message.success("Record Deleted successfully");
          } else message.error("Something wrong. Please try again...!");
        });
      },
      onCancel() {},
    });
  };
  const onAddClick = () => {
    window.location.href = "PickupAddScreen";
  };

  const onGo = () => {
    axiosInstance
      .post(`/pickup/user/${user.userId}`, {
        fromDate: fromDate,
        toDate: toDate,
      })
      .then((res) => {
        if (res.data && res.data.responseCode === -1) {
          message.error("Failed! please contact administor.");
        } else if (res.data && res.data.responseCode === 1) {
          message.success("Filter applied successfully");
          setPickupService(res.data.data);
        } else message.error("Something wrong. Please try again...!");
      });
  };
  const onFromChange = (date, dateString) => {
    setFromDate(date, dateString);
  };
  const onToChange = (date, dateString) => {
    setToDate(date, dateString);
  };

  const dateFormat = "DD/MM/YYYY";
  return (
    <div>
      <div>
        <Row>
          <Col span={9}>
            <PageTitle title="Pickup List">
              <button className="btn-tck" onClick={() => onAddClick()}>
                + Add New{" "}
              </button>
            </PageTitle>
          </Col>
        </Row>

        <Form
          name="basic"
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Row gutter={3}>
            <Form.Item colon={false} label="From">
              <Space direction="vertical">
                <DatePicker
                  defaultValue={moment(defaultOldDate, dateFormat)}
                  format={dateFormat}
                  onChange={onFromChange}
                />
              </Space>
            </Form.Item>

            <Form.Item colon={false} label="To">
              <Space direction="vertical">
                <DatePicker
                  defaultValue={moment(defaultDate, dateFormat)}
                  format={dateFormat}
                  onChange={onToChange}
                />
              </Space>
            </Form.Item>

            <Form.Item colon={false}>
              <Button type="primary" onClick={onGo}>
                Go
              </Button>
            </Form.Item>
          </Row>
        </Form>
      </div>
      <div>
        <Table key="id" columns={columns1} dataSource={pickupService} />
      </div>
      <Modal
        title="Pickup Details"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readPickupObj.id}</li>
          <li className="list-group-item"> User ID : {readPickupObj.userId}</li>
          <li className="list-group-item">
            Company Id : {readPickupObj.companyId}
          </li>
          <li className="list-group-item">
            {" "}
            Route Id : {readPickupObj.routeId}
          </li>
          <li className="list-group-item">
            {" "}
            Vehicle Id : {readPickupObj.vehicle}
          </li>
          <li className="list-group-item">
            {" "}
            Customer Id : {readPickupObj.customer}
          </li>
          <li className="list-group-item"> Snf : {readPickupObj.snf}</li>
          <li className="list-group-item"> Fat : {readPickupObj.fat}</li>
          <li className="list-group-item"> Rate : {readPickupObj.rate}</li>
          <li className="list-group-item">
            {" "}
            Quantity : {readPickupObj.quantity}
          </li>
          <li className="list-group-item"> Amount : {readPickupObj.amount}</li>
          <li className="list-group-item"> UOM : {readPickupObj.uom}</li>
          <li className="list-group-item">
            {" "}
            Milk Type : {readPickupObj.milkType}
          </li>
          <li className="list-group-item">
            {" "}
            Pickup Shift : {readPickupObj.pickupShift}
          </li>

          <li className="list-group-item">
            {" "}
            Date : {moment(readPickupObj.transactionDate).format("DD-MM-yyyy")}
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default PickupListScreen;
