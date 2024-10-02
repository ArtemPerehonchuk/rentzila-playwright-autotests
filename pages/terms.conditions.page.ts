import { Page as PlaywrightPage, Locator, expect } from '@playwright/test';
import Page from './page';

class TermsConditionsPage extends Page {
    public locators: { [key: string]: Locator};   

    constructor(page: PlaywrightPage) {
        super(page);
        this.locators = {
            termsConditionsTitle: this.page.getByRole('heading', { name: 'Угода користувача' })
        }
    }

    async checkCookiePolicyTitle() {
        await expect(this.locators.termsConditionsTitle).toBeVisible();
    }

}

export default TermsConditionsPage;