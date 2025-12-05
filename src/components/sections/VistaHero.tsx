import Image from 'next/image';
import Link from 'next/link';
import heroData from '@/content/vista-hero.json';
import { resolveRoute } from '@/lib/routes';

export function VistaHero() {
  const {
    desktopImage,
    mobileImage,
    title,
    description,
    button1Text,
    button1Route,
    button2Text,
    button2Route,
  } = heroData;

  return (
    <>
      {/* Desktop Hero - hidden below md (768px) */}
      <div
        className='hidden md:block bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url('${desktopImage}')` }}
      >
        <div className='container mx-auto py-[100px]'>
          <div className='w-[60%] lg:w-[45%] bg-white rounded-[15px] p-[30px] lg:p-[50px] flex flex-col items-center'>
            <h1 className='heading-druk text-[80px] leading-[88%] text-center m-0 uppercase'>
              {title}
            </h1>
            <p className='text-[18px] text-center mt-4 w-[350px] max-w-full'>{description}</p>
            <div className='flex items-center gap-[15px] mt-5'>
              <Link
                href={resolveRoute(button1Route)}
                className='w-[200px] px-[25px] py-2 bg-[#F27662] border border-[#F27662] text-white rounded-full font-medium hover:bg-[#C95B48] hover:border-[#C95B48] transition-colors text-center'
              >
                {button1Text}
              </Link>
              <Link
                href={resolveRoute(button2Route)}
                className='w-[200px] px-[25px] py-2 bg-white border border-[#F27662] text-[#F27662] rounded-full font-medium hover:border-[#C95B48] hover:text-[#C95B48] transition-colors text-center'
              >
                {button2Text}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hero - visible below md (768px) */}
      <div className='md:hidden bg-[#f9f9f9]'>
        {/* Mobile image */}
        <div className='relative w-full' style={{ height: '55vw', maxHeight: '350px' }}>
          <Image
            src={mobileImage}
            alt={title}
            fill
            className='object-cover object-center'
            priority
          />
        </div>

        {/* Page container - overlaps image, provides bottom padding */}
        <div className='relative z-10 -mt-[50px] pb-[30px] px-4'>
          {/* Text wrapper - full width, overlaps more with additional negative margin */}
          <div className='w-full -mt-[50px] bg-white rounded-[15px] p-8 pb-0 flex flex-col items-center'>
            <h1 className='heading-druk text-[50px] leading-[88%] text-center m-0 uppercase'>
              {title}
            </h1>
            <p className='text-[16px] text-center mt-4 w-[295px] max-w-full'>{description}</p>
            {/* Button with negative margin to overflow bottom of white box */}
            <div className='flex flex-wrap justify-center gap-[15px] mt-5 -mb-[18px]'>
              <Link
                href={resolveRoute(button1Route)}
                className='w-[200px] px-[25px] py-2 bg-[#F27662] border border-[#F27662] text-white rounded-full font-medium hover:bg-[#C95B48] hover:border-[#C95B48] transition-colors text-center text-sm'
              >
                {button1Text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
