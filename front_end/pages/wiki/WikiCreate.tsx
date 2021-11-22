import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import Button from 'react-bootstrap/Button';
import { WikiItem, addWiki } from "../../provider/modules/wikis";


const WikiCreate = () => {
  const titleInput = useRef<HTMLInputElement>(null);
  const descTxta = useRef<HTMLTextAreaElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);

  const wikiData = useSelector((state: RootState) => state.wiki.data);

  const isAddCompleted = useSelector(
    (state: RootState) => state.wiki.isAddCompleted
  );

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  useEffect(() => {
    isAddCompleted && router.push("/wiki");
  }, [isAddCompleted, router, dispatch]);

  const handleAddClick = () => {
    // 추가할 객체 생성
    const item: WikiItem = {
      id: wikiData.length ? wikiData[0].id + 1 : 1,
      title: titleInput.current ? titleInput.current.value : "",
      name: nameInput.current?.value,
      description: descTxta.current?.value,
      createdTime: new Date().getTime(),
    };
    dispatch(addWiki(item));
    router.push("/wiki");
  };

  return (
    <section style={{ width: "40vw" }} className="mx-auto">
      <h2 className="text-center"> 📝 글 작성</h2>
      <table className="table">
        <tbody>
          <tr>
            <th>제목</th>
            <td>
              <input className="form-control" type="text" ref={titleInput} />
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td>
              <input className="form-control" type="text" ref={nameInput} />
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td>
              <textarea
                className="form-control"
                style={{ height: "40vh" }}
                ref={descTxta}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <Button variant="secondary"
        style={{ marginLeft: "2%" }}
        className="btn btn-primary float-end"
        onClick={() => {
          router.push("/wiki");
        }}
      >
        delete
      </Button>
      <Button variant="dark"
        className="btn btn-primary float-end"
        onClick={() => {
          handleAddClick();
        }}
      >
        <i className="bi bi-check" />
        upload
      </Button>
    </section>
  )
};

export default WikiCreate;