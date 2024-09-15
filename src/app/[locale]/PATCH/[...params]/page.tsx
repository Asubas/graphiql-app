'use client';

import { decodingUrl } from '@/src/utils/decodingUrl';
import { usePathname } from 'next/navigation';
import RestContent from '../../rest/RestContent';

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
