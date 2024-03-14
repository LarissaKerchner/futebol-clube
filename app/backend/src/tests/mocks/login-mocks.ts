const secrtPassword = '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'

const user = {
    email: 'lari@dev.com',
    password: secrtPassword,
    role: 'user'
};

const validUser = {
    email: 'lari@dev.com',
    password: 'secret_user'
};
const wrongPassword = {
    email: 'lari@dev.com',
    password: 'xxxxx'
};

const wrongEmail = {
    email: 'dev@lari.com',
    password: 'secret_user'
};

const token = 'token';

export default {
    user,
    token,
    validUser,
    wrongPassword,
    wrongEmail
}
