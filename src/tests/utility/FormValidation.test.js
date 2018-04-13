import {expect} from 'chai';
import { 
    textValidation, 
    passwordValidation, 
    emailValidation, 
    phoneValidation, 
    zipCodeValidation, 
    dateValidation 
} from '../../utility/FormValidation';

/* Testcase for text validation */
const text = {
    testcase1:  {
        desc: "It should return true (length>=3 & length<=30)",
        inVal: "abcd12#A",
        outVal: true
    },
    testcase2:  {
        desc: "It should return false (length<3)",
        inVal: "qA",
        outVal: false
    },
    testcase3:  {
        desc: "It should return false (length>30)",
        inVal: "qwerqwer12341234@#%@@#%#ASDFQWER",
        outVal: false
    }
};

/* Testcase for password validation */
const password = {
    testcase1:  {
        desc: "It should return true",
        inVal: "ajdQWE12#$",
        outVal: true
    },
    testcase2:  {
        desc: "It should return false (not including lowercase)",
        inVal: "AA12#$AA",
        outVal: false
    },
    testcase3:  {
        desc: "It should return false (not including uppercase)",
        inVal: "aa12#$aa",
        outVal: false
    },
    testcase4:  {
        desc: "It should return false (not including number)",
        inVal: "aaAA#$aa",
        outVal: false
    },
    testcase5:  {
        desc: "It should return false (not including special)",
        inVal: "aa12AAaa",
        outVal: false
    },
    testcase6:  {
        desc: "It should return false (length < 8)",
        inVal: "aA12#aa",
        outVal: false
    }
};

/* Testcase for email validation */
const email = {
    testcase1:  {
        desc: "It should return true",
        inVal: "test@test.com",
        outVal: true
    },
    testcase2:  {
        desc: "It should return false",
        inVal: ["AA@test.com", "test@12.com", "test@test.c"],
        outVal: false
    }
};

/* Testcase for email validation */
const phone = {
    testcase1:  {
        desc: "It should return true",
        inVal: 12341234123,
        outVal: true
    },
    testcase2:  {
        desc: "It should return false",
        inVal: [12341234, 123412341234],
        outVal: false
    }
};

/* Testcase for zip validation */
const zip = {
    testcase1:  {
        desc: "It should return true",
        inVal: "23100",
        outVal: true
    },
    testcase2:  {
        desc: "It should return false",
        inVal: ["123", "234567", "231F4", "DDE12"],
        outVal: false
    }
};

/* Testcase for date validation */
const date = {
    testcase1:  {
        desc: "It should return true",
        inVal: "03122018",
        outVal: true
    },
    testcase2:  {
        desc: "It should return false",
        inVal: ["123", "234567121", "231F1233", "DDESAASE"],
        outVal: false
    }
};

describe('Text Validation', () => {

    for (let key in text) {
        it( text[key].desc, () => {
            expect( textValidation( text[key].inVal ) ).to.equal( text[key].outVal );
        });
    }
})

describe('Password Validation', () => {

    for (let key in password) {
        it( password[key].desc, () => {
            expect( passwordValidation( password[key].inVal ) ).to.equal( password[key].outVal );
        });
    }
})

describe('Email Validation', () => {

    for (let key in email) {
        it( email[key].desc, () => {
            expect( emailValidation( email[key].inVal ) ).to.equal( email[key].outVal );
        });
    }
})

describe('Phone Validation', () => {

    for (let key in phone) {
        it( phone[key].desc, () => {
            expect( phoneValidation( phone[key].inVal ) ).to.equal( phone[key].outVal );
        });
    }
})

describe('Zip Validation', () => {

    for (let key in zip) {
        it( zip[key].desc, () => {
            expect( zipCodeValidation( zip[key].inVal ) ).to.equal( zip[key].outVal );
        });
    }
})

describe('Date Validation', () => {

    for (let key in date) {
        it( date[key].desc, () => {
            expect( dateValidation( date[key].inVal ) ).to.equal( date[key].outVal );
        });
    }
})