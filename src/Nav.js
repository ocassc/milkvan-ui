import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Dropdown} from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { environment } from "./Environment";
import iconUser from "../src/images/Icon-user.svg";
import logo from "../src/images/logo.jpg";
import Icon from '@ant-design/icons';

const { Header } = Layout;

export function Nav() {
  const handleLogout = () => {
    localStorage.clear();
    window.location = `${environment.url.AUTH_URL}`;
  }
  
  const myaccount = () => {
    window.location = `${environment.url.MYACCOUNT_URL}`;
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <button className="ant-btn-link" onClick={myaccount}>My Account</button>
      </Menu.Item>      
      <Menu.Divider />
      <Menu.Item key="1">
        <button className="ant-btn-link" onClick={handleLogout}>Logout</button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="header">
      <div className="logo">
        <NavLink to="/HomeScreen">
          <img src={logo} alt='' style={{ width: "70px" }} />
        </NavLink>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        style={{
          margin: "15px",
          lineHeight: "30px",
          backgroundColor: "transparent",
          float: "left",
          textTransform: "upperCase",
        }}
      >
        <SubMenu
          key={"1"}
          title={<span className="submenu-title-wrapper">Masters</span>}
        >
          <Menu.Item key={"1.0"}>
            <NavLink exact to={"/state"}>
              State
            </NavLink>
          </Menu.Item>
          <Menu.Item key={"1.1"}>
            <NavLink exact to={"/city"}>
              City
            </NavLink>
          </Menu.Item>
          <Menu.Item key={"1.2"}>
            <NavLink exact to={"/FatsnFRateMatrix"}>
            Fat Snf Rate Matrix
            </NavLink>
          </Menu.Item>
          <Menu.Item key={"1.3"}>
            <NavLink exact to={"/FatScreen"}>
            Fat
            </NavLink>
          </Menu.Item>
          <Menu.Item key={"1.4"}>
            <NavLink exact to={"/SnfScreen"}>
            Snf
            </NavLink>
          </Menu.Item>
          <Menu.Item key={"1.5"}>
            <NavLink exact to={"/RoleScreen"}>
           Role
            </NavLink>
          </Menu.Item>
          <Menu.Item key={"1.6"}>
            <NavLink exact to={"/VehicleScreen"}>
            Vehicle
            </NavLink>
          </Menu.Item>
          <Menu.Item key={"1.7"}>
            <NavLink exact to={"/VehicleTypeScreen"}>
            Vehicle Type
            </NavLink>
          </Menu.Item>
          <Menu.Item key={"1.8"}>
            <NavLink exact to={"/RouteScreen"}>
           Route
            </NavLink>
          </Menu.Item>
          <Menu.Item key={"1.9"}>
            <NavLink exact to={"/UserRole"}>
          User Role
            </NavLink>
          </Menu.Item>
          <Menu.Item key={"2.0"}>
            <NavLink exact to={"/DefaultUserSetting"}>
            Default User Setting
            </NavLink>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key={"2"}>
          <NavLink to={"/MemberListScreen"}>Member</NavLink>
        </Menu.Item>
        <Menu.Item key={"3"}>
          <NavLink to={"/CustomerListScreen"}>Customer</NavLink>
        </Menu.Item>
       
        <Menu.Item key={"5"}>
          <NavLink to={"/PickupListScreen"}>Pickup</NavLink>
        </Menu.Item>
        
      </Menu>
      <div className="dd-logout">
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" href="#/">
            <img src={iconUser} alt='' className="nav-user-icon" />
            {localStorage.getItem("username")}​​​​ <Icon type="down" />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}
