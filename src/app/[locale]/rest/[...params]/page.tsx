'use client';

import Loader from '@/src/components/Loader/Loader';
import RestContent from '../RestContent';
import { usePathname } from 'next/navigation';
import { decodingUrl } from '@/src/utils/decodingUrl';

export default function RestPageParams() {
  const path = usePathname();
  const decodingPath = decodingUrl(path);
  console.log(decodingPath);
  return <RestContent defaultParams={decodingPath} decodingHeaders={decodingPath?.headers} />;
}
