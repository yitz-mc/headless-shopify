import { Breadcrumb } from '@/components/ui';

interface CollectionHeroProps {
  title: string;
  description?: string;
}

export function CollectionHero({ title, description }: CollectionHeroProps) {
  return (
    <div className='collection-hero bg-[#f8f8f8] px-4 py-[25px] pb-[35px] md:px-[50px] md:py-10'>
      <div className='container mx-auto'>
        <div className='collection-hero__container md:grid md:gap-5'>
          {/* Breadcrumbs - hidden on mobile */}
          <Breadcrumb
            items={[{ label: 'Home', href: '/', showHomeIcon: true }, { label: title }]}
          />

          {/* Text Container */}
          <div className='collection-hero__text-container'>
            <h1 className='heading-druk text-[39px] leading-[39px] md:text-[40px] md:leading-[40px] lg:text-[63px] lg:leading-[63px] tracking-[4px] font-normal m-0 p-0'>
              {title}
            </h1>

            {description && (
              <div
                className='collection-hero__subtitle mt-5 text-base leading-[22px] max-w-[413px]'
                dangerouslySetInnerHTML={{ __html: description }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
