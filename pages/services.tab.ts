import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';
import { getRandomLetter } from '../helpers/random_values';


class ServicesTab extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
        } 

    servicesTabTitle = this.page.locator('[class*="ServicesUnitFlow_title"]');
    servicesTabInput = this.page.locator('div[class*="ServicesUnitFlow_searchInput"] > input');
    servicesOptions = this.page.locator('[data-testid="searchItem-servicesUnitFlow"]');


    async checkServicesFieldsVisibility() {
        await expect(this.servicesTabTitle).toBeVisible();
        await expect(this.servicesTabInput).toBeVisible();
    }

    async selectService() {
        await this.servicesTabInput.fill(getRandomLetter());
        await this.servicesOptions.first().click();
    }

    async getSelectedService() {
       const selectedService =  await this.servicesOptions.first().innerText();
       return selectedService;
    }
}

export default ServicesTab;