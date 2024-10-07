import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';


class ProfilePage extends Page {

    constructor(page: PlaywrightPage) {
        super(page);
    }

    profilePhoneInput = this.page.locator('input[data-testid="input_OwnerProfileNumber"]');
    profileLogoutBtn = this.page.locator('div[data-testid="logOut"]');
    
    async checkPhoneInputIsDisplayed() {
        await expect(this.profilePhoneInput).toBeVisible();
    }

    async checkPhoneInputValue(expectedPhoneNumber: string) {
        const currentPhoneNumber = (await this.profilePhoneInput.inputValue()).split(' ').join('');
        await expect(currentPhoneNumber).toBe(expectedPhoneNumber);
    }

    async clickOnLogoutBtn() {
        await this.profileLogoutBtn.click();
    }
}

export default ProfilePage;