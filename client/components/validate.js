const validate = (userData) => {
  const errors = {};

  if (!userData.name?.trim()) {
    errors.name = "Name required";
  } else {
    delete errors.name;
  }
  if (!userData.userName?.trim()) {
    errors.userName = "User Name required";
  } else if (userData.userName.length < 2) {
    errors.userName = "Password need to be 2 character or more";
  } else {
    delete errors.userName;
  }
  if (!userData.password?.trim()) {
    errors.password = "Password required";
  } else if (userData.password.length < 4) {
    errors.password = "Password need to be 4 character or more";
  } else {
    delete errors.password;
  }
  if (userData.isAccepted === true) {
    delete errors.isAccepted;
  } else {
    errors.isAccepted = "Accept our regulations";
  }

  return errors;
};

export default validate;
