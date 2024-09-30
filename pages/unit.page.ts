import { Page as PlaywrightPage, Locator, expect } from '@playwright/test';
import Page from './page';

class UnitPage extends Page {
    public locators: { [key: string]: Locator};
    
    constructor(page: PlaywrightPage) {
        super(page);

        this.locators = {
            unitSrvicesTitle: this.page.getByText('Послуги, які надає технічний засіб:'),
            unitServicesTypesContainer: this.page.locator('[itemprop="services"]')
        }
    }

    async checkUnit() {
        if(await this.locators.unitSrvicesTitle.isVisible()) {
            await expect(this.locators.unitSrvicesTitle).toBeVisible()
            await expect(this.locators.unitServicesTypesContainer).toBeVisible()
        }
    }
}

export default UnitPage;