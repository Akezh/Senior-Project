import { FC } from 'react';
import Image from 'next/image';
import { Props } from './props';

export const TrackCard: FC<Props> = ({ title, subtitle, imageSrc, difficulty }) => {
    return (
        <div className="relative">
            <Image className="rounded-tr-xl" width={400} height={400} src={imageSrc} alt="track" />

            <div className="flex align-center justify-center p-4 rounded-bl-xl rounded-br-xl" style={{ background: '#0F1926' }}>
                {difficulty === 'easy' && <p className="uppercase text-base" style={{ color: '#9FEE3D' }}>EASY</p>}
                {difficulty === 'medium' && <p className="uppercase text-base" style={{ color: '#F3B23E' }}>MEDIUM</p>}
                {difficulty === 'hard' && <p className="uppercase text-base" style={{ color: '#EC5048' }}>HARD</p>}
            </div>

            <p className="font-bold text-white text-lg ml-2 mt-4">{title}</p>
            <p className="font-bold text-sm ml-2 mt-1" style={{ color: '#909FB8' }}>{subtitle}</p>
        </div>
    )
}
