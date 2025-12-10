// SignUp.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./VendorSignUp.css";

const VendorSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    // Save form data to localStorage for the next step
    localStorage.setItem("vendorSignUpData", JSON.stringify(data));
    // Navigate to vendor proceed page
    navigate("/vendorproceed");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    // You can trigger Google SDK here
    // then redirect after success:
    navigate("/dashboard");
  };

  const handleFacebookSignup = () => {
    console.log("Facebook signup clicked");
    // You can trigger Facebook SDK here
    // then redirect after success:
    navigate("/dashboard");
  };

  return (
    <section className="sign-up">
      <div className="login-container">
        <div className="login-card">
          {/* Logo */}
          <div className="logo">
            <img src="/bwlogo.png" alt="logo" />
          </div>

          {/* Title and Subtitle */}
          <h1 className="title-login">Create a Vendor Account</h1>
          <p className="subtitle">
            Join Best Wishes and start making happy moments.
          </p>

          {/* Form */}
          <div className="login-form">
{/* First Name Field */}
            <div className="form-group">
              <label htmlFor="firstName">First name</label>
              <div className="input-container">
                <div className="input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  className={errors.firstName ? "error" : ""}
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </div>
              {errors.firstName && (
                <span className="error-message">{errors.firstName.message}</span>
              )}
            </div>

              {/* Last Name field */}

            <div className="form-group">
              <label htmlFor="lastName">Last name</label>
              <div className="input-container">
                <div className="input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  className={errors.lastName ? "error" : ""}
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </div>
              {errors.lastName && (
                <span className="error-message">{errors.lastName.message}</span>
              )}
            </div>


            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-container">
                <div className="input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 5L2 7" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className={errors.email ? "error" : ""}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span className="error-message">{errors.email.message}</span>
              )}
            </div>

            {/* phone field*/}

              <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-container">
                <div className="input-icon">
                  <svg
    // xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    // className="w-5 h-5 text-gray-500 mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 4.5l3.75-1.5a.75.75 0 01.95.35l2.1 4.2a.75.75 0 01-.17.89l-1.95 1.56a11.25 11.25 0 005.58 5.58l1.56-1.95a.75.75 0 01.89-.17l4.2 2.1a.75.75 0 01.35.95l-1.5 3.75a.75.75 0 01-.71.46A16.5 16.5 0 013.21 5.21a.75.75 0 01.46-.71z"
    />
  </svg>
                </div>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className={errors.phone ? "error" : ""}
                  {...register("phone", {
                    required: "Phone Number is required",
                    minLength: {
                      value: 2,
                      message: "Number must be at least 2 characters",
                    },
                  })}
                />
              </div>
              {errors.phone && (
                <span className="error-message">{errors.phone.message}</span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-container">
                <div className="input-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="11" width="18" height="10" rx="2" ry="2" />
                    <circle cx="12" cy="16" r="1" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={errors.password ? "error" : ""}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="form-group checkbox-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  {...register("terms", {
                    required: "You must accept the terms",
                  })}
                />
                <span className="checkmark"></span>
                <span className="checkbox-text">
                  Yes, I understand and agree to the BestWishes{" "}
                  <a href="#" className="terms-link">
                    Terms of Service
                  </a>
                </span>
              </label>
              {errors.terms && (
                <span className="error-message">{errors.terms.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="submit-btn"
            >
              Proceed
            </button>
            
            {/* <p>Want to be a vendor? <a href="/vendorsignup" className="login-btn">Click here</a></p><br />
            <p>Already have an account? <a href="/signin" className="login-btn">Click here</a></p> */}
          </div>

          {/* Divider */}
          {/* <div className="divider">
            <span>Or signup with</span>
          </div> */}

          {/* Social Login Buttons */}
          {/* <div className="social-buttons">
            <button
              type="button"
              className="social-btn google-btn"
              onClick={handleGoogleSignup}
            >
              
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </button>

            <button
              type="button"
              className="social-btn facebook-btn"
              onClick={handleFacebookSignup}
            >
            
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Sign up with Facebook
            </button>
          </div> */}
        </div>

        <img src="/auth-image.png" alt="signup" className="auth-image" />
      </div>
    </section>
  );
};

export default VendorSignup;
