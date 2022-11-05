import { TrackCard } from "../../molecules";
import { PageTemplate } from "../../templates";

export const CoursesPage = () => {
    return (
        <PageTemplate>
            <div className="container mx-auto mt-12">
                <p className="text-white text-xl mb-4">Tracks</p>
                <p className="text-white text-base">Tracks create by users, companies and universities.</p>

                <div className="grid grid-cols-5 gap-10 mt-12">
                    <TrackCard title="Arrays" subtitle="10 problems" difficulty='easy' imageSrc='/mock_track.png' />
                    <TrackCard title="Arrays" subtitle="10 problems" difficulty='medium' imageSrc='/mock_track.png' />
                    <TrackCard title="Arrays" subtitle="10 problems" difficulty='hard' imageSrc='/mock_track.png' />
                    <TrackCard title="Arrays" subtitle="10 problems" difficulty='medium' imageSrc='/mock_track.png' />
                    <TrackCard title="Arrays" subtitle="10 problems" difficulty='medium' imageSrc='/mock_track.png' />
                    <TrackCard title="Arrays" subtitle="10 problems" difficulty='medium' imageSrc='/mock_track.png' />
                </div>

            </div>
        </PageTemplate>
    )
}
