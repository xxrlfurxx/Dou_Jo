import axios from "axios";

export interface MilestoneItemResponse {
  id: number;
  Name: string;
  startDate: string;
  endDate: string;
  projectId: number;
}

export interface MilestoneItemRequest {
  Name: string;
  startDate: string;
  endDate: string;
}

// 서버하고 데이터 연동하는 api처리 목록을 별도의 객체로 작성
const milestoneApi = {
  getMilestone: (id: number) =>
    axios.get<MilestoneItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/milestone/${id}`
    ),

  fetchMilestone: () =>
    axios.get<MilestoneItemResponse[]>(
      `${process.env.NEXT_PUBLIC_API_BASE}/projects`
    ),

  // fetchPaging: (page: number, size: number) =>
  //   axios().get<ProjectPagingReponse>(
  //     `${process.env.NEXT_PUBLIC_API_BASE}/projects/paging?page=${page}&size=${size}`
  //   ),

  addMilestone: (milestoneItem: MilestoneItemRequest) =>
    axios.post<MilestoneItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/projects`,
      milestoneItem
    ),

  modifyMilestone: (id: number, milestoneItem: MilestoneItemRequest) =>
    axios.put<MilestoneItemResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE}/milestone/${id}`,
      milestoneItem
    ),

  removeMilestone: (id: number) =>
    axios.delete<boolean>(
      `${process.env.NEXT_PUBLIC_API_BASE}/milestone/${id}`
    ),
};

export default milestoneApi;
