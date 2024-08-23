interface PrivateBtnProps {
  label: string;
  className: string;
}

export default function PrivateBtn({ label, className }: PrivateBtnProps) {
  return <button className={className}>{label}</button>;
}
