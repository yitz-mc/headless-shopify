'use client';

import { useState, useEffect } from 'react';
import type { AssemblyInstruction } from '@/types';
import { routes } from '@/lib/routes';

interface AccordionSection {
  title: string;
  content: string;
  isHtml?: boolean;
}

interface VariantSpecs {
  // Section 1 - Material/Color
  material?: string;
  color?: string;
  finish?: string;
  // Section 2 - Dimensions
  height?: string;
  width?: string;
  depth?: string;
  internalHeight?: string;
  internalWidth?: string;
  hangingSpace?: string;
  shelfSpace?: string;
  // Section 3 - Item Details
  mountType?: string;
  numberOfRods?: string;
  numberOfFixedShelves?: string;
  numberOfAdjustableShelves?: string;
  numberOfDrawers?: string;
  totalWeightCapacity?: string;
  hardwareIncluded?: string;
}

interface ProductAccordionProps {
  description?: string;
  variantSpecs?: VariantSpecs;
  assemblyInstructions?: AssemblyInstruction[];
}

// Section 1 - Material/Color/Finish (no title)
const SECTION1_KEYS: Array<{ key: keyof VariantSpecs; label: string }> = [
  { key: 'material', label: 'Material' },
  { key: 'color', label: 'Color' },
  { key: 'finish', label: 'Finish' },
];

// Section 2 - Dimensions
const SECTION2_KEYS: Array<{ key: keyof VariantSpecs; label: string }> = [
  { key: 'height', label: 'Height' },
  { key: 'width', label: 'Width' },
  { key: 'depth', label: 'Depth' },
  { key: 'internalHeight', label: 'Internal Height' },
  { key: 'internalWidth', label: 'Internal Width' },
  { key: 'hangingSpace', label: 'Hanging Space' },
  { key: 'shelfSpace', label: 'Shelf Space' },
];

// Section 3 - Item Details
const SECTION3_KEYS: Array<{ key: keyof VariantSpecs; label: string }> = [
  { key: 'mountType', label: 'Mount Type' },
  { key: 'numberOfRods', label: 'Number of Rods' },
  { key: 'numberOfFixedShelves', label: 'Number of Fixed Shelves' },
  { key: 'numberOfAdjustableShelves', label: 'Number of Adjustable Shelves' },
  { key: 'numberOfDrawers', label: 'Number of Drawers' },
  { key: 'totalWeightCapacity', label: 'Total Weight Capacity Lbs.' },
  { key: 'hardwareIncluded', label: 'Hardware Included' },
];

