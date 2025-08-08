import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Inquery.module.css";

const Inquery = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    setSubmitted(true);
  };

  const interestValue = watch("interest");

  return (
    <div className={styles.formContainer}>
      {/* Header with Logo */}
      <div className={styles.header}>
        <img src="/logo.png" alt="Company Logo" className={styles.logo} />
        <h2>Student Inquiry Form</h2>
        <p>Fill out the form below for admission inquiries</p>
      </div>

      {/* Success message */}
      {submitted && (
        <div className={styles.successMsg}>
          ✅ Thank you! Your inquiry has been submitted successfully.
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        {/* Full Name */}
        <div className={styles.formGroup}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <span className={styles.error}>{errors.fullName.message}</span>
          )}
        </div>

        {/* Mobile Number */}
        <div className={styles.formGroup}>
          <label>Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{7,15}$/,
                message: "Invalid mobile number",
              },
            })}
          />
          {errors.mobile && (
            <span className={styles.error}>{errors.mobile.message}</span>
          )}
        </div>

        {/* Email */}
        <div className={styles.formGroup}>
          <label>Email ID</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        {/* Address */}
        <div className={styles.formGroup}>
          <label>Address</label>
          <input
            type="text"
            placeholder="Enter your address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <span className={styles.error}>{errors.address.message}</span>
          )}
        </div>

        {/* Interested For */}
        <div className={styles.formGroup}>
          <label>Interested For</label>
          <select
            {...register("interest", { required: "Please select an option" })}
          >
            <option value="">-- Select a field --</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphics Design">Graphics Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Others">Others</option>
          </select>
          {errors.interest && (
            <span className={styles.error}>{errors.interest.message}</span>
          )}
        </div>

        {/* If "Others" selected */}
        {interestValue === "Others" && (
          <div className={styles.formGroup}>
            <label>Specify Field</label>
            <input
              type="text"
              placeholder="Enter your field of interest"
              {...register("otherField", {
                required: "Please specify your field",
              })}
            />
            {errors.otherField && (
              <span className={styles.error}>{errors.otherField.message}</span>
            )}
          </div>
        )}

        {/* I am not a robot */}
        <div className={styles.checkboxGroup}>
          <input
            type="checkbox"
            {...register("notRobot", {
              required: "Please confirm you are not a robot",
            })}
          />
          <label>I am not a robot</label>
        </div>
        {errors.notRobot && (
          <span className={styles.error}>{errors.notRobot.message}</span>
        )}

        {/* Submit Button */}
        <button type="submit" className={styles.submitBtn}>
          Submit Inquiry
        </button>
      </form>
    </div>
  );
};

export default Inquery;
