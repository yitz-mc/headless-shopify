import Image from 'next/image';
import content from '@/content/join-modular-pro.json';

function CheckIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 28.1675C21.732 28.1675 28 21.8995 28 14.1675C28 6.43549 21.732 0.16748 14 0.16748C6.26801 0.16748 0 6.43549 0 14.1675C0 21.8995 6.26801 28.1675 14 28.1675Z"
        fill="white"
      />
      <path
        d="M8.50889 14.7818L11.8837 18.9953L18.6684 8.88965"
        stroke="#2773AA"
        strokeWidth="2"
      />
    </svg>
  );
}

export function JoinModularPro() {
  return (
    <section className="join-modular-pro bg-[#f2f1f0] pt-[140px] pb-10 md:pt-[70px] md:pb-[70px]">
      <div className="container mx-auto px-4">
        {/* Centered Heading */}
        <h3 className="heading-druk text-[48px] md:text-[86px] leading-[1] text-center m-0 pb-5 md:pb-[70px]">
          {content.heading}
        </h3>

        {/* Content Wrapper - Image left, text right */}
        <div className="flex flex-row gap-[70px] items-center">
          {/* Left - Image (hidden on mobile) */}
          <div className="hidden md:block">
            <Image
              src={content.image}
              alt="Join Modular Pro"
              width={670}
              height={710}
            />
          </div>

          {/* Right - Text Content */}
          <div className="flex-1">
            {/* Subheading */}
            <p className="text-sm md:text-base leading-[1.4] m-0">
              {content.subheading}
            </p>

            {/* Description */}
            <p className="text-lg md:text-2xl leading-[1.4] my-[30px] md:my-0 md:mt-4">
              {content.description}
            </p>

            {/* List Items */}
            <div className="flex flex-col gap-5 mt-4">
              {content.cards.map((card, index) => (
                <div key={index} className="flex items-center gap-5">
                  <CheckIcon />
                  <p
                    className="text-base md:text-[22px] m-0"
                    style={{ color: content.cardTextColor }}
                  >
                    {card}
                  </p>
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="mt-10 flex flex-col items-center md:items-start">
              <a
                href={content.buttonAnchor}
                className="px-10 py-4 bg-[#ed7363] text-white rounded-full text-center text-base border border-[#ed7363] hover:bg-[#d65f4f] hover:border-[#d65f4f] transition-colors inline-block"
              >
                {content.buttonText}
              </a>
              <p className="text-base mt-2">{content.belowButtonText}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
