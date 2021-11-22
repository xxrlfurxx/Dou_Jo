import { useState } from "react";
import TaskModal from "../../components/modal/TaskModal";

interface StateProps {
  id: number;
  title: string;
  name: string;
  createdTime: string;
}

function feeds() {
  const [feedState, setfeedState] = useState<StateProps[]>([]);

  return (
    <section style={{ width: "70vw" }} className="mx-auto">
      <TaskModal />
      <div className="feed">
        <div>
          <h2>🔔Feed</h2>
        </div>
        <div className="card">
          <div className="card-header">
            📔Wiki
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="button" className="btn-close" aria-label="Close"></button>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">제목입니다.</h5>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <a href="#" className="btn btn-warning">상세보기로 이동</a>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            task
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="button" className="btn-close" aria-label="Close"></button>
            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title">제목입니다.</h5>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <a href="#" className="btn btn-warning">상세보기로 이동</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default feeds;