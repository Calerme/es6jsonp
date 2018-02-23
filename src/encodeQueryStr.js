export default function encodeQueryStr(data) {
  let s = '';

  if (!data.length) {
    return '';
  }

  const entries = Object.entries(data);

  entries.froEach(([key, value]) => {
    s += `${key}=${encodeURIComponent(value)}&`;
  });

  s = s.slice(0, -1);

  return s;
}
