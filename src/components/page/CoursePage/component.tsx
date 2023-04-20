import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { axiosApi } from "../../../../core/config";
import { useRoleProvider } from "../../../../providers";
import { ProblemCard, Spinner } from "../../molecules";
import { PageTemplate } from "../../templates";

export const CoursePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const role = useRoleProvider();
  const [courseDetails, setCourseDetails] = useState<any>(null);

  const createProblem = () => {
    router.push("/problem/create");
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const { data } = await axiosApi.get(`/track/${id}`);
      const { data: problems } = await axiosApi.get(`/track/${id}/problems`, {
        headers: { Authorization: `Bearer ${role.state.token}` },
      });
      console.log({ ...data, problems });
      setCourseDetails({ ...data, problems });
    };

    if (id) fetchCourseDetails();
  }, [id, role]);

  return (
    <PageTemplate>
      <div className="container mx-auto mt-12">
        <Link
          className="px-4 py-2 text-white border border-gray-400 text-md rounded-md hover:opacity-80 transition-opacity"
          href="/"
        >
          Back to courses
        </Link>
        {courseDetails === null && <Spinner className="w-8 mt-8" />}
        <div className="flex items-center justify-between w-full mt-3 gap-4">
          <p className="mt-4 text-2xl font-bold text-white">
            {courseDetails?.title}
          </p>
          <button
            type="button"
            onClick={createProblem}
            className="hidden px-5 mb-2 mr-2 text-sm font-medium text-center text-gray-900 rounded-lg bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 py-2.5"
          >
            Create problem
          </button>
        </div>
        <p className="mt-4 mb-6 text-gray-400">{courseDetails?.description}</p>
        <div className="grid grid-rows-20 gap-4">
          {courseDetails?.problems?.map(
            ({ id, title, description }: any, index: number) => (
              <ProblemCard
                key={index}
                title={title}
                subtitle={description}
                link={`/problem/${id}`}
              />
            )
          )}
        </div>
      </div>
    </PageTemplate>
  );
};
