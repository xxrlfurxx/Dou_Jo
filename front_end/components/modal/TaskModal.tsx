import { useEffect, useState, MouseEvent, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import {
  addTask,
  modifyTask,
  removeTask,
  RemoveTaskProps,
} from "../../provider/modules/status";
import { TaskItem } from "../../provider/modules/task";
import { showTaskModal } from "../../provider/modules/taskModal";
import { memberData } from "../Members";

function TaskModal() {
  const project = useSelector((state: RootState) => state.project.data);
  const statuses = useSelector((state: RootState) => state.status.data);
  const tasks: TaskItem[] = [];
  statuses.map((item) => item.tasks?.forEach((item) => tasks.push(item)));
  const taskModalState = useSelector((state: RootState) => state.taskModal);
  const taskItem = tasks.find((item) => item.id == taskModalState.taskItemId);
  const milestoneList = project.find(
    (item) => item.id == taskItem?.projectId
  )?.milestone;
  const milestone = milestoneList?.find(
    (item) => item.id == taskItem?.milestoneId
  );
  const modifiedDescriptionRef = useRef<HTMLInputElement>(null);
  const modifiedSummaryRef = useRef<HTMLInputElement>(null);
  const modifiedETimeRef = useRef<HTMLInputElement>(null);
  const modifiedUTimeRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const [modal, setModal] = useState<boolean>(taskModalState.isOn);
  const [isEditProject, setIsEditProject] = useState<boolean>(false);
  const [isEditMilestone, setIsEditMilestone] = useState<boolean>(false);
  const [isEditCurrentState, setIsEditCS] = useState<boolean>(false);
  const [isEditReporter, setIsEditReporter] = useState<boolean>(false);
  const [isEditDescription, setIsEditDescription] = useState<boolean>(false);
  const [isEditSummary, setIsEditSummary] = useState<boolean>(false);
  const [isEditETime, setIsEditETime] = useState<boolean>(false);
  const [isEditUTime, setIsEditUTime] = useState<boolean>(false);

  const hideModal = () => {
    const offModal = showTaskModal({
      isOn: false,
    });
    dispatch(offModal);
    setModal(taskModalState.isOn);
  };
  useEffect(() => {
    setModal(taskModalState.isOn);
  }, [taskModalState]);

  const showProjectList = (e: MouseEvent) => {
    if (e.currentTarget == e.target) {
      setIsEditProject(!isEditProject);
    }
  };
  const showMilestone = (e: MouseEvent) => {
    if (e.currentTarget == e.target) {
      setIsEditMilestone(!isEditMilestone);
    }
  };
  const showCurrentState = (e: MouseEvent) => {
    if (e.currentTarget == e.target) {
      setIsEditCS(!isEditCurrentState);
    }
  };
  const showMember = (e: MouseEvent) => {
    if (e.currentTarget == e.target) {
      setIsEditReporter(!isEditReporter);
    }
  };
  const showDescription = (e: MouseEvent) => {
    if (e.currentTarget == e.target) {
      setIsEditDescription(!isEditDescription);
    }
  };
  const showSummary = (e: MouseEvent) => {
    if (e.currentTarget == e.target) {
      setIsEditSummary(!isEditSummary);
    }
  };
  const showETime = (e: MouseEvent) => {
    if (e.currentTarget == e.target) {
      setIsEditETime(!isEditETime);
    }
  };
  const showUTime = (e: MouseEvent) => {
    if (e.currentTarget == e.target) {
      setIsEditUTime(!isEditUTime);
    }
  };
  const modifyProject = (id: number) => {
    if (taskItem) {
      const modifiedItem: TaskItem = {
        id: taskItem.id,
        projectId: id,
        milestoneId: NaN,
        summary: taskItem.summary,
        priority: taskItem.priority,
        statusId: taskItem.statusId,
        reporterId: taskItem.reporterId,
        description: taskItem.description,
        estimatedTime: taskItem.estimatedTime,
        usageTime: taskItem.usageTime,
      };
      dispatch(modifyTask(modifiedItem));
    }
  };
  const modifyMilestone = (id: number) => {
    if (taskItem) {
      const modifiedItem: TaskItem = {
        id: taskItem.id,
        projectId: taskItem.projectId,
        milestoneId: id,
        summary: taskItem.summary,
        priority: taskItem.priority,
        statusId: taskItem.statusId,
        reporterId: taskItem.reporterId,
        description: taskItem.description,
        estimatedTime: taskItem.estimatedTime,
        usageTime: taskItem.usageTime,
      };
      dispatch(modifyTask(modifiedItem));
    }
  };
  const modifyCurrentState = (id: number) => {
    if (taskItem) {
      const removeItem: RemoveTaskProps = {
        statusId: taskItem.statusId,
        taskId: taskItem.id,
      };
      const modifiedItem: TaskItem = {
        id: taskItem.id,
        projectId: taskItem.projectId,
        milestoneId: taskItem.milestoneId,
        summary: taskItem.summary,
        priority: taskItem.priority,
        statusId: id,
        reporterId: taskItem.reporterId,
        description: taskItem.description,
        estimatedTime: taskItem.estimatedTime,
        usageTime: taskItem.usageTime,
      };
      dispatch(removeTask(removeItem));
      dispatch(addTask(modifiedItem));
    }
  };
  const modifyReporter = (id: number) => {
    if (taskItem) {
      const modifiedItem: TaskItem = {
        id: taskItem.id,
        projectId: taskItem.projectId,
        milestoneId: taskItem.milestoneId,
        summary: taskItem.summary,
        priority: taskItem.priority,
        statusId: taskItem.statusId,
        reporterId: id,
        description: taskItem.description,
        estimatedTime: taskItem.estimatedTime,
        usageTime: taskItem.usageTime,
      };
      dispatch(modifyTask(modifiedItem));
    }
  };
  const modifyDescription = () => {
    if (taskItem && modifiedDescriptionRef.current?.value) {
      const modifiedItem: TaskItem = {
        id: taskItem.id,
        projectId: taskItem.projectId,
        milestoneId: taskItem.milestoneId,
        summary: taskItem.summary,
        priority: taskItem.priority,
        statusId: taskItem.statusId,
        reporterId: taskItem.reporterId,
        description: modifiedDescriptionRef.current.value,
        estimatedTime: taskItem.estimatedTime,
        usageTime: taskItem.usageTime,
      };
      dispatch(modifyTask(modifiedItem));
    }
  };
  const modifySummary = () => {
    if (taskItem && modifiedSummaryRef.current?.value) {
      const modifiedItem: TaskItem = {
        id: taskItem.id,
        projectId: taskItem.projectId,
        milestoneId: taskItem.milestoneId,
        summary: modifiedSummaryRef.current.value,
        priority: taskItem.priority,
        statusId: taskItem.statusId,
        reporterId: taskItem.reporterId,
        description: taskItem.description,
        estimatedTime: taskItem.estimatedTime,
        usageTime: taskItem.usageTime,
      };
      dispatch(modifyTask(modifiedItem));
    }
  };
  const modifyETime = () => {
    if (taskItem && modifiedETimeRef.current?.value) {
      const modifiedItem: TaskItem = {
        id: taskItem.id,
        projectId: taskItem.projectId,
        milestoneId: taskItem.milestoneId,
        summary: taskItem.summary,
        priority: taskItem.priority,
        statusId: taskItem.statusId,
        reporterId: taskItem.reporterId,
        description: taskItem.description,
        estimatedTime: Number(modifiedETimeRef.current.value),
        usageTime: taskItem.usageTime,
      };
      dispatch(modifyTask(modifiedItem));
    }
  };
  const modifyUTime = () => {
    if (taskItem && modifiedUTimeRef.current?.value) {
      const modifiedItem: TaskItem = {
        id: taskItem.id,
        projectId: taskItem.projectId,
        milestoneId: taskItem.milestoneId,
        summary: taskItem.summary,
        priority: taskItem.priority,
        statusId: taskItem.statusId,
        reporterId: taskItem.reporterId,
        description: taskItem.description,
        estimatedTime: taskItem.estimatedTime,
        usageTime: Number(modifiedUTimeRef.current.value),
      };
      dispatch(modifyTask(modifiedItem));
    }
  };

  const deleteTask = () => {
    if (taskItem) {
      const deleteTaskItem: RemoveTaskProps = {
        taskId: taskItem.id,
        statusId: taskItem.statusId,
      };

      console.log(taskItem.id);
      console.log(taskItem.statusId);
      dispatch(removeTask(deleteTaskItem));
      hideModal();
    }
  };

  return (
    <>
      {modal && (
        <div className="modal_wrap">
          <div className="modal_content">
            <div className="modal_title">
              <span className="modal_name">Task #{taskItem?.id}</span>
            </div>
            <div className="form_body">
              <div className="task_project">
                <span className="project_icon">
                  Project
                  <i className="bi bi-asterisk" />
                </span>
                <div className="taskItem_txt">
                  <span
                    onClick={(e) => {
                      showProjectList(e);
                    }}
                  >
                    {
                      project.find((item) => item.id == taskItem?.projectId)
                        ?.projectname
                    }
                  </span>
                  {isEditProject && (
                    <div className="project_list">
                      {project.map((project) => {
                        return (
                          <div
                            className="selectableProject"
                            key={"project id: " + project.id}
                            onClick={() => {
                              modifyProject(project.id);
                              setIsEditProject(!isEditProject);
                            }}
                          >
                            {project.projectname}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="task_milestone">
                <span className="milestone_icon">
                  Milestone
                  <i className="bi bi-asterisk" />
                </span>
                <div
                  className="taskItem_txt"
                  onClick={(e) => {
                    showMilestone(e);
                  }}
                >
                  <span
                    onClick={(e) => {
                      showMilestone(e);
                    }}
                  >
                    {milestone?.name}
                  </span>
                  {isEditMilestone && (
                    <div className="project_list">
                      {milestoneList?.map((milestone) => {
                        return (
                          <div
                            className="selectableProject"
                            key={"mileston id: " + milestone.id}
                            onClick={() => {
                              modifyMilestone(milestone.id);
                              setIsEditMilestone(false);
                            }}
                          >
                            {milestone.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="task_summary">
                <span className="summary_icon">
                  Summary
                  <i className="bi bi-asterisk" />
                </span>
                <div className="taskItem_txt">
                  <span
                    onClick={(e) => {
                      showSummary(e);
                    }}
                  >
                    {taskItem?.summary}
                  </span>
                  {isEditSummary && (
                    <div className="edit_input">
                      <span className="edit_summary_wrap">
                        <input
                          className="edit_summary_input"
                          defaultValue={taskItem?.description}
                          ref={modifiedSummaryRef}
                        />
                        <i
                          className="bi bi-check"
                          onClick={(e) => {
                            modifySummary();
                            showSummary(e);
                          }}
                        />
                        <i
                          className="bi bi-x"
                          onClick={(e) => {
                            showSummary(e);
                          }}
                        />
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="task_currentState">
                <span className="currentState_icon">
                  Current state
                  <i className="bi bi-asterisk" />
                </span>
                <div className="taskItem_txt">
                  <span
                    onClick={(e) => {
                      showCurrentState(e);
                    }}
                  >
                    {
                      statuses.find((item) => item.id == taskItem?.statusId)
                        ?.name
                    }
                  </span>
                  {isEditCurrentState && (
                    <div className="project_list">
                      {statuses.map((status) => {
                        return (
                          <div
                            className="selectableProject"
                            key={"status id: " + status.id}
                            onClick={() => {
                              modifyCurrentState(status.id);
                              setIsEditCS(false);
                            }}
                          >
                            {status.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="task_reporter">
                <span className="reporter_icon">
                  Reporter
                  <i className="bi bi-asterisk" />
                </span>
                <div className="taskItem_txt">
                  <span
                    onClick={(e) => {
                      showMember(e);
                    }}
                  >
                    {
                      memberData.find((item) => item.id == taskItem?.reporterId)
                        ?.name
                    }
                  </span>
                  {isEditReporter && (
                    <div className="project_list">
                      {memberData.map((member) => {
                        return (
                          <div
                            className="selectableProject"
                            key={"member id: " + member.id}
                            onClick={() => {
                              modifyReporter(member.id);
                              setIsEditReporter(false);
                            }}
                          >
                            {member.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="task_description">
                <span className="description_icon">Description</span>
                <div
                  className="taskItem_txt"
                  onClick={(e) => {
                    showDescription(e);
                  }}
                >
                  <span
                    onClick={(e) => {
                      showDescription(e);
                    }}
                  >
                    {taskItem?.description}
                  </span>
                  {isEditDescription && (
                    <div className="edit_input">
                      <span className="edit_des_wrap">
                        <input
                          className="edit_description_input"
                          defaultValue={taskItem?.description}
                          ref={modifiedDescriptionRef}
                        />
                        <i
                          className="bi bi-check"
                          onClick={(e) => {
                            modifyDescription();
                            showDescription(e);
                          }}
                        />
                        <i
                          className="bi bi-x"
                          onClick={(e) => {
                            showDescription(e);
                          }}
                        />
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="task_estimatedTime">
                <span className="estimatedTime_icon">
                  Estimated Time
                  <i className="bi bi-asterisk" />
                </span>
                <div
                  className="taskItem_txt"
                  onClick={(e) => {
                    showETime(e);
                  }}
                >
                  <span
                    onClick={(e) => {
                      showETime(e);
                    }}
                  >
                    {taskItem?.estimatedTime}
                  </span>
                  {isEditETime && (
                    <div className="edit_input">
                      <span className="edit_ETime_wrap">
                        <input
                          className="edit_ETime_input"
                          defaultValue={taskItem?.estimatedTime}
                          ref={modifiedETimeRef}
                        />
                        <i
                          className="bi bi-check"
                          onClick={(e) => {
                            modifyETime();
                            showETime(e);
                          }}
                        />
                        <i
                          className="bi bi-x"
                          onClick={(e) => {
                            showETime(e);
                          }}
                        />
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="task_usageTime">
                <span className="usageTime_icon">Usage Time</span>
                <div
                  className="taskItem_txt"
                  onClick={(e) => {
                    showUTime(e);
                  }}
                >
                  <span
                    onClick={(e) => {
                      showUTime(e);
                    }}
                  >
                    {taskItem?.usageTime ||
                      "Enter it after you finish your work."}
                  </span>
                  {isEditUTime && (
                    <div className="edit_input">
                      <span className="edit_UTime_wrap">
                        <input
                          className="edit_UTime_input"
                          defaultValue={taskItem?.usageTime}
                          ref={modifiedUTimeRef}
                        />
                        <i
                          className="bi bi-check"
                          onClick={(e) => {
                            modifyUTime();
                            showUTime(e);
                          }}
                        />
                        <i
                          className="bi bi-x"
                          onClick={(e) => {
                            showUTime(e);
                          }}
                        />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal_btn">
              <div
                className="cancel_btn"
                onClick={() => {
                  setIsEditProject(false);
                  setIsEditMilestone(false);
                  setIsEditCS(false);
                  setIsEditReporter(false);
                  setIsEditDescription(false);
                  setIsEditSummary(false);
                  hideModal();
                }}
              >
                Cancel
              </div>
              <div
                className="delete_btn"
                onClick={() => {
                  deleteTask();
                }}
              >
                Delete
              </div>
              {/* <div className="enroll_btn">Modify</div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskModal;
