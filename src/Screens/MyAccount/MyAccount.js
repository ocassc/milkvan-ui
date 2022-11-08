import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Card, Avatar } from "antd";
import Icon, { HomeOutlined, MailOutlined,PhoneOutlined } from '@ant-design/icons';

import { PageTitle } from "../../PageTitle";
import axiosInstance from "../../axiosInstance";
import { UserContext } from "../../globalContext";
const { Meta } = Card;
const MyAccount = () => {
  const user = useContext(UserContext);
  const memberObj = {};
  const [readMemberObj, setReadMemberObj] = useState(memberObj);

  useEffect(() => {
    let mounted = true;
    if (mounted) readMember();
    return () => (mounted = false);
  }, []);

  const readMember = () => {
    axiosInstance.get(`/member/user/${user.userId}`).then((response) => {
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
      <div className="site-card-border-less-wrapper">
        {readMemberObj.length > 0 && (
          <Card
            title="Profile"
            bordered={true}
            style={{
              width: 300,
              marginTop: 16,
            }}
          >
            <Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              description={readMemberObj.map((readMemberObj) => (
                <h1 key={readMemberObj.id}>{readMemberObj.name}</h1>
              ))}
            />
            <Meta
              description={readMemberObj.map((readMemberObj) => (
                <p key={readMemberObj.id}><Icon component={MailOutlined} /> {readMemberObj.email}</p>
              ))}
            />
            <Meta
              description={readMemberObj.map((readMemberObj) => (
                <p key={readMemberObj.id}><Icon component={PhoneOutlined} /> {readMemberObj.mobile}</p>
              ))}
            />
            <Meta
              description={readMemberObj.map((readMemberObj) => (
                <p key={readMemberObj.id}> <Icon component={HomeOutlined} /> {readMemberObj.address}</p>
              ))}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
