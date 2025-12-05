'use client';

import Link from 'next/link';
import content from '@/content/pro-se.json';
import { resolveRoute } from '@/lib/routes';

export function ProSe() {
  return (
    <section className='pro-se bg-[#F2F1F0] pb-[60px] md:pb-[60px]'>
      <div className='container mx-auto px-8'>
        <div className='pro-se-wrapper bg-black text-white rounded-[15px] flex flex-col md:flex-row justify-between items-center md:items-start gap-[42px] md:gap-[15px] py-8 md:py-[55px] md:pb-[44px] px-8 md:px-12 text-center md:text-left'>
          <div className='ps-left flex flex-col gap-[30px] md:gap-[10px]'>
            <h2 className='ps-heading text-[28px] md:text-[40px] leading-normal font-medium'>
              {content.heading}
            </h2>
            <p className='ps-description text-[20px] md:text-[20px] lg:text-[20px] leading-normal max-w-[86%] md:max-w-[630px] mx-auto md:mx-0'>
              {content.description}
            </p>
          </div>
          <div className='ps-right flex flex-col items-center gap-4 md:gap-5'>
            <p className='ps-note text-[25px] md:text-[24px] font-semibold leading-normal'>
              {content.note}
            </p>
            <Link
              href={resolveRoute(content.buttonRoute)}
              className='mc-btn px-8 py-3 rounded-full font-medium bg-[#ed7363] text-white border border-[#ed7363] hover:bg-[#C95B48] hover:border-[#C95B48] transition-colors'
            >
              {content.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
