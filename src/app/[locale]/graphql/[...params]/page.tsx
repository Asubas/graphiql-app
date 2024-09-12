'use client';
import GraphQlContent from '../graphqlContent';
import { usePathname, useSearchParams } from 'next/navigation';
import { decodingUrl } from '@/src/utils/decodingUrl';

function GraphQlParams() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const decodingHeaders = atob(decodeURIComponent(searchParams.toString()));
  const decodingPath = decodingUrl(path);
  return <GraphQlContent defaultParams={decodingPath} decodingHeaders={decodingHeaders} />;
}

export default GraphQlParams;
