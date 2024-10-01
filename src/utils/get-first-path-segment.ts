export default function getFirstPathSegment(pathname: string) {
  const match = pathname.match(/^\/([^\/]+)/);
  return match ? match[1] : null;
}
