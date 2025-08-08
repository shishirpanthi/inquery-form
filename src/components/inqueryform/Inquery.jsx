import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Inquery.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inquery = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestedFor = watch("interestedFor");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }
      toast.success("Form submitted successfully!", { position: "top-center" });
      reset();
    } catch (err) {
      toast.error(err.message || "Submission failed", {
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src="/logo11.svg" alt="Company Logo" className={styles.logo} />
        <h1 className={styles.title}>Student Inquiry Form</h1>
      </header>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <label>
          Student Full Name <span className={styles.asterisk}>*</span>
          <input
            type="text"
            {...register("fullName", { required: "Full Name is required" })}
            placeholder="e.g. Ccr Panthi"
            className={styles.input}
            disabled={isSubmitting}
          />
          {errors.fullName && (
            <p className={styles.error}>{errors.fullName.message}</p>
          )}
        </label>

        {/* Mobile Number */}
        <label>
          Mobile Number <span className={styles.asterisk}>*</span>
          <input
            type="tel"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number",
              },
            })}
            placeholder="e.g. 98xxxxxx"
            className={styles.input}
            disabled={isSubmitting}
          />
          {errors.mobile && (
            <p className={styles.error}>{errors.mobile.message}</p>
          )}
        </label>

        {/* Email */}
        <label>
          Email ID <span className={styles.asterisk}>*</span>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="e.g. Ccr@example.com"
            className={styles.input}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </label>

        {/* Address */}
        <label>
          Address <span className={styles.asterisk}>*</span>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            placeholder="e.g. Kathmandu, Nepal"
            className={styles.input}
            disabled={isSubmitting}
          />
          {errors.address && (
            <p className={styles.error}>{errors.address.message}</p>
          )}
        </label>

        {/* Current Study Level */}
        <label>
          Current Study Level (Optional)
          <select
            {...register("studyLevel")}
            className={styles.select}
            disabled={isSubmitting}
          >
            <option value="">Select</option>
            <option value="SEE">SEE</option>
            <option value="+2">+2</option>
            <option value="Bachelor">Bachelor</option>
          </select>
        </label>

        {/* Interested For */}
        <label>
          Interested For <span className={styles.asterisk}>*</span>
          <select
            {...register("interestedFor", {
              required: "Please select a field",
            })}
            className={styles.select}
            disabled={isSubmitting}
          >
            <option value="">Select</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphics Design">Graphics Design</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="Others">Others</option>
          </select>
          {errors.interestedFor && (
            <p className={styles.error}>{errors.interestedFor.message}</p>
          )}
        </label>

        {/* Other Field Name */}
        {interestedFor === "Others" && (
          <label>
            Please Specify <span className={styles.asterisk}>*</span>
            <input
              type="text"
              {...register("otherField", {
                required: "Please specify the field",
              })}
              placeholder="e.g. Mobile App Development"
              className={styles.input}
              disabled={isSubmitting}
            />
            {errors.otherField && (
              <p className={styles.error}>{errors.otherField.message}</p>
            )}
          </label>
        )}

        {/* Submit */}
        <button type="submit" className={styles.button} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Inquery;
