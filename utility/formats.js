export const shortenAddress = (address = '', num = 6) => {
  if (!address) return '';
  if (num >= address.length / 2) return address;
  const prefix = address.slice(0, num);
  const suffix = address.slice(-num, address.length);
  return `${prefix}...${suffix}`;
};

export const parseJson = (str) => {
  try{
    return JSON.parse(str);
  } catch (_){
      return null;
  }
}
