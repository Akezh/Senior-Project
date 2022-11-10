import { HTMLProps, ReactElement, ReactNode } from "react";

export type Props = {
  children: ReactNode | ReactElement;
  offDefaultStyles?: boolean;
} & HTMLProps<HTMLDivElement>;
