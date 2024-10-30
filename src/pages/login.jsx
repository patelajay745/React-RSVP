import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { login } from "@/features/user/userSlice";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useFetch from "@/hooks/useFetch";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const {
    data,
    error: fetchError,
    fetchData,
  } = useFetch("https://rsvp-backend.ajayproject.com/login", {
    method: "POST",
    mode: "cors",
    body: new URLSearchParams(formData),
    credentials: "include",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    await fetchData();
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(login(data.data));
      navigate("/");
      // dispatch(login(data));
      // navigate("/");
    }
    if (fetchError) {
      console.log(fetchError);
      setError(fetchError);
    }
  }, [data, fetchError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const loginStatus = useSelector((state) => {
    return state.userReducer;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Welcome back! Please login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john.doe@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button onClick={fetchData} type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
            <Link
              to="/register"
              className="text-sm text-primary hover:underline"
            >
              Don't have an account? Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
