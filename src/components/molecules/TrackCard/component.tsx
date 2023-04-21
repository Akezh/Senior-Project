import Link from "next/link";
import { FC } from "react";

import { Props } from "./props";

export const TrackCard: FC<Props> = ({
  id,
  title,
  subtitle,
  imageSrc,
  difficulty,
}) => {
  return (
    <Link href={`/course/${id}`} className="relative">
      <img
        className="rounded-tr-xl"
        width={400}
        height={400}
        src={imageSrc}
        alt="track"
      />

      <div
        className="flex justify-center p-4 align-center rounded-bl-xl rounded-br-xl"
        style={{ background: "#0F1926" }}
      >
        {difficulty === "EASY" && (
          <p className="text-base uppercase" style={{ color: "#9FEE3D" }}>
            EASY
          </p>
        )}
        {difficulty === "MEDIUM" && (
          <p className="text-base uppercase" style={{ color: "#F3B23E" }}>
            MEDIUM
          </p>
        )}
        {difficulty === "HARD" && (
          <p className="text-base uppercase" style={{ color: "#EC5048" }}>
            HARD
          </p>
        )}
      </div>
      <p className="mt-4 ml-2 text-lg font-bold text-white">{title}</p>
      <p className="mt-1 ml-2 text-sm" style={{ color: "#909FB8" }}>
        {subtitle}
      </p>
    </Link>
  );
};
