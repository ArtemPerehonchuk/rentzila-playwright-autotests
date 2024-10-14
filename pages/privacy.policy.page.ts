import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';

class PrivacyPolicyPage extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
    }

    privacyPolicyTitle = this.page.locator('h1[class*="PrivacyPolicy_title"]');

    async checkPrivacyPolicyTitle() {
        await expect(this.privacyPolicyTitle).toBeVisible();
    }

}

export default PrivacyPolicyPage;