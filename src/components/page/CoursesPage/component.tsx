import { useRouter } from "next/router";

import { TrackCard } from "../../molecules";
import { PageTemplate } from "../../templates";
import { coursesData } from "./mock";

export const CoursesPage = () => {
  const router = useRouter();

  const createTrack = () => {
    router.push("/course/create");
  };

  return (
    <PageTemplate>
      <div className="container mx-auto mt-12">
        <div className="flex items-center justify-between w-full gap-4">
          <p className="mb-4 text-2xl font-bold text-white">Tracks</p>

          <button
            type="button"
            onClick={createTrack}
            className="px-5 mb-2 mr-2 text-sm font-medium text-center text-gray-900 rounded-lg bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 py-2.5"
          >
            Create track
          </button>
        </div>
        <p className="text-base text-white" style={{ color: "#9FAEC8" }}>
          Tracks create by users, companies and universities.
        </p>

        <div className="mt-12 grid md:grid-cols-5 gap-10 grid-cols-3">
          {coursesData?.map(({ title, subtitle, difficulty, imageSrc }) => (
            <TrackCard
              key={title}
              title={title}
              subtitle={subtitle}
              difficulty={difficulty}
              imageSrc={imageSrc}
            />
          ))}
        </div>
      </div>
    </PageTemplate>
  );
};
