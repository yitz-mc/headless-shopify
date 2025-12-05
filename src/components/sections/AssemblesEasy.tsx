'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { X, Play } from 'lucide-react';
import content from '@/content/assembles-easy.json';
import { resolveRoute } from '@/lib/routes';

export function AssemblesEasy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    videoRef.current?.pause();
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        closeModal();
      }
    },
    [closeModal]
  );

  return (
    <>
      <section
        className='assembles-easy bg-cover bg-center bg-no-repeat md:h-[600px] lg:h-[900px]'
        style={{
          backgroundImage: `url(${content.image})`,
        }}
      >
        <div className='assembles-easy-wrapper h-full flex flex-col items-center justify-center'>
          {/* Mobile background image */}
          <div
            className='ae-background-image md:hidden w-full bg-no-repeat bg-[length:100%_auto]'
            style={{
              backgroundImage: `url(${content.image})`,
              height: 'calc(100vw * (47 / 75))',
            }}
          />

          <div className='container mx-auto px-8'>
            <div className='ae-body bg-white rounded-[15px] py-[70px] px-4 md:py-[62px] md:px-[86px] lg:py-[72px] lg:px-[136px] text-center max-w-fit mx-auto'>
              <h2
                className='ae-heading text-[45px] leading-[45px] md:text-[78px] md:leading-[82px] font-medium [&_p]:m-0'
                dangerouslySetInnerHTML={{ __html: content.heading }}
              />
              <div className='ae-button flex flex-col md:flex-row gap-3 md:gap-5 mt-8 justify-center'>
                <Link
                  href={resolveRoute(content.buttonRoute)}
                  className='mc-btn px-8 py-3 rounded-full font-medium bg-[#ed7363] text-white border border-[#ed7363] hover:bg-[#C95B48] hover:border-[#C95B48] transition-colors min-w-[308px] flex items-center justify-center'
                >
                  {content.buttonText}
                </Link>
                <button
                  type='button'
                  onClick={openModal}
                  className='mc-btn px-8 py-3 rounded-full font-medium bg-white text-[#ed7363] border border-[#ed7363] hover:bg-[#FFF5F3] transition-colors min-w-[308px] flex items-center justify-center gap-2'
                >
                  <Play size={18} fill='#ed7363' stroke='#ed7363' />
                  <span dangerouslySetInnerHTML={{ __html: content.button2Text }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isModalOpen && (
        <div
          className='fixed inset-0 z-[1000] bg-black/40 flex items-center justify-center'
          onClick={handleBackdropClick}
        >
          <div className='bg-white p-5 md:p-5 w-[95%] md:w-[90%] max-w-[1200px] shadow-lg relative'>
            <button
              type='button'
              onClick={closeModal}
              className='absolute top-1 right-1 text-gray-400 hover:text-black text-3xl font-bold cursor-pointer'
              aria-label='Close video'
            >
              <X size={20} />
            </button>
            <video
              ref={videoRef}
              src={content.videoUrl}
              controls
              className='w-full h-auto'
            />
          </div>
        </div>
      )}
    </>
  );
}
