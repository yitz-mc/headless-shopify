'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  heading: string;
  items: FAQItem[];
}

interface FAQPageContentProps {
  categories: FAQCategory[];
  sidebarCategories: string[];
}

export function FAQPageContent({ categories, sidebarCategories }: FAQPageContentProps) {
  const [expandedItems, setExpandedItems] = useState<Record<string, number | null>>({});
  const [activeCategory, setActiveCategory] = useState<string>(sidebarCategories[0]);

  const toggleItem = (categoryId: string, index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] === index ? null : index,
    }));
  };

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const id = category.toLowerCase().replace(/\s+/g, '-');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className='bg-[#f4f4f4] min-h-screen'>
      {/* Header */}
      <div className='container mx-auto px-4 pt-8 pb-6'>
        <div className='text-left'>
          <h1 className='text-[39px] md:text-[63px] font-medium text-[#4072A5] pb-2'>
            Frequently Asked Questions
          </h1>
          <p className='text-base mb-8'>
            Here you can find the answers to the most common questions we get asked by our
            customers.
          </p>

          {/* Contact - Mobile only */}
          <div className='md:hidden'>
            <h3 className='text-[#E8927C] font-bold text-[25px] leading-[27px]'>
              Want to speak with someone now?
            </h3>
            <div className='flex gap-2 mt-2'>
              <span className='text-[#6B6B72] text-base'>Call us at</span>
              <a href='tel:8555192797' className='text-[#E8927C] text-[25px] leading-[27px]'>
                (855) 519-2797
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content with Sidebar */}
      <div className='container mx-auto px-4 pb-16'>
        <div className='flex gap-8'>
          {/* Sidebar - Desktop only */}
          <div className='hidden md:block w-[200px] flex-shrink-0'>
            <div className='sticky top-[120px]'>
              <div className='text-sm font-bold text-gray-500 mb-4'>SUMMARY</div>
              <nav className='flex flex-col gap-2'>
                {sidebarCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => scrollToCategory(category)}
                    className={`text-left text-sm py-1 transition-colors ${
                      activeCategory === category
                        ? 'text-black font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* FAQ Sections */}
          <div className='flex-1 flex flex-col gap-8'>
            {categories.map((category) => (
              <div key={category.id} id={category.id} className='scroll-mt-[120px]'>
                {/* Category Header */}
                <h2 className='text-[25px] font-bold mb-4 pt-8 ml-0 md:ml-8'>{category.heading}</h2>

                {/* Accordion */}
                <div className='bg-white rounded-[36px] p-4 md:p-6'>
                  {category.items.map((item, index) => (
                    <div
                      key={index}
                      className={`${index !== category.items.length - 1 ? 'border-b border-gray-200' : ''}`}
                    >
                      <button
                        onClick={() => toggleItem(category.id, index)}
                        className='w-full flex justify-between items-center py-4 px-2 md:px-4 text-left gap-4'
                      >
                        <span className='text-base md:text-[22px] font-medium text-[#444444]'>
                          {item.question}
                        </span>
                        <span className='flex-shrink-0 w-6 h-6 flex items-center justify-center'>
                          {expandedItems[category.id] === index ? (
                            <svg
                              width='14'
                              height='2'
                              viewBox='0 0 14 2'
                              fill='none'
                              className='text-gray-400'
                            >
                              <path
                                d='M1 1H13'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                              />
                            </svg>
                          ) : (
                            <svg
                              width='14'
                              height='14'
                              viewBox='0 0 14 14'
                              fill='none'
                              className='text-gray-400'
                            >
                              <path
                                d='M7 1V13M1 7H13'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                              />
                            </svg>
                          )}
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          expandedItems[category.id] === index
                            ? 'max-h-[2000px] opacity-100'
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div
                          className='px-2 md:px-4 pb-4 text-base leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&_a]:underline'
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
