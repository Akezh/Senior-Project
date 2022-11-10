import { FC } from "react";

import { Header } from "../../organisms";
import { Props } from "./props";

export const PageTemplate: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="px-5 mb-10 md:px-0">{children}</div>
    </>
  );
};
