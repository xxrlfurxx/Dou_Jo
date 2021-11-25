import { Offcanvas } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../provider";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import project, {
  addMilestone,
  initialCompleted,
  MilestoneItem,
  modifyMilestone,
  removeMilestone,
} from "../provider/modules/project";
import { ProjectItem } from "../provider/modules/project";
import { useRouter } from "next/router";
import MilestoenEdit from "../pages/project/milestone/edit/[id]";
import { requestAddMilestone } from "../middleware/modules/milestone";

interface MilestoneCreateOffCanvasProp {
  show: boolean;
  onHide: () => void;
  selectedId: number;
}

function MilestoneCreateOffCanvas({
  show,
  onHide,
  selectedId,
}: MilestoneCreateOffCanvasProp) {
  const router = useRouter();

  const isModifyCompleted = useSelector(
    (state: RootState) => state.project.isModifyCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const projectItem = useSelector((state: RootState) =>
    state.project.data.find((item) => item.id === selectedId)
  );
  console.log("-selectedId-");
  console.log(selectedId);

  const milestoneList = projectItem?.milestone;
  console.log("--milestoneList--");
  console.log(milestoneList);

  const milestoneItem = projectItem?.milestone.find((item) => item.id);

  // const [milestoneList, setMilestoneList] = useState<MilestonItem[]>([]);

  const milestoneRef = useRef() as MutableRefObject<HTMLInputElement>;
  const formRef = useRef() as MutableRefObject<HTMLFormElement>;
  const ulRef = useRef() as MutableRefObject<HTMLUListElement>;
  const startdate = useRef() as MutableRefObject<HTMLInputElement>;
  const enddate = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    isModifyCompleted && dispatch(initialCompleted());
  }, [isModifyCompleted, router]);

  const add = () => {
    if (milestoneList) {
      const milestone: MilestoneItem = {
        id:
          milestoneList.length > 0
            ? milestoneList[milestoneList.length - 1].id + 1
            : 1,
        name: milestoneRef.current.value,
        startdate: startdate.current.value,
        enddate: enddate.current.value,
        projectId: selectedId,
      };

      dispatch(requestAddMilestone(milestone));
      console.log(milestone.id);
    }

    // setMilestoneList(
    //   produce((state) => {
    //     state.unshift(milestone);
    //   })
    // );

    // 입력값 초기화
    formRef.current?.reset();
  };

  const del = (removedmilestoneId: number, removedprojectId: number) => {
    dispatch(
      removeMilestone({
        milestoneId: removedmilestoneId,
        projectId: removedprojectId,
      })
    );
  };

  const handleSaveClick = () => {
    if (milestoneItem) {
      const item = { ...milestoneItem };
      item.name = milestoneRef.current.value;
      item.startdate = startdate.current.value;
      item.enddate = enddate.current.value;
      saveItem(item);
    }
  };
  const saveItem = (item: MilestoneItem) => {
    dispatch(modifyMilestone(item));
  };

  return (
    <>
      <Offcanvas show={show} onHide={onHide} placement="end">
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mx-auto">
            <h2 className="text-center my-5">마일스톤 추가</h2>
            <div>
              <button
                type="button"
                className="btn btn-primary text-nowrap"
                onClick={() => {
                  add();
                }}
              >
                추가
              </button>
            </div>
            <form
              className="d-flex"
              ref={formRef}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                className="form-control me-2"
                placeholder="마일 스톤 ..."
                ref={milestoneRef}
              />
            </form>
            <div>
              <div>시작일</div>
              <input
                className="form-control"
                type="date"
                ref={startdate}
                // min={item.startdate}
                // max={item.enddate}
              />

              <div>종료일</div>
              <input
                className="form-control"
                type="date"
                ref={enddate}
                // min={item.stardate}
                // max={item.enddate}
              />
            </div>
            <ul
              id="ul-list"
              className="list-group list-group-flush mt-3"
              ref={ulRef}
            >
              {/* 데이터와 UI요소 바인딩 */}
              {milestoneList &&
                milestoneList.map((item) => (
                  <li className="list-group-item d-flex" key={item.id}>
                    <div className="w-100">
                      <span className="me-1">{item.name}</span>
                      <span>
                        - {item.startdate}~{item.enddate}
                      </span>
                    </div>
                    {/* 보기모드일 때 보이는 버튼 */}

                    <button
                      className="btn btn-outline-secondary btn-sm ms-2 me-1 text-nowrap"
                      onClick={() => {
                        router.push(
                          `/project/milestone/edit/${selectedId}-${item.id}`
                        );
                      }}
                    >
                      수정
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm text-nowrap"
                      onClick={() => {
                        del(item.id, item.projectId);
                        // dispatch(removeMilestone(item.milestoneId));
                      }}
                    >
                      삭제
                    </button>
                  </li>
                ))}
            </ul>
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
                </button> */}
              </div>
              <div
                style={{ width: "50%" }}
                className="d-flex justify-content-end"
              >
                <button
                  className="btn btn-primary me-1"
                  onClick={() => {
                    onHide();
                  }}
                >
                  <i className="bi bi-trash me-1 d-flex justify-content-right" />
                  취소
                </button>
                <button
                  className="primary"
                  onClick={() => {
                    handleSaveClick();
                    onHide();
                    console.log("--save--");
                  }}
                >
                  <i className="bi bi-pencil me-1" />
                  저장
                </button>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default MilestoneCreateOffCanvas;
