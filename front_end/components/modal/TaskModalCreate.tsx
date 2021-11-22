import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { TaskItem } from "../../provider/modules/task";
import { addTask } from "../../provider/modules/status";
import { memberData } from "../Members";

const ModalCreate = () => {
  // 입력 받을 값 참조
  const milestoneIdRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const summaryRef = useRef() as MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const reporterIdRef = useRef() as MutableRefObject<HTMLSelectElement>;
  const estimatedTimeRef = useRef() as MutableRefObject<HTMLInputElement>;
  const currentStateRef = useRef() as MutableRefObject<HTMLSelectElement>;

  // state
  const [modal, setModal] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<number>();

  const project = useSelector((state: RootState) => state.project.data);
  const projectItem = project.find((item) => item.id == projectId);
  const statuses = useSelector((state: RootState) => state.status.data);
  const tasks: TaskItem[] = [];
  statuses.map((item) => item.tasks?.forEach((item) => tasks.push(item)));
  console.log("tasks 목록");
  console.log(tasks);
  const isAddCompleted = useSelector(
    (state: RootState) => state.status.isAddTaskCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const toggleModal = () => {
    setModal(!modal);
  };
  const enrollTask = () => {
    if (
      projectId &&
      summaryRef.current.value.length &&
      reporterIdRef.current.value.length &&
      estimatedTimeRef.current.value.length &&
      currentStateRef.current.value.length
    ) {
      const task: TaskItem = {
        id: tasks.length > 0 ? tasks.length + 1 : 1,
        projectId: projectId,
        milestoneId: +milestoneIdRef.current.value,
        summary: summaryRef.current.value,
        reporterId: +reporterIdRef.current.value,
        description: descriptionRef.current?.value,
        estimatedTime: +estimatedTimeRef.current.value,
        priority: 1,
        statusId: +currentStateRef.current.value,
      };
      dispatch(addTask(task));
      toggleModal();
    } else {
      alert("Please enter the required values");
    }
  };

  useEffect(() => {
    isAddCompleted;
    console.log(currentStateRef);
    console.log(tasks);
  }, [modal, projectId, isAddCompleted]);

  return (
    <>
      <div
        className="board_btn"
        onClick={() => {
          toggleModal();
        }}
      >
        <i className="bi bi-plus-lg" />
        Task
      </div>
      {modal && (
        <div className="modal_wrap">
          <div className="modal_content">
            <div className="modal_title">
              <span className="modal_name">Create Task (스타일 나중에)</span>
            </div>
            <div className="form_body">
              <div className="task_project">
                <span className="project_icon">
                  Project
                  <i className="bi bi-asterisk" />
                </span>
                <select
                  className="project_select"
                  onChange={(e) => {
                    setProjectId(+e.target.value);
                  }}
                >
                  <option hidden>--Select project--</option>
                  {project.map((project) => {
                    return (
                      <option value={project.id} key={project.id}>
                        {project.projectname}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="task_milestone">
                <span className="milestone_icon">
                  Milestone
                  <i className="bi bi-asterisk" />
                </span>
                <select className="milestone_select" ref={milestoneIdRef}>
                  <option hidden>--Select milestone--</option>
                  {projectItem &&
                    projectItem.milestone.map((milestone) => {
                      return (
                        <option value={milestone.id} key={milestone.id}>
                          {milestone.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="task_summary">
                <span className="summary_icon">
                  Summary
                  <i className="bi bi-asterisk" />
                </span>
                <input
                  type="text"
                  placeholder="Enter summary"
                  ref={summaryRef}
                />
              </div>
              <div className="task_currentState">
                <span className="currentState_icon">
                  Current state
                  <i className="bi bi-asterisk" />
                </span>
                <select className="currentState_select" ref={currentStateRef}>
                  <option hidden>--Select state--</option>
                  {statuses.map((status) => {
                    return (
                      <option value={status.id} key={status.id}>
                        {status.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="task_reporter">
                <span className="reporter_icon">
                  Reporter
                  <i className="bi bi-asterisk" />
                </span>
                <select className="reporter_select" ref={reporterIdRef}>
                  <option hidden>--Select reporter--</option>
                  {memberData.map((member) => {
                    return (
                      <option
                        className="reporter_option"
                        value={member.id}
                        key={member.id}
                        style={{ backgroundImage: `${member.profileImg}` }}
                      >
                        {member.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="task_description">
                <span className="description_icon">Description</span>
                <textarea
                  placeholder="Enter description"
                  ref={descriptionRef}
                />
              </div>
              <div className="task_estimatedTime">
                <span className="estimatedTime_icon">
                  EstimatedTime
                  <i className="bi bi-asterisk" />
                </span>
                <input
                  type="text"
                  placeholder="Enter estimated time"
                  ref={estimatedTimeRef}
                />
              </div>
            </div>
            <div className="modal_btn">
              <div
                className="cancel_btn"
                onClick={() => {
                  toggleModal();
                }}
              >
                Cancel
              </div>
              <div
                className="enroll_btn"
                onClick={() => {
                  enrollTask();
                }}
              >
                Create
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalCreate;
