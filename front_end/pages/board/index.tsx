import { useEffect, useState, useRef, MutableRefObject } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import ModalCreate from "../../components/modal/TaskModalCreate";
import TaskModal from "../../components/modal/TaskModal";
import { AppDispatch, RootState } from "../../provider";
import { TaskItem } from "../../provider/modules/task";
import { showTaskModal } from "../../provider/modules/taskModal";
import {
  StatusItem,
  dropTask,
  modifyStatus,
  removeStatus,
  removeTask,
} from "../../provider/modules/status";
import { memberData } from "../../components/Members";
import CreateStateBtn from "../../components/modal/StateModalCreate";

const Boards = () => {
  const status = useSelector((state: RootState) => state.status.data);
  const taskItems: TaskItem[] = [];
  status.map((item) => item.tasks?.forEach((item) => taskItems.push(item)));
  const dispatch = useDispatch<AppDispatch>();
  const newStatusName = useRef() as MutableRefObject<HTMLInputElement>;

  // status 이름 변경
  const editStatusName = (statusId: number) => {
    const item = status.find((item) => item.id == statusId);
    if (item) {
      const modifiedItem: StatusItem = {
        id: item.id,
        projectId: item.projectId,
        name: item.name,
        tasks: item.tasks,
        isEdit: true,
      };
      dispatch(modifyStatus(modifiedItem));
    }
  };
  const saveStatusName = (statusId: number) => {
    const item = status.find((item) => item.id == statusId);
    if (item) {
      const modifiedItem: StatusItem = {
        id: item.id,
        projectId: item.projectId,
        name: newStatusName.current.value,
        tasks: item.tasks,
        isEdit: false,
      };
      dispatch(modifyStatus(modifiedItem));
    }
  };
  // status detail 버튼
  const statusDetail = (statusId: number) => {
    const item = status.find((item) => item.id == statusId);
    if (item) {
      const detailOnItem: StatusItem = {
        id: item.id,
        projectId: item.projectId,
        name: item.name,
        tasks: item.tasks,
        isDetail: !item.isDetail,
      };
      dispatch(modifyStatus(detailOnItem));
    }
  };
  // status delete
  const deleteStatus = (statusId: number) => {
    const item = status.find((item) => item.id == statusId);
    if (item) {
      dispatch(removeStatus(item.id));
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    console.log(result);

    const draggedIndex = result.source.index; // 드래그한 컬럼 내 tasks 배열 index
    const draggedStatusId = Number(result.source.droppableId);
    // 드래그한 status
    const draggedStatus = status.find((item) => item.id == draggedStatusId);
    const droppedIndex = result.destination.index; // 드랍한 컬럼 내 tasks 배열 index
    const droppedStatusId = Number(result.destination.droppableId);
    // 드랍한 status
    const droppedStatus = status.find((item) => item.id == droppedStatusId);
    const draggedTaskId = Number(result.draggableId);
    // 드래그한 task
    const draggedTask = taskItems.find((item) => item.id == draggedTaskId);
    // 드래그한 status 변경
    if (draggedTask) {
      dispatch(
        removeTask({
          taskId: draggedTask.id,
          statusId: draggedTask.statusId,
        })
      );
    }
    // 드랍한 task를 만들고 드랍한 status을 변경
    if (draggedTask) {
      const droppedTask: TaskItem = {
        id: draggedTask.id,
        projectId: draggedTask.projectId,
        milestoneId: draggedTask.milestoneId,
        summary: draggedTask.summary,
        reporterId: draggedTask.reporterId,
        description: draggedTask.description,
        estimatedTime: draggedTask.estimatedTime,
        priority: draggedTask.priority,
        usageTime: draggedTask.usageTime,
        statusId: droppedStatusId,
      };
      dispatch(dropTask({ taskIndex: droppedIndex, taskItem: droppedTask }));
    }
  };
  // 상세보기 modal 관련 로직
  const showModal = (clickedId?: Number) => {
    const offModal = showTaskModal({
      isOn: true,
      taskItemId: clickedId,
    });
    dispatch(offModal);
  };

  useEffect(() => {
    currentStatusState();
  }, [status]);

  const currentStatusState = () => {
    console.log("---- ↓ Status ----");
    console.log(status);
  };

  return (
    <div className="board">
      <TaskModal />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div>
          <h2>Task Board</h2>
        </div>
        <div className="features">
          <div className="search_task">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="features_btn">
            <div className="board_btn">Only My Tasks</div>
          </div>
          <div className="features_btn">
            <ModalCreate />
          </div>
          <div className="features_btn">
            <CreateStateBtn />
          </div>
        </div>
        <div className="taskboard">
          {status.map((status, index) => {
            return (
              // draggable 넣어서 status 배열 조작
              <div className="taskboard_status" key={index + status.name}>
                {!status.isEdit && (
                  <div className="status_name">
                    <div
                      className="status_title"
                      onClick={() => {
                        editStatusName(status.id);
                      }}
                    >
                      {status.name}
                    </div>
                    <span className="status_detail">
                      <i
                        className="bi bi-three-dots"
                        onClick={() => {
                          statusDetail(status.id);
                        }}
                      />
                      {status.isDetail && (
                        <div className="status_detail_wrap">
                          <div
                            className="status_delete_btn"
                            onClick={() => {
                              deleteStatus(status.id);
                            }}
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </span>
                  </div>
                )}
                {status.isEdit && (
                  <div className="edit_status_name">
                    <input
                      className="edit_status_input"
                      ref={newStatusName}
                      placeholder={status.name}
                      defaultValue={status.name}
                    />
                    <div
                      className="edit_status_btn_check"
                      onClick={() => {
                        saveStatusName(status.id);
                      }}
                    >
                      <i className="bi bi-check" />
                    </div>
                  </div>
                )}
                <Droppable droppableId={String(status.id)} key={status.name}>
                  {(provided) => (
                    <div
                      key={status.id + status.name}
                      className="task_statusBox"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {status.tasks &&
                        status.tasks.map((item, index) => (
                          <Draggable
                            key={index + item.reporterId + item.summary}
                            draggableId={String(item.id)}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                className="tasks"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <div
                                  className="task_wrap"
                                  onClick={() => {
                                    showModal(item.id);
                                  }}
                                >
                                  <div className="task_summary">
                                    {item.summary}
                                  </div>
                                  <div className="task_description">
                                    <div className="task_number">
                                      #{item.id}
                                    </div>
                                    <div
                                      className="task_reporter_thumb"
                                      style={{
                                        backgroundImage: `url(${
                                          memberData.find(
                                            (member) =>
                                              member.id == item.reporterId
                                          )?.profileImg
                                        })`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              // draggable 넣어서 status 배열 조작
            );
          })}
          <div className="edit-task-state"></div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default Boards;
