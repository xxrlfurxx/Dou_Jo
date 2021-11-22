import axios from "axios";
import { TaskItem } from "../provider/modules/task";
// import { createAxiosInstance } from "./_request";

export interface StatusItemResponse {
  id: number;
  projectId: number;
  name: string;
  isEdit?: boolean;
  isDetail?: boolean;
  tasks?: TaskItem[];
}
export interface StatusItemRequest {
  projectId: number;
  name: string;
  isEdit?: boolean;
  isDetail?: boolean;
  tasks?: TaskItem[];
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
// process.env.변수명
const statusApi = {
  // axios.get<응답데이터타입>(요청url);
  // GET 응답 URL HTTP/1.1
  get: (id: number) =>
    axios.get<StatusItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/board/${id}`
    ),
  fetch: () =>
    axios.get<StatusItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/board`
    ),
  // axios.post<응답타입>(요청URL, 요청객체(JSON바디));
  // POST 요청URL HTTP/1.1  {...}
  add: (statusItem: StatusItemRequest) =>
    axios.post<StatusItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/board`,
      statusItem
    ),
  // axios.PUT<응답타입>(요청URL, 요청객체(JSON바디));
  // PUT 요청URL HTTP/1.1  {...}
  modify: (id: number, statusItem: StatusItemRequest) =>
    axios.put<StatusItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/board/${id}`,
      statusItem
    ),
  // axios.delete<응답타입>(요청URL);
  // DELETE 요청URL HTTP/1.1
  remove: (id: number) =>
    axios.delete<boolean>(`${process.env.NEXT_PUBLIC_API_BASE}/board/${id}`),
};

export default statusApi;
