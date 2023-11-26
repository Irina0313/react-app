const safeJsonParse = (s: string | null) => {
  try {
    return s !== null && JSON.parse(s);
  } catch (e) {
    return null;
  }
};

export default safeJsonParse;
