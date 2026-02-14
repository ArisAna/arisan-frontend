"use client";

import { useState } from "react";
import type { ContactFormData } from "@/types";

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState<Partial<ContactFormData>>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const errors: Partial<ContactFormData> = {};

    if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error for this field
    if (validationErrors[name as keyof ContactFormData]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_RAILWAY_API_URL;

      if (!apiUrl) {
        throw new Error("API URL is not configured");
      }

      const response = await fetch(`${apiUrl}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="panel">
      <h2 className="section-title">Contact Me</h2>
      <p className="mb-6 text-sm leading-7 text-slate-700 md:text-base">
        Feel free to reach out for collaborations or to discuss architecture, product strategy,
        and technical leadership opportunities.
      </p>

      {status === "success" && (
        <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
          <p className="text-sm font-semibold text-green-800">
            Message sent successfully! I&apos;ll get back to you soon.
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm font-semibold text-red-800">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: "var(--title)" }}>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all ${
              validationErrors.name
                ? "border-red-300 focus:ring-red-200"
                : "border-slate-300 focus:ring-2 focus:ring-blue-100"
            }`}
            style={{ outline: "none" }}
            disabled={status === "loading"}
          />
          {validationErrors.name && (
            <p className="mt-1 text-xs text-red-600">{validationErrors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: "var(--title)" }}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all ${
              validationErrors.email
                ? "border-red-300 focus:ring-red-200"
                : "border-slate-300 focus:ring-2 focus:ring-blue-100"
            }`}
            style={{ outline: "none" }}
            disabled={status === "loading"}
          />
          {validationErrors.email && (
            <p className="mt-1 text-xs text-red-600">{validationErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: "var(--title)" }}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className={`w-full px-4 py-2.5 rounded-lg border text-sm transition-all resize-none ${
              validationErrors.message
                ? "border-red-300 focus:ring-red-200"
                : "border-slate-300 focus:ring-2 focus:ring-blue-100"
            }`}
            style={{ outline: "none" }}
            disabled={status === "loading"}
          />
          {validationErrors.message && (
            <p className="mt-1 text-xs text-red-600">{validationErrors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
