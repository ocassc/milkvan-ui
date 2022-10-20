import React, { useEffect, useState } from "react";
import { Table, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { PageTitle } from "../../PageTitle";
import axiosInstance from "../../axiosInstance";

const CustomerListScreen = () => {
  const [list, setList] = useState([]);
  const [readCustomerObj, setReadCustomerObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) getCustomer();
    return () => (mounted = false);
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
  
    {
      title: "Action",
      key: "id",
      render: (row) => {
        return (
          <>
            <EyeOutlined
              onClick={() => {
                readCustomer(row);
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
                removeCustomer(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getCustomer = () => {
    axiosInstance.get("/customer").then((response) => {
      setList(response.data.data);
    });
  };

  const readCustomer = (obj) => {
    axiosInstance.get(`/customer/${obj.id}`).then((response) => {
      setReadCustomerObj(response.data.data);
    });
    setIsModalOpen(true);
  };

  const modify = (obj) => {
    window.location.href = `CustomerEditScreen/${obj.id}`;
  };

  const removeCustomer = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/customer/${obj.id}`).then((res) => {
          if (res.data && res.data.responseCode === 1) {
            message.success("Record Deleted successfully");
          } else message.error("Something wrong. Please try again...!");
        });
      },
      onCancel() {},
    });
  };

  const onAddClick = () => {
    window.location.href = "CustomerAddScreen";
  };
  return (
    <div>
      <div>
        <PageTitle title="Customer List">
          <button className="btn-tck" onClick={() => onAddClick()}>
            + Add New{" "}
          </button>
        </PageTitle>
      </div>

      <div>
        <Table rowKey="id" columns={columns} dataSource={list} />
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> Name : {readCustomerObj.name}</li>

          <li className="list-group-item"> Email : {readCustomerObj.email}</li>

          <li className="list-group-item">
            {" "}
            Mobile : {readCustomerObj.mobile}
          </li>
          <li className="list-group-item">
            {" "}
            RegisterDate : {readCustomerObj.registerDate}
          </li>
          <li className="list-group-item">
            {" "}
            ReferenceBy : {readCustomerObj.referenceBy}
          </li>
          <li className="list-group-item">
            {" "}
            Landmark : {readCustomerObj.landmark}
          </li>
          <li className="list-group-item">
            {" "}
            AddressLine1 : {readCustomerObj.addressLine1}
          </li>
          <li className="list-group-item">
            {" "}
            AddressLine2 : {readCustomerObj.addressLine2}
          </li>
          <li className="list-group-item"> City : {readCustomerObj.city}</li>
          <li className="list-group-item"> State: {readCustomerObj.state}</li>
          <li className="list-group-item">
            {" "}
            Country : {readCustomerObj.country}
          </li>
          <li className="list-group-item">
            {" "}
            Lattitude : {readCustomerObj.lattitude}
          </li>
          <li className="list-group-item">
            {" "}
            Longitude : {readCustomerObj.longitude}
          </li>
          <li className="list-group-item">
            {" "}
            MapLocation : {readCustomerObj.mapLocation}
          </li>
         
          <li className="list-group-item">
            {" "}
            CompanyId : {readCustomerObj.companyId}
          </li>
          <li className="list-group-item">
            {" "}
            UserId : {readCustomerObj.userId}
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default CustomerListScreen;
