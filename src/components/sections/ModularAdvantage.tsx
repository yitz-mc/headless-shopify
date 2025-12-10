import Image from 'next/image';
import Link from 'next/link';
import content from '@/content/modular-advantage.json';
import { resolveRoute } from '@/lib/routes';

export function ModularAdvantage() {
  return (
    <section
      className="modular-advantage py-[30px] md:py-[70px]"
      style={{ backgroundColor: content.backgroundColor }}
    >
      <div className="container mx-auto px-4">
        {/* Header - heading and subheading inline */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 justify-center md:justify-start">
          <h2 className="heading-druk text-[48px] md:text-[86px] leading-[1] m-0 text-center md:text-left">
            {content.heading}
          </h2>
          <p className="text-lg hidden md:block m-0 break-words max-w-[12%]">{content.subheading}</p>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col md:flex-row gap-[30px] pt-10">
          {content.cards.map((card) => (
            <div key={card.id} className="w-full">
              <Image
                src={card.image}
                alt={card.title}
                width={425}
                height={310}
                className="w-full h-auto"
              />
              <p
                className="text-2xl my-[15px]"
                style={{ color: content.cardTitleColor }}
              >
                {card.title}
              </p>
              <p className="text-base m-0">{card.description}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-5 pt-[50px]">
          <Link
            href={resolveRoute(content.buttonRoute)}
            className="py-3 bg-[#ed7363] text-white rounded-full text-center w-[200px] border border-[#ed7363] hover:bg-[#d65f4f] hover:border-[#d65f4f] transition-colors"
          >
            {content.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
