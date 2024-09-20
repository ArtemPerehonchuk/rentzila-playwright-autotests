import { APIRequestContext } from '@playwright/test';

import dotenv from 'dotenv';

dotenv.config();

const admin_email: string = process.env.ADMIN_EMAIL || '';
const admin_password: string = process.env.ADMIN_PASSWORD || '';
const user_email: string = process.env.VALID_EMAIL || ''
const user_password: string = process.env.VALID_PASSWORD || ''

let adminAccessToken: any = null;
let userAccessToken: any = null;
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
                        email: admin_email,
                        password: admin_password
                    }
                }).then(async (response) => {
                    adminAccessToken = (await response.json()).access
                })
        }
        return adminAccessToken
    }

    async createUserAccessToken() {
        if(userAccessToken === null) {
            await this.request
                .post('https://dev.rentzila.com.ua/api/auth/jwt/create/', {
                    data: {
                        email: user_email,
                        password: user_password
                    }
                }).then(async (response) => {
                    userAccessToken = (await response.json()).access
                })
        }
        return userAccessToken
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