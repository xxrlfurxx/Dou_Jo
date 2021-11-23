import projectReducer, {
  addProject,
  initialCompleted,
  initialProject,
  modifyProject,
  removeProject,
} from "../../provider/modules/project";

import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { ProjectItem } from "../../provider/modules/project";
import { call, put, takeEvery } from "@redux-saga/core/effects";
import api, {
  ProjectItemRequest,
  ProjectItemResponse,
} from "../../api/project";
import { AxiosResponse } from "axios";
import { takeLatest } from "redux-saga/effects";

// project를 추가하도록 요청하는 action
export const requestAddProject = createAction<ProjectItem>(
  `${projectReducer.name}/requestAddProject`
);

export const requestFetchProject = createAction<ProjectItem>(
  `${projectReducer.name}/requestFetchProject`
);

export const requestRemoveProject = createAction<number>(
  `${projectReducer.name}/requestRemoveProject`
);

export const requestModifyProject = createAction<ProjectItem>(
  `${projectReducer.name}/requestModifyProject`
);

// ==== saga action 처리 부분 ====//
function* addData(action: PayloadAction<ProjectItem>) {
  yield console.log("---addData---");
  yield console.log(action);

  try {
    // action의 payload로 넘어온 객체
    const projectItemPayload = action.payload;

    // res api로 보낼 요청객체
    const projectItemRequest: ProjectItemRequest = {
      projectname: projectItemPayload.projectname,
      milestone: [],
      startdate: projectItemPayload.startdate,
      enddate: projectItemPayload.enddate,
      manager: projectItemPayload.manager,
      engineer: projectItemPayload.engineer,
      memo: projectItemPayload.memo,
    };
    // rest api에 post로 데이터를 보냄
    // 함수를 호출함 (비동기함수)
    // call(비동기함수, 매개변수1, 매개변수2...)

    // await api.add(projectItemRequest) 이 구문과 일치
    const result: AxiosResponse<ProjectItemResponse> = yield call(
      api.addProject,
      projectItemRequest
    );

    const projectItem: ProjectItem = {
      id: result.data.id,
      projectname: result.data.projectname,
      startdate: result.data.startdate,
      enddate: result.data.enddate,
      manager: result.data.manager,
      engineer: result.data.engineer,
      milestone: result.data.milestone,
      memo: result.data.memo,
    };

    yield put(addProject(projectItem));

    yield put(initialCompleted());
  } catch (e: any) {
    // 에러 발생시
    console.log("Add Project: Error");
  }
}

function* modifyData(action: PayloadAction<ProjectItem>) {
  yield console.log("----Saga: modify project Data----");
  const projectItemPayload = action.payload;
  // rest api로 보낼 요청 객체
  const projectItemRequest: ProjectItemRequest = {
    projectname: projectItemPayload.projectname,
    milestone: [],
    startdate: projectItemPayload.startdate,
    enddate: projectItemPayload.enddate,
    manager: projectItemPayload.manager,
    engineer: projectItemPayload.engineer,
    memo: projectItemPayload.memo,
  };
  const result: AxiosResponse<ProjectItemResponse> = yield call(
    api.modifyProject,
    projectItemPayload.id,
    projectItemRequest
  );
  // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload객체 생성
  const projectItem: ProjectItem = {
    id: result.data.id,
    projectname: result.data.projectname,
    milestone: result.data.milestone,
    startdate: result.data.startdate,
    enddate: result.data.enddate,
    manager: result.data.manager,
    engineer: result.data.engineer,
    memo: result.data.memo,
  };
  // state 변경
  yield put(modifyProject(projectItem));
  // complete 속성 삭제
  yield put(initialCompleted());
}

function* fetchData() {
  yield console.log("---saga: fetch Project Data---");
  const result: AxiosResponse<ProjectItemResponse[]> = yield call(
    api.fetchProject
  );
  const project = result.data.map(
    (item) =>
      ({
        id: item.id,
        projectname: item.projectname,
        milestone: item.milestone,
        startdate: item.startdate,
        enddate: item.enddate,
        manager: item.manager,
        engineer: item.engineer,
        memo: item.memo,
      } as ProjectItem)
  );
  yield put(initialProject(project));
}

function* removeData(action: PayloadAction<number>) {
  yield console.log(
    "----saga: delete project Data // delete Project Id: " + action.payload
  );
  const id = action.payload;
  const result: AxiosResponse<boolean> = yield call(api.removeProject, id);
  if (result.data) {
    yield put(removeProject(id));
  }
  yield put(initialCompleted());
}
export default function* projectSaga() {
  // dispatcher 동일한 타입의 액션을 모두 처리
  yield takeEvery(requestAddProject, addData);
  yield takeEvery(requestFetchProject, fetchData);
  yield takeLatest(requestModifyProject, modifyData);
  yield takeLatest(requestRemoveProject, removeData);
}
