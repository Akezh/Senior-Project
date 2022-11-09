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
            title="2D Arrays"
            subtitle="Problem solving stuff"
            link="/"
          />
          <ProblemCard
            title="2D Arrays"
            subtitle="Problem solving stuff"
            link="/"
          />
          <ProblemCard
            title="2D Arrays"
            subtitle="Problem solving stuff"
            link="/"
          />
        </div>
      </div>
    </PageTemplate>
  );
};