function cleanValue(val?: string): string | null {
  if (!val) return null;
  // Remove surrounding quotes and check for "null" strings
  const cleaned = val.replace(/^["']|["']$/g, '').trim();
  if (cleaned === 'null' || cleaned === '' || cleaned === '0') return null;

  // Try to parse JSON values like {"value":14.0,"unit":"INCHES"}
  try {
    const parsed = JSON.parse(cleaned);
    if (parsed && typeof parsed === 'object') {
      if (parsed.value !== undefined && parsed.unit) {
        // Format dimension with unit
        const unit = parsed.unit === 'INCHES' ? 'in' : parsed.unit.toLowerCase();
        return `${parsed.value} ${unit}`;
      }
      if (parsed.value !== undefined) {
        return String(parsed.value);
      }
    }
  } catch {
    // Not JSON, return as-is
  }

  return cleaned;
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className='border-b border-gray-200'>
      <td className='py-3 pr-4 text-sm font-medium text-gray-900 w-[40%]'>{label}</td>
      <td className='py-3 text-sm text-gray-500'>{value}</td>
    </tr>
  );
}

function Prop65Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black/50 z-[9999] flex justify-center items-center'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className='relative bg-white text-black text-lg p-5 max-w-[80%] md:max-w-[600px] md:p-10'>
        <button
          onClick={onClose}
          className='absolute top-2.5 right-2.5 text-3xl font-bold text-black cursor-pointer hover:opacity-70'
          aria-label='Close'
        >
          ×
        </button>
        <div className='prop65-content'>
          <p>
            <strong>WARNING:</strong> This product can expose you to chemicals which are known to
            the State of California to cause cancer, birth defects or other reproductive harm. For
            more information visit{' '}
            <a
              href='https://www.P65Warnings.ca.gov'
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#c55849] underline'
            >
              www.P65Warnings.ca.gov
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function SpecificationsContent({ specs }: { specs: VariantSpecs }) {
  const [showProp65Modal, setShowProp65Modal] = useState(false);

  const section1Items = SECTION1_KEYS.map(({ key, label }) => ({
    key,
    label,
    value: cleanValue(specs[key]),
  })).filter(
    (item): item is { key: keyof VariantSpecs; label: string; value: string } =>
      item.value !== null,
  );

  const section2Items = SECTION2_KEYS.map(({ key, label }) => ({
    key,
    label,
    value: cleanValue(specs[key]),
  })).filter(
    (item): item is { key: keyof VariantSpecs; label: string; value: string } =>
      item.value !== null,
  );

  const section3Items = SECTION3_KEYS.map(({ key, label }) => ({
    key,
    label,
    value: cleanValue(specs[key]),
  })).filter(
    (item): item is { key: keyof VariantSpecs; label: string; value: string } =>
      item.value !== null,
  );

  if (section1Items.length === 0 && section2Items.length === 0 && section3Items.length === 0) {
    return null;
  }

  return (
    <div className='specification-table__content'>
      <table className='w-full'>
        <tbody>
          {/* Section 1 - Material/Color (no title) */}
          {section1Items.map((item) => (
            <SpecRow key={item.key} label={item.label} value={item.value} />
          ))}

          {/* Section 2 - Dimensions */}
          {section2Items.length > 0 && (
            <>
              <tr>
                <td colSpan={2} className='pt-6 pb-3 text-base font-semibold'>
                  Dimensions
                </td>
              </tr>
              {section2Items.map((item) => (
                <SpecRow key={item.key} label={item.label} value={item.value} />
              ))}
            </>
          )}

          {/* Section 3 - Item Details */}
          {section3Items.length > 0 && (
            <>
              <tr>
                <td colSpan={2} className='pt-6 pb-3 text-base font-semibold'>
                  Item Details
                </td>
              </tr>
              {section3Items.map((item) => (
                <SpecRow key={item.key} label={item.label} value={item.value} />
              ))}
            </>
          )}
        </tbody>
      </table>

      {/* California Prop 65 Warning */}
      <div className='text-sm text-gray-500 mt-6'>
        California Residents:{' '}
        <button
          onClick={() => setShowProp65Modal(true)}
          className='underline text-[#c55849] cursor-pointer hover:opacity-80'
        >
          WARNING
        </button>
      </div>

      <Prop65Modal isOpen={showProp65Modal} onClose={() => setShowProp65Modal(false)} />
    </div>
  );
}

function AccordionItem({
  title,
  content,
  isHtml = false,
  isOpen,
  onToggle,
  children,
}: AccordionSection & { isOpen: boolean; onToggle: () => void; children?: React.ReactNode }) {
  return (
    <div className='border-b border-gray-200'>
      <button
        onClick={onToggle}
        className='w-full flex items-center justify-between py-4 text-left'
        aria-expanded={isOpen}
      >
        <span className='text-base font-medium uppercase tracking-wide'>{title}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-[2000px] pb-4' : 'max-h-0'
        }`}
      >
        {children ? (
          children
        ) : isHtml ? (
          <div
            className='prose prose-sm max-w-none text-gray-600'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div className='text-gray-600 text-sm whitespace-pre-wrap'>{content}</div>
        )}
      </div>
    </div>
  );
}

export function ProductAccordion({
  description,
  variantSpecs,
  assemblyInstructions,
}: ProductAccordionProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    overview: true, // First one open by default
    specifications: false,
    assembly: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Check if we have any specs to show
  const hasSpecs =
    variantSpecs &&
    Object.values(variantSpecs).some((v) => {
      if (!v) return false;
      const cleaned = v.replace(/^["']|["']$/g, '').trim();
      return cleaned !== 'null' && cleaned !== '';
    });

  return (
    <div className='product-accordion mt-8 border-t border-gray-200'>
      {/* Overview */}
      {description && description.trim() !== '' && (
        <AccordionItem
          title='Overview'
          content={description}
          isHtml={true}
          isOpen={openSections.overview}
          onToggle={() => toggleSection('overview')}
        />
      )}

      {/* Specifications */}
      {hasSpecs && variantSpecs && (
        <AccordionItem
          title='Specifications'
          content=''
          isOpen={openSections.specifications}
          onToggle={() => toggleSection('specifications')}
        >
          <SpecificationsContent specs={variantSpecs} />
        </AccordionItem>
      )}

      {/* Assembly Instructions */}
      <AccordionItem
        title='Assembly Instructions'
        content=''
        isOpen={openSections.assembly}
        onToggle={() => toggleSection('assembly')}
      >
        <div className='assembly-instructions'>
          {assemblyInstructions && assemblyInstructions.length > 0 && (
            <ul className='list-disc pl-5 mb-4'>
              {assemblyInstructions.map((instruction, index) => (
                <li key={index} className='mb-3'>
                  <a
                    href={instruction.fileUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-[#F27662] hover:opacity-80'
                  >
                    {instruction.title}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <div>
            <a
              href={routes.pages.measuringGuide}
              target='_blank'
              rel='noopener noreferrer'
              className='text-[#F27662] hover:opacity-80'
            >
              Closet Measuring Guide
            </a>
          </div>
        </div>
      </AccordionItem>
    </div>
  );
}
