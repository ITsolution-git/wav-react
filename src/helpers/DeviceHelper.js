export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isTablet() {
	return /iPad|Tablet/i.test(navigator.userAgent);	
}

export function isDesktop() {
    return !isMobile();
}
