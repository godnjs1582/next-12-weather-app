import Layout from "@/components/Layout";
import Link from "next/link";
import React from "react";

const Unauthenticated = () => {
  return (
    <Layout className="justify-center text-center">
      <h1>이 페이지를 보려면 로그인을 하세요</h1>
      <Link href={"/"} className="btn__secondary mx-auto">
        로그인 페이지로
      </Link>
    </Layout>
  );
};

export default Unauthenticated;
