import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';

class CookiePolicyPage extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
    }

    cookiePolicyTitle = this.page.locator('h1[class*="Cookies_title"]');

    async checkCookiePolicyTitle() {
        await expect(this.cookiePolicyTitle).toBeVisible();
    }

}

export default CookiePolicyPage;