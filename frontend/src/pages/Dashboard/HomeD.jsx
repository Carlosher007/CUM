import React from "react";
import { Link } from "react-router-dom";
import CardTicket from "../../components/Dashboard/Ticket/CardTicket";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { obtenerModo } from "../../assets/Context/ModeContext";

const Home = () => {
  console.log(obtenerModo())
  return (
   <div>
    {/* <h1>aoqaioqa</h1> */}
   </div>
  );
};

export default Home;
