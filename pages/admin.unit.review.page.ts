import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';

class AdminUnitReviewPage extends Page {

    constructor(page: PlaywrightPage) {
        super(page);
    }

    manufacturerField = this.page.locator('[class*="AdminCurrentUnit_info_content"]').nth(2);
    modelNameField = this.page.locator('[class*="AdminCurrentUnit_info_content"]').nth(3);
    technicalCharacteristicsField = this.page.locator('[class*="AdminCurrentUnit_info_content"]').nth(4);
    detailDescriptionField = this.page.locator('[class*="AdminCurrentUnit_info_content"]').nth(5);
    locationField = this.page.locator('div[class*="AdminCurrentUnit_info_content"] > span');

    async getManufacturerFieldText() {
        return await this.manufacturerField.textContent();
    }

    async getModelNameFieldText() {
        return await this.modelNameField.innerText();
    }

    async getTechnicalCharacteristicsFieldText() {
        return await this.technicalCharacteristicsField.innerText();
    }
    
    async getDetailDescriptionFieldText() {
        return await this.detailDescriptionField.innerText();
    }

    async getLocationFieldText() {
        const text = await this.locationField.evaluate(element => 
            element.textContent?.replace(/\s+/g, ' ').trim() || ''
        );
    
        return text;
    }
}

export default AdminUnitReviewPage;