// @ts-ignore
import slugifier from 'node-el-slugify';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = slugifier.slugify(params.slug);

  return Response.json({message: slug});
}
