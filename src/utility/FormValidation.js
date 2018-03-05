const isValidEmail = (email) => {
  if (typeof email !== "string" || !(email.length <=30 && email.length >= 5)) {
    return false;
  }
  if ( !(email.match(/.@./)) ) {
    return false;
  }
  return true;
}

const isValidLength = (string) => {
  if ( typeof string !== "string" || !(string.length <= 30 && string.length >= 3)) {
    return false
  }
  return true;
}

const isValidNumber = (number) => {
  if (typeof number !== "number" || !(number.toString().length >= 10 && number.toString().length <=11) ) {
    return false;
  }
  return true;
}

const isValidZipCode = (number) => {
  if (typeof number !== "number" || number.toString().length !== 5) {
    return false;
  }
  return true;
}

const isValidDate = (date) => {
  //input date must be a string
  if (typeof date !== "string" || date.length !== 8) {
    return false;
  }
  return true;
}

module.exports = {
  isValidEmail,
  isValidLength,
  isValidNumber,
  isValidZipCode,
  isValidDate
}
