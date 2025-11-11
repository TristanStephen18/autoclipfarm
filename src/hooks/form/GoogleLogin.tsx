import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUserWithGoogle } from "../../apis/auth";
import toast from "react-hot-toast";
import { useLocation } from "wouter";

export const useGoogleLoginHook = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [, navigate] = useLocation();

  const mutation = useMutation({
    mutationFn: (email: string) => loginUserWithGoogle(email),
    onMutate: () => {
      setIsLoggingIn(true);
    },
    onSuccess: (response) => {
      toast.success("Login successful");
      localStorage.setItem("autocliptoken", response.token);
      navigate("/home");
    },
    onError: (error: any) => {
      toast.error(error.message || "Google login failed");
    },
    onSettled: () => {
      setIsLoggingIn(false);
    },
  });

  const googleLogin = (email: string) => {
    mutation.mutate(email);
  };

  return {
    isLoggingIn,
    googleLogin,
  };
};
