import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { axiosApi } from "../../../../core/config";
import { Spinner, TrackCard } from "../../molecules";
import { PageTemplate } from "../../templates";

export const CoursesPage = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<any[] | null>(null);

  const createTrack = () => {
    router.push("/course/create");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axiosApi.get("/track");
      setCourses(data);
    };

    fetchCourses();
  }, []);

  return (
    <PageTemplate>
      <div className="container mx-auto mt-12">
        <div className="flex items-center justify-between w-full gap-4">
          <p className="mb-4 text-2xl font-bold text-white">Tracks</p>

          <button
            type="button"
            onClick={createTrack}
            className="hidden px-5 mb-2 mr-2 text-sm font-medium text-center text-gray-900 rounded-lg bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 py-2.5"
          >
            Create track
          </button>
        </div>
        <p className="text-base text-white" style={{ color: "#9FAEC8" }}>
          Tracks are created by your instructors and you can solve them with
          tracking your progres.
        </p>

        <div className="mt-8 grid md:grid-cols-5 gap-10 grid-cols-3">
          {courses === null && <Spinner className="w-8" />}
          {courses?.map(
            ({ id, title, category, difficulty, numberOfProblems }) => (
              <TrackCard
                key={title}
                id={id}
                title={title}
                subtitle={`${numberOfProblems} problem(s)`}
                difficulty={difficulty}
                imageSrc={`/${category}.png`}
              />
            )
          )}
        </div>
      </div>
    </PageTemplate>
  );
};
