import axios from "axios";

export interface ProjectPagingReponse {
  content: ProjectItemResponse[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface ProjectItemResponse {
  projectname: string;
  id: number;
  milestone: [];
  startdate: string;
  enddate: string;
  manager: string;
  engineer: string;
  memo: string;
}

export interface ProjectItemRequest {
  projectname: string;
  milestone: [];
  startdate: string;
  enddate: string;
  manager: string;
  engineer: string;
  memo: string;
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
const projectApi = {
  getProject: (id: number) =>
    axios.get<ProjectItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/projects/${id}`
    ),

  fetchProject: () =>
    axios.get<ProjectItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/projects`
    ),

  // fetchPaging: (page: number, size: number) =>
  //   axios().get<ProjectPagingReponse>(
  //     `${process.env.NEXT_PUBLIC_API_BASE}/projects/paging?page=${page}&size=${size}`
  //   ),

  addProject: (projectItem: ProjectItemRequest) =>
    axios.post<ProjectItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/projects`,
      projectItem
    ),

  modifyProject: (id: number, projectItem: ProjectItemRequest) =>
    axios.put<ProjectItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/projects/${id}`,
      projectItem
    ),

  removeProject: (id: number) =>
    axios.delete<boolean>(`${process.env.NEXT_PUBLIC_API_BASE}/projects/${id}`),
};

export default projectApi;
