export const getProgress = (password: string) => {
  const conditions = [
    /\d/.test(password),
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[\W_]/.test(password),
  ];

  return conditions.filter(Boolean).length / conditions.length;
};
