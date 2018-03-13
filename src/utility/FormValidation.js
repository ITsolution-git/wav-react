export const emailValidation = (...args) => {

  const checkIfValid = (element) => {
    if (typeof element === 'string') {
      if (!(element.length <=30 && element.length >= 5 && !!(element.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) ) ) {
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
          if (!(email.length <=30 && email.length >= 5 && !!(email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) ) ) {
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
      if (!(element.length >= 6 && !!(element.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) ) ) {
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
          if (!(password.length >= 6 && !!(password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) ) ) {
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
      if (!(element.length <= 30 && element.length >= 3)) {
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
          if (!(firstName.length <= 30 && firstName.length >= 3)) {
            return false
          }
        }
        if (lastName) {
          if (!(lastName.length <= 30 && lastName.length >= 3)) {
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
}

//**Objects that include phone number fields must have the property name as 'phoneNumber' or 'number'**
//Phone numbers cannot have leading 0s!
export const phoneValidation = (...args) => {

  const checkIfValid = (element) => {
    if (typeof element === 'number') {
      if (!(element.toString().length >= 10 && element.toString().length <=11)) {
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
      let { phoneNumber, number} = element;
      if (typeof phoneNumber === 'number' || typeof number === 'number') {
        if (phoneNumber) {
          if (!(phoneNumber.toString().length >= 10 && phoneNumber.toString().length <=11)) {
            return false
          }
        }
        if (number) {
          if (!(number.toString().length >= 10 && number.toString().length <=11)) {
            return false
          }
        }
        return true;
      }
      return false;
    }
    // if given element is neither a number, object, or array
    return false;
  }

  let booleanResult = args.reduce((previousBoolean, currentArg) => {
    return previousBoolean && checkIfValid(currentArg);
  }, true)

  return booleanResult;
}

//**Objects that include ZIP CODE fields must have the property name as 'zipCode'**
export const zipCodeValidation = (...args) => {

  const checkIfValid = (element) => {
    if (typeof element === 'string') {
      if (element.length !== 5) {
        return false
      }

      let boolean = element.split('').reduce((previous, current) => {
        if (current === '0') {
          return previous && true;
        }
        return previous && !!(parseInt(current));
      }, true);

      return boolean;
    }
    if (Array.isArray(element)) {
      let result = element.reduce((previous, current) => {
        return previous && checkIfValid(current);
      }, true)
      return result //will be a boolean
    }
    if (typeof element === 'object') {
      let { zipCode } = element;
      if (typeof zipCode === 'string') {
        if (zipCode.length !== 5) {
          return false
        }

        let boolean = zipCode.split('').reduce((previous, current) => {
          //handle edge case where 0 is falsy
          if (current === '0') {
            return previous && true;
          }
          return previous && !!(parseInt(current));
        }, true);
        return boolean;
      }
      return false;
    }
    // if given element is neither a string, object, nor array
    return false;
  }

  let booleanResult = args.reduce((previousBoolean, currentArg) => {
    return previousBoolean && checkIfValid(currentArg);
  }, true)
  //return final boolean
  return booleanResult;
}

export const dateValidation = (...args) => {
  //input date must be a string

  const checkIfValid = (element) => {
    if (typeof element === 'string') {
      if (element.length !== 8) {
        return false
      }

      let boolean = element.split('').reduce((previous, current) => {
        if (current === '0') {
          return previous && true;
        }
        return previous && !!(parseInt(current));
      }, true);

      return boolean;
    }
    if (Array.isArray(element)) {
      let result = element.reduce((previous, current) => {
        return previous && checkIfValid(current);
      }, true)
      return result //will be a boolean
    }
    if (typeof element === 'object') {
      let { date } = element;
      if (typeof date === 'string') {
        if (date.length !== 8) {
          return false
        }

        let boolean = date.split('').reduce((previous, current) => {
          //handle edge case where 0 is falsy
          if (current === '0') {
            return previous && true;
          }
          return previous && !!(parseInt(current));
        }, true);
        return boolean;
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
