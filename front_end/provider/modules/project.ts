import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { penguin } from "../../common/data";

// - 목록조회: 4열 그리드화면으로 목록조회(프로필, 타이틀, 이미지)
// - 사진추가: 추가버튼으로 제목, 설명, 이미지파일 선택 후 추가, 목록버튼

// 데이터구조를 interface로 만듦
export interface ProjectItem {
  id: number;
  projectname: string;
  startdate: string;
  enddate: string;
  manager: string;
  engineer: string;
  milestone: MilestonItem[];
  memo: string;
}

export interface MilestonItem {
  id: number;
  name: string;
  startdate: string;
  enddate: string;
  projectId: number;
}

export interface MilestoneEdit {
  milestoneId: number;
  projectId: number;
}

export interface ProjectPage {
  data: ProjectItem[];
  totalElements: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast: boolean;
}

// 백엔드 연동 고려해서 state 구조를 설계
interface ProjectState {
  data: ProjectItem[]; // 포토 아이템 배열
  isFetched: boolean; // 서버에서 데이터를 받아왔는지에 대한 여부
  isAddCompleted?: boolean; // 데이터 추가가 완료되었는지 여부
  isRemoveCompleted?: boolean; // 데이터 삭제가 완료되었는지 여부
  isModifyCompleted?: boolean; // 데이터 수정이 완료되었는지 여부
  totalElements?: number;
  totalPages: number;
  page: number;
  pageSize: number;
  isLast?: boolean;
}

// const photoPageSize = localStorage.getItem("photo_page_size");

