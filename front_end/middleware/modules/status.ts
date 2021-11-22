import statusReducer, {
  addStatus,
  modifyStatus,
  removeStatus,
  initialStatus,
  initialCompleted,
  StatusItem,
  DropItem,
} from "../../provider/modules/status";
import { createAction, PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import api, { StatusItemRequest, StatusItemResponse } from "../../api/status";
import { AxiosResponse } from "axios";

/* saga action 생성 */

export const requestFetchStatus = createAction(
  `${statusReducer.name}/requestFetchStatus`
);
export const requestAddStatus = createAction<StatusItem>(
  `${statusReducer.name}/requestAddStatus`
);
export const requestModifyStatus = createAction<StatusItem>(
  `${statusReducer.name}/requestModifyStatus`
);
export const requestRemoveStatus = createAction<number>(
  `${statusReducer.name}/requestRemoveStatus`
);

/* saga action 처리 부분 */
// 서버에 POST
function* addData(action: PayloadAction<StatusItem>) {
  try {
    const statusItemPayload = action.payload;
    const statusItemRequest: StatusItemRequest = {
      name: statusItemPayload.name,
      projectId: statusItemPayload.projectId,
      isEdit: statusItemPayload.isEdit,
      isDetail: statusItemPayload.isDetail,
      tasks: statusItemPayload.tasks,
    };
    const result: AxiosResponse<StatusItemResponse> = yield call(
      api.add,
      statusItemRequest
    );
    const statusItem: StatusItem = {
      id: result.data.id,
      projectId: result.data.projectId,
      name: result.data.name,
      isDetail: result.data.isDetail,
      isEdit: result.data.isEdit,
      tasks: result.data.tasks,
    };
    // dispatcher와 동일한 처리
    // useDispatch로 dispatcher 만든 것은 컴포넌트에서만 가능
    // put 이펙트를 사용함
    yield put(addStatus(statusItem));
    // complete 속성 삭제
    yield put(initialCompleted());

    // alert 박스 같은거 만들지 고민
  } catch (e: any) {
    // 에러 발생시
    console.log("Add Status: Error");
  }
}
function* fetchData() {
  yield console.log("----Saga: fetch Data----");
  // 백엔드에서 데이터 받아오기
  const result: AxiosResponse<StatusItemResponse[]> = yield call(api.fetch);
  // 응답 데이터 배열을 액션페이로드 배열로 변환
  // StatusItemResponse[] => StatusItem[]
  const statuss = result.data.map(
    (item) =>
      ({
        id: item.id,
        name: item.name,
        isDetail: item.isDetail,
        isEdit: item.isEdit,
        tasks: item.tasks,
      } as StatusItem)
  );
  yield put(initialStatus(statuss));
}
// function* modifyDropData(action: PayloadAction<DropItem>) {
//   yield console.log("----Saga: Drop Data----");
//   const taskIndexPayload = action.payload.taskIndex;
//   const taskItemPayload = action.payload.taskItem;
//   // rest api로 보낼 요청 객체
//   // const droppedItemRequest
//   // 드래그할때는 해당 테스크 삭제하고 드랍할떄 넣은 배열 인덱스에 맞게 테스크 아이탬 넣어주는데 어떻게 작성해야할지 모르겠다.
// }
function* modifyData(action: PayloadAction<StatusItem>) {
  yield console.log("----Saga: modify Data----");
  const statusItemPayload = action.payload;
  // rest api로 보낼 요청 객체
  const statusItemRequest: StatusItemRequest = {
    name: statusItemPayload.name,
    projectId: statusItemPayload.projectId,
    isDetail: statusItemPayload.isDetail,
    isEdit: statusItemPayload.isEdit,
    tasks: statusItemPayload.tasks,
  };
  const result: AxiosResponse<StatusItemResponse> = yield call(
    api.modify,
    statusItemPayload.id,
    statusItemRequest
  );
  // 백엔드에서 처리한 데이터 객체로 state를 변경할 payload객체 생성
  const statusItem: StatusItem = {
    id: result.data.id,
    projectId: result.data.projectId,
    name: result.data.name,
    isDetail: result.data.isDetail,
    isEdit: result.data.isEdit,
    tasks: result.data.tasks,
  };
  // state 변경
  yield put(modifyStatus(statusItem));
  // complete 속성 삭제
  yield put(initialCompleted());
}
function* removeData(action: PayloadAction<number>) {
  yield console.log("----Saga: delete Data----");
  const id = action.payload;
  // rest api 연동
  const result: AxiosResponse<boolean> = yield call(api.remove, id);
  // 반환값이 true면
  if (result.data) {
    yield put(removeStatus(id));
  }
  yield put(initialCompleted());
}
/* saga action을 감지(take)하는 부분 */
// task redux state 처리와 관련된 saga action들을 감지(take)할 saga를 생성
// saga는 generator 함수로 작성
export default function* statusSaga() {
  // takeEvery(처리할액션, 액션을처리할함수) : 동일한 타입의 액션은 모두 처리함
  // takeLatest(처리할액션, 액션을처리할함수) : 동일한 타입의 액션중에서 가장 마지막 액션만 처리, 이전 액션은 취소
  yield takeEvery(requestAddStatus, addData);
  yield takeLatest(requestFetchStatus, fetchData);
  yield takeLatest(requestModifyStatus, modifyData);
  yield takeEvery(requestRemoveStatus, removeData);
}
