import { useEffect, useState, MutableRefObject, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { addStatus, StatusItem } from "../../provider/modules/status";

const CreateStateBtn = () => {
  // state 추가 관련 로직
  const [isStateAdd, SetIsStateAdd] = useState<boolean>(false);
  const statusNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.status.data);

  const toggleBox = () => {
    SetIsStateAdd(!isStateAdd);
  };
  const AddStatus = () => {
    if (statusNameRef.current.value) {
      const newStatus: StatusItem = {
        id: status.length + 1,
        projectId: 1, // 일단 이렇게 해놓자...
        name: statusNameRef.current.value,
        tasks: [],
      };
      dispatch(addStatus(newStatus));
      toggleBox();
    } else {
      toggleBox();
    }
  };

  return (
    <>
      <div
        className="board_btn"
        onClick={() => {
          toggleBox();
        }}
      >
        <i className="bi bi-plus-lg" />
        State
      </div>
      {isStateAdd && (
        <span className="add_state">
          <div className="add_state_wrap">
            <div className="state_input_wrap">
              <input
                className="state_input"
                placeholder="New Group"
                ref={statusNameRef}
              />
            </div>
            <div
              className="state_add_btn_wrap"
              onClick={() => {
                AddStatus();
              }}
            >
              <div className="state_add_btn">
                <i className="bi bi-check" />
              </div>
            </div>
            <div
              className="state_cancel_btn_wrap"
              onClick={() => {
                toggleBox();
              }}
            >
              <div className="state_cancel_btn">
                <i className="bi bi-x" />
              </div>
            </div>
          </div>
        </span>
      )}
    </>
  );
};

export default CreateStateBtn;
