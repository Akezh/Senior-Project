import Link from "next/link";

import { ProblemCard } from "../../molecules";
import { PageTemplate } from "../../templates";

export const CoursePage = () => {
  return (
    <PageTemplate>
      <div className="container mx-auto mt-12">
        <Link className="text-white underline text-md" href="/courses">
          Track List
        </Link>
        <p className="mt-4 mb-8 text-2xl font-bold text-white">Arrays</p>

        <div className="grid grid-rows-20 gap-4">
          <ProblemCard
            title="1D Arrays"
            subtitle="Discover how to iterate and work with 1D Arrays"
            link="/"
          />
          <ProblemCard
            title="2D Arrays"
            subtitle="Explore matrices and the common problems"
            link="/"
          />
          <ProblemCard
            title="3D Arrays"
            subtitle="Learn 3D arrays"
            link="/"
          />
        </div>
      </div>
    </PageTemplate>
  );
};
