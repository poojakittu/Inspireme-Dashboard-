import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Flex, Icon, Image } from "@chakra-ui/react";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { BiUser, BiMessageSquareAdd } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { RiProductHuntLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { CgToday } from "react-icons/cg";
import { AuthContext } from "../context/AuthContext";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { logoutUser } = useContext(AuthContext);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <UserOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "Products",
              children: [
                {
                  key: "allproducts",
                  icon: <VideoCameraOutlined />,
                  label: "All Products",
                },
                {
                  key: "addproducts",
                  icon: <VideoCameraOutlined />,
                  label: "Add Products",
                },
              ],
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "Orders",
              children: [
                {
                  key: "allOrders",
                  icon: <VideoCameraOutlined />,
                  label: "All Orders",
                },
                {
                  key: "todaysorders",
                  icon: <VideoCameraOutlined />,
                  label: "Todays Orders",
                },
              ],
            },

            {
              key: "4",
              icon: <UploadOutlined />,
              label: "Exchange",
              children: [
                {
                  key: "exchange",
                  icon: <VideoCameraOutlined />,
                  label: "All Old Phone Details",
                },
                {
                  key: "oldPhone",
                  icon: <VideoCameraOutlined />,
                  label: "Add Old Phone",
                },
              ],
            },
            {
              key: "5",
              icon: <UploadOutlined />,
              label: "Domain",
              children: [
                {
                  key: "domain",
                  icon: <VideoCameraOutlined />,
                  label: "All Domain",
                },
              ],
            },
            {
              key: "6",
              icon: <UploadOutlined />,
              label: "Promo-Code",
              children: [
                {
                  key: "allPromocode",
                  icon: <VideoCameraOutlined />,
                  label: "All Promo-Code",
                },
              ],
            },
            {
              key: "7",
              icon: <UploadOutlined />,
              label: "Term & Conditions",
              children: [
                {
                  key: "Allpolicy",
                  icon: <VideoCameraOutlined />,
                  label: "All Term & Conditions",
                },
                {
                  key: "policy",
                  icon: <VideoCameraOutlined />,
                  label: "Add Term & Conditions",
                },
              ],
            },
            {
              key: "8",
              icon: <UploadOutlined />,
              label: "All Return Policy",
              children: [
                {
                  key: "allreturnpolicy",
                  icon: <VideoCameraOutlined />,
                  label: "All Return Policy",
                },
                {
                  key: "returnpolicy",
                  icon: <VideoCameraOutlined />,
                  label: "Add Return policies",
                },
              ],
            },

            {
              key: "9",
              icon: <UploadOutlined />,
              label: "Before Start Policy",
              children: [
                {
                  key: "addbeforepolicy",
                  icon: <VideoCameraOutlined />,
                  label: "ADD Before start Policy",
                },
                {
                  key: "allbeforepolicy",
                  icon: <VideoCameraOutlined />,
                  label: "All Before start policies",
                },
              ],
            },
            {
              key: "10",
              icon: <UploadOutlined />,
              label: "Agreement Policy",
              children: [
                {
                  key: "addaggrementpolicy",
                  icon: <VideoCameraOutlined />,
                  label: "ADD Agreement Policy",
                },
                {
                  key: "allaggrement",
                  icon: <VideoCameraOutlined />,
                  label: "All Agreement policies",
                },
              ],
            },
            {
              key: "11",
              icon: <UploadOutlined />,
              label: "All-Users",
              children: [
                {
                  key: "allusers",
                  icon: <VideoCameraOutlined />,
                  label: "All Users",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Flex gap="10px" mr={3}>
            <Icon
              _hover={{
                bg: "blue.500",
                borderRadius: "full",
                color: "white",
                cursor: "pointer",
              }}
              as={IoNotificationsOutline}
              boxSize={6}
              color="black"
            />
            <Icon
              _hover={{
                bg: "blue.500",
                borderRadius: "full",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => logoutUser()}
              as={RiLogoutCircleLine}
              boxSize={6}
            />
            <Image
              _hover={{
                bg: "blue.500",
                borderRadius: "full",
                color: "white",
                cursor: "pointer",
              }}
              as={BiUser}
              boxSize={6}
            />
          </Flex>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
