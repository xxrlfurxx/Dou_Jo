import { Offcanvas } from "react-bootstrap";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../provider";
import { removeProject } from "../provider/modules/project";
import { requestRemoveProject } from "../middleware/modules/project";

interface ProjectDeatilOffCanvasProp {
  show: boolean;
  onHide: () => void;
  selectedId: number;
}

function ProjectDeatilOffCanvas({
  show,
  onHide,
  selectedId,
}: ProjectDeatilOffCanvasProp) {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const projectItem = useSelector((state: RootState) =>
    state.project.data.find((item) => item.id === selectedId)
  );

  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <section className="mx-auto">
            <h2 className="text-center">Project Detail</h2>
            {/* {!projectItem && (
              <div className="text-center my-5">데이터가 없습니다.</div>
            )} */}
            {/* {projectItem && ( */}
            <table className="table">
              <tbody>
                <tr>
                  <th>프로젝트 명</th>
                  <td>{projectItem?.projectname}</td>
                </tr>
                <tr>
                  <th>시작일</th>
                  <td>{projectItem?.startdate}</td>
                </tr>
                <tr>
                  <th>종료일</th>
                  <td>{projectItem?.enddate}</td>
                </tr>
                <tr>
                  <th>PM</th>
                  <td>{projectItem?.manager}</td>
                </tr>
                <tr>
                  <th>담당자</th>
                  <td>{projectItem?.engineer}</td>
                </tr>
                <tr>
                  <th>마일스톤</th>
                  <td>
                    {projectItem?.milestone[0]?.name} /
                    {projectItem?.milestone[0]?.enddate}
                    {/*이부분에서 마일스톤 여러개 표시할수 있게 하고 enddate표시 할수있게함*/}
                  </td>
                </tr>
                <tr>
                  <th>메모</th>
                  <td>{projectItem?.memo}</td>
                </tr>
              </tbody>
            </table>
            {/* )} */}
            <div className="d-flex">
              <div style={{ width: "50%" }}>
                {/* <button
                  className="btn btn-secondary me-1"
                  onClick={() => {
                    router.push(`/project`);
                  }}
                >
                  <i className="bi bi-grid-3x3-gap me-1"></i>
                  목록
                // </button> */}
              </div>
              <div
                style={{ width: "50%" }}
                className="d-flex justify-content-end"
              >
                <button
                  className="btn btn-secondary me-1"
                  onClick={() => {
                    router.push(`/board`);
                  }}
                >
                  <i className="bi bi-grid-3x3-gap me-1"></i>
                  Task목록
                </button>
                <button
                  className="btn btn-primary me-1"
                  onClick={() => {
                    router.push(`/project/edit/${selectedId}`);
                  }}
                >
                  <i className="bi bi-pencil me-1" />
                  수정
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    dispatch(requestRemoveProject(selectedId));
                    onHide();
                  }}
                >
                  <i className="bi bi-trash me-1" />
                  삭제
                </button>
              </div>
            </div>
          </section>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default ProjectDeatilOffCanvas;
