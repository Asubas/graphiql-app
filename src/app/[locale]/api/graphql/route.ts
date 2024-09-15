import { NextResponse } from 'next/server';
import { toast } from 'react-toastify';

export async function POST(request: Request) {
  const { endpointUrl, headersObj, query, variables } = await request.json();

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        ...headersObj,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    toast.error(`${error}`);
  }
}
