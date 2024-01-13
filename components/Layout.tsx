import Head from "next/head";
import React from "react";
import Card from "./Card";

const Layout = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className="main">
        <Card className={className}>{children}</Card>
      </main>
    </>
  );
};

export default Layout;
