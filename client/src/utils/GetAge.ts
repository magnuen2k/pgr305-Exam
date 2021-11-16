export const getAge = (dateOfBirth: any) => {
  return Math.abs(
    new Date(Date.now() - new Date(dateOfBirth).getTime()).getUTCFullYear() -
      1970
  );
};

export const getSimpleBirthOfDate = (dateOfBirth: any) => {
  return new Date(dateOfBirth).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
