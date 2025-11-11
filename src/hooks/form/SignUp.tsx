import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signupUser, type SignupData } from "../../apis/auth";
import toast from "react-hot-toast";

export const useSignUpHooks = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const mutation = useMutation({
    mutationFn: (data: SignupData) => signupUser(data),
    onMutate: () => {
      setIsSigningUp(true);
    },
    onSuccess: () => {
      toast.success("Signup successful! Please verify your email before logging in.");
    },
    onError: (error: any) => {
      toast.error("❌ Signup error:", error.message);
    },
    onSettled: () => {
      setIsSigningUp(false);
    },
  });

  const signUp = (data: any) => {
    const { name, signupemail, signuppassword } = data;

    mutation.mutate({
      name,
      email: signupemail,
      password: signuppassword,
    });
  };

  return {
    isSigningUp,
    signUp,
  };
};
