import Image from 'next/image';
import Link from 'next/link';
import content from '@/content/free-design.json';
import { resolveRoute } from '@/lib/routes';

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns='http://www.w3.org/2000/svg' width='28' height='29' viewBox='0 0 28 29' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14 28.1675C21.732 28.1675 28 21.8995 28 14.1675C28 6.43549 21.732 0.16748 14 0.16748C6.26801 0.16748 0 6.43549 0 14.1675C0 21.8995 6.26801 28.1675 14 28.1675Z'
        fill='currentColor'
        className='text-[#F2F1F0] md:text-[#F2F1F0]'
      />
      <path d='M8.50889 14.7818L11.8837 18.9953L18.6684 8.88965' stroke='#2773AA' strokeWidth='2' />
    </svg>
  );
}

export function FreeDesign() {
  return (
    <section className='bg-[#f2f1f0] py-16'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col-reverse md:flex-row justify-between gap-10 md:gap-[50px]'>
          {/* Text Content */}
          <div className='flex flex-col justify-between gap-5 md:max-w-[35%]'>
            <div className='flex flex-col gap-2.5'>
              <h2 className='text-[26px] md:text-[45px] leading-[28px] md:leading-[48px] font-medium text-center md:text-left'>
                {content.heading}
              </h2>
              <p className='text-sm md:text-lg leading-[18px] md:leading-6 text-center md:text-left w-[300px] md:w-[68%] mx-auto md:mx-0 mt-3.5 md:mt-1.5'>
                {content.description}
              </p>
            </div>

            <div className='flex flex-col gap-1 md:gap-2.5 w-fit mx-auto md:mx-0'>
              {content.cards.map((card, index) => (
                <div key={index} className='flex items-center gap-2.5 md:gap-5 bg-transparent md:bg-white rounded-[5px] px-4 py-0.5 md:py-[18px] md:px-[15px]'>
                  <CheckIcon className='w-5 h-5 md:w-7 md:h-7 shrink-0' />
                  <span className='text-xs md:text-lg'>{card}</span>
                </div>
              ))}

              {/* Desktop Button */}
              <Link
                href={content.buttonUrl}
                className='hidden md:flex items-center justify-center gap-5 bg-[#ed7363] hover:bg-[#C95B48] text-white rounded-full py-5 px-5 text-[17px] mt-2.5 transition-colors'
              >
                {content.buttonText}
              </Link>

              {/* Mobile Button */}
              <Link
                href={resolveRoute(content.mobileButtonRoute)}
                className='md:hidden flex items-center justify-center gap-5 bg-[#ed7363] hover:bg-[#C95B48] text-white rounded-full py-4 px-5 text-sm mt-5 transition-colors'
              >
                {content.buttonText}
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className='w-full md:flex-1'>
            <div className='relative aspect-[4/3] md:aspect-auto md:h-full'>
              <Image
                src={content.image}
                alt='Free closet design service'
                fill
                className='object-cover rounded-[15px]'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
