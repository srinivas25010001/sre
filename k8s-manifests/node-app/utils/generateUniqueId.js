const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 15);
const nanoid2 = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$(){}[]", 10);
const password = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$(){}[]", 10);

const fiveChar = customAlphabet("123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);

let genrateUUI = () => {
    return nanoid();
}

let generateUUI2 = () => {
    return nanoid2();
}

let generatePassword = () => {
    return password();
}

let generateFiveChar = () =>{
    return fiveChar();
}
module.exports = { genrateUUI, generateUUI2, generatePassword, generateFiveChar };

