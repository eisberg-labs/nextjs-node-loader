import robotjs from 'robotjs';

export async function GET() {
  const mouse = robotjs.getMousePos();

  return Response.json(mouse);
}
