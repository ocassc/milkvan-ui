import React, { useEffect, useState } from "react";
import { Table } from "antd";

import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";

import { PageTitle } from "../PageTitle";
import axiosInstance from "../axiosInstance";

const MemberListScreen = () => {
  const [list, setList] = useState();

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
            // onClick={() => {
            //   readMember(row);
            // }}
            />
            <EditOutlined
              style={{ marginLeft: 12 }}
              // onClick={() => {
              //   modify(row);
              // }}
            />
            <DeleteOutlined
              style={{ color: "red", marginLeft: 12 }}
              // onClick={() => {
              //   removeMember(row);
              // }}
            />
          </>
        );
      },
    },
  ];

  const getMember = () => {
    axiosInstance.get("/member").then((response) => {
      setList(response.data.data);
      console.log(response.data);
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
    </div>
  );
};

export default MemberListScreen;
