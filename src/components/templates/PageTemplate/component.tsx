import { FC } from 'react';
import { Props } from './props';
import {Header} from "../../organisms";

export const PageTemplate: FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            {children}
        </>
    )
}
