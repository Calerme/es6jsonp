export default function encodeQueryStr(data) {
  let s = '';

  if (data == null || !Object.keys(data).length) {
    return '';
  }

  const entries = Object.entries(data);

  entries.forEach(([key, value]) => {
    s += `${key}=${encodeURIComponent(value)}&`;
  });

  s = s.slice(0, -1);

  return s;
}
