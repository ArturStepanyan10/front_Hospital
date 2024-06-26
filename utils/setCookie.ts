export function setCookie(name: string, value: string, hours: number): void {
    let expires: string = "";
    if (hours) {
        const date: Date = new Date();
        date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: string): string | null {

    if (typeof document === 'undefined') {
        return null; // Возвращаем null, если document не определен
    }
    let nameEQ: string = name + "=";
    let ca: string[] = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c: string = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function eraseCookie(name: string): void {

    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

}

