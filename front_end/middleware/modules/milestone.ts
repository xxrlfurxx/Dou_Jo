import milestoneReducer, {
  addMilestone,
  initialCompleted,
  initialMilestone,
  modifyMilestone,
  removeMilestone,
} from "../../provider/modules/project";

import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { MilestoneItem } from "../../provider/modules/project";
import { call, put, takeEvery } from "@redux-saga/core/effects";
import { AxiosResponse } from "axios";
import { takeLatest } from "redux-saga/effects";
import api, {
  MilestoneItemRequest,
  MilestoneItemResponse,
} from "../../api/milestone";

export const requestAddMilestone = createAction<MilestoneItem>(
  `${milestoneReducer.name}/requestAddMilestone`
);

export const requestFetchMilestone = createAction<MilestoneItem>(
  `${milestoneReducer.name}/requestFetchMilestone`
);

export const requestRemoveMilestone = createAction<number>(
  `${milestoneReducer.name}/requestRemoveMilestone`
);

export const requestModifyMilestone = createAction<MilestoneItem>(
  `${milestoneReducer.name}/requestModifyMilestone`
);

// ==== saga action 처리 부분 ====//
function* addData(action: PayloadAction<MilestoneItem>) {
  yield console.log("---addData---");
  yield console.log(action);

  try {
    // action의 payload로 넘어온 객체
    const milestoneItemPayload = action.payload;

    // res api로 보낼 요청객체
    const milestoneItemRequest: MilestoneItemRequest = {
      name: milestoneItemPayload.name,
      startDate: milestoneItemPayload.startdate,
      endDate: milestoneItemPayload.enddate,
    };
    // rest api에 post로 데이터를 보냄
    // 함수를 호출함 (비동기함수)
    // call(비동기함수, 매개변수1, 매개변수2...)

    // await api.add(projectItemRequest) 이 구문과 일치
    const result: AxiosResponse<MilestoneItemResponse> = yield call(
      api.addMilestone,
      milestoneItemRequest
    );

    const milestoneItem: MilestoneItem = {
      id: result.data.id,
      name: result.data.name,
      startdate: result.data.startDate,
      enddate: result.data.endDate,
      projectId: result.data.projectId,
    };

    yield put(addMilestone(milestoneItem));

    yield put(initialCompleted());
  } catch (e: any) {
    // 에러 발생시
    console.log("Add Project: Error");
  }
}

function* modifyData(action: PayloadAction<MilestoneItem>) {
  yield console.log("----Saga: modify project Data----");
  const milestoneItemPayload = action.payload;
  // rest api로 보낼 요청 객체
  const milestoneItemRequest: MilestoneItemRequest = {
    name: milestoneItemPayload.name,
    startDate: milestoneItemPayload.startdate,
    endDate: milestoneItemPayload.enddate,
  };
  const result: AxiosResponse<MilestoneItemResponse> = yield call(
    api.modifyMilestone,
    milestoneItemPayload.id,
    milestoneItemRequest
  );
  // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload객체 생성
  const milestoneItem: MilestoneItem = {
    id: result.data.id,
    name: result.data.name,
    startdate: result.data.startDate,
    enddate: result.data.endDate,
    projectId: result.data.projectId,
  };
  // state 변경
  yield put(modifyMilestone(milestoneItem));
  // complete 속성 삭제
  yield put(initialCompleted());
}

function* fetchData() {
  yield console.log("---saga: fetch Project Data---");
  const result: AxiosResponse<MilestoneItemResponse[]> = yield call(
    api.fetchMilestone
  );
  const milestone = result.data.map(
    (item) =>
      ({
        id: item.id,
        name: item.name,
        startdate: item.startDate,
        enddate: item.endDate,
        projectId: item.projectId,
      } as MilestoneItem)
  );
  yield put(initialMilestone([]));
}

function* removeData(action: PayloadAction<number>) {
  yield console.log(
    "----saga: delete milestone Data // delete Milestone Id: " + action.payload
  );
  const id = action.payload;
  const result: AxiosResponse<boolean> = yield call(api.removeMilestone, id);
  if (result.data) {
    yield put(removeMilestone(milestoneId));
  }
  yield put(initialCompleted());
}
export default function* milestoneSaga() {
  // dispatcher 동일한 타입의 액션을 모두 처리
  yield takeEvery(requestAddMilestone, addData);
  yield takeEvery(requestFetchMilestone, fetchData);
  yield takeLatest(requestModifyMilestone, modifyData);
  yield takeLatest(requestRemoveMilestone, removeData);
}