// photo state를 목록 -> array
const initialState: ProjectState = {
  data: [
    {
      id: 5,
      projectname: "협업툴 만들기5",
      milestone: [
        {
          id: 1,
          name: "drag&drop",
          startdate: "2021-11-01",
          enddate: "2021-11-30",
          projectId: 5,
        },
        {
          id: 2,
          name: "drag&drop2",
          startdate: "2021-11-03",
          enddate: "2021-12-30",
          projectId: 5,
        },
        {
          id: 3,
          name: "drag&drop3",
          startdate: "2021-11-02",
          enddate: "2021-12-01",
          projectId: 5,
        },
        
      ],
      startdate: "2021-11-01",
      enddate: "2021-11-30",
      manager: "강윤석",
      engineer: "강윤석",
      memo: "작업중",
    },
    {
      id: 4,
      projectname: "협업툴 만들기4",
      milestone: [
        {
          id: 1,
          projectId: 4,
          name: "메인화면",
          startdate: "2021-11-01",
          enddate: "2021-11-30",
        },
        {
          id: 2,
          name: "메인화면1",
          startdate: "2021-11-03",
          enddate: "2021-12-30",
          projectId: 4,
        },
        {
          id: 3,
          name: "메인화면2",
          startdate: "2021-11-02",
          enddate: "2021-12-01",
          projectId: 4,
        },
      ],
      startdate: "2021-11-01",
      enddate: "2021-11-30",
      manager: "강윤석",
      engineer: "허준",
      memo: "작업중",
    },
    {
      id: 3,
      projectname: "협업툴 만들기3",
      milestone: [
        {
          id: 1,
          projectId: 3,
          name: "project제작",
          startdate: "2021-11-01",
          enddate: "2021-11-30",
        },
        {
          id: 2,
          name: "project제작1",
          startdate: "2021-11-03",
          enddate: "2021-12-30",
          projectId: 3,
        },
        {
          id: 3,
          name: "project제작2",
          startdate: "2021-11-02",
          enddate: "2021-12-01",
          projectId: 3,
        },
      ],
      startdate: "2021-11-01",
      enddate: "2021-11-30",
      manager: "허준",
      engineer: "허준",
      memo: "작업중",
    },
    {
      id: 2,
      projectname: "협업툴 만들기2",
      milestone: [
        {
          id: 1,
          projectId: 2,
          name: "wiki제작",
          startdate: "2021-11-01",
          enddate: "2021-11-30",
        },
        {
          id: 2,
          name: "wiki제작1",
          startdate: "2021-11-03",
          enddate: "2021-12-30",
          projectId: 2,
        },{
          id: 3,
          name: "wiki제작2",
          startdate: "2021-11-02",
          enddate: "2021-12-01",
          projectId: 2,
        },
      ],
      startdate: "2021-11-01",
      enddate: "2021-11-30",
      manager: "이준희",
      engineer: "이준희",
      memo: "작업중",
    },
    {
      id: 1,
      projectname: "협업툴 만들기1",
      milestone: [
        {
          id: 1,
          projectId: 1,
          name: "borad제작",
          startdate: "2021-11-01",
          enddate: "2021-11-30",
        },
        {
          id: 2,
          name: "borad제작1",
          startdate: "2021-11-03",
          enddate: "2021-12-30",
          projectId: 1,
        },
        {
          id: 3,
          name: "borad제작2",
          startdate: "2021-11-02",
          enddate: "2021-12-01",
          projectId: 1,
        },
      ],
      startdate: "2021-11-01",
      enddate: "2021-11-30",
      manager: "강윤석",
      engineer: "강윤석",
      memo: "작업중",
    },
  ],
  isFetched: false,
  page: 0,
  // pageSize: photoPageSize ? +photoPageSize : 8,
  pageSize: 8,
  totalPages: 0,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // PayloadAction<payload타입>
    // payload로 item객체를 받음
    addProject: (state, action: PayloadAction<ProjectItem>) => {
      const project = action.payload;
      console.log("--in reducer function--");
      console.log(project);
      state.data.unshift(project);
      state.isAddCompleted = true; // 추가가 되었음으로 표시
    },
    // payload 없는 reducer
    // completed 관련된 속성을 삭제함(undefined 상태)
    initialCompleted: (state) => {
      delete state.isAddCompleted;
      delete state.isRemoveCompleted;
      delete state.isModifyCompleted;
    },
    // payload로 id값을 받음
    // action: PayloadAction<number>
    // reducer 넘어오는 action은 payload있는 액션인데,
    // payload의 타입이 number이다.
    removeProject: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      // id에 해당하는 아이템의 index를 찾고 그 index로 splice를 한다.
      state.data.splice(
        state.data.findIndex((item) => item.id === id),
        1
      );
      state.isRemoveCompleted = true; // 삭제 되었음을 표시
    },
    modifyProject: (state, action: PayloadAction<ProjectItem>) => {
      // 생성해서 넘긴 객체
      const modifyItem = action.payload;
      // state에 있는 객체
      const projectItem = state.data.find((item) => item.id === modifyItem.id);
      // state에 있는 객체의 속성을 넘김 객체의 속성으로 변경
      if (projectItem) {
        projectItem.projectname = modifyItem.projectname;
        projectItem.startdate = modifyItem.startdate;
        projectItem.enddate = modifyItem.enddate;
        projectItem.manager = modifyItem.manager;
        projectItem.engineer = modifyItem.engineer;
        // projectItem.milestone = modifyItem.milestone;
        projectItem.memo = modifyItem.memo;
      }
      state.isModifyCompleted = true; // 변경 되었음을 표시
    },
    initialProjectItem: (state, action: PayloadAction<ProjectItem>) => {
      const project = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = [{ ...project }];
    },
    // payload값으로 state를 초기화하는 reducer 필요함
    initialProject: (state, action: PayloadAction<ProjectItem[]>) => {
      const projects = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = projects;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
    addTotalpages: (state) => {
      state.totalPages++;
    },
    // payload값으로 state를 초기화하는 reducer 필요함
    initialPagedProject: (state, action: PayloadAction<ProjectPage>) => {
      // 백엔드에서 받아온 데이터
      // 컨텐트
      state.data = action.payload.data;
      // 페이징 데이터
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
    initialNextProject: (state, action: PayloadAction<ProjectPage>) => {
      // 백엔드에서 받아온 데이터를 기존데이터 뒤로 합침
      // 컨텐트
      state.data = state.data.concat(action.payload.data);
      // 페이징 데이터
      state.totalElements = action.payload.totalElements;
      state.totalPages = action.payload.totalPages;
      state.page = action.payload.page;
      state.pageSize = action.payload.pageSize;
      state.isLast = action.payload.isLast;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
    addMilestone: (state, action: PayloadAction<MilestonItem>) => {
      const milestone = action.payload;
      console.log("--in reducer function--");
      const project = state.data.find(
        (prj) => prj.id === milestone.projectId
      ) as ProjectItem;
      project.milestone.push(milestone);
      state.isAddCompleted = true; // 추가가 되었음으로 표시
    },

    // initialCompleted2: (state) => {
    //   delete state.isAddCompleted;
    //   delete state.isRemoveCompleted;
    //   delete state.isModifyCompleted;
    // },

    removeMilestone: (state, action: PayloadAction<MilestoneEdit>) => {
      const milestoneId = action.payload.milestoneId;
      const projectId = action.payload.projectId;
      // id에 해당하는 아이템의 index를 찾고 그 index로 splice를 한다.
      const findProject = state.data.find((item) => item.id === projectId);
      const findMilestoneIndex = findProject?.milestone.findIndex(
        (item) => item.id === milestoneId +1
      );
      if (findMilestoneIndex) {
        findProject?.milestone.splice(findMilestoneIndex, 1);
      }

      state.isRemoveCompleted = true; // 삭제 되었음을 표시
    },
    modifyMilestone: (state, action: PayloadAction<MilestonItem>) => {
      // 생성해서 넘긴 객체
      const modifyItem = action.payload;
      // state에 있는 객체
      const projectItem = state.data.find(
        (item) => item.id === modifyItem.projectId
      );
      const milestonItem = projectItem?.milestone.find(
        (item) => item.id === modifyItem.id
      );
      if (milestonItem) {
        (modifyItem.name = milestonItem.name),
          (modifyItem.startdate = milestonItem.startdate),
          (modifyItem.enddate = milestonItem.enddate);
      } 
      state.isModifyCompleted = true; // 변경 되었음을 표시
      console.log("completed")
    },
    initialMilestoneItem: (state, action: PayloadAction<ProjectItem>) => {
      const milestone = action.payload;
      
      // 백엔드에서 받아온 데이터
      state.data = [{ ...milestone }];
    },
    initialMilestone: (state, action: PayloadAction<ProjectItem[]>) => {
      const milestones = action.payload;
      // 백엔드에서 받아온 데이터
      state.data = milestones;
      // 데이터를 받아옴으로 값을 남김
      state.isFetched = true;
    },
  },
});

// action creator 내보내기: action creator는 action객체를 반환하는 함수
export const {
  addProject,
  removeProject,
  modifyProject,
  addMilestone,
  removeMilestone,
  modifyMilestone,
  initialMilestoneItem,
  initialMilestone,
  initialProjectItem,
  initialProject,
  initialCompleted,
  addTotalpages,
  initialPagedProject,
  initialNextProject,
} = projectSlice.actions;

export default projectSlice.reducer;
