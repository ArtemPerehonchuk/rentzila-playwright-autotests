import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';

class TermsConditionsPage extends Page { 

    constructor(page: PlaywrightPage) {
        super(page);
    }

    termsConditionsTitle = this.page.locator('h1[class*="TermsConditions_title"]');

    // async getCookiePolicyTitleText() {
    //     return await this.termsConditionsTitle.innerText();
    // }

}

export default TermsConditionsPage;