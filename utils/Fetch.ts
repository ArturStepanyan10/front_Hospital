interface CredentialsSignIn {
    email: string;
    password: string;
}

interface CredentialsRegister {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    age: number;
    phoneNumber: string;
    snils: string;
}

export function postFetch(endpoint: URL | RequestInfo, bodyObj: CredentialsSignIn | CredentialsRegister) {
    return fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        body: JSON.stringify(bodyObj),
    }).then(res => {
        if (res.ok) {
            return res.text(); // Возвращаем текст ответа
        } else {
            return res.text().then(error => Promise.reject(new Error(error)));
        }
    }).then(token => {
        if (!token) {
            throw new Error('Bad credentials'); // Выбрасываем ошибку, если токен не передан
        }
        return token;
    }).catch(error => {
        console.error('Error:', error);
        throw new Error('Network response was not ok.');
    });
}


