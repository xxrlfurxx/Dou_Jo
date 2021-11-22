import axios from "axios";
import { DropItem } from "../provider/modules/status";
import { StatusItemResponse } from "./status";

export interface TaskItemResponse {
  id: number;
  projectId: number;
  milestoneId: number;
  statusId: number;
  reporterId: number;
  summary: string;
  description?: string;
  estimatedTime: number;
  usageTime?: number;
  priority: number;
}
export interface TaskItemRequest {
  // id: number;
  projectId: number;
  milestoneId: number;
  statusId: number;
  reporterId: number;
  summary: string;
  description?: string;
  estimatedTime: number;
  usageTime?: number;
  priority: number;
}

// 서버와 데이터 연동 목록
// get과 fetch는 필요없음
const taskApi = {
  // task create, update, delete (셋 다 컬럼 내부의 배열을 수정하는 것임)
  // task 목록은 필요 없으니 read는 구현 안해도됨, 개별 task read는 갖고온 status 데이터를 조작해 리덕스의 모달창으로 조회
  getTask: (statusId: number) =>
    axios.get<StatusItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/board${statusId}`
    ),

  fetchTask: () =>
    axios.get<TaskItemResponse>(`${process.env.NEXT_PUBLIC_API_BASE}/board`),

  addTask: (taskItem: TaskItemRequest) =>
    axios.post<TaskItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/board`,
      taskItem
    ),

  modifyTask: (id: number, taskItem: TaskItemRequest) =>
    axios.put<TaskItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/board/${id}`,
      taskItem
    ),

  removeTask: (id: number) =>
    axios.delete<boolean>(`${process.env.NEXT_PUBLIC_API_BASE}/board/${id}`),
};

export default taskApi;
