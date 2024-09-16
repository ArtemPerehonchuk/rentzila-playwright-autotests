import { Page as PlaywrightPage, Locator, expect } from '@playwright/test';
import Page from './page';

class PrivacyPolicyPage extends Page {
    public locators: { [key:string]: Locator};   

    constructor(page: PlaywrightPage) {
        super(page);
        this.locators = {
            privacyPolicyTitle: this.page.getByRole('heading', { name: 'Політика конфіденційності' })
        }
    }

    async checkPrivacyPolicyTitle() {
        await expect(this.locators.privacyPolicyTitle).toBeVisible();
    }

}

export default PrivacyPolicyPage;