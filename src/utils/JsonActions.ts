const safeJsonParse = (s: string) => {
  try {
    return JSON.parse(s);
  } catch (e) {
    return null;
  }
};

export default safeJsonParse;
