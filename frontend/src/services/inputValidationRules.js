const isValidEmail = (email) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(String(email).toLowerCase());
};

export default function inputValidationRules(targetValues) {
  return {
    firstName:
      !!targetValues.firstName && targetValues.firstName.match(/^ *$/) === null,
    lastName:
      !!targetValues.lastName && targetValues.lastName.match(/^ *$/) === null,
    email: isValidEmail(targetValues.email),
    password:
      !!targetValues.password &&
      targetValues.password.length > 8 &&
      targetValues.password.match(/^ *$/) === null,
    photo: true,
    role: true,
    roleExperts: true,
  };
}
