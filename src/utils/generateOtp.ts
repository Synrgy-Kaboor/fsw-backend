const generateOtp = (length: number): string => {
  let result = '';
  const characters = '0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * 10));
  }
  return result;
};

export { generateOtp };
