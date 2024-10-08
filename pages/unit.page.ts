import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';

class UnitPage extends Page {
    
    constructor(page: PlaywrightPage) {
        super(page);
    }

    unitSrvicesTitle = this.page.locator('[class*="UnitCharacteristics_services"] [class*="UnitCharacteristics_title"]');
    unitServicesTypesContainer = this.page.locator('[itemprop="services"]');

    async checkUnitIsVisible(isExist: boolean = true) {
        if(isExist) {
            await expect(this.unitSrvicesTitle).toBeVisible()
            await expect(this.unitServicesTypesContainer).toBeVisible()
        }
    }
}

export default UnitPage;