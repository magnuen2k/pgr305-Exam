// Returns the age of someone based on given birth date in parameter
export const getAge = (dateOfBirth: any) => {
  return Math.abs(
    new Date(Date.now() - new Date(dateOfBirth).getTime()).getUTCFullYear() -
      1970
  );
};

// Formatting of birth date
export const getSimpleBirthOfDate = (dateOfBirth: any) => {
  return new Date(dateOfBirth).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
