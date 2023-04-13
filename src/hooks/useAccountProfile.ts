import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";

interface Profile {
  username: string;
  fullname: string;
  email: string;
}

const useAccountProfileImpl = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log("isLoggedIn: ", isLoggedIn);
  }, [isLoggedIn]);

  const setLoggedProfile = (profile: Profile) => {
    setIsLoggedIn(true);
    setUsername(profile.username);
    setFullname(profile.fullname);
    setEmail(profile.email);
  };

  const removeLoggedProfile = () => {
    setIsLoggedIn(false);
    setUsername("");
    setFullname("");
    setEmail("");
  };

  return {
    isLoggedIn,
    username,
    fullname,
    email,
    setLoggedProfile,
    removeLoggedProfile,
  };
};

export const useAccountProfile = singletonHook(
  {
    isLoggedIn: false,
    username: "",
    fullname: "",
    email: "",
    removeLoggedProfile: () => undefined,
    setLoggedProfile: () => undefined,
  },
  useAccountProfileImpl
);
