import {TLS_Client} from '@/utils/tls/tls';
import {NextResponse, NextRequest} from 'next/server'


export async function GET(request: NextRequest) {
  const response = {status: 200, errors: [], data: null}
  const client = new TLS_Client()


  return NextResponse.json({errors: response.errors, data: response.data}, {status: response.status})

}
