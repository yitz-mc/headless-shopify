'use client';

import { useState } from 'react';
import content from '@/content/pro-form.json';

interface FormData {
  name: string;
  lastName: string;
  company: string;
  phone: string;
  email: string;
  profession: string;
}

export function ProForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    lastName: '',
    company: '',
    phone: '',
    email: '',
    profession: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const utmSource = localStorage.getItem('utm_source') || '';
      const utmMedium = localStorage.getItem('utm_medium') || '';
      const utmCampaign = localStorage.getItem('utm_campaign') || '';
      const utmTerm = localStorage.getItem('utm_term') || '';
      const landingPage = localStorage.getItem('landing_page') || window.location.href;
      const visitorId = localStorage.getItem('mc_visitor_id') || '';

      const payload = {
        name: formData.name,
        'last name': formData.lastName,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        profession: formData.profession,
        'utm source': utmSource,
        'utm medium': utmMedium,
        'utm campaign': utmCampaign,
        'utm term': utmTerm,
        'landing page': landingPage,
        'visitor id': visitorId,
      };

      await fetch(content.webhook, {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formClasses = `
    pro-form
    md:absolute md:top-[150px] md:left-1/2 md:translate-x-[160px]
    md:rounded-[15px] md:w-[500px]
    w-full
    px-5 md:px-10 py-[10px]
  `;

  if (isSubmitted) {
    return (
      <div
        id={content.formId}
        className={formClasses}
        style={{ backgroundColor: content.backgroundColor }}
      >
        <div className="text-center py-8">
          <p className="text-xl font-bold text-white mb-2">Thank you for your interest!</p>
          <p className="text-white">A member of our Pro team will be in touch within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      id={content.formId}
      className={formClasses}
      style={{ backgroundColor: content.backgroundColor }}
    >
      {/* Heading */}
      <p
        className="text-lg md:text-xl text-center leading-[1.2] mx-auto my-0"
        style={{ color: content.textColor }}
      >
        {content.heading}
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap justify-between gap-y-2 mt-4">
          <input
            type="text"
            name="name"
            placeholder="First Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-[49%] px-4 py-2 rounded-[5px] border-0 focus:ring-2 focus:ring-black text-sm"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-[49%] px-4 py-2 rounded-[5px] border-0 focus:ring-2 focus:ring-black text-sm"
          />
          <input
            type="text"
            name="company"
            placeholder="Company"
            required
            value={formData.company}
            onChange={handleChange}
            className="w-[49%] px-4 py-2 rounded-[5px] border-0 focus:ring-2 focus:ring-black text-sm"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-[49%] px-4 py-2 rounded-[5px] border-0 focus:ring-2 focus:ring-black text-sm"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-[49%] px-4 py-2 rounded-[5px] border-0 focus:ring-2 focus:ring-black text-sm"
          />
          <select
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-[49%] px-4 py-2 rounded-[5px] border-0 focus:ring-2 focus:ring-black bg-white text-gray-700 text-sm"
          >
            {content.professions.map((profession) => (
              <option key={profession} value={profession === 'Select Profession' ? '' : profession}>
                {profession}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center my-5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-10 py-[15px] text-white font-medium rounded-[5px] transition-all hover:bg-transparent hover:text-black border border-black disabled:opacity-50"
            style={{ backgroundColor: content.buttonColor, borderColor: content.buttonColor }}
          >
            {isSubmitting ? 'Submitting...' : content.buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}
