import React, { useEffect, useState } from "react";
import { Table, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { PageTitle } from '../../PageTitle';
import axiosInstance from "../../axiosInstance";

const PickupListScreen = () => {
    const [pickupService, setPickupService] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [readPickupObj, setReadPickupObj] = useState({});

    useEffect(() => {
        let mounted = true;
        if (mounted) getPickup();
       
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
          dataIndex: "date",
          key: "date",
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

      const getPickup=()=>{
        axiosInstance.get(`/vehicleService`).then((res) => {
            setPickupService(res.data.data);
          });
      }

      const readPickup=(obj)=>{
        axiosInstance.get(`/vehicleService/${obj.id}`).then((response) => {
            setReadPickupObj(response.data.data);
          });
          setIsModalOpen(true);
      }

      const removePickup=(obj)=>{
        Modal.confirm({
            title: "Do you want to remove this Member?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk() {
              axiosInstance.delete(`/vehicleService/${obj.id}`).then((res) => {
                if (res.data && res.data.responseCode === 1) {
                  message.success("Record Deleted successfully");
                } else message.error("Something wrong. Please try again...!");
              });
            },
            onCancel() {},
          });
      }
      const onAddClick = () => {
        window.location.href = "PickupAddScreen";
      };
  return (
    <div>
    <div>PickupListScreen</div>
    <div>
        <PageTitle title="Customer List">
          <button className="btn-tck" onClick={() => onAddClick()}>
            + Add New{" "}
          </button>
        </PageTitle>
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
          <li className="list-group-item">
            {" "}
            User-ID : {readPickupObj.userId}
          </li>
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
          <li className="list-group-item">
            {" "}
            SNF : {readPickupObj.snf}
          </li>
          <li className="list-group-item">
            {" "}
            FAT : {readPickupObj.fat}
          </li>
          <li className="list-group-item">
            {" "}
            Rate : {readPickupObj.rate}
          </li>
          <li className="list-group-item">
            {" "}
            Amount : {readPickupObj.amount}
          </li>
          <li className="list-group-item">
            {" "}
            UMO : {readPickupObj.uom}
          </li>
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
            Date : {readPickupObj.date}
          </li>
          <li className="list-group-item">
            CompanyId : {readPickupObj.companyId}
          </li>
        </ul>
      </Modal>
      </div>
  )
}

export default PickupListScreen