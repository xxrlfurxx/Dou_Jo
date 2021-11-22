import projectReducer from "../../provider/modules/project";

import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { ProjectItem } from "../../provider/modules/project";
import { takeEvery } from "@redux-saga/core/effects";
import { ProjectItemRequest } from "../../api/project";

// project를 추가하도록 요청하는 action
export const requestAddProject = createAction<ProjectItem>(
  `${projectReducer.name}/requestAddProject`
);

// ==== saga action 처리 부분 ====//
function* addData(action: PayloadAction<ProjectItem>) {
  yield console.log("---addData---");
  yield console.log(action);

  // action의 payload로 넘어온 객체
  const projectItemPayload = action.payload;

  // res api로 보낼 요청객체
  const projectItemRequest : ProjectItemRequest = {
    milestone: mileston[],
    startdate: projectItemPayload.startdate,
    enddate: projectItemPayload.enddate,
    manager: projectItemPayload.manager,
    engineer: projectItemPayload.engineer,
    memo: projectItemPayload.memo,
  }
}

export default function* projectSaga() {
  // dispatcher 동일한 타입의 액션을 모두 처리
  yield takeEvery(requestAddProject, addData);
}