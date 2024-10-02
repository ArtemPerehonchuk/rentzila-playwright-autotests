import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';


class ServicesTab extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
        } 

    servicesTabTitle = this.page.locator('[class*="ServicesUnitFlow_title"]');
    servucesTabInput = this.page.locator('div[class*="ServicesUnitFlow_searchInput"] > input');

    async checkServicesFieldsVisibility() {
        await expect(this.servicesTabTitle).toBeVisible();
        await expect(this.servucesTabInput).toBeVisible();
    }
}

export default ServicesTab;