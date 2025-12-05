import Image from 'next/image';
import Link from 'next/link';
import data from '@/content/additional-resources.json';
import { resolveRoute } from '@/lib/routes';

export function AdditionalResources() {
  return (
    <div className='w-full' style={{ backgroundColor: data.backgroundColor }}>
      <div className='container mx-auto py-8 md:py-10 px-4'>
        {/* Heading - centered on mobile, left on desktop */}
        <div className='pb-5 md:pb-8 text-center md:text-left'>
          <h2
            className='heading-druk text-[50px] leading-[50px] tracking-[1.5px]'
            style={{ color: data.headingColor }}
          >
            {data.heading}
          </h2>
        </div>

        {/* Grid - 2 cols mobile, 4 cols desktop */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-[10px] md:gap-10'>
          {data.items.map((item) => (
            <Link
              key={item.id}
              href={'route' in item ? resolveRoute(item.route) : item.url}
              className='relative bg-white/50 border border-black/50 rounded-[15px] overflow-hidden aspect-square flex items-center justify-center hover:shadow-lg transition-shadow'
            >
              <div className='flex flex-col items-center justify-center p-4 md:p-[72px]'>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={70}
                  height={70}
                  className='object-contain w-[40px] h-[40px] md:w-[70px] md:h-[70px]'
                  unoptimized
                />
                <span className='text-xs md:text-base mt-2 text-center'>{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
