import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { signup } = useAuth();
  const navigate = useNavigate();

  const roles = [
    { value: "Admin", label: "Admin" },
    { value: "Recruiter", label: "Recruiter" },
    { value: "Delivery Manager", label: "Delivery Manager" },
    { value: "Finance/HR Ops", label: "Finance/HR Ops" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    const emailRegex =
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password required";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const getDashboardRoute = (role) => {
    const routes = {
      Admin: "/admin",
      Recruiter: "/recruiter",
      "Delivery Manager": "/delivery",
      "Finance/HR Ops": "/finance",
    };

    return routes[role] || "/";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      console.log("Submitting signup:", formData);

      const response = await signup(formData);

      console.log("Signup response:", response);

      toast.success("Account created successfully!");

      const userRole = response.data.data.user.role;

      navigate(getDashboardRoute(userRole), { replace: true });

    } catch (error) {
      console.error("Signup error:", error);

      const errorMessage =
        error.response?.data?.message ||
        "Signup failed. Please try again.";

      toast.error(errorMessage);

      if (error.response?.data?.errors) {
        const serverErrors = {};

        error.response.data.errors.forEach((err) => {
          serverErrors[err.path] = err.msg;
        });

        setErrors(serverErrors);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select role</option>

            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          {errors.role && <p className="text-red-500">{errors.role}</p>}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password}</p>
          )}

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input-field"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword}</p>
          )}

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? <LoadingSpinner size="small" /> : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;