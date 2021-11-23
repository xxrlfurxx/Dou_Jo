import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import Button from "react-bootstrap/Button";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import ModalFooter from "react-bootstrap/ModalFooter";
import { MutableRefObject, useRef } from "react";
import { ProjectItem, addProject } from "../provider/modules/project";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../provider";
import { useRouter } from "next/router";
import { requestAddProject } from "../middleware/modules/project";

// const [modalShow, setModalShow] = React.useState(false);

interface ProjectModalProp {
  show: boolean;
  onHide: () => void;
}

function ProjectModal({ show, onHide }: ProjectModalProp) {
  const router = useRouter();

  const projectData = useSelector((state: RootState) => state.project.data);

  const dispatch = useDispatch<AppDispatch>();

  const projectname = useRef() as MutableRefObject<HTMLInputElement>;
  const startdate = useRef() as MutableRefObject<HTMLInputElement>;
  const enddate = useRef() as MutableRefObject<HTMLInputElement>;
  const manager = useRef() as MutableRefObject<HTMLSelectElement>;
  const engineer = useRef() as MutableRefObject<HTMLSelectElement>;
  const memo = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const handleAddClick = () => {
    const item: ProjectItem = {
      id: projectData.length > 0 ? projectData[0].id + 1 : 1,
      projectname: projectname.current.value,
      startdate: startdate.current.value,
      enddate: enddate.current.value,
      manager: manager.current.value,
      engineer: engineer.current.value,
      memo: memo.current.value,
      milestone: [],
    };
    // dispatch(addProject(item));   // 기존 redux action
    dispatch(requestAddProject(item)); // saga action으로 대체
    router.push(`/project`);
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <ModalHeader closeButton>
        <ModalTitle id="contained-modal-title-vcenter">
          프로젝트 생성
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <table className="table">
          <tbody>
            <tr>
              <th>프로젝트 명</th>
              <td>
                <input className="form-control" type="text" ref={projectname} />
              </td>
            </tr>
            <tr>
              <th>시작일</th>
              <td>
                <input className="form-control" type="date" ref={startdate} />
              </td>
            </tr>
            <tr>
              <th>종료일</th>
              <td>
                <input className="form-control" type="date" ref={enddate} />
              </td>
            </tr>
            <tr>
              <th>PM</th>
              <td>
                <select
                  defaultValue="default"
                  className="form-select"
                  aria-label="Default select example"
                  ref={manager}
                >
                  <option value="관리자">관리자</option>
                  <option value="강윤석">강윤석</option>
                  <option value="이준희">이준희</option>
                  <option value="허준">허준</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>담당자</th>
              <td>
                <select
                  defaultValue="default"
                  className="form-select"
                  aria-label="Default select example"
                  ref={engineer}
                >
                  <option value="담당자">담당자</option>
                  <option value="강윤석">강윤석</option>
                  <option value="이준희">이준희</option>
                  <option value="허준">허준</option>
                </select>
              </td>
            </tr>
            <tr>
              <th>메모</th>
              <td>
                <textarea
                  className="form-control"
                  style={{ height: "15vh" }}
                  ref={memo}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </ModalBody>
      <ModalFooter>
        <Button className="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          className="primary"
          onClick={() => {
            handleAddClick();
            onHide();
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ProjectModal;
