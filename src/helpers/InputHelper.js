export function getAgeYears() {
    const fromYear = (new Date()).getFullYear() - 18;
    // let select 100 years
    return Array(100).fill(0).map((e,i)=> (fromYear - i).toString());
}

export function replaceNumbersWithX(str) {
    str = str || '';
    return str.replace(new RegExp("[0-9]", "g"), "*");
}
