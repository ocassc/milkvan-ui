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

const PickupListScreen = () => {
  const user = useContext(UserContext);

  const [pickupService, setPickupService] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [readPickupObj, setReadPickupObj] = useState({});
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    let mounted = true;
    if (mounted) getPickup(user.userId);
    return () => (mounted = false);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "SNF",
      dataIndex: "snf",
      key: "snf",
    },
    {
      title: "FAT",
      dataIndex: "fat",
      key: "fat",
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
    },

    {
      title: "MilkType",
      dataIndex: "milkType",
      key: "milkType",
    },
    {
      title: "Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
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
              // onClick={() => {
              //   modify(row);
              // }}
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
    });
  };

  const readPickup = (obj) => {
    axiosInstance.get(`/pickup/${obj.id}`).then((response) => {
      setReadPickupObj(response.data.data);
    });
    setIsModalOpen(true);
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
          message.error("Record Already Exists");
        } else if (res.data && res.data.responseCode === 1) {
          message.success("Record saved successfully");
          setPickupService(res.data.data)
        } else message.error("Something wrong. Please try again...!");
      });
  };
  const onChange = (date, dateString) => {
    setFromDate(date, dateString);
    setToDate(date, dateString);
  };

  return (
    <div>
      <div>PickupListScreen</div>
      <div>
        <PageTitle title="PickUp List">
          <button className="btn-tck" onClick={() => onAddClick()}>
            + Add New{" "}
          </button>
        </PageTitle>

        <Row gutter={5}>
          <Col span={7}>
            <Form.Item colon={false} label="From">
              <Space direction="vertical">
                <DatePicker onChange={onChange} />
              </Space>
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item colon={false} label="To">
              <Space direction="vertical">
                <DatePicker onChange={onChange} />
              </Space>
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item colon={false}>
              <Button type="primary" onClick={onGo}>
                Go
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
      <div>
        <Table columns={columns} dataSource={pickupService} />
      </div>
      <Modal
        title="Role-List"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> ID : {readPickupObj.id}</li>
          <li className="list-group-item"> User-ID : {readPickupObj.userId}</li>
          <li className="list-group-item">
            {" "}
            Route-Id : {readPickupObj.routeId}
          </li>
          <li className="list-group-item">
            {" "}
            Vehicle-Id : {readPickupObj.vehicleId}
          </li>
          <li className="list-group-item">
            {" "}
            Customer-Id : {readPickupObj.customerId}
          </li>
          <li className="list-group-item"> SNF : {readPickupObj.snf}</li>
          <li className="list-group-item"> FAT : {readPickupObj.fat}</li>
          <li className="list-group-item"> Rate : {readPickupObj.rate}</li>
          <li className="list-group-item"> Quantity : {readPickupObj.quantity}</li>
          <li className="list-group-item"> Amount : {readPickupObj.amount}</li>
          <li className="list-group-item"> UMO : {readPickupObj.uom}</li>
          <li className="list-group-item">
            {" "}
            Milk-Type : {readPickupObj.milkType}
          </li>
          <li className="list-group-item">
            {" "}
            Vehicle-Shif : {readPickupObj.vehicleShift}
          </li>

          <li className="list-group-item">
            {" "}
            Date : {readPickupObj.transactionDate}
          </li>
          <li className="list-group-item">
            CompanyId : {readPickupObj.companyId}
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default PickupListScreen;
