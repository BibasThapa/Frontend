"use client";
import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import {
  HomeOutlinedIcon,
  ArrowForwardIosIcon,
  ArrowBackIosIcon,
  PeopleOutlinedIcon,
  ReceiptOutlinedIcon,
  BarChartOutlinedIcon,
  MapOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  ManageHistoryIcon,
  SettingsIcon,
  WysiwygIcon,
  ExitToAppIcon,
} from "./Icon";
import "react-pro-sidebar/dist/css/styles.css";
import avatarDefault from "@/public/assests/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: any;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className="!text-[16px] !font-Poppins">{title}</Typography>
      <Link href={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [logout, setLogout] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    document.body.style.backgroundColor = theme === "dark" ? "#000000" : "#ffffff"; // Set body background color
  }, [theme]);

  if (!mounted) {
    return null;
  }
  const logoutHandler = () =>{
 setLogout(true)
  }

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        color: `${theme === "dark" ? "#ffffff" : "#000000"}`, // Text color for dark and light modes
      }}
      className={`flex`} // Flex to align the sidebar and content area
    >
      <ProSidebar
        collapsed={isCollapsed}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: isCollapsed ? "0%" : "16%",
          backgroundColor: `${theme === "dark" ? "#111C43" : "#ffffff"}`, // Sidebar background
        }}
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <ArrowForwardIosIcon /> : undefined}
            style={{ margin: "10px 0 20px 0" }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <Link href="/">
                  <h3 className="text-[25px] font-Poppins uppercase dark:text-white text-black">
                    ELearning
                  </h3>
                </Link>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} className="inline-block">
                  <ArrowBackIosIcon className="text-black dark:text-white" />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <Image
                  alt="profile-user"
                  width={100}
                  height={100}
                  src={user.avatar ? user.avatar.url : avatarDefault}
                  style={{
                    cursor: "pointer",
                    borderRadius: "50%",
                    border: "3px solid #5b6fe6",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  className={`text-[20px] capitalize ${theme === "dark" ? "text-white" : "text-black"}`}
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.name}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ m: "10px 0 0 0" }}
                  className={`text-[20px] capitalize ${theme === "dark" ? "text-white" : "text-black"}`}
                >
                  - {user?.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item title="Dashboard" to="/admin" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 35px" }}
              className={`!text-[18px] capitalize !font-[400] ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              {!isCollapsed && "Data"}
            </Typography>
            <Item title="Users" to="/admin/users" icon={<GroupsIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Invoices" to="/admin/invoices" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 35px" }}
              className={`!text-[18px] capitalize !font-[400] ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              {!isCollapsed && "Content"}
            </Typography>
            <Item title="Create Course" to="/admin/create-course" icon={<VideoCallIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Live Courses" to="/admin/courses" icon={<OndemandVideoIcon />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 35px" }}
              className={`!text-[18px] capitalize !font-[400] ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              {!isCollapsed && "Customization"}
            </Typography>
            
            <Item title="FAQ" to="/admin/faq" icon={<QuizIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Categories" to="/admin/categories" icon={<WysiwygIcon />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 35px" }}
              className={`!text-[18px] capitalize !font-[400] ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              {!isCollapsed && "Controllers"}
            </Typography>
            <Item title="Manage Team" to="/admin/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 35px" }}
              className={`!text-[18px] capitalize !font-[400] ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              {!isCollapsed && "Analytics"}
            </Typography>
            <Item title="Courses Analytics" to="/admin/courses-analytics" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="Orders Analytics" to="/admin/orders-analytics" icon={<MapOutlinedIcon />} selected={selected} setSelected={setSelected} />
            <Item title="User Analytics" to="/admin/users-analytics" icon={<ManageHistoryIcon />} selected={selected} setSelected={setSelected} />

            <Typography
              variant="h5"
              sx={{ m: "15px 0 5px 35px" }}
              className={`!text-[18px] capitalize !font-[400] ${theme === "dark" ? "text-white" : "text-black"}`}
            >
              {!isCollapsed && "Extras"}
            </Typography>
           
            <Item title="Logout" to="/" icon={<ExitToAppIcon/>} selected={selected} setSelected={setSelected}  />
            
          </Box>
        </Menu>
      </ProSidebar>

      {/* Main content area */}
      <Box
        sx={{
          width: "100%", // Full width for the content
          background: `${theme === "dark" ? "#000000" : "#f0f0f0"}`, // Background color for content area
          marginLeft: isCollapsed ? "0%" : "16%", // Adjust margin when the sidebar is collapsed
          height: "100vh", // Full height
        }}
      >
        {/* Add your content here */}
      </Box>
    </Box>
  );
};

export default Sidebar;
