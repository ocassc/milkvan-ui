import React, {useState, useEffect, useContext} from "react";
import { Col, Row } from "antd";
import { PageTitle } from "../../PageTitle";
import axiosInstance from "../../axiosInstance";
import { useParams } from "react-router-dom";
import { UserContext } from "../../globalContext";

const MyAccount = () => {
    let { id } = useParams();
    const user =useContext(UserContext)
  const [readMemberObj, setReadMemberObj] = useState({});

  useEffect(() => {
    let mounted = true;
    if (mounted) readMember(user.userId);
    return () => (mounted = false);
  }, []);

  const readMember = (id) => {
    axiosInstance.get(`/member/${user.userId}`).then((response) => {
      setReadMemberObj(response.data.data);
    });
  };
  return (
    <div>
      <Row>
        <Col span={10}>
          <PageTitle title="My Account"></PageTitle>
        </Col>
      </Row>
      <div>
      <Row>
        <Col span={10}>
          <li className="list-group-item"> Name : {readMemberObj.name}</li>

          <li className="list-group-item"> Email : {readMemberObj.email}</li>

          <li className="list-group-item"> Mobile : {readMemberObj.mobile}</li>
          <li className="list-group-item">
            {" "}
            Address : {readMemberObj.address}
          </li>
          </Col>
      </Row>
      </div>
    </div>
  );
};

export default MyAccount;
