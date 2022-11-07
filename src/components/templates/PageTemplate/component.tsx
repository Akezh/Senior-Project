import { FC } from "react";

import { Header } from "../../organisms";
import { Props } from "./props";

export const PageTemplate: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};
