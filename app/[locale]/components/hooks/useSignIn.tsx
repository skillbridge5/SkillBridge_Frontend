"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface SignInProps {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const useSignIn = (initialValues: SignInProps = {
  email: "",
  password: "",
  rememberMe: false
}) => {
  const [values, setValues] = useState<SignInProps>(initialValues);
  const [errors, setErrors] = useState<Partial<SignInProps>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const router = useRouter();

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Token management functions
  const getAccessToken = useCallback((): string | null => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("accessToken");
    }
    return null;
  }, []);

  const getRefreshToken = useCallback((): string | null => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("refreshToken");
    }
    return null;
  }, []);

  const setTokens = useCallback(({ accessToken, refreshToken }: Tokens): void => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("accessToken", accessToken);
      sessionStorage.setItem("refreshToken", refreshToken);
      
      // If rememberMe is true, also store in localStorage for persistence
      if (values.rememberMe) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
      }
    }
  }, [values.rememberMe]);

  const setUserData = useCallback((user: UserData): void => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      if (values.rememberMe) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    }
  }, [values.rememberMe]);

  const clearAuthData = useCallback((): void => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");
      sessionStorage.removeItem("currentUser");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("currentUser");
    }
  }, []);

  const redirectToLogin = useCallback((): void => {
    clearAuthData();
    router.push("/signin");
  }, [clearAuthData, router]);

  const validateError = useCallback((values: SignInProps) => {
    const errors: Partial<SignInProps> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!values.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === "checkbox" ? checked : value;

      setValues((prevValues) => ({ ...prevValues, [name]: newValue }));
      
      // Clear error for this field if it exists
      if (errors[name as keyof SignInProps]) {
        setErrors((prevErrors) => {
          const newErrors = { ...prevErrors };
          delete newErrors[name as keyof SignInProps];
          return newErrors;
        });
      }
      
      setApiError(null);
    },
    [errors]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setApiError(null);
  }, [initialValues]);

  const authenticatedFetch = useCallback(
    async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      let accessToken = getAccessToken();
      const headers = new Headers(init?.headers);

      if (accessToken && !headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      const config: RequestInit = { ...init, headers };

      try {
        let response = await fetch(input, config);

        // Handle token expiration
        if (response.status === 401) {
          const originalRequest = { input, config };
          const refreshToken = getRefreshToken();

          if (!refreshToken) {
            redirectToLogin();
            return Promise.reject(
              new Error("No refresh token available. Redirecting to login.")
            );
          }

          // If we're already refreshing, queue the request
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            })
              .then((token) => {
                if (token) {
                  (originalRequest.config.headers as Headers).set(
                    "Authorization",
                    `Bearer ${token}`
                  );
                  return fetch(originalRequest.input, originalRequest.config);
                }
                throw new Error("Token refresh failed in queue. Redirecting.");
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          isRefreshing = true;

          try {
            const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ refreshToken }),
            });

            if (!refreshResponse.ok) {
              throw new Error("Refresh token invalid or expired.");
            }

            const data = await refreshResponse.json();
            const newAccessToken = data.accessToken;
            const newRefreshToken = data.refreshToken;

            if (!newAccessToken || !newRefreshToken) {
              throw new Error(
                "Token refresh response did not contain new tokens."
              );
            }

            setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });
            (originalRequest.config.headers as Headers).set(
              "Authorization",
              `Bearer ${newAccessToken}`
            );

            processQueue(null, newAccessToken);
            return fetch(originalRequest.input, originalRequest.config);
          } catch (refreshError) {
            console.error("Failed to refresh token:", refreshError);
            clearAuthData();
            redirectToLogin();
            processQueue(refreshError);
            return Promise.reject(refreshError);
          } finally {
            isRefreshing = false;
          }
        }

        return response;
      } catch (error) {
        console.error("API client network error:", error);
        return Promise.reject(error);
      }
    },
    [API_BASE_URL, clearAuthData, getAccessToken, getRefreshToken, redirectToLogin, setTokens]
  );

  const handleSubmit = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();
      setApiError(null);

      const validationErrors = validateError(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        setApiError("Please correct the errors and try again.");
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(`${API_BASE_URL}/auth/login-student`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        if (!response.ok) {
          let errorMessage = "Login failed. Please try again.";
          
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || `Error ${response.status}: ${response.statusText}`;
            
            // Handle specific error cases
            if (response.status === 401) {
              errorMessage = "Invalid email or password";
            } else if (response.status === 403) {
              errorMessage = "Account not verified. Please check your email.";
            }
          } catch (jsonParseError) {
            console.error("Failed to parse error response:", jsonParseError);
            const textResponse = await response.text();
            console.error("Raw error response:", textResponse);
          }
          
          setApiError(errorMessage);
          return;
        }

        const responseData = await response.json();

        if (!responseData.accessToken || !responseData.refreshToken) {
          setApiError("Login successful but missing authentication tokens.");
          return;
        }

        // Store tokens and user data
        setTokens({
          accessToken: responseData.accessToken,
          refreshToken: responseData.refreshToken,
        });

        if (responseData.user) {
          setUserData(responseData.user);
        }

        // Reset form and redirect
        resetForm();
        router.push("/courses");
      } catch (error) {
        console.error("Network error during sign-in:", error);
        setApiError(
          error instanceof Error
            ? error.message
            : "Failed to connect to the server. Please check your internet connection."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [API_BASE_URL, resetForm, router, setTokens, setUserData, validateError, values]
  );

  // Initialize from localStorage if rememberMe was true
  const initializeFromStorage = useCallback(() => {
    if (typeof window !== "undefined" && values.rememberMe) {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      const storedUser = localStorage.getItem("currentUser");

      if (storedAccessToken && storedRefreshToken) {
        sessionStorage.setItem("accessToken", storedAccessToken);
        sessionStorage.setItem("refreshToken", storedRefreshToken);
      }

      if (storedUser) {
        sessionStorage.setItem("currentUser", storedUser);
      }
    }
  }, [values.rememberMe]);

  // Call initialize on mount
  useState(() => {
    initializeFromStorage();
  });

  return {
    handleChange,
    errors,
    values,
    resetForm,
    handleSubmit,
    isLoading,
    apiError,
    authenticatedFetch,
    clearAuthData,
    getAccessToken,
  };
};

export default useSignIn;