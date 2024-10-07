import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';

class TendersPage extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
    }

    searchInput = this.page.getByTestId('search');

    async checkSerchInputBgText(expectedText: string) {
        await expect(this.searchInput).toBeVisible();
        const searchInputText = await this.searchInput.getAttribute('placeholder');
        await expect(searchInputText).toBe(expectedText);
    }

}

export default TendersPage;