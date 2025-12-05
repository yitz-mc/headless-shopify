import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@/lib/routes';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center px-4 py-16'>
      <h1 className='text-4xl md:text-5xl font-bold mb-4 text-center uppercase tracking-tight'>
        404: Chaos Detected
      </h1>
      <p className='text-gray-600 mb-12 text-center'>
        This page didn&apos;t make the cut — but your dream closet still can.
      </p>

      <div className='mb-12'>
        <Image
          src='https://sfycdn.speedsize.com/eed8e0c4-8a58-46ce-832b-26984a0a57e6/https://www.modularclosets.com/cdn/shop/files/tornado_icon_c96e1e86-2f66-4298-b171-969ea9d4528a.png?v=1761845740'
          alt='Tornado icon'
          width={100}
          height={100}
          className='opacity-80'
        />
      </div>

      {/* Desktop buttons */}
      <div className='hidden md:flex gap-5'>
        <Link
          href={`${routes.designQuiz}?utm_referlclick=404_page`}
          className='px-6 py-2 bg-[#F27662] text-white border border-[#F27662] rounded-full min-w-[200px] text-center hover:bg-[#C95B48] hover:border-[#C95B48] transition-colors'
        >
          Free Design Service
        </Link>
        <Link
          href={routes.designTool}
          className='px-6 py-2 bg-white text-[#F27662] border border-[#F27662] rounded-full min-w-[200px] text-center hover:text-[#C95B48] hover:border-[#C95B48] transition-colors'
        >
          3D Design Tool
        </Link>
      </div>

      {/* Mobile buttons */}
      <div className='flex md:hidden flex-col gap-3'>
        <Link
          href={`${routes.designQuiz}?utm_referlclick=404_page`}
          className='px-6 py-2 bg-[#F27662] text-white border border-[#F27662] rounded-full min-w-[200px] text-center hover:bg-[#C95B48] hover:border-[#C95B48] transition-colors'
        >
          Free Design Service
        </Link>
        <Link
          href={routes.collections.vista}
          className='px-6 py-2 bg-white text-[#F27662] border border-[#F27662] rounded-full min-w-[200px] text-center hover:text-[#C95B48] hover:border-[#C95B48] transition-colors'
        >
          Shop Closets
        </Link>
      </div>
    </div>
  );
}
