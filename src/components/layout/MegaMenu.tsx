'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { MegamenuItem } from '@/lib/shopify';

interface MegaMenuProps {
  items: MegamenuItem[];
  isVisible: boolean;
  topOffset: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClose?: () => void;
}

export function MegaMenu({
  items,
  isVisible,
  topOffset,
  onMouseEnter,
  onMouseLeave,
  onClose,
}: MegaMenuProps) {
  const shopClosetsItems = items.filter((item) => item.menuType === 'Shop closets');
  const designItems = items.filter((item) => item.menuType === 'Design your closet');
  const shopMoreItems = items.filter((item) => item.menuType === 'Shop more');

  if (!isVisible) return null;

  return (
    <>
      {/* Dark overlay - starts below header */}
      <div className='fixed inset-x-0 bottom-0 bg-black/40 z-40' style={{ top: topOffset }} />

      {/* Mega menu */}
      <div
        className='fixed left-1/2 -translate-x-1/2 bg-white z-50 shadow-lg rounded-b-[20px] w-[calc(100vw-100px)] max-w-[1400px]'
        style={{ top: topOffset }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className='border-t border-[#B3B3B3]'>
          {/* Top Section */}
          <div className='flex px-[50px]'>
            {/* Left - Shop Closets */}
            <div className='flex-1 py-5 pr-[50px] border-r border-[#B3B3B3]'>
              <div className='flex gap-5 pt-2.5'>
                {shopClosetsItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    onClick={onClose}
                    className='block rounded-[20px] p-4 pb-6 transition-all hover:shadow-lg flex-1'
                    style={{ backgroundColor: item.backgroundColor }}
                  >
                    {/* Title with sticker */}
                    <div className='flex items-center gap-4 mb-2'>
                      <p className='text-lg font-medium m-0'>{item.title}</p>
                      {item.sticker && (
                        <Image
                          src={item.sticker}
                          alt=''
                          width={60}
                          height={22}
                          className='h-[22px] w-auto'
                        />
                      )}
                    </div>

                    {/* Image */}
                    {item.image && (
                      <div className='h-[175px] w-full mb-3'>
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={310}
                          height={175}
                          className='w-full h-full object-cover rounded-[20px]'
                        />
                      </div>
                    )}

                    {/* Features list and button */}
                    <div className='flex items-center justify-between gap-2 flex-wrap'>
                      {item.listItems.length > 0 && (
                        <ul className='text-xs opacity-60 pl-5 m-0 space-y-0.5'>
                          {item.listItems.map((listItem, idx) => (
                            <li key={idx}>{listItem}</li>
                          ))}
                        </ul>
                      )}
                      <div
                        className='flex items-center gap-2 px-5 py-1.5 rounded-full text-xs transition-colors hover:opacity-90'
                        style={{
                          backgroundColor: item.buttonColor,
                          color: item.buttonTextColor,
                        }}
                      >
                        <span>{item.buttonText}</span>
                        <ArrowIcon />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right - Design Your Closet */}
            <div className='py-5 pl-[50px]'>
              <div className='flex flex-col gap-5 pt-2.5'>
                {designItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    onClick={onClose}
                    className='flex items-center justify-between gap-5 rounded-[20px] p-4 min-w-[370px] transition-all hover:shadow-lg'
                    style={{ backgroundColor: item.backgroundColor }}
                  >
                    <div className='flex items-center gap-5'>
                      {item.image && (
                        <Image
                          src={item.image}
                          alt=''
                          width={50}
                          height={50}
                          className='max-h-[50px] w-auto'
                        />
                      )}
                      <div>
                        <p
                          className='text-sm font-medium m-0'
                          style={{ color: item.buttonTextColor }}
                        >
                          {item.title}
                        </p>
                        {item.listItems.length > 0 && (
                          <p className='text-xs m-0' style={{ color: item.buttonTextColor }}>
                            {item.listItems[0]}
                          </p>
                        )}
                      </div>
                    </div>
                    <ArrowIcon color={item.buttonTextColor} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section - Shop More */}
          <div className='bg-[#F7F5F3] py-5 px-[50px] rounded-b-[20px]'>
            <div className='flex items-center gap-6'>
              {shopMoreItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={onClose}
                  className='rounded-[20px] px-8 py-2.5 text-sm transition-all hover:shadow-lg'
                  style={{
                    backgroundColor: item.backgroundColor,
                    color: item.buttonTextColor,
                  }}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
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
    >
      <path d='M5 12h14M12 5l7 7-7 7' />
    </svg>
  );
}
