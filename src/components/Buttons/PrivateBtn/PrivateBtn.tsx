'use client';

import { useRouter } from 'next/navigation';

interface PrivateBtnProps {
  label: string;
  className: string;
  route: string;
}

export default function PrivateBtn({ label, className, route }: PrivateBtnProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(route);
  };

  return (
    <button className={className} onClick={handleClick}>
      {label}
    </button>
  );
}
