'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import data from '@/content/shared-panel-alto.json';
import compareData from '@/content/compare-closet-systems.json';
import type { LightboxFeature } from '@/lib/shopify';
import { routes, resolveRoute } from '@/lib/routes';

interface SharedPanelAltoProps {
  comparisonFeatures?: LightboxFeature[];
}

export function SharedPanelAlto({ comparisonFeatures }: SharedPanelAltoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    backgroundColor,
    title,
    image,
    icon,
    mobileIcon,
    cards,
    button1Text,
    button1Route,
    button1TextMobile,
    button1RouteMobile,
    button2Text,
  } = data;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section
        className="shared-section-wrapper py-[30px] md:py-[75px] pb-[15px] md:pb-[50px]"
        style={{ backgroundColor }}
      >
        <div className="container mx-auto px-4">
          {/* Title */}
          <div className="shared-top-text-wrapper text-center mb-8">
            <h2 className="font-favorit text-[28px] md:text-[42px] leading-tight font-medium max-w-[385px] md:max-w-[600px] mx-auto">
              {title}
            </h2>
          </div>

          {/* Body - Desktop: side by side, Mobile: stacked */}
          <div className="shared-body-wrapper flex flex-col md:flex-row gap-0 md:gap-[60px] items-start">
            {/* Image */}
            <div className="shared-gif-wrapper w-full md:w-[60%] flex-shrink-0">
              <Image
                src={image}
                alt={title}
                width={800}
                height={600}
                className="w-full h-auto rounded-[15px]"
                unoptimized
              />
            </div>

            {/* List */}
            <div className="shared-list-wrapper w-full md:w-[40%] flex flex-col justify-between">
              {/* Desktop List */}
              <ul
                className="hidden md:block mt-0"
                style={{ listStyleImage: `url('${icon}')` }}
              >
                {cards.map((card) => (
                  <li key={card.id} className="mb-[30px]">
                    <span className="shared-list-title text-[20px] text-[#2773aa] font-medium mb-[20px] block">
                      {card.title}
                    </span>
                    <span className="shared-list-description">{card.description}</span>
                  </li>
                ))}
              </ul>

              {/* Mobile Swiper */}
              <div className="md:hidden w-full mt-4">
                <Swiper
                  modules={[Pagination]}
                  spaceBetween={30}
                  slidesPerView={1.2}
                  pagination={{ clickable: true }}
                  loop={true}
                  className="shared-swiper"
                >
                  {cards.map((card) => (
                    <SwiperSlide key={card.id}>
                      <div className="bg-white p-[15px] rounded-[15px] mb-[45px]">
                        <div className="shared-list-title-wrapper flex items-start gap-2">
                          <Image
                            src={mobileIcon}
                            alt=""
                            width={24}
                            height={24}
                            className="flex-shrink-0"
                            unoptimized
                          />
                          <span className="shared-list-title text-[16px] text-[#2773aa] font-medium">
                            {card.title}
                          </span>
                        </div>
                        <div className="shared-list-description-wrapper pl-[30px] mt-2">
                          <span className="shared-list-description text-[14px]">
                            {card.description}
                          </span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Buttons */}
              <div className="shared-button-wrapper flex flex-col md:flex-row items-center gap-[15px] md:gap-[20px] md:pl-[20px] mt-4">
                {/* Desktop Button 1 */}
                <Link
                  href={resolveRoute(button1Route)}
                  className="hidden md:block mc-btn btn-primary w-[200px] text-center py-3 px-6 rounded-full bg-[#F27662] text-white font-medium hover:bg-[#C95B48] transition-colors"
                >
                  {button1Text}
                </Link>
                {/* Mobile Button 1 */}
                <Link
                  href={resolveRoute(button1RouteMobile)}
                  className="md:hidden mc-btn btn-primary w-[200px] text-center py-3 px-6 rounded-full bg-[#F27662] text-white font-medium hover:bg-[#C95B48] transition-colors"
                >
                  {button1TextMobile}
                </Link>
                {/* Button 2 - Opens Modal on Desktop */}
                <button
                  onClick={openModal}
                  className="hidden md:block mc-btn btn-outline-primary w-[200px] text-center py-3 px-6 rounded-full border border-[#F27662] text-[#F27662] font-medium hover:border-[#C95B48] hover:text-[#C95B48] transition-colors cursor-pointer bg-transparent"
                >
                  {button2Text}
                </button>
                {/* Button 2 - Link on Mobile */}
                <Link
                  href={routes.chooseCategory}
                  className="md:hidden mc-btn btn-outline-primary w-[200px] text-center py-3 px-6 rounded-full border border-[#F27662] text-[#F27662] font-medium hover:border-[#C95B48] hover:text-[#C95B48] transition-colors"
                >
                  {button2Text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40"
          onClick={closeModal}
        >
          <div
            className="table-wrapper relative max-w-[1000px] w-[95%] max-h-[90vh] overflow-auto rounded-[30px]"
            style={{ backgroundColor: compareData.column2And3BackgroundColor }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Heading */}
            <div
              className="table-heading py-[30px] px-[20px] md:px-[40px] rounded-t-[30px]"
              style={{ backgroundColor: compareData.headingBackgroundColor }}
            >
              <h3
                className="font-druk text-[24px] md:text-[54px] m-0 leading-none"
                style={{ color: compareData.headingTextColor }}
              >
                {compareData.headingText}
              </h3>
            </div>

            {/* Table Content */}
            <div className="table-content">
              {/* Header Row */}
              <div className="table-row" style={{ display: 'flex' }}>
                <p
                  className="column-1 text-[12px] md:text-[22px] font-medium m-0 py-[15px] md:py-[25px] px-[10px] md:px-[40px]"
                  style={{ width: '22%', backgroundColor: compareData.column1BackgroundColor }}
                >
                  {compareData.column1HeadingText}
                </p>
                <p
                  className="column-2 text-[12px] md:text-[22px] font-medium m-0 py-[15px] md:py-[25px] px-[10px] md:px-[40px]"
                  style={{ width: '39%' }}
                >
                  {compareData.column2HeadingText}
                </p>
                <p
                  className="column-3 text-[12px] md:text-[22px] font-medium m-0 py-[15px] md:py-[25px] px-[10px] md:px-[40px]"
                  style={{ width: '39%' }}
                >
                  {compareData.column3HeadingText}
                </p>
              </div>

              {/* Feature Rows */}
              {(comparisonFeatures || compareData.features).map((row, index, arr) => (
                <div key={index} className="table-row" style={{ display: 'flex' }}>
                  <p
                    className="column-1 text-[11px] md:text-[18px] font-medium m-0 py-[10px] md:py-[15px] px-[10px] md:px-[40px] relative"
                    style={{
                      width: '22%',
                      backgroundColor: compareData.column1BackgroundColor,
                      color: compareData.column1TextColor,
                      borderRadius: index === arr.length - 1 ? '0 0 0 30px' : undefined,
                    }}
                  >
                    {row.feature}
                    {index < arr.length - 1 && (
                      <span
                        className="absolute bottom-0 left-[10%] h-[1px]"
                        style={{ width: '80%', backgroundColor: compareData.column1LineColor }}
                      />
                    )}
                  </p>
                  <p
                    className="column-2 text-[11px] md:text-[18px] m-0 py-[10px] md:py-[15px] px-[10px] md:px-[40px] relative"
                    style={{ width: '39%' }}
                  >
                    {row.vista}
                    {index < arr.length - 1 && (
                      <span
                        className="absolute bottom-0 left-[5%] h-[1px]"
                        style={{ width: '190%', backgroundColor: compareData.column2And3LineColor }}
                      />
                    )}
                  </p>
                  <p
                    className="column-3 text-[11px] md:text-[18px] m-0 py-[10px] md:py-[15px] px-[10px] md:px-[40px]"
                    style={{ width: '39%' }}
                  >
                    {row.alto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
