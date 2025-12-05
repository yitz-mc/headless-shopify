'use client';

import { useState, useEffect } from 'react';
import announcementContent from '@/content/announcement-bar.json';
import { resolveRoute } from '@/lib/routes';

interface AnnouncementBarProps {
  phoneText?: string;
  phoneNumber?: string;
  message?: string;
  linkText?: string;
  linkRoute?: string;
  countdownEndDate?: Date | null;
  backgroundColor?: string;
  textColor?: string;
}

export function AnnouncementBar({
  phoneText = announcementContent.phone.text,
  phoneNumber = announcementContent.phone.number,
  message = announcementContent.promo.message,
  linkText = announcementContent.promo.linkText,
  linkRoute = announcementContent.promo.linkRoute,
  countdownEndDate = null,
  backgroundColor = announcementContent.style.backgroundColor,
  textColor = announcementContent.style.textColor,
}: AnnouncementBarProps) {
  const linkHref = resolveRoute(linkRoute);
  const phoneClean = phoneNumber.replace(/[\(\)\-\s\.]/g, '');

  return (
    <div className='py-2.5 px-4' style={{ backgroundColor }}>
      <div className='container mx-auto flex items-center justify-between text-[13px]'>
        {/* Left - Phone */}
        <div className='hidden md:flex items-center gap-2' style={{ color: textColor }}>
          <span className='font-medium'>{phoneText}</span>
          <a
            href={`tel:${phoneClean}`}
            className='flex items-center gap-1.5 font-semibold hover:underline'
          >
            <PhoneIcon />
            <span>{phoneNumber}</span>
          </a>
        </div>

        {/* Center - Message */}
        <div
          className='flex items-center justify-center gap-2 flex-1 md:flex-none text-center'
          style={{ color: textColor }}
        >
          <span className='font-semibold'>{message}</span>
          {linkText && (
            <a href={linkHref} className='underline hover:no-underline font-medium'>
              {linkText}
            </a>
          )}
        </div>

        {/* Right - Countdown */}
        <div className='hidden lg:block'>
          {countdownEndDate && <Countdown endDate={countdownEndDate} textColor={textColor} />}
        </div>
      </div>
    </div>
  );
}

function Countdown({ endDate, textColor }: { endDate: Date; textColor: string }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(endDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(endDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [endDate]);

  if (timeLeft.total <= 0) return null;

  return (
    <div className='flex items-center gap-1 font-mono text-[13px]' style={{ color: textColor }}>
      <span className='font-semibold'>ENDS IN:</span>
      <span>{String(timeLeft.days).padStart(2, '0')}d</span>
      <span>:</span>
      <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
      <span>:</span>
      <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
      <span>:</span>
      <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
    </div>
  );
}

function getTimeLeft(endDate: Date) {
  const total = endDate.getTime() - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

function PhoneIcon() {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='currentColor'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z' />
    </svg>
  );
}
