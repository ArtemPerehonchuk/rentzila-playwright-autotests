import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';

class PrivacyPolicyPage extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
    }

    privacyPolicyTitle = this.page.locator('h1[class*="PrivacyPolicy_title"]');

    async getPrivacyPolicyTitleText() {
        return await this.privacyPolicyTitle.innerText();
    }

}

export default PrivacyPolicyPage;