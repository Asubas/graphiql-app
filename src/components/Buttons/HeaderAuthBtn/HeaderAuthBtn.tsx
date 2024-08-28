'use client';

import Image from 'next/image';

interface HeaderAuthBtnProps {
  className: string;
  onClick: () => void;
  'data-testid'?: string;
}

export default function HeaderAuthBtn({
  className,
  onClick,
  'data-testid': testId,
}: HeaderAuthBtnProps) {
  return <button className={className} onClick={onClick} data-testid={testId}></button>;
}
