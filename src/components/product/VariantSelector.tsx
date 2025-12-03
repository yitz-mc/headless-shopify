'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useMediaQuery } from '@/hooks';
import type { ProductOption, SelectedOption, Money } from '@/types';

interface VariantForSelector {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
}

interface VariantSelectorProps {
  options: ProductOption[];
  variants: VariantForSelector[];
  selectedOptions: Record<string, string>;
  onOptionChange: (optionName: string, value: string) => void;
}

// Color mapping for swatches - using background images/colors matching the live site
const COLOR_STYLES: Record<string, React.CSSProperties> = {
  'white': {
    backgroundColor: '#ffffff',
  },
  'grey': {
    backgroundImage: 'url(https://sfycdn.speedsize.com/eed8e0c4-8a58-46ce-832b-26984a0a57e6/cdn.shopify.com/s/files/1/0857/4644/files/Grey_1.png?v=1752767554)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  'gray': {
    backgroundImage: 'url(https://sfycdn.speedsize.com/eed8e0c4-8a58-46ce-832b-26984a0a57e6/cdn.shopify.com/s/files/1/0857/4644/files/Grey_1.png?v=1752767554)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  'natural oak': {
    backgroundImage: 'url(https://sfycdn.speedsize.com/eed8e0c4-8a58-46ce-832b-26984a0a57e6/cdn.shopify.com/s/files/1/0857/4644/files/Oak_1.png?v=1752767555)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  'white / natural oak': {
    backgroundImage: 'url(https://sfycdn.speedsize.com/eed8e0c4-8a58-46ce-832b-26984a0a57e6/cdn.shopify.com/s/files/1/0857/4644/files/White_natural_oak.png?v=1752768870)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  'black': {
    backgroundColor: '#000000',
  },
  'chrome': {
    background: 'linear-gradient(90deg, #e0e0e0, #f9f9f9 20%, #c0c0c0 50%, #f9f9f9 80%, #e0e0e0), linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(0, 0, 0, 0.1))',
  },
  'brushed nickel': {
    background: 'linear-gradient(90deg, #d6d6d6, #e3e3e3 20%, #bfbfbf 50%, #e3e3e3 80%, #d6d6d6), linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.1))',
  },
  'satin nickel': {
    background: 'linear-gradient(180deg, #cfc3b4 0%, #beb2a3 25%, #ddd3c5 50%, #b1a293 75%, #cfc3b4 100%)',
  },
  'brass': {
    background: 'linear-gradient(90deg, #f9e4b7, #fdf2d3 20%, #f2d28a 50%, #fdf2d3 80%, #f9e4b7), linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 215, 0, 0.1))',
  },
  'satin brass': {
    background: 'linear-gradient(90deg, #f9e4b7, #fdf2d3 20%, #f2d28a 50%, #fdf2d3 80%, #f9e4b7), linear-gradient(0deg, rgba(255, 255, 255, 0.3), rgba(255, 215, 0, 0.1))',
  },
  'matte black': {
    background: 'linear-gradient(90deg, #3a3a3a 0%, #4a4a4a 20%, #5b5b5b 50%, #3e3e3e 80%, #2b2b2b 100%)',
  },
};

function getColorStyle(colorName: string): React.CSSProperties {
  const normalized = colorName.toLowerCase();
  return COLOR_STYLES[normalized] || { backgroundColor: '#ccc' };
}

export function VariantSelector({
  options,
  variants,
  selectedOptions,
  onOptionChange,
}: VariantSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const isOptionAvailable = (optionName: string, value: string): boolean => {
    const testOptions = { ...selectedOptions, [optionName]: value };

    return variants.some((variant) => {
      const matches = variant.selectedOptions.every(
        (opt) => testOptions[opt.name] === opt.value
      );
      return matches && variant.availableForSale;
    });
  };

  // Find variant ID for current selection and update URL
  const handleOptionChangeWithUrl = (optionName: string, value: string) => {
    const newOptions = { ...selectedOptions, [optionName]: value };

    // Find matching variant
    const matchingVariant = variants.find((variant) =>
      variant.selectedOptions.every(
        (opt) => newOptions[opt.name] === opt.value
      )
    );

    // Update URL with variant ID
    if (matchingVariant) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('variant', matchingVariant.id.replace('gid://shopify/ProductVariant/', ''));
      router.replace(`?${params.toString()}`, { scroll: false });
    }

    onOptionChange(optionName, value);
  };

  return (
    <div className="product-form__swatches">
      {options.map((option) => {
        const isColorOption = option.name.toLowerCase() === 'color';

        return (
          <div
            key={option.id}
            className="swatches__swatch mb-6"
          >
            {/* Label: "Select [option]: [value]" */}
            <div className="swatches__swatch-label text-base mb-4 text-gray-600">
              Select <span className="lowercase">{option.name}</span>:{' '}
              <strong className="text-black">{selectedOptions[option.name]}</strong>
            </div>

            {/* Color swatches - 42px squares with 10px border-radius */}
            {isColorOption ? (
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.name] === value;
                  const isAvailable = isOptionAvailable(option.name, value);
                  const inputId = `option-${option.name.toLowerCase()}-${value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

                  return (
                    <div key={value} className="radial-swatches__swatch relative">
                      <input
                        type="radio"
                        id={inputId}
                        name={option.name}
                        value={value}
                        checked={isSelected}
                        onChange={() => handleOptionChangeWithUrl(option.name, value)}
                        disabled={!isAvailable}
                        className="sr-only"
                      />
                      <label
                        htmlFor={inputId}
                        className={`
                          block w-[42px] h-[42px] rounded-[10px] transition-all
                          ${isSelected ? 'border-2 border-black' : 'border border-black/30'}
                          ${!isAvailable ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                        style={getColorStyle(value)}
                        title={value}
                      >
                        <span className="sr-only">{value}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            ) : isMobile ? (
              /* Mobile: Dropdown select */
              <select
                value={selectedOptions[option.name]}
                onChange={(e) => handleOptionChangeWithUrl(option.name, e.target.value)}
                className="w-full h-[48px] px-4 rounded-[10px] border border-black/20 text-sm uppercase bg-white appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '20px',
                }}
              >
                {option.values.map((value) => {
                  const isAvailable = isOptionAvailable(option.name, value);
                  return (
                    <option key={value} value={value} disabled={!isAvailable}>
                      {value}{!isAvailable ? ' (Unavailable)' : ''}
                    </option>
                  );
                })}
              </select>
            ) : (
              /* Desktop: Text swatches - 42px height, 10px border-radius */
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.name] === value;
                  const isAvailable = isOptionAvailable(option.name, value);
                  const inputId = `option-${option.name.toLowerCase()}-${value.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

                  return (
                    <div key={value} className="image-swatches__swatch relative">
                      <input
                        type="radio"
                        id={inputId}
                        name={option.name}
                        value={value}
                        checked={isSelected}
                        onChange={() => handleOptionChangeWithUrl(option.name, value)}
                        disabled={!isAvailable}
                        className="sr-only"
                      />
                      <label
                        htmlFor={inputId}
                        className={`
                          inline-flex items-center justify-center h-[42px] min-w-[42px] px-3.5 rounded-[10px] text-sm transition-all uppercase
                          ${isSelected
                            ? 'border border-transparent shadow-[0_0_0_2px_black]'
                            : 'border border-black/20'
                          }
                          ${!isAvailable ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                        `}
                      >
                        {value}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
