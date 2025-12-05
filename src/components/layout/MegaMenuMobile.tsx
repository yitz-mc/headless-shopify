'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { MegamenuItem } from '@/lib/shopify';

interface MegaMenuMobileProps {
  items: MegamenuItem[];
  onLinkClick?: () => void;
}

export function MegaMenuMobile({ items, onLinkClick }: MegaMenuMobileProps) {
  const shopClosetsItems = items.filter((item) => item.menuType === 'Shop closets');
  const designItems = items.filter((item) => item.menuType === 'Design your closet');
  const shopMoreItems = items.filter((item) => item.menuType === 'Shop more');

  return (
    <div className='py-4'>
      {/* Shop Closets Cards - Horizontal layout matching live site */}
      <div className='space-y-4 mb-4'>
        {shopClosetsItems.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            onClick={onLinkClick}
            className='flex rounded-[15px] overflow-hidden'
            style={{ backgroundColor: item.backgroundColor }}
          >
            {/* Image - left side, full height */}
            {item.image && (
              <Image
                src={item.image}
                alt={item.title}
                width={130}
                height={170}
                className='w-[130px] h-[170px] object-cover flex-shrink-0'
              />
            )}

            {/* Content - right side */}
            <div className='flex flex-col justify-between flex-1 p-3'>
              {/* Title with sticker */}
              <div>
                <div className='flex items-center gap-2 mb-1'>
                  <p className='text-sm font-medium m-0'>{item.title}</p>
                  {item.sticker && (
                    <Image
                      src={item.sticker}
                      alt=''
                      width={45}
                      height={16}
                      className='h-4 w-auto'
                    />
                  )}
                </div>
                {/* Features list */}
                {item.listItems.length > 0 && (
                  <ul className='text-[11px] opacity-60 pl-4 m-0 space-y-0.5'>
                    {item.listItems.map((listItem, idx) => (
                      <li key={idx}>{listItem}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Button */}
              <div
                className='flex items-center gap-2 px-4 py-1.5 rounded-full text-xs w-fit mt-2'
                style={{
                  backgroundColor: item.buttonColor,
                  color: item.buttonTextColor,
                }}
              >
                <span>{item.buttonText}</span>
                <ArrowIcon color={item.buttonTextColor} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Design Your Closet Cards */}
      <div className='space-y-3 mb-4'>
        {designItems.map((item) => (
          <Link
            key={item.id}
            href={item.url}
            onClick={onLinkClick}
            className={`flex items-center gap-4 rounded-[15px] p-3 ${
              item.title.toLowerCase().includes('3d design') ? 'hidden sm:flex' : ''
            }`}
            style={{ backgroundColor: item.backgroundColor }}
          >
            {item.image && (
              <Image
                src={item.image}
                alt=''
                width={40}
                height={40}
                className='w-10 h-10 object-contain'
              />
            )}
            <div className='flex-1'>
              <p className='text-sm font-medium m-0' style={{ color: item.buttonTextColor }}>
                {item.title}
              </p>
              {item.listItems.length > 0 && !item.title.toLowerCase().includes('compare') && (
                <p
                  className='text-xs m-0 mt-0.5 opacity-80'
                  style={{ color: item.buttonTextColor }}
                >
                  {item.listItems[0]}
                </p>
              )}
            </div>
            <ArrowIcon color={item.buttonTextColor} />
          </Link>
        ))}
      </div>

      {/* Shop More Links */}
      {shopMoreItems.length > 0 && (
        <div className='space-y-1 pt-2'>
          {shopMoreItems.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              onClick={onLinkClick}
              className='block py-2 text-sm text-[#1c1c1e]'
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ArrowIcon({ color = 'currentColor' }: { color?: string }) {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke={color}
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='flex-shrink-0'
    >
      <path d='M9 18l6-6-6-6' />
    </svg>
  );
}
