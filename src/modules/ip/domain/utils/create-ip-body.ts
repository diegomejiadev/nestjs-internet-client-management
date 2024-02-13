export const createIpBody = (
  ipAddress: string,
): {
  fullIp: string;
  firstPart: number;
  secondPart: number;
  range: number;
  tail: number;
} => {
  const [firstPart, secondPart, range, tail] = ipAddress.split('.');

  return {
    fullIp: ipAddress,
    firstPart: parseInt(firstPart),
    secondPart: parseInt(secondPart),
    range: parseInt(range),
    tail: parseInt(tail),
  };
};
