import { Page as PlaywrightPage, Locator, expect } from '@playwright/test';
import Page from './page';

class CookiePolicyPage extends Page {
    public locators: { [key: string]: Locator};   

    constructor(page: PlaywrightPage) {
        super(page);
        this.locators = {
        cookiePolicyTitle: this.page.getByText('Політика використання файлів cookie')
        }
    }

    async checkCookiePolicyTitle() {
        await expect(this.locators.cookiePolicyTitle).toBeVisible();
    }

}

export default CookiePolicyPage;