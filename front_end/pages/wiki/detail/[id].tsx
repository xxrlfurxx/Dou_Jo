import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../provider";
import { removeWiki } from "../../../provider/modules/wikis";
import { useRouter } from "next/router";
import Button from 'react-bootstrap/Button';


const WikiDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const id = router.query.id as string;
  console.log(id);

  let wikiItem = useSelector((state: RootState) =>
    state.wiki.data.find((item) => item.id === +id)
  );

  const isRemoveCompleted = useSelector(
    (state: RootState) => state.wiki.isRemoveCompleted
  );

  const handDeleteClick = () => {
    dispatch(removeWiki(+id));
  };
  useEffect(() => {
    isRemoveCompleted && router.push("/wiki");
  }, [isRemoveCompleted, router]);


  return (
    <section style={{ width: "40vw" }} className="mx-auto">
      <h2 className={`text-center`}>글 상세보기</h2>
      {!wikiItem && (
        <div className="text-center my-5">데이터가 없습니다.</div>
      )}
      {wikiItem && (
        <table className="table">
          <tbody>
            <tr>
              <th>제목</th>
              <td>{wikiItem.title}</td>
            </tr>
            <tr>
              <th>이름</th>
              <td>{wikiItem.name}</td>
            </tr>
            <tr>
              <th>내용</th>
              <td>{wikiItem.description}</td>
            </tr>
          </tbody>
        </table>
      )}

      <Button variant="secondary"
        style={{ marginLeft: "2%" }}
        className="btn btn-primary float-end"
        onClick={() => {
          router.push("/wiki");
        }}
      >
        cancel
      </Button>
      <Button variant="dark"
        style={{ marginLeft: "2%" }}
        className="btn btn-primary float-end"
        onClick={() => {
          router.push("/wiki/edit/${id}");
        }}
      >
        edit
      </Button>
      <Button variant="dark"
        className="btn btn-primary float-end"
        onClick={() => {
          handDeleteClick();
        }}
      >
        <i className="bi bi-check" />
        Delete
      </Button>
    </section>
  );
}
export default WikiDetail;