import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="pt-10 px-6"> {children}</main>
    </>
  );
};

export default layout;
