import Image from 'next/image';
import vistaData from '@/content/info-cards.json';
import altoData from '@/content/info-cards-alto.json';

interface InfoCardsProps {
  variant?: 'vista' | 'alto';
}

const dataMap = {
  vista: vistaData,
  alto: altoData,
};

export function InfoCards({ variant = 'vista' }: InfoCardsProps) {
  const data = dataMap[variant];

  return (
    <div className='w-full' style={{ backgroundColor: data.backgroundColor }}>
      <div className='container mx-auto max-w-[1200px]'>
        {/*
          Desktop: flex row, padding 34px 0 25px, gap between items
          Mobile: flex row with column cards, padding 16px, gap 5px
        */}
        <div className='flex justify-around items-center py-4 px-4 gap-[5px] md:py-[34px] md:pb-[25px] md:px-0 md:gap-4'>
          {data.cards.map((card) => (
            <div
              key={card.id}
              className='flex flex-col md:flex-row items-center justify-center gap-[10px] max-w-[22%] md:max-w-none'
            >
              <div className='relative w-[23px] h-[23px] flex-shrink-0'>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className='object-contain'
                  unoptimized
                />
              </div>
              <span className='text-[12px] leading-[14px] md:text-[13px] lg:text-[20px] md:leading-[22px] text-center md:text-left'>
                {card.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
