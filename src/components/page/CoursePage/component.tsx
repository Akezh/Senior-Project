import { ProblemCard } from "../../molecules";
import {PageTemplate} from "../../templates";

export const CoursePage = () => {
    return (
        <PageTemplate>
            <div className="container mx-auto mt-12">
                <p className="text-white text-xl mb-4">Arrays</p>

                <div className="grid grid-rows-20 gap-4">
                    <ProblemCard title="2D Arrays" subtitle="Problem solving stuff" link='/' />
                    <ProblemCard title="2D Arrays" subtitle="Problem solving stuff" link='/' />
                    <ProblemCard title="2D Arrays" subtitle="Problem solving stuff" link='/' />
                </div>
            </div>
        </PageTemplate>
    )
}
