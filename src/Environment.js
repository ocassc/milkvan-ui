const dev = {
    env: process.env.REACT_APP_ENV,
    url: {
        AUTH_URL: 'https://demo.cimmra.com',
        MYACCOUNT_URL: 'https://demo.cimmra.com/myaccount',
        GAPI: 'http://localhost:11001/graphql',
        FS_API: 'https://demo.cimmra.com/fsapi',
        PORTAINERDOCKER_URL: 'http://137.116.145.126:9000',
        PORTAINERDOCKERECS_URL: 'http://137.116.145.126:9000'
    }
}

const cdev = {
    env: process.env.REACT_APP_ENV,
    url: {
        AUTH_URL: 'http://localhost:2001',
        MYACCOUNT_URL: 'http://localhost:2007',
        GAPI: 'http://localhost:11001/graphql',
        FS_API: 'http://localhost:1009',
        PORTAINERDOCKER_URL: 'http://137.116.145.126:9000',
        PORTAINERDOCKERECS_URL: 'http://137.116.145.126:9000'
    }
}

const qa = {
    env: process.env.REACT_APP_ENV,
    url: {
        AUTH_URL: 'https://qa.cimmra.com',
        MYACCOUNT_URL: 'https://qa.cimmra.com/myaccount',
        GAPI: 'https://qa.cimmra.com/gapi/graphql',
        FS_API: 'https://qa.cimmra.com/fsapi',
        PORTAINERDOCKER_URL: 'http://137.116.145.126:9000',
        PORTAINERDOCKERECS_URL: 'http://137.116.145.126:9000'
    }
}

const demo = {
    env: process.env.REACT_APP_ENV,
    url: {
        AUTH_URL: 'https://demo.cimmra.com',
        MYACCOUNT_URL: 'https://demo.cimmra.com/myaccount',
        GAPI: 'https://demo.cimmra.com/gapi/graphql',
        FS_API: 'https://demo.cimmra.com/fsapi',
        PORTAINERDOCKER_URL: 'http://137.116.145.126:9000',
        PORTAINERDOCKERECS_URL: 'http://137.116.145.126:9000'
    }
}

const uat = {
    env: process.env.REACT_APP_ENV,
    url: {
        AUTH_URL: 'https://p2p-uat.hdfclife.com',
        MYACCOUNT_URL: 'https://p2p-uat.hdfclife.com/myaccount',
        GAPI: 'https://p2p-uat.hdfclife.com/gapi/graphql',
        FS_API: 'https://p2p-uat.hdfclife.com/fs-api',
        PORTAINERDOCKER_URL: 'http://172.27.72.131:9000',
        PORTAINERDOCKERECS_URL: 'http://172.27.74.22:2028'
    }
}

const prod = {
    env: process.env.REACT_APP_ENV,
    url: {
        AUTH_URL: 'https://p2p.hdfclife.com',
        MYACCOUNT_URL: 'https://p2p.hdfclife.com/myaccount',
        GAPI: 'https://p2p.hdfclife.com/gapi/graphql',
        FS_API: 'https://p2p.hdfclife.com/fs-api',
        PORTAINERDOCKER_URL: 'http://172.27.39.30:9000',
        PORTAINERDOCKERECS_URL: 'http://172.27.43.15:2028',
        UAT_URL: 'https://p2p-uat.hdfclife.com'
    }
}

function getEnv(env) {
    if (env === "development") return dev
    if (env === "cdevelopment") return cdev
    if (env === "qa") return qa
    if (env === "demo") return demo
    if (env === "uat") return uat
    if (env === "prod") return prod
    return dev
}

export const environment = getEnv(process.env.REACT_APP_ENV)
