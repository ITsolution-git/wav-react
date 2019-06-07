// eslint-disable-next-line
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// eslint-disable-next-line
String.prototype.parseJson = function () {
    let isJson = true,
        result = null;
    try {
        result = JSON.parse(this);
    }
    catch (e) {
        isJson = false;
    }
    return isJson ? result : false;
};