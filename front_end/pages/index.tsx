import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Appbar from "../components/Appbar";

const Home: NextPage = () => {
  return (
    <div>
      <h2>Main</h2>
      <div>about me</div>
      <div>개발 일지</div>
      <div>사용한 기술 정리</div>
      <div>좋았던 점</div>
      <div>아쉬웠던 점</div>
    </div>
  );
};

export default Home;
