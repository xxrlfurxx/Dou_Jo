import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { MutableRefObject, useRef, useEffect } from "react";
import { modifyProject, ProjectItem } from "../../../provider/modules/project";

const ProjectEdit = () => {
  const router = useRouter();

  const id = router.query.id as string;

  const projectItem = useSelector((state: RootState) =>
    state.project.data.find((item) => item.id === +id)
  );


  const isModifyCompleted = useSelector(
    (state: RootState) => state.project.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const projectname = useRef() as MutableRefObject<HTMLInputElement>;
  const startdate = useRef() as MutableRefObject<HTMLInputElement>;
  const enddate = useRef() as MutableRefObject<HTMLInputElement>;
  const manager = useRef() as MutableRefObject<HTMLSelectElement>;
  const engineer = useRef() as MutableRefObject<HTMLSelectElement>;
  const memo = useRef() as MutableRefObject<HTMLTextAreaElement>;

  useEffect(() => {
    isModifyCompleted && router.push("/project");
  }, [isModifyCompleted, router]);

  const handleSaveClick = () => {
    if (projectItem) {
      const item = { ...projectItem };
      item.projectname = projectname.current.value;
      item.startdate = startdate.current.value;
      item.enddate = enddate.current.value;
      item.manager = manager.current.value;
      item.engineer = engineer.current.value;
      item.milestone = projectItem.milestone;
      item.memo = memo.current.value;

      saveItem(item);
    }
  };
  const saveItem = (item: ProjectItem) => {
    dispatch(modifyProject(item));
  };

  return (
    <>
      <section style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center">Project Edit</h2>
        <table className="table">
          <tbody>
            <tr>
              <th>프로젝트 명</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={projectItem?.projectname}
                  ref={projectname}
                />
              </td>
            </tr>
            <tr>
              <th>시작일</th>
              <td>
                <input
                  className="form-control"
                  type="date"
                  defaultValue={projectItem?.startdate}
                  ref={startdate}
                />
              </td>
            </tr>
            <tr>
              <th>종료일</th>
              <td>
                <input
                  className="form-control"
                  type="date"
                  defaultValue={projectItem?.enddate}
                  ref={enddate}
                />
              </td>
            </tr>
            <tr>
              <th>PM</th>
              <td>
                <select
                  defaultValue={projectItem?.manager}
                  className="form-select"
                  aria-label="Default select example"
                  ref={manager}
                >
                  <option value="">선택 안함</option>
                  <option value="강윤석">강윤석</option>
                  <option value="이준희">이준희</option>
                  <option value="허준">허준</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>담당자</th>
              <td>
                <select
                  defaultValue={projectItem?.engineer}
                  className="form-select"
                  aria-label="Default select example"
                  ref={engineer}
                >
                  <option value="">선택 안함</option>
                  <option value="강윤석">강윤석</option>
                  <option value="이준희">이준희</option>
                  <option value="허준">허준</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>메모</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "15vh" }}
                  defaultValue={projectItem?.memo}
                  ref={memo}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex">
          <div style={{ width: "50%" }}>
            <button
              className="btn btn-secondary me-1"
              onClick={() => {
                handleSaveClick();
              }}
            >
              <i className="bi bi-pencil me-1 d-flex justify-content-right" />
              저장
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                router.push(`/project`);
              }}
            >
              <i className="bi bi-trash me-1 d-flex justify-content-right" />
              취소
            </button>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProjectEdit;
