/* eslint-disable no-param-reassign */
export const toBase64Url = (base64Str, encoding = 'image/jpg') => {
  return `data:${encoding};base64,${base64Str}`;
};

export const hashCode = (s) =>
  s.split('').reduce((a, b) => {
    // eslint-disable-next-line no-bitwise
    a = (a << 5) - a + b.charCodeAt(0);
    // eslint-disable-next-line no-bitwise
    return a & a;
  }, 0);

export const sortByHash = (a, b) => {
  const A = hashCode(a);
  const B = hashCode(b);
  return (B < A) - (A < B);
};
