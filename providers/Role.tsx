import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

type RoleState = {
  role: "STUDENT" | "TEACHER";
  user: Record<string, string>;
  token: string;
  logged: boolean;
};

export const RoleContext = createContext<{
  state: RoleState;
  setRoleState: (newState: RoleState) => void;
  logout: () => void;
}>({
  state: { role: "STUDENT", user: {}, token: "", logged: false },
  setRoleState: () => null,
  logout: () => null,
});

export const useRoleProvider = () => {
  return useContext(RoleContext);
};

const initialState: RoleState = {
  role: "STUDENT",
  user: {},
  token: "",
  logged: false,
};

export const RoleProvider: React.FC<Props> = ({ children }) => {
  const [roleState, setRoleState] = React.useState<RoleState>(initialState);
  const router = useRouter();

  useEffect(() => {
    const lastRole = localStorage.getItem("lastRole");

    if (lastRole) {
      setRoleState({ ...JSON.parse(lastRole), logged: true });
    }
  }, []);

  const setRoleStateWithStorage = (newState: RoleState) => {
    localStorage.setItem("lastRole", JSON.stringify(newState));
    setRoleState(newState);
  };

  const logout = () => {
    localStorage.removeItem("lastRole");
    setRoleState(initialState);
    router.push("/");
  };

  return (
    <RoleContext.Provider
      value={{
        state: roleState,
        setRoleState: setRoleStateWithStorage,
        logout,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
