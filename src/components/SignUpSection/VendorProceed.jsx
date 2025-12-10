// SignUp.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerVendor } from "../../api/auth";
import "./VendorProceed.css";

const VendorComplete = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [signUpData, setSignUpData] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    // Retrieve data from first form
    const storedData = localStorage.getItem("vendorSignUpData");
    if (!storedData) {
      // If no data from first form, redirect back to signup
      navigate("/vendorsignup");
      return;
    }
    setSignUpData(JSON.parse(storedData));
  }, [navigate]);

  const parseCountryCity = (countryCityString) => {
    // Parse "Country, City" format (e.g., "Nigeria, Lagos")
    if (!countryCityString) return { country: "", city: "" };
    
    const parts = countryCityString.split(",").map(part => part.trim());
    if (parts.length >= 2) {
      return {
        country: parts[0],
        city: parts[1]
      };
    }
    // If format is different, assume the whole string is the city
    return {
      country: "",
      city: countryCityString
    };
  };

  const onSubmit = async (data) => {
    if (!signUpData) {
      setError("Please complete the first step of registration");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Parse country and city from countryCity field
      const { country, city } = parseCountryCity(data.countryCity);

      // Combine data from both forms
      const registrationData = {
        first_name: signUpData.firstName,
        last_name: signUpData.lastName,
        email: signUpData.email,
        password: signUpData.password,
        phone: signUpData.phone,
        business_name: data.fullName,
        business_type: data.businessType,
        business_description: data.businessDescription,
        city_of_operation: city || data.countryCity,
        country: country || data.countryCity,
      };

      console.log("Registration data:", registrationData);

      // Call the API
      const response = await registerVendor(registrationData);
      
      console.log("API Response:", response.data);

      // Clear localStorage after successful registration
      localStorage.removeItem("vendorSignUpData");

      // Navigate to dashboard or success page
      navigate("/vendordashboard");
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignup = () => {
    console.log("Google signup clicked");
    // You can trigger Google SDK here
    // then redirect after success:
    navigate("/vendordashboard");
  };

  const handleFacebookSignup = () => {
    console.log("Facebook signup clicked");
    // You can trigger Facebook SDK here
    // then redirect after success:
    navigate("/vendordashboard");
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
          <h1 className="title-login">Your Business Information</h1>

          {/* Error Message */}
          {error && (
            <div className="error-message" style={{ 
              marginBottom: "1rem", 
              padding: "0.75rem", 
              backgroundColor: "#fee", 
              color: "#c33", 
              borderRadius: "4px",
              textAlign: "center"
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <div className="login-form">
            {/* business Name Field */}
            <div className="form-group">
              <label htmlFor="fullName">Business name</label>
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
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  className={errors.fullName ? "error" : ""}
                  {...register("fullName", {
                    required: "Business name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </div>
              {errors.fullName && (
                <span className="error-message">{errors.fullName.message}</span>
              )}
            </div>

            {/* business type Field */}
            <div className="form-group">
              <label htmlFor="businessType">Business Type</label>
              <div className="input-container">
                <div className="input-icon">
                  {/* <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-10 5L2 7" />
                  </svg> */}

                      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12c0-3.866 3.582-7 8-7s8 3.134 8 7c0 2.5-2 4-2 6 0 1.105-.895 2-2 2H8c-1.105 0-2-.895-2-2 0-2-2-3.5-2-6z" />
      <path d="M9 17v1" />
      <path d="M15 17v1" />
    </svg>
                </div>
                <input
                  id="businessType"
                  type="text"
                  placeholder="Bakery"
                  className={errors.businessType ? "error" : ""}
                  {...register("businessType", {
                    required: "Business type is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Business type should only contain letters",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <span className="error-message">{errors.businessType.message}</span>
              )}
            </div>

            {/* Business Description */}
<div className="form-group">
  <label htmlFor="businessDescription">Business Description</label>
  <div className="input-container">
    <div className="input-icon">
      {/* document/text icon */}
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg> */}
    </div>
    <textarea
      id="businessDescription"
      placeholder="Tell us about your business"
      className={errors.businessDescription ? "error" : ""}
      {...register("businessDescription", {
        required: "Business description is required",
        minLength: {
          value: 20,
          message: "Description should be at least 20 characters",
        },
      })}
    ></textarea>
  </div>
  {errors.businessDescription && (
    <span className="error-message">{errors.businessDescription.message}</span>
  )}
</div>


        {/* Country & City of Operation */}
<div className="form-group">
  <label htmlFor="countryCity">Country And City Of Operation</label>
  <div className="input-container">
    <div className="input-icon">
      {/* location pin icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    </div>
    <input
      id="countryCity"
      type="text"
      placeholder="e.g. Nigeria, Lagos"
      className={errors.countryCity ? "error" : ""}
      {...register("countryCity", {
        required: "Country & City of operation is required",
      })}
    />
  </div>
  {errors.countryCity && (
    <span className="error-message">{errors.countryCity.message}</span>
  )}
</div>


        <div class="form-group">
  <label for="deliveryCountries">Countries You Can Deliver To</label>
  <select id="deliveryCountries" name="deliveryCountries" required>
    <option value="" disabled selected  className="country-select">Select a country</option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Albania">Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Argentina">Argentina</option>
    <option value="Armenia">Armenia</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Bahamas">Bahamas</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Barbados">Barbados</option>
    <option value="Belgium">Belgium</option>
    <option value="Belize">Belize</option>
    <option value="Benin">Benin</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivia">Bolivia</option>
    <option value="Botswana">Botswana</option>
    <option value="Brazil">Brazil</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Burkina Faso">Burkina Faso</option>
    <option value="Cambodia">Cambodia</option>
    <option value="Cameroon">Cameroon</option>
    <option value="Canada">Canada</option>
    <option value="Cape Verde">Cape Verde</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="Colombia">Colombia</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Croatia">Croatia</option>
    <option value="Cuba">Cuba</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czech Republic">Czech Republic</option>
    <option value="Denmark">Denmark</option>
    <option value="Dominican Republic">Dominican Republic</option>
    <option value="Ecuador">Ecuador</option>
    <option value="Egypt">Egypt</option>
    <option value="Estonia">Estonia</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Fiji">Fiji</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="Gabon">Gabon</option>
    <option value="Gambia">Gambia</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Greece">Greece</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Haiti">Haiti</option>
    <option value="Honduras">Honduras</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="Iran">Iran</option>
    <option value="Iraq">Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Israel">Israel</option>
    <option value="Italy">Italy</option>
    <option value="Jamaica">Jamaica</option>
    <option value="Japan">Japan</option>
    <option value="Jordan">Jordan</option>
    <option value="Kazakhstan">Kazakhstan</option>
    <option value="Kenya">Kenya</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Latvia">Latvia</option>
    <option value="Lebanon">Lebanon</option>
    <option value="Liberia">Liberia</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Madagascar">Madagascar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Maldives">Maldives</option>
    <option value="Mali">Mali</option>
    <option value="Malta">Malta</option>
    <option value="Mauritius">Mauritius</option>
    <option value="Mexico">Mexico</option>
    <option value="Moldova">Moldova</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolia">Mongolia</option>
    <option value="Montenegro">Montenegro</option>
    <option value="Morocco">Morocco</option>
    <option value="Mozambique">Mozambique</option>
    <option value="Namibia">Namibia</option>
    <option value="Nepal">Nepal</option>
    <option value="Netherlands">Netherlands</option>
    <option value="New Zealand">New Zealand</option>
    <option value="Nicaragua">Nicaragua</option>
    <option value="Nigeria">Nigeria</option>
    <option value="Norway">Norway</option>
    <option value="Oman">Oman</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Panama">Panama</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippines">Philippines</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Qatar">Qatar</option>
    <option value="Romania">Romania</option>
    <option value="Russia">Russia</option>
    <option value="Rwanda">Rwanda</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Senegal">Senegal</option>
    <option value="Serbia">Serbia</option>
    <option value="Singapore">Singapore</option>
    <option value="Slovakia">Slovakia</option>
    <option value="Slovenia">Slovenia</option>
    <option value="South Africa">South Africa</option>
    <option value="South Korea">South Korea</option>
    <option value="Spain">Spain</option>
    <option value="Sri Lanka">Sri Lanka</option>
    <option value="Sudan">Sudan</option>
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="Syria">Syria</option>
    <option value="Taiwan">Taiwan</option>
    <option value="Tanzania">Tanzania</option>
    <option value="Thailand">Thailand</option>
    <option value="Togo">Togo</option>
    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
    <option value="Tunisia">Tunisia</option>
    <option value="Turkey">Turkey</option>
    <option value="Uganda">Uganda</option>
    <option value="Ukraine">Ukraine</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States">United States</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Venezuela">Venezuela</option>
    <option value="Vietnam">Vietnam</option>
    <option value="Yemen">Yemen</option>
    <option value="Zambia">Zambia</option>
    <option value="Zimbabwe">Zimbabwe</option>
  </select>
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
                  <a href="/terms" className="terms-link">
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
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Complete Sign Up"}
            </button>

            {/* <a href="#" className="submit-btn">Complete Sign Up</a> */}
            
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

export default VendorComplete;
