'use client';

import { useRouter } from 'next/navigation';

interface PrivateBtnProps {
  label: string;
  className: string;
  path?: string;
}

export default function PrivateBtn({ label, className, path }: PrivateBtnProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`${path}`);
  };
  return (
    <button className={className} onClick={handleClick}>
      {label}
    </button>
  );
}
