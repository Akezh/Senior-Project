import Link from "next/link";
import { useRouter } from "next/router";

import { ProblemCard } from "../../molecules";
import { PageTemplate } from "../../templates";

export const CoursePage = () => {
  const router = useRouter();

  const createProblem = () => {
    router.push("/problem/create");
  };

  return (
    <PageTemplate>
      <div className="container mx-auto mt-12">
        <Link className="text-white underline text-md" href="/courses">
          Back
        </Link>
        <div className="flex items-center justify-between w-full gap-4">
          <p className="mt-4 mb-8 text-2xl font-bold text-white">Arrays</p>
          <button
            type="button"
            onClick={createProblem}
            className="px-5 mb-2 mr-2 text-sm font-medium text-center text-gray-900 rounded-lg bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 py-2.5"
          >
            Create problem
          </button>
        </div>

        <div className="grid grid-rows-20 gap-4">
          <ProblemCard
            title="1D Arrays"
            subtitle="Discover how to iterate and work with 1D Arrays"
            link="/problem/1"
          />
          <ProblemCard
            title="2D Arrays"
            subtitle="Explore matrices and the common problems"
            link="/problem/2"
          />
          <ProblemCard
            title="3D Arrays"
            subtitle="Learn 3D arrays"
            link="/problem/3"
          />
        </div>
      </div>
    </PageTemplate>
  );
};
