import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Row, Col, Button } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { environment } from "./Environment";
import logo from "../src/images/orbit.png";
import flywell from "../src/images/flywell-logo.png";

const { Header } = Layout;

export function Nav() {
  const logout = (e) => {
    window.location.href = "/";
  };

  return (
    <Header className="header">
      <Row>
        <Col xs={18} sm={24} md={24} lg={24} xl={24}>
          <div className="logo">
            <NavLink exact to="">
              <img
                alt=""
                src={environment.env === "demo" ? flywell : logo}
                style={{ width: "70px", paddingBottom: "10px" }}
              />
            </NavLink>
          </div>
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{
              lineHeight: "58px",
              backgroundColor: "transparent",
              textTransform: "upperCase",
            }}
          >
            {/* <SubMenu
              key={"1"}
              title={<span className="submenu-title-wrapper">Budget</span>}
            >
              <Menu.Item key={"1.0"}>
                <NavLink exact to={"/dashboard"}>
                  Dashboard
                </NavLink>
              </Menu.Item>

              <Menu.Item key={"1.1"}>
                <NavLink exact to={"/year"}>
                  Year
                </NavLink>
              </Menu.Item>
              <Menu.Item key={"1.2"}>
                <NavLink exact to={"/definebudget"}>
                  Budget
                </NavLink>
              </Menu.Item>
              <Menu.Item key={"1.3"}>
                <NavLink exact to="/budgetgl">
                  Budget GL Spread
                </NavLink>
              </Menu.Item>
              <Menu.Item key={"1.4"}>
                <NavLink exact to="/explan">
                  Expenditure Plan
                </NavLink>
              </Menu.Item>
            </SubMenu> */}
            <Menu.Item key={'2'}>
              <NavLink  to={"/MemberListScreen"}>
                Member
              </NavLink>
            </Menu.Item>
            <Menu.Item key={'3'}>
              <NavLink  to={"/CustomerListScreen"}>
                Customer
              </NavLink>
            </Menu.Item>

            <Menu.Item style={{ marginLeft: "500px" }}>
              <Button onClick={(e) => logout(e)}>LogOut</Button>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
}
