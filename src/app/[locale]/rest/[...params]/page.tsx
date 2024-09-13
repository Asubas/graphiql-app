'use client';

import Loader from '@/src/components/Loader/Loader';
import RestContent from '../RestContent';
import { usePathname, useSearchParams } from 'next/navigation';
import { decodingUrl } from '@/src/utils/decodingUrl';

export default function RestPageParams() {
  const path = usePathname();
  const searchParams = useSearchParams();
  console.log(searchParams);
  const decodingHeaders = decodeURIComponent(searchParams.toString());

  const decodingPath = decodingUrl(path);
  console.log(decodingHeaders);
  console.log(decodingPath);
  return <RestContent defaultParams={decodingPath} decodingHeaders={decodingHeaders} />;
}
