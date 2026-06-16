"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import PhoneInput from "@/components/PhoneInput";
import {
  marketingFormControlClass,
  marketingFormFieldErrorClass,
  marketingFormIntroClass,
  marketingFormLabelClass,
  marketingFormRootClass,
  marketingFormStatusErrorClass,
  marketingFormStatusSuccessClass,
  marketingFormSubmitClass,
  marketingFormTitleClass,
} from "@/lib/forms/marketing-form-classes";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { getCleanAttributionPayloadForHubSpot } from "@/lib/attribution";

const formSchema = z.object({
  fullname: z.string().trim().min(1, "Full name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Please enter a valid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(6, "Phone number must be at least 6 characters").max(20, "Phone number must be less than 20 characters"),
  company: z.string().trim().min(1, "Company name is required").max(100, "Company name must be less than 100 characters"),
  designation: z.string().trim().min(1, "Please select a designation"),
  linkedin_url: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
  app_link: z.string().url("Please enter a valid URL").optional().or(z.literal(''))
});

type FormData = z.infer<typeof formSchema>;

const FlutterContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    phone: '',
    company: '',
    designation: '',
    linkedin_url: '',
    app_link: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setValidationErrors({});

    // Validate form data with zod
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit validated data to HubSpot - Flutter form ID
      const portalId = "47284450";
      const formId = "9fc3d64c-42df-4765-bffa-f1fa70a1b761";
      
      const validatedData = result.data;
      
      const attributionFields = Object.entries(getCleanAttributionPayloadForHubSpot()).map(
        ([name, value]) => ({ name, value }),
      );

      const hubspotData = {
        fields: [
          { name: "fullname", value: validatedData.fullname },
          { name: "email", value: validatedData.email },
          { name: "phone", value: validatedData.phone },
          { name: "company", value: validatedData.company },
          { name: "designation", value: validatedData.designation },
          { name: "linkedin_url", value: validatedData.linkedin_url || "" },
          { name: "app_link", value: validatedData.app_link || "" },
          ...attributionFields,
        ],
        context: {
          pageUri: window.location.href,
          pageName: "QAPilot Flutter Testing Platform",
        },
      };

      const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotData)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }
      
      setSubmitStatus('success');
      
      // Reset form only on successful HubSpot submission
      setFormData({
        fullname: '',
        email: '',
        phone: '',
        company: '',
        designation: '',
        linkedin_url: '',
        app_link: ''
      });
      
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("bg-background/80 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-lg max-w-2xl w-full", marketingFormRootClass)}>
      <div className="mb-6">
        <h3 className={cn(marketingFormTitleClass, "mb-2")}>
          Get Started with Flutter Testing
        </h3>
        <p className={marketingFormIntroClass}>
          Complete the form below and we'll get you set up with our Flutter testing platform.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className={cn(marketingFormStatusSuccessClass, "mb-6")}>
          Thank you! We'll be in touch soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className={cn(marketingFormStatusErrorClass, "mb-6")}>
          Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullname" className={marketingFormLabelClass}>
            Full Name *
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            required
            maxLength={100}
            value={formData.fullname}
            onChange={handleInputChange}
            className={marketingFormControlClass({ invalid: !!validationErrors.fullname })}
            placeholder="Enter your full name"
          />
          {validationErrors.fullname && (
            <p className={marketingFormFieldErrorClass}>{validationErrors.fullname}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={marketingFormLabelClass}>
            Work Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            maxLength={255}
            value={formData.email}
            onChange={handleInputChange}
            className={marketingFormControlClass({ invalid: !!validationErrors.email })}
            placeholder="you@company.com"
          />
          {validationErrors.email && (
            <p className={marketingFormFieldErrorClass}>{validationErrors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className={marketingFormLabelClass}>
            Phone Number *
          </label>
          <PhoneInput
            value={formData.phone}
            onChange={(value) => {
              setFormData(prev => ({ ...prev, phone: value }));
              if (validationErrors.phone) {
                setValidationErrors(prev => {
                  const newErrors = { ...prev };
                  delete newErrors.phone;
                  return newErrors;
                });
              }
            }}
            placeholder="Phone number"
          />
          {validationErrors.phone && (
            <p className={marketingFormFieldErrorClass}>{validationErrors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className={marketingFormLabelClass}>
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            maxLength={100}
            value={formData.company}
            onChange={handleInputChange}
            className={marketingFormControlClass({ invalid: !!validationErrors.company })}
            placeholder="Your company name"
          />
          {validationErrors.company && (
            <p className={marketingFormFieldErrorClass}>{validationErrors.company}</p>
          )}
        </div>

        <div>
          <label htmlFor="designation" className={marketingFormLabelClass}>
            Designation *
          </label>
          <select
            id="designation"
            name="designation"
            required
            value={formData.designation}
            onChange={handleInputChange}
            className={cn(
              marketingFormControlClass({
                invalid: !!validationErrors.designation,
                selectPlaceholder: !formData.designation,
              }),
              "cursor-pointer",
            )}
          >
            <option value="">Select your designation</option>
            <option value="Developer">Developer</option>
            <option value="QA Analyst / Tester">QA Analyst / Tester</option>
            <option value="Automation Specialist">Automation Specialist</option>
            <option value="Quality Engineer">Quality Engineer</option>
            <option value="Team Lead / Manager">Team Lead / Manager</option>
            <option value="Director / VP / CTO">Director / VP / CTO</option>
            <option value="Independent / Consultant">Independent / Consultant</option>
            <option value="Others">Others</option>
          </select>
          {validationErrors.designation && (
            <p className={marketingFormFieldErrorClass}>{validationErrors.designation}</p>
          )}
        </div>

        <div>
          <label htmlFor="linkedin_url" className={marketingFormLabelClass}>
            LinkedIn URL
          </label>
          <input
            type="url"
            id="linkedin_url"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleInputChange}
            className={marketingFormControlClass({ invalid: !!validationErrors.linkedin_url })}
            placeholder="https://linkedin.com/in/yourprofile"
          />
          {validationErrors.linkedin_url && (
            <p className={marketingFormFieldErrorClass}>{validationErrors.linkedin_url}</p>
          )}
        </div>

        <div>
          <label htmlFor="app_link" className={marketingFormLabelClass}>
            App Link
          </label>
          <input
            type="url"
            id="app_link"
            name="app_link"
            value={formData.app_link}
            onChange={handleInputChange}
            className={marketingFormControlClass({ invalid: !!validationErrors.app_link })}
            placeholder="Link to your Flutter app"
          />
          {validationErrors.app_link && (
            <p className={marketingFormFieldErrorClass}>{validationErrors.app_link}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(marketingFormSubmitClass, "bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-6 transition-colors")}
        >
          {isSubmitting ? 'Submitting...' : 'Get Started with QAPilot'}
        </Button>

        <p className="text-xs font-sans text-muted-foreground text-center mt-4">
          By submitting this form, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
};

export default FlutterContactForm;