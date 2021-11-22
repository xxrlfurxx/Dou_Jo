import axios from "axios";

export interface ProjectItemResponse {
  id : number;
  milestone: [];
  startdate: string;
  enddate: string;
  manager: string;
  engineer: string;
  memo: string;
}

export interface ProjectItemRequest {
  milestine: [];
  startdate: string;
  enddate: string;
  manager: string;
  engineer: string;
  memo: string;
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
const projectApi = {

  fetch: () =>
    axios.get<ProjectItemResponse[]>(`${process.env.NEXT_PUBLIC_API_BASE}/projects`),

  add: (projectItem : ProjectItemRequest) =>
    axios.post<ProjectItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/projects`, 
      projectItem
    ),
}

export default projectApi;