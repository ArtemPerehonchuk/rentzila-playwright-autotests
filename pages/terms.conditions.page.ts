import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';

class TermsConditionsPage extends Page { 

    constructor(page: PlaywrightPage) {
        super(page);
    }

    termsConditionsTitle = this.page.locator('h1[class*="TermsConditions_title"]');

    async checkCookiePolicyTitle() {
        await expect(this.termsConditionsTitle).toBeVisible();
    }

}

export default TermsConditionsPage;