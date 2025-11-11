import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser, type LoginData } from "../../apis/auth";
import toast from "react-hot-toast";
import { useLocation } from "wouter";

export const useLogInHooks = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [, navigate] = useLocation();

  const mutation = useMutation({
    mutationFn: (data: LoginData) => loginUser(data),
    onMutate: () => {
      setIsLoggingIn(true);
    },
    onSuccess: (response) => {
      toast.success("Login successful");
      localStorage.setItem("autocliptoken", response.token);
      navigate("/home");
    },
    onError: (error: any) => {
      toast.error("Login error:", error.message);
    },
    onSettled: () => {
      setIsLoggingIn(false);
    },
  });

  const login = (data: any) => {
    mutation.mutate({ email: data.email, password: data.password });
  };

  return {
    isLoggingIn,
    login,
  };
};
