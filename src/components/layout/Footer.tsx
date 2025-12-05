'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import footerContent from '@/content/footer.json';
import { routes, resolveRoute } from '@/lib/routes';

// Social icon URLs from Simple Icons CDN
const socialIconUrls: Record<string, string> = {
  facebook: 'https://cdn.simpleicons.org/facebook/6b7280',
  instagram: 'https://cdn.simpleicons.org/instagram/6b7280',
  twitter: 'https://cdn.simpleicons.org/x/6b7280',
  pinterest: 'https://cdn.simpleicons.org/pinterest/6b7280',
  youtube: 'https://cdn.simpleicons.org/youtube/6b7280',
  tiktok: 'https://cdn.simpleicons.org/tiktok/6b7280',
};

interface FooterLink {
  title: string;
  route?: string;
  url?: string;
}

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='border-b border-gray-200 md:border-0'>
      {/* Mobile: Clickable header */}
      <button
        className='flex items-center justify-between w-full py-4 md:hidden'
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className='text-sm font-medium text-[#1D1D33]'>{title}</h3>
        <ChevronIcon isOpen={isOpen} />
      </button>

      {/* Desktop: Static header */}
      <h3 className='hidden md:block text-sm font-medium text-[#1D1D33] mb-4'>{title}</h3>

      {/* Content - hidden on mobile unless open */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block pb-4 md:pb-0`}>{children}</div>
    </div>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      fill='none'
      stroke='currentColor'
      viewBox='0 0 24 24'
    >
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Newsletter signup:', email);
    setTimeout(() => setIsSubmitting(false), 1000);
  };

  const phoneClean = footerContent.contact.phone.replace(/[\(\)\-\s\.]/g, '');

  const renderLink = (link: FooterLink) => {
    if (link.url) {
      return (
        <a
          href={link.url}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm text-gray-600 hover:text-gray-900 transition-colors'
        >
          {link.title}
        </a>
      );
    }

    if (link.route) {
      const href = resolveRoute(link.route);
      return (
        <Link href={href} className='text-sm text-gray-600 hover:text-gray-900 transition-colors'>
          {link.title}
        </Link>
      );
    }

    return null;
  };

  return (
    <footer className='bg-white'>
      <div className='container mx-auto px-4 py-10 md:py-16 lg:py-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-10 lg:gap-8'>
          {/* Logo & Contact */}
          <div className='pb-6 md:pb-0 order-2 md:order-1'>
            <Link href={routes.home} className='inline-flex items-center gap-2 mb-6'>
              <Image
                src='https://modular-images-public.s3.us-east-2.amazonaws.com/logo-wide.svg'
                alt='Modular Closets'
                width={200}
                height={47}
              />
            </Link>
            <p className='text-sm text-gray-600 mb-4 leading-relaxed'>
              {footerContent.description}
            </p>
            <p className='text-sm text-gray-600 mb-6'>{footerContent.tagline}</p>
            <div className='space-y-3 text-sm'>
              <p className='font-medium text-gray-500'>{footerContent.contact.heading}</p>
              <p>
                Email:{' '}
                <a
                  href={`mailto:${footerContent.contact.email}`}
                  className='text-[#1D1D33] hover:underline'
                >
                  {footerContent.contact.email}
                </a>
              </p>
              <p>
                Phone:{' '}
                <a href={`tel:${phoneClean}`} className='text-[#1D1D33] hover:underline'>
                  {footerContent.contact.phone}
                </a>
              </p>
            </div>
            <div className='flex gap-4 mt-6'>
              {footerContent.social.map((item) => (
                <a
                  key={item.platform}
                  href={item.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-600 hover:text-gray-900 transition-colors'
                  aria-label={item.platform}
                >
                  <Image
                    src={socialIconUrls[item.platform]}
                    alt={item.platform}
                    width={20}
                    height={20}
                    className='w-5 h-5'
                    unoptimized
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Closets - Accordion on mobile */}
          <div className='order-3 md:order-2'>
            <AccordionSection title={footerContent.shopClosets.heading}>
              <ul className='space-y-3'>
                {footerContent.shopClosets.links.map((link) => (
                  <li key={link.route}>{renderLink(link)}</li>
                ))}
              </ul>
            </AccordionSection>
          </div>

          {/* Resources - Accordion on mobile */}
          <div className='order-4 md:order-3'>
            <AccordionSection title={footerContent.resources.heading}>
              <ul className='space-y-3'>
                {footerContent.resources.links.map((link) => (
                  <li key={link.route || link.url}>{renderLink(link)}</li>
                ))}
              </ul>
            </AccordionSection>
          </div>

          {/* Newsletter - First on mobile */}
          <div className='pb-6 md:pb-0 order-1 md:order-4'>
            <h3 className='text-lg font-medium text-[#1D1D33] mb-2'>
              {footerContent.newsletter.heading}
            </h3>
            <p className='text-sm text-gray-600 mb-6'>{footerContent.newsletter.description}</p>
            <form onSubmit={handleNewsletterSubmit} className='space-y-4'>
              <input
                type='email'
                placeholder={footerContent.newsletter.placeholder}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full h-12 px-4 border border-gray-300 rounded text-gray-900 placeholder-gray-500 outline-none transition-colors focus:border-gray-900'
              />
              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full h-12 rounded bg-[#E8927C] text-white font-medium transition-colors hover:bg-[#d4826d] disabled:bg-gray-300 disabled:cursor-not-allowed'
              >
                {footerContent.newsletter.buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-200'>
        <div className='container mx-auto px-4 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600'>
            <p>© {new Date().getFullYear()} Modular Closets</p>
            <div className='flex gap-6'>
              {footerContent.legal.map((link) => (
                <Link
                  key={link.route}
                  href={resolveRoute(link.route)}
                  className='hover:text-gray-900 transition-colors'
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
