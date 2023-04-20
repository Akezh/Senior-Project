import React, { createContext, useContext, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

type RoleState = {
  role: "STUDENT" | "TEACHER";
  user: Record<string, string>;
  token: string;
};

export const RoleContext = createContext<{
  state: RoleState;
  setRoleState: (newState: RoleState) => void;
}>({
  state: { role: "STUDENT", user: {}, token: "" },
  setRoleState: () => null,
});

export const useRoleProvider = () => {
  return useContext(RoleContext);
};

export const RoleProvider: React.FC<Props> = ({ children }) => {
  const [roleState, setRoleState] = React.useState<RoleState>({
    role: "STUDENT",
    user: {},
    token: "",
  });

  useEffect(() => {
    const lastRole = localStorage.getItem("lastRole");

    if (lastRole) {
      setRoleState({ ...JSON.parse(lastRole), loaded: true });
    } else {
      setRoleState((roleState) => ({ ...roleState, loaded: true }));
    }
  }, []);

  const setRoleStateWithStorage = (newState: RoleState) => {
    localStorage.setItem("lastRole", JSON.stringify(newState));
    setRoleState(newState);
  };

  return (
    <RoleContext.Provider
      value={{ state: roleState, setRoleState: setRoleStateWithStorage }}
    >
      {children}
    </RoleContext.Provider>
  );
};
