import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';

class CookiePolicyPage extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
    }

    cookiePolicyTitle = this.page.locator('h1[class*="Cookies_title"]');

    async getCookiePolicyTitleText() {
        return await this.cookiePolicyTitle.innerText();
    }

}

export default CookiePolicyPage;