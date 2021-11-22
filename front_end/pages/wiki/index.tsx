import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { RootState } from "../../provider/index";


const searchBar = document.getElementById("searchBar");


const getTimeString = (unixtime: number) => {
  const day = 24 * 60 * 60 * 1000;

  const dateTime = new Date(unixtime);

  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
};

const Wiki = () => {
  const wiki = useSelector((state: RootState) => state.wiki);
  const router = useRouter();

  return (
    <section style={{ width: "70vw" }} className="mx-auto">
      <div className="wiki">
        <div>
          <h2 className={`text-center`}>📔Wiki</h2>
        </div>
        <div className="features">
          <div className="search_wiki">
            <input type="text" placeholder="🔍Search..." />
          </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-success"
              onClick={() => {
                router.push("/wiki/WikiCreate");
              }}
            >
              + 글 작성
            </button>
          </div>
        </div>
        <table className="table table-hover my-5">
          <thead>
            <tr>
              <th>#</th>
              <th>제목</th>
              <th>이름</th>
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {wiki.data.map((item) => (
              <tr className="wikiList" key={item.id}
                onClick={() => {
                  router.push(`/wiki/detail/${item.id}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.name}</td>
                <td>{getTimeString(item.createdTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Wiki;

