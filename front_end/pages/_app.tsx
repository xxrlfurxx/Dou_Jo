import "../styles/sidebar.scss";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Provider } from "react-redux";
import { store } from "../provider";
import { DragDropContext, resetServerContext } from "react-beautiful-dnd";
// import Appbar from "../components/Appbar";
// import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }: AppProps) {
  // const active = () => {};

  return (
    <Provider store={store}>
      <div className="wrap">
        {/* <header className="app-bar">
          <h1>DouJo</h1>
        </header> */}
        <nav className="nav-bar">
          <div className="sidebar">
            <div className="logo_content">
              <div className="logo">
                <i className="bi bi-tools"></i>
                <div className="logo_name">DouJo</div>
              </div>
            </div>
            <ul className="nav_list">
              <li>
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Search..." />
              </li>
              <li>
                <Link href="/">
                  <a href="/">
                    <i className="bi bi-house-door"></i>
                    <span className="links_name">Home</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/feed">
                  <a href="/feed">
                    <i className="bi bi-bell"></i>
                    <span className="links_name">Feed</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/project">
                  <a href="/project">
                    <i className="bi bi-file-text"></i>
                    <span className="links_name">Project</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/board">
                  <a href="/board">
                    <i className="bi bi-kanban"></i>
                    <span className="links_name">TaskBoard</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/wiki">
                  <a href="/wiki">
                    <i className="bi bi-file-ruled"></i>
                    <span className="links_name">Wiki</span>
                  </a>
                </Link>
              </li>
            </ul>
            {/* <div className="dark-mode">
              <i
                className="bi bi-sun"
                id="night-mode"
                onClick={() => {
                  active();
                }}
              />
              <label className="switch">
                <input type="checkbox" />
                <span className="slider" />
              </label>
            </div> */}
            <div className="profile_content">
              <div className="profile">
                <div className="profile_details">
                  <div className="name_job">
                    <div className="name">강윤석</div>
                    <div className="job">Enginner</div>
                    <i className="bi bi-box-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <article className="contents">
          <Component {...pageProps} />
        </article>
        <footer className="footer"></footer>
      </div>
    </Provider>
  );
}

export default MyApp;

// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

//   return { props: { data: [] } };
// };
