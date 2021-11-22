import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskItem } from "./task";

export interface StatusItem {
  id: number;
  name: string;
  tasks?: TaskItem[];
  projectId: number;
  isEdit?: boolean;
  isDetail?: boolean;
}

interface StatusState {
  data: StatusItem[];
  isFetched: boolean;
  isAddCompleted?: boolean;
  isModifyCompleted?: boolean;
  isReorderCompleted?: boolean;
  isRemoveCompleted?: boolean;
  isAddTaskCompleted?: boolean;
  isModifyTaskCompleted?: boolean;
  isRemoveTaskCompleted?: boolean;
}

export interface RemoveTaskProps {
  statusId: Number;
  taskId: Number;
}

export interface DropItem {
  taskIndex: number;
  taskItem: TaskItem;
}

const initialState: StatusState = {
  data: [
    {
      id: 1,
      name: "Backlog",
      projectId: 1,
      tasks: [
        {
          id: 1,
          projectId: 1,
          milestoneId: 1,
          statusId: 1,
          reporterId: 1,
          summary: "Go to work & cook krab-burgers",
          description: "Description for Test-Task-1",
          estimatedTime: 1,
          // usageTime:
          priority: 1,
        },
        {
          id: 6,
          projectId: 3,
          milestoneId: 3,
          statusId: 1,
          reporterId: 2,
          summary: "Breath & sleep",
          description: "Description for Test-Task-1",
          estimatedTime: 1,
          // usageTime:
          priority: 1,
        },
      ],
    },
    {
      id: 2,
      name: "Selected",
      projectId: 1,
      isEdit: false,
      tasks: [
        {
          id: 2,
          projectId: 2,
          milestoneId: 2,
          statusId: 2,
          reporterId: 3,
          summary: "Counting money (just for fun)",
          description: "Description for Test-Task-2",
          estimatedTime: 2,
          // usageTime:
          priority: 1,
        },
      ],
    },
    {
      id: 3,
      name: "In progress",
      isEdit: false,
      projectId: 1,
      tasks: [
        {
          id: 3,
          projectId: 4,
          milestoneId: 4,
          statusId: 3,
          reporterId: 4,
          summary: "Defeat Koopa and save the princess",
          description: "Description for Test-Task-3",
          estimatedTime: 3,
          // usageTime:
          priority: 1,
        },
      ],
    },
    {
      id: 4,
      name: "Done",
      isEdit: false,
      projectId: 1,
      tasks: [
        {
          id: 4,
          projectId: 4,
          milestoneId: 4,
          statusId: 4,
          reporterId: 5,
          summary: "Help his brother_mario",
          description: "Description for Test-Task-33",
          estimatedTime: 3,
          // usageTime: ,
          priority: 1,
        },
      ],
    },
    {
      id: 5,
      name: "Bug",
      isEdit: false,
      projectId: 1,
      tasks: [
        {
          id: 5,
          projectId: 5,
          milestoneId: 5,
          statusId: 5,
          reporterId: 6,
          summary: "ALWAYS KIDNAPPED",
          description: "Description for Test-Task-3",
          estimatedTime: 3,
          // usageTime: ,
          priority: 1,
        },
      ],
    },
  ],
  isFetched: false,
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    // status
    addStatus: (state, action: PayloadAction<StatusItem>) => {
      const status = action.payload;
      state.data.push(status);
      state.isAddCompleted = true;
    },
    modifyStatus: (state, action: PayloadAction<StatusItem>) => {
      const modifyItem = action.payload;
      const statusItem = state.data.find((item) => item.id == modifyItem.id);
      if (statusItem) {
        statusItem.id = modifyItem.id;
        statusItem.projectId = modifyItem.projectId;
        statusItem.name = modifyItem.name;
        statusItem.tasks = modifyItem.tasks;
        statusItem.isEdit = modifyItem.isEdit;
        statusItem.isDetail = modifyItem.isDetail;
      }
      state.isModifyCompleted = true;
    },
    // resetEditMode: (state) => {
    //   state.data.forEach(
    //     (item) => (item.isDetail = false && item.isEdit == false)
    //   );
    //   console.log("reset configs");
    // },
    removeStatus: (state, action: PayloadAction<Number>) => {
      const id = action.payload;
      state.data.splice(
        state.data.findIndex((item) => item.id == id),
        1
      );
      state.isRemoveCompleted = true;
    },
    initialStatus: (state, action: PayloadAction<StatusItem[]>) => {
      const statuss = action.payload; // 백엔드에서 받아온 status
      state.data = statuss;
      state.isFetched = true;
    },
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    // task
    addTask: (state, action: PayloadAction<TaskItem>) => {
      const taskItem = action.payload;
      const parentStatus = state.data.find(
        (item) => item.id == taskItem.statusId
      );
      if (parentStatus) {
        parentStatus.tasks?.unshift(taskItem);
      }
      console.log(taskItem);
      state.isAddTaskCompleted = true;
    },
    modifyTask: (state, action: PayloadAction<TaskItem>) => {
      const modifyItem: TaskItem = action.payload;

      const parentStatus = state.data.find(
        (item) => item.id == modifyItem.statusId
      );
      const taskItem = parentStatus?.tasks?.find(
        (item) => item.id == modifyItem.id
      );
      if (taskItem) {
        taskItem.id = modifyItem.id;
        taskItem.projectId = modifyItem.projectId;
        taskItem.milestoneId = modifyItem.milestoneId;
        taskItem.summary = modifyItem.summary;
        taskItem.reporterId = modifyItem.reporterId;
        taskItem.description = modifyItem.description;
        taskItem.estimatedTime = modifyItem.estimatedTime;
        taskItem.usageTime = modifyItem.usageTime;
        taskItem.statusId = modifyItem.statusId;
        taskItem.priority = modifyItem.priority;

        console.log("Modify Task: Complete");
        console.log(modifyItem);
        state.isModifyTaskCompleted = true;
      } else {
        console.log("Modify Task: Error");
      }
    },
    dropTask: (state, action: PayloadAction<DropItem>) => {
      const taskIndex = action.payload.taskIndex;
      const taskItem = action.payload.taskItem;
      const parentStatus = state.data.find(
        (item) => item.id == taskItem.statusId
      );
      parentStatus?.tasks?.splice(taskIndex, 0, taskItem);
    },
    removeTask: (state, action: PayloadAction<RemoveTaskProps>) => {
      const id = action.payload.taskId;
      const currentStateId = action.payload.statusId;
      const parentStatus = state.data.find((item) => item.id == currentStateId);
      if (parentStatus) {
        parentStatus.tasks?.splice(
          parentStatus.tasks?.findIndex((item) => item.id == id),
          1
        );
        console.log("아이디 아래");
        console.log(id);
        state.isRemoveTaskCompleted = true;
      }
    },
  },
});

export const {
  addStatus,
  addTask,
  modifyStatus,
  modifyTask,
  dropTask,
  removeStatus,
  removeTask,
  initialStatus,
  initialCompleted,
} = statusSlice.actions;

export default statusSlice.reducer;
