import { Page as PlaywrightPage, Locator, expect } from '@playwright/test';
import Page from './page';


class ProfilePage extends Page {
    
    public locators: { [key: string]: Locator };

    constructor(page: PlaywrightPage) {
        super(page);
        this.locators = {
            profilePhoneInput: this.page.locator('input[data-testid="input_OwnerProfileNumber"]'),
            profileLogoutBtn: this.page.locator('div[data-testid="logOut"]')
        };
    }
    
    async checkPhoneInputIsDisplayed() {
        await expect(this.locators.profilePhoneInput).toBeVisible();
    }

    async checkPhoneInputValue(expectedPhoneNumber: string) {
        const currentPhoneNumber = (await this.locators.profilePhoneInput.inputValue()).split(' ').join('');
        await expect(currentPhoneNumber).toBe(expectedPhoneNumber);
    }

    async clickOnLogoutBtn() {
        await this.locators.profileLogoutBtn.click();
    }
}

export default ProfilePage;