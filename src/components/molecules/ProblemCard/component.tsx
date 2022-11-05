import { FC } from 'react';
import { Props } from './props';

export const ProblemCard: FC<Props> = ({ title, subtitle, link }) => {
    return (
        <div className="flex align-center justify-between p-8" style={{ background: '#0A121D' }}>
            <div>
                <p className="font-bold text-white text-2xl">{title}</p>
                <p className="font-bold text-white text-sm mt-2" style={{ color: '#909FB8' }}>{subtitle}</p>
            </div>
            <button
                className="text-black border-0 py-2 px-8 focus:outline-none text-lg my-auto" style={{ backgroundColor: '#9FEE3D', height: 48 }}>Solve Challenge
            </button>
        </div>
    )
}
