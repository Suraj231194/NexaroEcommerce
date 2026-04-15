import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState, useEffect } from "react";
import { queryClient } from "../lib/queryClient.js";
import { apiFetch } from "../lib/api-client.js";
import { toHumanErrorMessage } from "../lib/api-error.js";

const DEMO_STORAGE_KEY = "nexora_demo_user";

function readDemoUser() {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.localStorage.getItem(DEMO_STORAGE_KEY);
  if (!stored) {
    return null;
  }
  try {
    const parsed = JSON.parse(stored);
    if (parsed && typeof parsed === "object") {
      return parsed;
    }
    return null;
  } catch (error) {
    window.localStorage.removeItem(DEMO_STORAGE_KEY);
    return null;
  }
}

function getDefaultDemoUser() {
  return {
    id: "demo",
    email: "demo@nexora.shop",
    firstName: "Demo",
    lastName: "User",
    role: "user",
  };
}

export function useAuth() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const demoEnabled =
    process.env.NEXT_PUBLIC_DEMO_MODE === "true" || process.env.NODE_ENV !== "production";
  const demoUser = useMemo(() => (mounted && demoEnabled ? readDemoUser() : null), [mounted, demoEnabled]);

  const {
    data: user,
    isLoading: isQueryLoading,
    refetch,
  } = useQuery({
    queryKey: ["/api/auth/me"],
    queryFn: async () => {
      const { data } = await apiFetch("/api/auth/me", { on401: "returnNull" });
      if (!data) {
        return null;
      }
      return data.user;
    },
    retry: false,
    enabled: mounted && !demoUser,
    initialData: mounted && demoUser ? demoUser : undefined,
  });

  const isLoading = !mounted || isQueryLoading;
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      try {
        const { data } = await apiFetch("/api/auth/login", {
          method: "POST",
          data: credentials,
        });
        return data;
      } catch (error) {
        throw new Error(toHumanErrorMessage(error, "Login failed"));
      }
    },
    onSuccess: () => {
      refetch();
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (credentials) => {
      try {
        const { data } = await apiFetch("/api/auth/signup", {
          method: "POST",
          data: credentials,
        });
        return data;
      } catch (error) {
        throw new Error(toHumanErrorMessage(error, "Signup failed"));
      }
    },
    onSuccess: () => {
      refetch();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await apiFetch("/api/auth/logout", {
          method: "POST",
        });
        return data;
      } catch (error) {
        throw new Error(toHumanErrorMessage(error, "Logout failed"));
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/me"], null);
    },
  });

  const enableDemo = () => {
    if (!demoEnabled || typeof window === "undefined") {
      return null;
    }
    const nextUser = getDefaultDemoUser();
    window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(nextUser));
    queryClient.setQueryData(["/api/auth/me"], nextUser);
    return nextUser;
  };

  const disableDemo = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(DEMO_STORAGE_KEY);
    }
    queryClient.setQueryData(["/api/auth/me"], null);
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: (email, password) => {
      if (demoUser) {
        disableDemo();
      }
      return loginMutation.mutateAsync({ email, password });
    },
    signup: (email, password, firstName, lastName) => {
      if (demoUser) {
        disableDemo();
      }
      return signupMutation.mutateAsync({ email, password, firstName, lastName });
    },
    logout: () => (demoUser ? disableDemo() : logoutMutation.mutateAsync()),
    isLoggingIn: loginMutation.isPending,
    isSigningUp: signupMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    demoEnabled,
    enableDemo,
    disableDemo,
  };
}
