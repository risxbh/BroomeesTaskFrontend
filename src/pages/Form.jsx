import React, { useState } from "react";
import Swal from "sweetalert2";
import aeroplane from "../assets/img/aeroplane.jpg";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formData2, setFormData2] = useState({
    username: "",
    password: "",
  });
  const [mode, setMode] = useState(0);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors2, setErrors2] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error message when the user starts typing
    setErrors({
      ...errors,
      [name]: "", // Clear the specific error message for the field
    });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({ ...formData2, [name]: value });

    // Clear the error message when the user starts typing
    setErrors2({
      ...errors2,
      [name]: "", // Clear the specific error message for the field
    });
  };

  const uppercase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Validation for Sign Up (formData)
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Check for empty fields
    for (let field in formData) {
      if (!formData[field]) {
        formErrors[field] = `${uppercase(field)} is required.`;
        isValid = false;
      }
    }

    // Check email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (formData.email && !emailRegex.test(formData.email)) {
      formErrors.email = "Please enter a valid email.";
      isValid = false;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Validation for Sign In (formData2)
  const validateForm2 = () => {
    let formErrors = {};
    let isValid = true;

    // Check for empty fields
    for (let field in formData2) {
      if (!formData2[field]) {
        formErrors[field] = `${uppercase(field)} is required.`;
        isValid = false;
      }
    }

    setErrors2(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation based on mode
    if (mode === 0) {
      if (!validateForm()) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please fix the errors in the form.",
        });
        return;
      }
    } else if (mode === 1) {
      if (!validateForm2()) {
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: "Please fix the errors in the form.",
        });
        return;
      }
    }
    const url = import.meta.env.VITE_API_BASE_URL;
    try {
      let apiUrl = mode === 0 ? `${url}/users/register` : `${url}/auth/login`;
      const payload =
        mode === 0
          ? {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              username: formData.username,
              password: formData.password,
            }
          : {
              username: formData2.username,
              password: formData2.password,
            };

      // Send the API request
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the response is not okay, handle errors
        const errorMessages = {};
        data.errors.forEach((error) => {
          errorMessages[error.key] = error.message; // Map errors to form fields
        });

        if (mode === 0) {
          setErrors(errorMessages);
        } else {
          setErrors2(errorMessages);
        }

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fix the errors in the form.",
        });
      } else {
        if (mode === 0) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Form submitted successfully!",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Login successfully!",
          });
        }

        // Reset form and errors
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          password: "",
          confirmPassword: "",
        });
        setFormData2({ username: "", password: "" });
        setErrors({});
        setErrors2({});
      }
    } catch (error) {
      // Handle any network errors
      console.error("Error during form submission:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "An error occurred while submitting the form.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center relative px-4 sm:py-0 py-4 bg-white m-auto md:max-h-[90vh] max-w-[1200px] border border-gray-300 rounded-lg sm:flex-row flex-col">
      <div className="hidden sm:flex absolute left-0 bottom-0 bg-[#0f0e14c7] z-10 w-[45%] p-10 py-14 items-center justify-center flex-col rounded-bl-lg">
        <h2 className="sm:text-5xl text-xl text-center font-semibold text-[#fff] sm:mb-8 mb-2 font-poppins">
          Altit<span className="pb-0 border-b-[3px] border-white">ud</span>e Air
        </h2>
        <p className="sm:text-[12px] text-[10px] text-center text-[#ffffff80] font-poppins">
          We promise to ensure that your well-being is taken care of while
          travelling with us. Boosting top-in-class lead inventory and five-star
          approval for our in-flight experience.
        </p>
      </div>
      <div className="hidden sm:block sm:w-3/6 w-full h-full pb-5 relative sm:pr-6 pr-0">
        <img
          src={aeroplane}
          className="sm:w-[50vw] w-full sm:h-[87vh] h-20 object-cover"
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className="rounded-lg sm:w-3/6 w-full sm:px-10 px-4 py-4 lg:py-0"
      >
        <div className="w-full text-right">
          <button
            className="text-[12px] font-medium ml-auto border rounded-sm border-[#5832DD] px-8 py-1 text-[#5832DD] mb-10 font-poppins"
            onClick={(e) => {
              e.preventDefault();
              setMode(mode == 0 ? 1 : 0);
            }}
          >
            {mode == 0 ? "SIGN IN" : "SIGN UP"}
          </button>
        </div>
        <h2 className="text-3xl font-semibold text-[#5832DD] mb-1 font-poppins">
          Explore & Experience
        </h2>
        <p className="text-sm text-[#5832DD] mb-10 font-poppins">
          Get onto your most comfortable journey yet. All the way up.
        </p>

        {mode == 0 && (
          <>
            {/* Sign Up Form Inputs */}
            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="block w-full mb-1 p-3 border text-[12px] font-poppins border-gray-300 rounded-[4px] shadow-sm focus:ring-[#5832DD] focus:border-[#5832DD]"
                  placeholder="First Name"
                />
                <p className="text-red-500 text-[12px]">{errors.firstName}</p>
              </div>
              <div className="w-1/2">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="block w-full mb-1 p-3 border text-[12px] font-poppins border-gray-300 rounded-[4px] shadow-sm focus:ring-[#5832DD] focus:border-[#5832DD]"
                  placeholder="Last Name"
                />
                <p className="text-red-500 text-[12px]">{errors.lastName}</p>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full mb-1 p-3 border text-[12px] font-poppins border-gray-300 rounded-[4px] shadow-sm focus:ring-[#5832DD] focus:border-[#5832DD]"
                placeholder="Email"
              />
              <p className="text-red-500 text-[12px]">{errors.email}</p>
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="block w-full mb-1 p-3 border text-[12px] font-poppins border-gray-300 rounded-[4px] shadow-sm focus:ring-[#5832DD] focus:border-[#5832DD]"
                placeholder="Username"
              />
              <p className="text-red-500 text-[12px]">{errors.username}</p>
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="block w-full mb-1 p-3 border text-[12px] font-poppins border-gray-300 rounded-[4px] shadow-sm focus:ring-[#5832DD] focus:border-[#5832DD]"
                placeholder="Password"
              />
              <p className="text-red-500 text-[12px]">{errors.password}</p>
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full mb-1 p-3 border text-[12px] font-poppins border-gray-300 rounded-[4px] shadow-sm focus:ring-[#5832DD] focus:border-[#5832DD]"
                placeholder="Confirm Password"
              />
              <p className="text-red-500 text-[12px]">
                {errors.confirmPassword}
              </p>
            </div>
          </>
        )}

        {mode == 1 && (
          <>
            {/* Sign In Form Inputs */}
            <div className="mb-4">
              <input
                type="text"
                name="username"
                value={formData2.username}
                onChange={handleChange2}
                className="block w-full mb-1 p-3 border text-[12px] font-poppins border-gray-300 rounded-[4px] shadow-sm focus:ring-[#5832DD] focus:border-[#5832DD]"
                placeholder="Username"
              />
              <p className="text-red-500 text-[12px]">{errors2.username}</p>
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={formData2.password}
                onChange={handleChange2}
                className="block w-full mb-1 p-3 border text-[12px] font-poppins border-gray-300 rounded-[4px] shadow-sm focus:ring-[#5832DD] focus:border-[#5832DD]"
                placeholder="Password"
              />
              <p className="text-red-500 text-[12px]">{errors2.password}</p>
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-[#5832DD] text-white font-semibold rounded-lg text-sm"
        >
          {mode == 0 ? "SIGN UP" : "SIGN IN"}
        </button>
      </form>
    </div>
  );
};

export default Form;
