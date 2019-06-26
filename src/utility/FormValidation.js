export const emailValidation = (...args) => {
  const maxLength = 60;
  const checkIfValid = (element) => {
    if (typeof element === 'string') {
      if (!(element.length <= maxLength && element.length >= 5 && !!(element.match(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)))) {
        return false
      }
      return true;
    }
    if (Array.isArray(element)) {
      let result = element.reduce((previous, current) => {
        return previous && checkIfValid(current);
      }, true)
      return result //will be a boolean
    }
    if (typeof element === 'object') {
      let { email } = element;
      if (typeof email === "string") {
        if (!(email.length <= maxLength && email.length >= 5 && !!(email.match(/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)))) {
          return false
        }
        return true;
      }
      return false;
    }
    // if given element is neither a string, object, nor array
    return false;

  }

  let booleanResult = args.reduce((previousBoolean, currentArg) => {
    return previousBoolean && checkIfValid(currentArg);
  }, true)

  return booleanResult;
}

export const passwordValidation = (...args) => {

  const checkIfValid = (element) => {
    if (typeof element === 'string') {
      if (!(element.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{6,})/))) {
        return false
      }
      return true;
    }
    if (Array.isArray(element)) {
      let result = element.reduce((previous, current) => {
        return previous && checkIfValid(current);
      }, true)
      return result //will be a boolean
    }
    if (typeof element === 'object') {
      let { password } = element;
      if (typeof password === "string") {
        if (!(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{6,})/))) {
          return false
        }
        return true;
      }
      return false;
    }
    // if given element is neither a string, object, nor array
    return false;

  }

  let booleanResult = args.reduce((previousBoolean, currentArg) => {
    return previousBoolean && checkIfValid(currentArg);
  }, true)

  return booleanResult;
}

//**Objects that include first name or last name fields must have the property names as 'firstName' or 'lastName'**
export const textValidation = (...args) => {

  const checkIfValid = (element) => {
    if (typeof element === 'string') {
      if (!(element.length <= 30 && element.length >= 2)) {
        return false
      }
      return true;
    }
    if (Array.isArray(element)) {
      let result = element.reduce((previous, current) => {
        return previous && checkIfValid(current);
      }, true)
      return result //will be a boolean
    }
    if (typeof element === 'object') {
      let { firstName, lastName } = element;
      if (typeof firstName === 'string' || typeof lastName === 'string') {
        if (firstName) {
          if (!(firstName.length <= 30 && firstName.length >= 2)) {
            return false
          }
        }
        if (lastName) {
          if (!(lastName.length <= 30 && lastName.length >= 2)) {
            return false
          }
        }
        return true;
      }
      return false;
    }
    // if given element is neither a string, object, nor array
    return false;
  }

  let booleanResult = args.reduce((previousBoolean, currentArg) => {
    return previousBoolean && checkIfValid(currentArg);
  }, true)

  return booleanResult;
};
