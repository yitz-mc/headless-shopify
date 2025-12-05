import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  showHomeIcon?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className='hidden md:block mb-6 text-sm' aria-label='Breadcrumb'>
      <ol className='flex items-center gap-2'>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className='flex items-center gap-2'>
              {index > 0 && (
                <span className='text-gray-400'>
                  <ChevronRight />
                </span>
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className='text-gray-500 hover:text-gray-700 underline'
                  aria-label={item.label}
                >
                  {item.showHomeIcon ? <Home className='w-5 h-5' /> : item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-gray-900' : 'text-gray-500'}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
