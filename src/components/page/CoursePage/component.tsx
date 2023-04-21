import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import makeAnimated from "react-select/animated";

import { useAPIService } from "../../../../core/api";
import { axiosApi } from "../../../../core/config";
import { GetAllProblemsDTO } from "../../../../core/types";
import { useRoleProvider } from "../../../../providers";
import { ProblemCard, Spinner } from "../../molecules";
import { PageTemplate } from "../../templates";

const animatedComponents = makeAnimated();

type Option = {
  label: string;
  value: string;
};

export const CoursePage = () => {
  const { getAllProblems, addProblemToTrack, deleteProblemFromTrack } =
    useAPIService();
  const router = useRouter();
  const { id } = router.query;
  const role = useRoleProvider();
  const [courseDetails, setCourseDetails] = useState<any>(null);
  const [trackProblems, setTrackProblems] = useState<GetAllProblemsDTO>([]);
  const [allSelectionProblems, setAllSelectionProblems] = useState<
    Array<Option>
  >([]);
  const [defaultValueForSelection, setDefaultValueForSelection] =
    useState<Array<Option>>();

  const createProblem = () => {
    router.push("/problem/create");
  };

  const fetchCourseDetails = async () => {
    const { data } = await axiosApi.get(`/track/${id}`);
    const { data: problems } = await axiosApi.get(`/track/${id}/problems`, {
      headers: { Authorization: `Bearer ${role.state.token}` },
    });
    setCourseDetails({ ...data, problems });
    return { ...data, problems };
  };

  useEffect(() => {
    (async () => {
      if (id) {
        const courseDetails = await fetchCourseDetails();

        console.log("courseDetails", courseDetails.problems);

        getAllProblems().then((problemsArr) => {
          const problems = problemsArr?.map((n) => ({
            label: `${n.id} ${n.title}`,
            value: `${n.id} ${n.title}`,
          }));
          problems && setAllSelectionProblems(problems);
          problemsArr && setTrackProblems(problemsArr);
        });

        const defaultSelectorValues: Array<Option> =
          courseDetails?.problems?.map((n: Record<string, string>) => ({
            label: `${n?.id || ""} - ${n?.title || ""}`,
            value: `${n?.id || ""} ${n?.title || ""}`,
          })) || [];

        console.log("defaultValueForSelection", defaultSelectorValues);

        setDefaultValueForSelection(defaultSelectorValues);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, role]);

  const onChange = async (
    newValue: OnChangeValue<Option, true>,
    actionMeta: ActionMeta<Option>
  ) => {
    let allAddedProblems: OnChangeValue<Option, true> = [];

    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
      case "clear":
      case "select-option":
        allAddedProblems = newValue;
        break;
    }

    const addedProblems = trackProblems.filter((n) => {
      const problem = allAddedProblems.find(
        (m) => m.value === `${n.id} ${n.title}`
      );
      return !!problem;
    });

    const removedProblems = trackProblems.filter((n) => {
      const problem = allAddedProblems.find(
        (m) => m.value === `${n.id} ${n.title}`
      );
      return !problem;
    });

    addedProblems.forEach((problem) => {
      addProblemToTrack({
        trackId: courseDetails.id,
        problemId: String(problem.id),
      });
    });

    removedProblems.forEach((problem) => {
      deleteProblemFromTrack({
        trackId: courseDetails.id,
        problemId: String(problem.id),
      });
    });

    const newCourseDetails = await fetchCourseDetails();

    const defaultSelectorValues: Array<Option> =
      newCourseDetails?.problems?.map((n: Record<string, string>) => ({
        label: `${n?.id || ""} - ${n?.title || ""}`,
        value: `${n?.id || ""} ${n?.title || ""}`,
      })) || [];

    console.log("here defaultValueForSelection", defaultSelectorValues);

    setDefaultValueForSelection(defaultSelectorValues);
  };

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

        <Select
          className="mb-8"
          closeMenuOnSelect={false}
          components={animatedComponents}
          value={defaultValueForSelection}
          options={allSelectionProblems}
          isMulti
          onChange={onChange}
        />

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
