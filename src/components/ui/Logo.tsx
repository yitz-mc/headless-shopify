import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className = '', width = 178, height = 46 }: LogoProps) {
  return (
    <Image
      src="https://modular-images-public.s3.us-east-2.amazonaws.com/logo-wide.svg"
      alt="Modular Closets"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
