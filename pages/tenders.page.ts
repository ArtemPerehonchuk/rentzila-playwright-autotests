import { Page as PlaywrightPage, Locator, expect } from '@playwright/test';
import Page from './page';

class TendersPage extends Page {
    public locators: { [key: string]: Locator};   

    constructor(page: PlaywrightPage) {
        super(page);
        this.locators = {
            searchInput: this.page.getByTestId('search')
        }
    }

    async checkSerchInput() {
        await expect(this.locators.searchInput).toBeVisible();
        const searchInputText = await this.locators.searchInput.getAttribute('placeholder');
        await expect(searchInputText).toBe('Пошук тендера за ключовими словами');
    }

}

export default TendersPage;