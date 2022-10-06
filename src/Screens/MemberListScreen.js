import React, { useEffect, useState } from "react";
import { Table, Modal, message } from "antd";

import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import { PageTitle } from "../PageTitle";
import axiosInstance from "../axiosInstance";

const MemberListScreen = () => {
  const [list, setList] = useState([]);
  const [readMemberObj, setReadMemberObj] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) getMember();
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
                readMember(row);
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
                removeMember(row);
              }}
            />
          </>
        );
      },
    },
  ];

  const getMember = () => {
    axiosInstance.get("/member").then((response) => {
      setList(response.data.data);
    });
  };

  const readMember = (obj) => {
    axiosInstance.get(`/member/${obj.id}`).then((response) => {
      setReadMemberObj(response.data.data);
    });
    setIsModalOpen(true);
  };

const modify=(obj)=>{
  window.location.href=`SignupScreen/${obj.id}`
}

  const removeMember = (obj) => {
    Modal.confirm({
      title: "Do you want to remove this Member?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        axiosInstance.delete(`/member/${obj.id}`).then((res) => {
          if (res.data && res.data.responseCode === 1) {
            message.success("Record Deleted successfully");
          } else message.error("Something wrong. Please try again...!");
        });
      },
      onCancel() {},
    });
  };
  const onAddClick = () => {
    window.location.href = "SignupScreen";
  };
  return (
    <div>
      <div>
        <PageTitle title="Member List">
          <button className="btn-tck" onClick={() => onAddClick()}>
            + Add New{" "}
          </button>
        </PageTitle>
      </div>

      <div>
        <Table rowKey="id" columns={columns} dataSource={list} />
      </div>
      <Modal
        title="Member"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <ul className="list-group w-50">
          <li className="list-group-item"> Name : {readMemberObj.name}</li>

          <li className="list-group-item"> Email : {readMemberObj.email}</li>

          <li className="list-group-item"> Mobile : {readMemberObj.mobile}</li>
          <li className="list-group-item">
            {" "}
            Address : {readMemberObj.address}
          </li>
        </ul>
      </Modal>
    </div>
  );
};

export default MemberListScreen;
