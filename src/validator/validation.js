const isValidMail = (/^([0-9a-z]([-\\.][0-9a-z]+))@([a-z]([-\\.][a-z]+))[\\.]([a-z]{2,20})+$/);

const isValidName = (/^[a-zA-Z. ]{3,20}$/)

const isValid = (value) => {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const isValidfild = (value) => {
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const isValidRequestBody = (value) => {
    return Object.keys(value).length > 0
}

const isValidMobile=/^[6-9]\d{9}$/gi;

module.exports = {
    isValidMail, isValid, isValidName, isValidRequestBody,isValidfild,isValidMobile
}