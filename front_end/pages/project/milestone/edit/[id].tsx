import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../provider";
import { MutableRefObject, useRef, useEffect } from "react";
import { MilestoneItem } from "../../../../provider/modules/project";
import { modifyMilestone } from "../../../../provider/modules/project";
import { requestModifyMilestone } from "../../../../middleware/modules/milestone";

const MilestoenEdit = () => {
  const router = useRouter();

  const projectMilestoneId = router.query.id as string;
  const projectId = +projectMilestoneId.split("-")[0];
  const milestoneId = +projectMilestoneId.split("-")[1];

  console.log(projectId);
  console.log(milestoneId);

  const projectItem = useSelector((state: RootState) =>
    state.project.data.find((item) => item.id === projectId)
  );

  const milestoneItem = projectItem?.milestone.find(
    (item) => item.id === milestoneId
  );

  const isModifyCompleted = useSelector(
    (state: RootState) => state.project.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const milestonename = useRef() as MutableRefObject<HTMLInputElement>;
  const startdate = useRef() as MutableRefObject<HTMLInputElement>;
  const enddate = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    isModifyCompleted && router.push("/project");
  }, [isModifyCompleted, router]);

  const handleSaveClick = () => {
    if (milestoneItem) {
      const item = { ...milestoneItem };
      item.name = milestonename.current.value;
      item.startdate = startdate.current.value;
      item.enddate = enddate.current.value;
      saveItem(item);
    }
  };
  const saveItem = (item: MilestoneItem) => {
    dispatch(requestModifyMilestone(item));
  };

  return (
    <>
      <section style={{ width: "40vw" }} className="mx-auto">
        <h2 className="text-center">Milestone Edit</h2>
        <table className="table">
          <tbody>
            <tr>
              <th>마일스톤 명</th>
              <td>
                <input
                  className="form-control"
                  type="text"
                  defaultValue={milestoneItem?.name}
                  ref={milestonename}
                />
              </td>
            </tr>
            <tr>
              <th>시작일</th>
              <td>
                <input
                  className="form-control"
                  type="date"
                  defaultValue={milestoneItem?.startdate}
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
                  defaultValue={milestoneItem?.enddate}
                  ref={enddate}
                />
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
                console.log("--save--");
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
export default MilestoenEdit;
