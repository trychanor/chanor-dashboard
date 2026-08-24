import * as Yup from "yup";

export const adminLoginEmailSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .trim(),
});

export const adminLoginOtpSchema = Yup.object({
  code: Yup.string()
    .required("Verification code is required")
    .matches(/^\d{6}$/, "Code must be exactly 6 digits")
    .length(6, "Code must be 6 digits"),
});