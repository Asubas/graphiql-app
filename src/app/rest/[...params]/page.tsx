'use client';

import Loader from '@/src/components/Loader/Loader';
import RestContent from '../RestContent';
import { useParams } from 'next/navigation';
import { decodeUrl } from '@/src/utils/urlUtils';

export default function RestPageParams() {
  let params = useParams()?.params || [];

  if (typeof params === 'string') {
    params = [params];
  }

  if (!params) return <Loader />;

  try {
    const { method, url, body, headers, queries } = decodeUrl(params);

    return (
      <RestContent
        method={method}
        endpointUrl={url}
        body={body}
        headers={headers}
        queries={queries}
      />
    );
  } catch (error) {
    console.error('Error decoding URL parameters:', error);
    return <Loader />;
  }
}
