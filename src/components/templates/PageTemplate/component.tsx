import clsx from "clsx";
import { FC } from "react";

import { Header } from "../../organisms";
import { Props } from "./props";

export const PageTemplate: FC<Props> = ({
  offDefaultStyles,
  className,
  children,
}) => {
  return (
    <div>
      <Header />
      <div className={clsx(!offDefaultStyles && "px-5 md:px-0", className)}>
        {children}
      </div>
    </div>
  );
};
