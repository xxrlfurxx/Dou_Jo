import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// taskModal Slice
export interface TaskModalState {
  isOn: boolean;
  taskItemId?: Number;
}

const initialState: TaskModalState = {
  isOn: false,
  taskItemId: undefined,
};

export const taskModalSlice = createSlice({
  name: "taskModal",
  initialState,
  reducers: {
    showTaskModal: (state, action: PayloadAction<TaskModalState>) => {
      // console.log(action.type);
      // console.log(action.payload);
      const modalState = action.payload;
      state.isOn = modalState.isOn;
      state.taskItemId = modalState.taskItemId;

      switch (state.isOn) {
        case false:
          console.log("Task Modal : off\nCurrent Task Id : ", state.taskItemId);
          break;
        case true:
          console.log("Task Modal : on\nCurrent Task Id : ", state.taskItemId);
          break;
        default:
          console.log(
            "Task Modal : error\nCurrent Task Id : ",
            state.taskItemId
          );
          break;
      }
    },
  },
});

export const { showTaskModal } = taskModalSlice.actions;

export default taskModalSlice.reducer;
