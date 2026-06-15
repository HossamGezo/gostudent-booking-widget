import { z } from "zod";

export const bookingSchema = z
  .object({
    // --- Personal Information ---
    loginPhoneCountry: z.string().min(1, "Country code is required"),
    loginPhone: z
      .string()
      .min(1, "Login phone number is required")
      .trim()
      .regex(/^\d+$/, "Phone number must contain digits only")
      .refine((val) => !val.startsWith("0"), "Phone number must not start with a leading 0")
      .refine((val) => val.length >= 6 && val.length <= 14, "Phone number must be between 6 and 14 digits"),

    contactPhoneCountry: z.string().min(1, "Country code is required"),
    contactPhone: z
      .string()
      .min(1, "Contact phone number is required")
      .trim()
      .regex(/^\d+$/, "Phone number must contain digits only")
      .refine((val) => !val.startsWith("0"), "Phone number must not start with a leading 0")
      .refine((val) => val.length >= 6 && val.length <= 14, "Phone number must be between 6 and 14 digits"),

    email: z.string().email({ message: "Invalid Email Address" }).trim(),

    name: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .regex(/^[a-zA-Z\s]*$/, "Name can only contain alphabetic letters")
      .trim(),

    // --- Billing Address ---
    address: z.string().min(1, "Street address is required").trim(),
    nr: z.string().min(1, "House number is required").trim(),
    postalCode: z.string().min(3, "Invalid postal code").regex(/^\d+$/, "Postal code must contain numbers only").trim(),
    city: z.string().min(1, "City is required").trim(),
    country: z.string().min(1, "Please select a country"),
    sessions: z.number().min(4).max(16),

    // --- Payment Configuration ---
    paymentMethod: z.enum(["sepa", "visa"]),

    // NOTE --- Card fields defined as optional initially because they depend on paymentMethod
    cardHolder: z.string().optional(),
    cardNumber: z.string().optional(),
    expiryAndCvc: z.string().optional(),

    // --- Terms & Conditions ---
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms & Conditions to proceed",
    }),
  })

  // --- Advanced Conditional Validation using superRefine ---
  .superRefine((data, ctx) => {
    // If the selected payment method is "visa", card fields must be valid
    if (data.paymentMethod === "visa") {
      // - Validation for Card Holder (Only letters and spaces, min 3 chars)
      if (!data.cardHolder || !/^[a-zA-Z\s]{3,50}$/.test(data.cardHolder.trim())) {
        ctx.addIssue({
          code: "custom",
          message: "Please enter a valid card holder name (letters only)",
          path: ["cardHolder"],
        });
      }

      // - Validation for Card Number (Exactly 16 digits)
      if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber.trim())) {
        ctx.addIssue({
          code: "custom",
          message: "Card number must be exactly 16 digits",
          path: ["cardNumber"],
        });
      }

      if (!data.expiryAndCvc || !/^(0[1-9]|1[0-2])\s?\/\s?\d{2}\s\d{3,4}$/.test(data.expiryAndCvc.trim())) {
        ctx.addIssue({
          code: "custom",
          message: "Invalid format. Expected: MM / YY CVC (e.g., 12 / 26 123)",
          path: ["expiryAndCvc"],
        });
      } else {
        const match = data.expiryAndCvc.trim().match(/^(0[1-9]|1[0-2])\s?\/\s?(\d{2})\s/);

        if (match) {
          const enteredMonth = parseInt(match[1], 10);
          const enteredYear = parseInt("20" + match[2], 10);

          const currentDate = new Date();
          const currentYear = currentDate.getFullYear();
          const currentMonth = currentDate.getMonth() + 1;

          if (enteredYear < currentYear) {
            ctx.addIssue({
              code: "custom",
              message: "The card has expired (Year is in the past)",
              path: ["expiryAndCvc"],
            });
          } else if (enteredYear === currentYear && enteredMonth < currentMonth) {
            ctx.addIssue({
              code: "custom",
              message: "The card has expired (Month is in the past)",
              path: ["expiryAndCvc"],
            });
          } else if (enteredYear > currentYear + 10) {
            ctx.addIssue({
              code: "custom",
              message: "Invalid expiry year (Too far in the future)",
              path: ["expiryAndCvc"],
            });
          }
        }
      }
    }
  });

export type BookingFormData = z.infer<typeof bookingSchema>;
