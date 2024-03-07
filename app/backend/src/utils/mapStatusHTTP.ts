export default function mapStatusHTTP(status: string): number {
  switch (status) {
    case 'INVALID_DATA': return 400;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 409;
    default: return 500;
  }
}