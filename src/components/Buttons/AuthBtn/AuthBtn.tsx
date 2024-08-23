'use client';

interface AuthBtnProps {
  label: string;
  className: string;
  onClick: () => void;
}

export default function AuthBtn({ label, className, onClick }: AuthBtnProps) {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
}
