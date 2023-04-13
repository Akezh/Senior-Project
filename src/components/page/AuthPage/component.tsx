import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useAPIService } from "../../../../core/api";
import { useAccountProfile } from "../../../hooks";
import { PageTemplate } from "../../templates";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

const RegisterForm = () => {
  const router = useRouter();
  const { setLoggedProfile } = useAccountProfile();
  const { register: registerApi } = useAPIService();
  const { register, handleSubmit, watch } = useForm();
  const [username, fullname, email, password, confirmPassword] = watch([
    "username",
    "fullname",
    "email",
    "password",
    "confirmPassword",
  ]);
  const [validForm, setValidForm] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      const registerPayloadData = {
        username: data?.username || "",
        fullname: data?.fullname || "",
        email: data?.email || "",
        password: data?.password || "",
      };

      try {
        const responseData = await registerApi(registerPayloadData);
        if (!responseData?.token) throw new Error("Registration failed");
        setLoggedProfile({
          username: data?.username || "",
          fullname: data?.fullname || "",
          email: data?.email || "",
        });
        toast.success("Registration completed. Transferring to home page...");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        toast.error("Registration failed, try again later.");
      }
    },
    [registerApi, router, setLoggedProfile]
  );

  useEffect(() => {
    setValidForm(
      username &&
        fullname &&
        EMAIL_REGEX.test(email) &&
        password &&
        confirmPassword === password
    );
  }, [username, fullname, email, password, confirmPassword]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="First name"
        className="w-full px-5 py-5 text-gray-300 outline-none mt-7 bg-gray-850"
        {...register("username", {
          required: true,
          maxLength: 30,
        })}
      />
      <input
        type="text"
        placeholder="Last name"
        className="w-full px-5 py-5 text-gray-300 outline-none mt-7 bg-gray-850"
        {...register("fullname", {
          required: true,
          maxLength: 30,
        })}
      />
      <input
        type="text"
        placeholder="Email"
        className="w-full px-5 py-5 text-gray-300 outline-none mt-7 bg-gray-850"
        {...register("email", {
          required: true,
          maxLength: 30,
        })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-5 py-5 text-gray-300 outline-none mt-7 bg-gray-850"
        {...register("password", { required: true, maxLength: 30 })}
      />
      <input
        type="password"
        placeholder="Confirm password"
        className="w-full px-5 py-5 text-gray-300 outline-none mt-7 bg-gray-850"
        {...register("confirmPassword", {
          required: true,
          maxLength: 30,
        })}
      />
      <button
        type="submit"
        className="w-full py-5 mt-8 text-sm tracking-wider text-center uppercase rounded-md ont-medium disabled:bg-gray-700 bg-green-550 transition-all hover:bg-opacity-90"
        disabled={!validForm}
      >
        Continue
      </button>
    </form>
  );
};

const LoginForm = () => {
  const router = useRouter();
  const { setLoggedProfile } = useAccountProfile();
  const { login } = useAPIService();
  const { register, handleSubmit, watch } = useForm();
  const [email, password] = watch(["email", "password"]);
  const [validForm, setValidForm] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      const loginPayloadData = {
        email: data?.email || "",
        password: data?.password || "",
      };

      try {
        const responseData = await login(loginPayloadData);
        if (!responseData?.token) throw new Error("Login failed");
        setLoggedProfile({
          username: responseData?.username || "",
          fullname: responseData?.fullname || "",
          email: responseData?.email || "",
        });
        toast.success("Login completed. Transferring to home page...");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } catch (error) {
        toast.error("Login failed, try again later.");
      }
    },
    [login, router, setLoggedProfile]
  );

  useEffect(() => {
    setValidForm(password && EMAIL_REGEX.test(email));
  }, [email, password]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Email"
        className="w-full px-5 py-5 text-gray-300 outline-none mt-7 bg-gray-850"
        {...register("email", {
          required: true,
          maxLength: 30,
        })}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-5 py-5 text-gray-300 outline-none mt-7 bg-gray-850"
        {...register("password", { required: true, maxLength: 30 })}
      />
      <button
        type="submit"
        className="w-full py-5 mt-8 text-sm tracking-wider text-center uppercase rounded-md ont-medium disabled:bg-gray-700 bg-green-550 transition-all hover:bg-opacity-90"
        disabled={!validForm}
      >
        Continue
      </button>
    </form>
  );
};

export const AuthPage = () => {
  const { query } = useRouter();
  const [isLogin, setLogin] = useState(true);

  const handleFormAction = useCallback(() => {
    setLogin((login) => !login);
  }, []);

  useEffect(() => {
    setLogin(!!query.login);
  }, [query]);

  return (
    <PageTemplate className="px-5 md:px-0">
      <div className="max-w-xl mx-auto mt-10 md:mt-20">
        <Link href="/" className="flex items-center justify-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 mr-3 sm:h-9"
            alt="Company Logo"
          />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            CodePower
          </span>
        </Link>
        <div className="px-12 py-8 mt-10 rounded-md bg-gray-750">
          <p className="text-xl text-gray-300">
            {isLogin ? "Sign in to your account" : "Register new account"}
          </p>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
        <div className="px-12 py-8 mt-10 rounded-md bg-gray-750">
          <div className="flex items-center justify-between">
            <p className="text-white">
              {isLogin ? "Do not have an account?" : "Already have an account?"}
            </p>
            <button
              className="px-5 py-4 text-sm tracking-wider text-gray-300 uppercase border border-gray-300 rounded-md"
              onClick={handleFormAction}
            >
              {isLogin ? "Join now" : "Login to account"}
            </button>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};
