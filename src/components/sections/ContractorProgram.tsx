import Image from 'next/image';
import content from '@/content/contractor-program.json';

export function ContractorProgram() {
  return (
    <section
      className="contractor-program bg-cover bg-center bg-no-repeat pt-[150px] pb-0 md:pb-[150px]"
      style={{ backgroundImage: `url(${content.backgroundImage})` }}
    >
      <div className="container mx-auto px-4">
        <div
          className="w-full md:w-[690px] mx-auto rounded-[40px] px-10 pb-10 pt-0 md:py-[75px] md:px-[110px] flex flex-col items-center text-center relative z-10 md:static md:mb-0 -mb-[100px]"
          style={{ backgroundColor: content.boxBackgroundColor }}
        >
          {/* Icon - floats above box on mobile */}
          <div className="md:mb-0 -mt-[33px] md:mt-0 md:absolute md:static">
            <Image
              src={content.icon}
              alt=""
              width={70}
              height={70}
              className="w-[75px] h-[75px] md:w-[70px] md:h-[70px] bg-white md:bg-transparent p-[10px] md:p-0 rounded-full md:rounded-none"
            />
          </div>

          {/* Heading */}
          <p
            className="text-2xl md:text-[32px] leading-[1.3] m-0 mt-4 md:mt-0"
            style={{ color: content.textColor }}
          >
            {content.heading}
          </p>

          {/* Description */}
          <p
            className="text-base leading-[1.3] m-0 mt-4 whitespace-pre-line"
            style={{ color: content.textColor }}
          >
            {content.description}
          </p>
        </div>
      </div>
    </section>
  );
}
