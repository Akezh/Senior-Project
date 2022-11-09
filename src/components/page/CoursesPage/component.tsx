import { TrackCard } from "../../molecules";
import { PageTemplate } from "../../templates";
import { coursesData } from "./mock";

export const CoursesPage = () => {
  return (
    <PageTemplate>
      <div className="container mx-auto mt-12">
        <p className="mb-4 text-xl text-white">Tracks</p>
        <p className="text-base text-white">
          Tracks create by users, companies and universities.
        </p>

        <div className="mt-12 grid grid-cols-5 gap-10">
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
