'use client'; // Error boundaries must be Client Components

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ErrorUI({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  const toggleDetails = () => {
    setShowDetails((prevState) => !prevState);
  };

  return (
    <section className="error">
      <div className="error_img"></div>
      <h2 className="error_h2">Something went wrong!</h2>
      <p className="error_msg">
        <span className="error_msg__title">Error:</span> {error.message}
      </p>
      <button className="error_btn" onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && <pre className="error_details">{error.stack}</pre>}
      <a href="/" className="error_btn">
        Try again from Start
      </a>
    </section>
  );
}
