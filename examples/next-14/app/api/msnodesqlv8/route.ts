import msnodesql from 'msnodesqlv8';

export async function GET() {
  console.log(msnodesql)
  return Response.json({'status': 'ok'});
}
