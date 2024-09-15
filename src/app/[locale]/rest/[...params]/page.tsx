'use client';

import RestContent from '../RestContent';
import { usePathname } from 'next/navigation';
import { decodingUrl } from '@/src/utils/decodingUrl';

export default function RestPageParams() {
  const path = usePathname();
  const decodingPath = decodingUrl(path);

  return (
    <RestContent
      defaultParams={decodingPath}
      decodingHeaders={decodingPath?.headers}
      decodingQuery={decodingPath?.query}
    />
  );
}
