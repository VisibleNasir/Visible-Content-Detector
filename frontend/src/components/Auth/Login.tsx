
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "../Navbar";

// Interface for form data
interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Partial<LoginForm> = {};
    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Login attempt:", form); // Simulate API call
      navigate("/"); // Redirect to home on success
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col bg-zinc-950 text-zinc-100">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-8 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full max-w-md"
        >
          <Card className="bg-gradient-to-br from-zinc-900 to-zinc-850 border border-zinc-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-zinc-100">
                Login
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-zinc-500"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-zinc-300">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className="bg-zinc-800 border-zinc-700 text-zinc-100 focus:ring-zinc-500"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password-error" : undefined}
                  />
                  {errors.password && (
                    <p id="password-error" className="text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {errors.password}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-zinc-200 text-zinc-950 rounded-full font-semibold shadow-lg hover:bg-zinc-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 focus:ring-offset-zinc-950"
                >
                  Login
                </Button>
              </form>
              <p className="text-center text-sm text-zinc-400">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
                >
                  Sign Up
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Login;