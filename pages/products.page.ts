import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';

class ProductsPage extends Page {

    constructor(page: PlaywrightPage) {
        super(page);
    }
    
    produtsList = this.page.locator('div[class*="UnitCard_cardWrapper"]>a');
    productFilterItem = this.page.locator('div[class*="ResetFilters_selectedCategory"]');
    dropdownArrow = this.page.locator('[data-testid="rightArrow"]').first();
    unitsContainer = this.page.locator('div[class*="MapPagination_units_container"]');
    constructionsCheckBox = this.page.locator('[data-testid="categoryCheckbox"]').nth(1);
    othersCheckBox = this.page.locator('[data-testid="categoryCheckbox"]').nth(2);
    searchInput = this.page.getByTestId('searchInput');

    async clickFirstProduct() {
        if(await this.produtsList.first().isVisible()) {
            await this.produtsList.first().click({force: true});
            await this.page.waitForLoadState('networkidle');
        }else {}
    }

    async filtersAreChecked(unitName: string) {
        const dropdownCheckBox = this.page.locator('label', { hasText: unitName });
        if (!(await dropdownCheckBox.isVisible())) {
            await this.dropdownArrow.click();
        }
        await expect(dropdownCheckBox).toBeChecked();
        return true
    }

    async clickOnDropdownArrow() {
        await this.dropdownArrow.click();
    }

    async checkCategoriesCheckboxesAreChecked() {
        if(await this.productFilterItem.isVisible()) {
            await expect(this.constructionsCheckBox).toBeChecked();
            await expect(this.othersCheckBox).toBeChecked();
            return true
        }else return false
    }

    async getSearchInputBgText() {
        const searchInputText = await this.searchInput.getAttribute('placeholder');
        return searchInputText;
    }
}

export default ProductsPage;