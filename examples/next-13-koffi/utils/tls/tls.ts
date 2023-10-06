import koffi from 'koffi'
import { fileURLToPath } from 'url';
import path from "path"
import { CookieJar, Cookie } from 'tough-cookie';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class TLS_Client {
    jar: CookieJar | any
    tls: any
    constructor(props?: any) {
        if (props && props.enable_cookies) {
            this.jar = new CookieJar();
        }
        console.log("Getting tls");
        this.tls = this.initTLS();
    }
    initTLS() {
        let tlsLib = process.platform.includes('win') ? path.join(__dirname, './tls-client-windows-64-0.9.1.dll') : path.join(__dirname, './tls-client-linux-ubuntu-amd64-0.9.1.so')
        console.log(tlsLib);
        const lib = koffi.load(tlsLib)
        return {
            request: lib.func("request", "string", ["string"]),
            getCookiesFromSession: lib.func("getCookiesFromSession", "string", ["string"]),
            freeAll: lib.func("freeAll", "string", ["string"]),
            freeSession: lib.func("freeSession", "string", ["string"]),
        }
    }

    get = async (requestUrl: any, options: any, body: any) => {
        requestUrl = new URL(requestUrl)
        if (typeof (body) == "object" && body != null) {
            let newBody = new URLSearchParams()
            for (const key of Object.keys(body)) {
                newBody.append(key, body[key])
            }
            console.log(newBody);
            requestUrl.search = newBody
        }
        return await this.CustomRequest(requestUrl.href, "GET", options, body)
    }

    post = async (requestUrl: any, options: any, body: any) => {
        requestUrl = new URL(requestUrl)
        return await this.CustomRequest(requestUrl.href, "POST", options, body)
    }

    delete = async (requestUrl: any, options: any, body: any) => {
        requestUrl = new URL(requestUrl)
        return await this.CustomRequest(requestUrl.href, "DELETE", options, body)
    }

    head = async (requestUrl: any, options: any, body: any) => {
        requestUrl = new URL(requestUrl)
        return await this.CustomRequest(requestUrl.href, "HEAD", options, body)
    }

    options = async (requestUrl: any, options: any, body: any) => {
        requestUrl = new URL(requestUrl)
        return await this.CustomRequest(requestUrl.href, "OPTIONS", options, body)
    }

    put = async (requestUrl: any, options: any, body: any) => {
        requestUrl = new URL(requestUrl)
        return await this.CustomRequest(requestUrl.href, "PUT", options, body)
    }

    patch = async (requestUrl: any, options: any, body: any) => {
        requestUrl = new URL(requestUrl)
        return await this.CustomRequest(requestUrl.href, "PATCH", options, body)
    }

    CustomRequest = async (requestUrl: any, requestMethod: any, options: any, body: any) => {
        body = (typeof (body) == "object" && body != null) ? JSON.stringify(body) : body
        return new Promise((resolve, reject) => {
            const defaultPayload = {
                tlsClientIdentifier: options.clientType ? options.clientType : "chrome_105",
                insecureSkipVerify: false,
                withoutCookieJar: false,
                timeouXtSeconds: 30,
                requestUrl: requestUrl,
                requestMethod: requestMethod,
                requestBody: body,
                //requestCookies: ,
                //sessionId: "12345",
                ...options,
            };
            if (this.jar) {
                defaultPayload.headers.cookie = this.jar.getCookieStringSync(defaultPayload.requestUrl)
            }
            defaultPayload.headerOrder = Object.keys(defaultPayload.headers)
            this.tls.request.async(JSON.stringify(defaultPayload), (error: any, resp: any) => {
                if (error) reject(error);
                const response = JSON.parse(resp);
                if (this.jar) {
                    for (const cookie of Object.keys(response.cookies)) {
                        try {
                            this.jar.setCookieSync(Cookie.parse(`${cookie}=${response.cookies[cookie]}`), new URL(response.target).origin);
                        } catch (error) {
                        }
                    }
                }
                resolve(response);
            });

        });
    }
    request = async (payload: any, clientType = "chrome_105") => {
        payload.requestBody = (typeof (payload.requestBody) == "object" && payload.requestBody != null) ? JSON.stringify(payload.requestBody) : payload.requestBody
        return new Promise((resolve, reject) => {
            const defaultPayload = {
                tlsClientIdentifier: clientType,
                insecureSkipVerify: false,
                withoutCookieJar: false,
                timeoutSeconds: 30,
                //requestCookies: ,
                //sessionId: "12345",
                ...payload,
            };

            if (this.jar) {
                defaultPayload.headers.cookie = this.jar.getCookieStringSync(defaultPayload.requestUrl)
            }
            defaultPayload.headerOrder = Object.keys(defaultPayload.headers)
            this.tls.request.async(JSON.stringify(defaultPayload), (error: any, resp: any) => {
                if (error) reject(error);
                const response = JSON.parse(resp);
                if (this.jar) {
                    for (const cookie of Object.keys(response.cookies)) {
                        try {
                            this.jar.setCookieSync(Cookie.parse(`${cookie}=${response.cookies[cookie]}`), new URL(response.target).origin);
                        } catch (error) {
                        }
                    }
                }
                resolve(response);
            });

        });
    }
}
