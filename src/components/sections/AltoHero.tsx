import Image from 'next/image';
import Link from 'next/link';
import heroData from '@/content/alto-hero.json';
import { resolveRoute } from '@/lib/routes';

export function AltoHero() {
  const {
    desktopImage,
    mobileImage,
    trustpilotImage,
    trustpilotMobileImage,
    trustpilotUrl,
    subheading,
    title,
    description,
    button1Text,
    button1Url,
    button2Text,
    button2Route,
  } = heroData;

  return (
    <>
      {/* Desktop Hero - hidden below md (800px) */}
      <div
        className='alto-hero-desktop hidden md:block bg-cover bg-center bg-no-repeat relative'
        style={{ backgroundImage: `url('${desktopImage}')` }}
      >
        <div className='alto-hero-wrapper container mx-auto px-4 py-[100px]'>
          {/* Text Box */}
          <div className='alto-hero-text-wrapper w-[45%] lg:w-[45%] bg-white rounded-[15px] p-[30px] lg:p-[50px] flex flex-col items-center'>
            {subheading && (
              <p className='subheading text-center text-[16px] font-semibold opacity-40 m-0'>
                {subheading}
              </p>
            )}
            <h1 className='heading-druk text-[80px] leading-[88%] text-center m-0 mt-4 uppercase'>
              {title}
            </h1>
            {description && (
              <p className='description text-center text-[18px] w-[350px] mt-2'>{description}</p>
            )}
            <div className='buttons-wrapper flex items-center gap-[15px] mt-5'>
              <Link
                href={button1Url}
                className='mc-btn btn-primary w-[200px] text-center py-3 px-6 rounded-full bg-[#F27662] text-white font-medium hover:bg-[#C95B48] transition-colors'
              >
                {button1Text}
              </Link>
              <Link
                href={resolveRoute(button2Route)}
                className='w-[200px] text-center py-3 px-6 rounded-full bg-white border border-[#F27662] text-[#F27662] font-medium hover:border-[#C95B48] hover:text-[#C95B48] transition-colors'
              >
                {button2Text}
              </Link>
            </div>
          </div>
        </div>

        {/* Trustpilot Badge - Desktop - positioned relative to hero */}
        {trustpilotImage && (
          <div className='alto-hero-trustpilot absolute right-[60px] bottom-[25px] w-[175px]'>
            <Link href={trustpilotUrl} target='_blank'>
              <Image
                src={trustpilotImage}
                alt='Trustpilot rating'
                width={175}
                height={60}
                className='w-full h-auto'
                unoptimized
              />
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Hero - visible below md (800px) */}
      <div className='alto-hero-mobile md:hidden bg-[#f9f9f9] relative'>
        {/* Trustpilot Badge - Mobile - positioned relative to hero */}
        {trustpilotMobileImage && (
          <div
            className='alto-hero-trustpilot-mobile absolute right-0 z-20 w-[30px]'
            style={{ top: '20px' }}
          >
            <Link href={trustpilotUrl} target='_blank'>
              <Image
                src={trustpilotMobileImage}
                alt='Trustpilot rating'
                width={40}
                height={55}
                className='w-full h-auto'
                unoptimized
              />
            </Link>
          </div>
        )}

        {/* Image */}
        <div className='alto-hero-image-wrapper'>
          <Image
            src={mobileImage}
            alt={title}
            width={800}
            height={600}
            className='w-full h-auto'
            priority
            unoptimized
          />
        </div>

        {/* Text Box */}
        <div className='px-4 pb-[30px]' style={{ marginTop: '-90px' }}>
          <div
            className='alto-hero-text-wrapper w-full bg-white rounded-[15px] p-8 pb-0 flex flex-col items-center relative z-10'
            style={{ marginTop: '-50px' }}
          >
            {subheading && (
              <p className='subheading text-center text-[12px] font-semibold opacity-40 m-0'>
                {subheading}
              </p>
            )}
            <h1 className='heading-druk text-[50px] leading-[88%] text-center m-0 mt-4 uppercase'>
              {title}
            </h1>
            {description && (
              <p className='description text-center text-[16px] w-[295px] mt-2'>{description}</p>
            )}
            {/* Only show primary button on mobile */}
            <div className='buttons-wrapper flex flex-wrap justify-center gap-[15px] mt-6 -mb-[18px]'>
              <Link
                href={button1Url}
                className='mc-btn btn-primary w-[200px] text-center py-3 px-6 rounded-full bg-[#F27662] text-white font-medium hover:bg-[#C95B48] transition-colors'
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

