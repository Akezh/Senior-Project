import { TrackCard } from "../../molecules";
import { PageTemplate } from "../../templates";

export const CoursesPage = () => {
  return (
    <PageTemplate>
      <div className="container mx-auto mt-12">
        <p className="mb-4 text-xl text-white">Tracks</p>
        <p className="text-base text-white">
          Tracks create by users, companies and universities.
        </p>

        <div className="mt-12 grid grid-cols-5 gap-10">
          <TrackCard
            title="Arrays"
            subtitle="10 problems"
            difficulty="easy"
            imageSrc="/mock_track.png"
          />
          <TrackCard
            title="Arrays"
            subtitle="10 problems"
            difficulty="medium"
            imageSrc="/mock_track.png"
          />
          <TrackCard
            title="Arrays"
            subtitle="10 problems"
            difficulty="hard"
            imageSrc="/mock_track.png"
          />
          <TrackCard
            title="Arrays"
            subtitle="10 problems"
            difficulty="medium"
            imageSrc="/mock_track.png"
          />
          <TrackCard
            title="Arrays"
            subtitle="10 problems"
            difficulty="medium"
            imageSrc="/mock_track.png"
          />
          <TrackCard
            title="Arrays"
            subtitle="10 problems"
            difficulty="medium"
            imageSrc="/mock_track.png"
          />
        </div>
      </div>
    </PageTemplate>
  );
};
