// import "../styles/sidebar.scss";
// import "../styles/bootstrap-custom.scss";
import Link from "next/link";
import { useRef } from "react";

function Sidebar() {
  // const menuBtnRef = useRef<HTML
  // const sidebarRef = useRef<HTMLDivElement>(null);

  // const menuIcon = document.querySelector("#menu-button");
  // const searchBtn = document.querySelector(".bi-search");
  // const sidebar = document.querySelector(".sidebar");
  const active = () => {};

  return (
    <>
      {/* <div className="sidebar">
        <div className="logo_content">
          <div className="logo">
            <i className="bi bi-tools"></i>
            <div className="logo_name">DouJo</div>
          </div>
          <i
            className="bi bi-list"
            id="menu-button"
            onClick={() => {
              active();
            }}
          ></i>
        </div>
        <ul className="nav_list">
          <li>
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search..." />
          </li>
          <li>
            <Link href="/">
              <i className="bi bi-bell"></i>
              <span className="links_name">Feed</span>
            </Link>
            <span className="tooltip">Feed</span>
          </li>
          <li>
            <Link href="/">
              <i className="bi bi-file-text"></i>
              <span className="links_name">Project</span>
            </Link>
            <span className="tooltip">Project</span>
          </li>
          <li>
            <Link href="/">
              <i className="bi bi-kanban"></i>
              <span className="links_name">TaskBoard</span>
            </Link>
            <span className="tooltip">TaskBoard</span>
          </li>
          <li>
            <Link href="/">
              <i className="bi bi-file-ruled"></i>
              <span className="links_name">Wiki</span>
            </Link>
            <span className="tooltip">Wiki</span>
          </li>
        </ul>
        <div className="logout">
          <i className="bi bi-box-arrow-right"></i>
        </div>
      </div>
      <div className="home_content">
      <div className="text">Home Content</div>
    </div> */}
    </>
  );
}

export default Sidebar;
