import React, { useState, useEffect } from "react";
import ProjectModal from "../../components/ProjectModal";
import { useSelector } from "react-redux";
import { RootState } from "../../provider";
import ProjectDetailOffCanvas from "../../components/ProjectDetailOffCanvas";
import MilestoneCreateOffCanvas from "../../components/MilestoneCreateOffCanvas";
import api from "../../api/project";
import { ProjectItem } from "../../provider/modules/project";
import { apiResolver } from "next/dist/server/api-utils";


function Project() {
  const project = useSelector((state: RootState) => state.project);

  // delete state.isModifyCompleted;
  //     console.log("completed22")

  const [modalShow, setModalShow] = useState(false);

  const [offcanvasShow, setOffcanvasShow] = useState(false);
  const [MilestoneoffcanvasShow, setMilestoneOffcanvasShow ] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  // async: 비동기 처리를 할 수 있는 함수
  // 코드가 순차적인 처리가 아닌 다른 컨텐츠에 수행될 수 있도록 함 
  
   

  useEffect(() => {
   
  }, []); 

  return (
    <>
      <div className="mb-2"></div>
      <div style={{ width: "80vw" }} className="mx-auto">
        <h2 className="text-center">프로젝트 목록</h2>
        <div className="d-flex justify-content-end mb-2">
          <button
            className="btn btn-primary"
            onClick={() => setModalShow(true)}
          >
            <i className="bi bi-plus" />
            생성
          </button>
          <ProjectModal
            show={modalShow}
            onHide={() => {
              setModalShow(false);
            }}
          />
        </div>
        <div>
          <table className="table table-hover text-center">
            <thead>
              <tr>
                <th scope="col" style={{ width: "2%" }}>
                  No
                </th>
                <th scope="col" style={{ width: "22%" }}>
                  프로젝트명
                </th>
                <th scope="col" style={{ width: "22%" }}>
                  마일스톤
                </th>
                <th scope="col" style={{ width: "13%" }}>
                  시작일
                </th>
                <th scope="col" style={{ width: "13%" }}>
                  종료일
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  PM
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  담당자
                </th>
              </tr>
            </thead>
            <tbody>
              {project.data.map((item, index) => (
                <tr
                  key={`project-tr-${index}`}
                  className="table"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    // console.log("--");
                    setOffcanvasShow(true);
                    setSelectedId(item.id);
                  }}
                >
                  <th scope="row">{item.id}</th>
                  <td>{item.projectname}</td>
                  <td
                    onClick={(e) => {
                      e.cancelable = true;
                    }}
                  >
                    {item.milestone[0]?.name}
                    <button
                      className="btn btn-light"
                      style={{ padding: "0.1rem 0.1rem" }}
                      onClick={() => {
                        console.log("--");
                        setMilestoneOffcanvasShow(true);
                        setOffcanvasShow(false);
                      }}
                    >
                      <i className="bi bi-plus" />
                    </button>
                  </td>
                  <td>{item.startdate}</td>
                  <td>{item.enddate}</td>
                  <td>{item.manager}</td>
                  <td>{item.engineer}</td>
                </tr>
              ))}
            </tbody>
            {!project.data.length && (
              <tfoot>
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>
                    생성된 프로젝트가 없습니다.
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
          <ProjectDetailOffCanvas
            show={offcanvasShow}
            onHide={() => {
              setOffcanvasShow(false);
            }}
            selectedId={selectedId}
          />
          <MilestoneCreateOffCanvas
            show={MilestoneoffcanvasShow}
            onHide={() => {
              setMilestoneOffcanvasShow(false);
            }}
            selectedId={selectedId}
          />
        </div>
      </div>
      <div></div>
      <div className="d-flex justify-content-center ">
        <a href="#!" className="link-secondary fs-6 text-nowrap">
          More
        </a>
      </div>
    </>
  );
}

export default Project;
