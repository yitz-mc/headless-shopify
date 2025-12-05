'use client';

import { useState } from 'react';
import type { FAQItem } from '@/lib/shopify/faqs';
import { routes } from '@/lib/routes';

interface FAQsProps {
  title?: string;
  linkText?: string;
  linkUrl?: string;
  faqs: FAQItem[];
  withCardPadding?: boolean;
}

export function FAQs({
  title = 'FAQs',
  linkText = 'Read all of our FAQs here',
  linkUrl = routes.pages.faqs,
  faqs,
  withCardPadding = false,
}: FAQsProps) {
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className='py-16 md:py-16'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <div className='flex justify-center relative mb-8 md:mb-[70px]'>
          <h2 className='text-[27px] md:text-[48px] leading-tight font-medium'>{title}</h2>
          <a
            href={linkUrl}
            className='hidden md:block absolute right-0 top-1/2 -translate-y-1/2 text-base opacity-40 hover:opacity-70 transition-opacity underline'
          >
            {linkText}
          </a>
        </div>

        {/* FAQ List */}
        <div
          className={`bg-white rounded-[15px] flex flex-col gap-5 md:gap-[30px] p-4 ${withCardPadding ? 'md:py-[60px] md:px-[50px]' : 'md:p-0'}`}
        >
          {faqs.map((faq, index) => (
            <div key={faq.id}>
              <div className='flex flex-col'>
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className='flex justify-between items-center gap-2 cursor-pointer text-left w-full'
                >
                  <span className='text-[#2b87c9] font-medium text-base md:text-[20px] lg:text-[26px] max-w-[90%]'>
                    {faq.question}
                  </span>
                  <span className='flex-shrink-0 opacity-40 text-[30px] leading-none'>
                    {expandedIndex === index ? '−' : '+'}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div
                    className='text-sm md:text-lg leading-relaxed md:leading-[30px] mt-4 md:mt-[30px] w-[96%] [&>p]:mb-4 [&>p:last-child]:mb-0'
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </div>
              </div>

              {/* Divider */}
              {index < faqs.length - 1 && (
                <div className='h-px w-full bg-black mt-5 md:mt-[30px]' />
              )}
            </div>
          ))}

          {/* Mobile link */}
          <a href={linkUrl} className='md:hidden text-sm text-center underline pt-5'>
            {linkText}
          </a>
        </div>
      </div>
    </section>
  );
}
