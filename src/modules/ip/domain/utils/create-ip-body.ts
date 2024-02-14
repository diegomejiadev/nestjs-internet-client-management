export const createIpBody = (
  ipAddress: string,
): {
  fullIp: string;
  firstPart: number;
  secondPart: number;
  range: number;
  tail: number;
} => {
  const [firstPart, secondPart, range, tail] = ipAddress.trim().split('.');

  return {
    fullIp: ipAddress.trim(),
    firstPart: parseInt(firstPart),
    secondPart: parseInt(secondPart),
    range: parseInt(range),
    tail: parseInt(tail),
  };
};
