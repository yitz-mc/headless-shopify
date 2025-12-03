'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore, useUIStore } from '@/stores';
import { AnnouncementBar } from './AnnouncementBar';
import headerContent from '@/content/header.json';
import { routes, resolveRoute } from '@/lib/routes';

interface NavItem {
  title: string;
  route: string;
  hasMegamenu?: boolean;
  submenu?: { title: string; route: string }[];
}

export function Header() {
  const { totalItems, openCart } = useCartStore();
  const { toggleMobileMenu, isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const navigation = headerContent.navigation as NavItem[];

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 bg-white border-b border-[#e5e5e5]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[60px] md:h-[70px]">
            {/* Left - Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                className="p-2 -ml-2"
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>

            {/* Center - Logo (centered on mobile, left-aligned on desktop) */}
            <Link href={routes.home} className="flex items-center absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
              <Image
                src={headerContent.logo.src}
                alt={headerContent.logo.alt}
                width={180}
                height={42}
                priority
                className="hidden sm:block"
              />
              <Image
                src={headerContent.logo.src}
                alt={headerContent.logo.alt}
                width={160}
                height={40}
                priority
                className="sm:hidden"
              />
            </Link>

            {/* Center - Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5">
              {navigation.map((item) => (
                <div key={item.title} className="relative group">
                  <Link
                    href={resolveRoute(item.route)}
                    className="py-2 text-[15px] font-medium text-[#1c1c1e] hover:text-gray-600 transition-colors"
                  >
                    {item.title}
                  </Link>
                  {item.submenu && (
                    <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg border border-gray-100 py-2 min-w-[180px] z-50">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={resolveRoute(subItem.route)}
                          className="block px-4 py-2.5 text-[14px] text-[#1c1c1e] hover:bg-gray-50"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* 3D Design Tool - coral text link */}
              <Link
                href={resolveRoute(headerContent.designToolLink.route)}
                className="py-2 text-[15px] font-medium text-[#E8927C] hover:text-[#d4826d] transition-colors"
              >
                {headerContent.designToolLink.title}
              </Link>

              {/* Free Design Service - coral button */}
              <Link
                href={resolveRoute(headerContent.designServiceButton.route)}
                className="bg-[#E8927C] text-white px-5 py-2.5 text-[14px] font-medium rounded hover:bg-[#d4826d] transition-colors"
              >
                {headerContent.designServiceButton.title}
              </Link>
            </nav>

            {/* Right - Icons */}
            <div className="flex items-center gap-1 md:gap-3">
              <button className="p-2 hover:text-gray-600" aria-label="Search">
                <SearchIcon />
              </button>
              <Link href={routes.account} className="p-2 hover:text-gray-600" aria-label="Account">
                <AccountIcon />
              </Link>
              <button
                className="relative p-2 hover:text-gray-600"
                onClick={openCart}
                aria-label="Open cart"
              >
                <CartIcon />
                {totalItems() > 0 && (
                  <span className="absolute top-0 right-0 bg-[#E8927C] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                    {totalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeMobileMenu} />
            <nav className="fixed top-0 left-0 h-full w-[300px] bg-white z-50 overflow-y-auto lg:hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <Image
                  src={headerContent.logo.src}
                  alt={headerContent.logo.alt}
                  width={120}
                  height={32}
                />
                <button onClick={closeMobileMenu} className="p-2" aria-label="Close menu">
                  <CloseIcon />
                </button>
              </div>
              <div className="p-4">
                {navigation.map((item) => (
                  <div key={item.title} className="border-b border-gray-100">
                    {item.submenu ? (
                      <>
                        <button
                          className="flex items-center justify-between w-full py-3.5 text-[15px] font-medium text-[#1c1c1e]"
                          onClick={() => toggleSubmenu(item.title)}
                        >
                          <span>{item.title}</span>
                          <ChevronIcon isOpen={expandedItems.includes(item.title)} />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expandedItems.includes(item.title) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="pl-4 pb-2">
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.title}
                                href={resolveRoute(subItem.route)}
                                className="block py-2.5 text-[14px] text-gray-600"
                                onClick={closeMobileMenu}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={resolveRoute(item.route)}
                        className="block py-3.5 text-[15px] font-medium text-[#1c1c1e]"
                        onClick={closeMobileMenu}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Free Design Service Button */}
                <Link
                  href={resolveRoute(headerContent.designServiceButton.route)}
                  className="block mt-4 bg-[#E8927C] text-white text-center px-5 py-3.5 text-[14px] font-medium rounded"
                  onClick={closeMobileMenu}
                >
                  {headerContent.designServiceButton.title}
                </Link>

                {/* Phone */}
                <div className="mt-6 pt-6 border-t">
                  <a href={`tel:${headerContent.mobilePhone.replace(/[\(\)\-\s\.]/g, '')}`} className="flex items-center gap-3 py-3 text-[14px]">
                    <PhoneIcon />
                    <span>{headerContent.mobilePhone}</span>
                  </a>
                </div>
              </div>
            </nav>
          </>
        )}
      </header>
    </>
  );
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}
