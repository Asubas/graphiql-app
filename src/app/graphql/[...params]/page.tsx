'use client';
import GraphQlContent from '../graphqlContent';
import { usePathname } from 'next/navigation';
import { decodingUrl } from '@/src/utils/decodingUrl';

function GraphQlParams() {
  const path = usePathname();
  const decodingPath = decodingUrl(path);
  return <GraphQlContent defaultParams={decodingPath} />;
}

export default GraphQlParams;
