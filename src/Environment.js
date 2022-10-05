const dev = {
    env: 'dev',
    url: {
        AUTH_URL:'http://localhost:3000',
        API_URL: 'http://localhost:6001',
        MYACCOUNT_URL: 'http://localhost:6001/myaccount'
    }
}

const qa = {
    env: 'qa',
    url: {
        AUTH_URL:'http://localhost:3000',
        API_URL: 'http://localhost:6001',
        MYACCOUNT_URL: 'http://localhost:6001/myaccount'
    }
}



function getEnv(env) {
    if (env === "development") {
        return dev;
    }
    return qa;
}

//export const environment = getEnv(process.env.REACT_APP_ENV)
export const environment = getEnv('development')
