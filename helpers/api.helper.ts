import { APIRequestContext } from '@playwright/test';

let adminAccessToken: any = null;
let user: any = null;

class ApiHelper {
    constructor(private request: APIRequestContext) {
        this.request = request;
    }

    async createAdminAccessToken() {
        if(adminAccessToken === null) {
            await this.request
                .post('https://dev.rentzila.com.ua/api/auth/jwt/create/', {
                    data: {
                        email: 'txt2021@ukr.net',
                        password: 'Qwerty123+'
                    }
                }).then(async (response) => {
                    adminAccessToken = (await response.json()).access
                })
        }
        return adminAccessToken
    }

    async getUserDetails() {
        const accessAdminToken = await this.createAdminAccessToken();
        await this.request
              .get('https://dev.rentzila.com.ua/api/backcall/', {
                headers: {
                    Authorization: `Bearer ${accessAdminToken}`
                }
              })
              .then(async (response) => {
                user = await response.json();
              }) 

        return user
    }

}

export default ApiHelper;