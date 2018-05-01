export default {
    setSplashShown,
    unsetSplashShown,
    isSplashShown
};

const sessionKeys = {
    splashShown: 'splashShown'
};

function setSplashShown() {
    localStorage.setItem(sessionKeys.splashShown, 'true');
}

function unsetSplashShown() {
    localStorage.removeItem(sessionKeys.splashShown);
}

function isSplashShown() {
    return !!localStorage.getItem(sessionKeys.splashShown);
}
