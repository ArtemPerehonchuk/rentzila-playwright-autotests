import { Page as PlaywrightPage, Locator, expect } from '@playwright/test';
import Page from './page';

class ProductsPage extends Page {
    public locators: { [key: string]: Locator };

    constructor(page: PlaywrightPage) {
        super(page);
        this.locators = {
            produtsList: this.page.locator('div[class*="UnitCard_cardWrapper"]>a'),
            productFilterItem: this.page.locator('div[class*="ResetFilters_selectedCategory"]'),
            dropdownArrow: this.page.locator('#__next > div > main > div > div > div[class*="Filters_leftContainer"] > div > div[class*="Filters_filtersWrapper"] > div[class*="Services_wrapper"] > div:nth-child(1) > div[class*="ServiceCategory_svgContainer"]'),
            unitsContainer: this.page.locator('div[class*="MapPagination_units_container"]'),
            constructionsCheckBox: this.page.locator('label', {hasText: 'Будівельні'}),
            othersCheckBox: this.page.locator('label', {hasText: 'Інші'}),
            searchInput: this.page.getByTestId('searchInput')
    }
    }

    async clickFirstProduct() {
        if(await this.locators.produtsList.first().isVisible()) {
            await this.locators.produtsList.first().click();
        }else {}
    }

    async checkFilters(unitName: string) {
        this.locators.dropdownCheckBox = this.page.locator('label', { hasText: unitName });
        if (!(await this.locators.dropdownCheckBox.isVisible())) {
            await this.locators.dropdownArrow.click()
        }
        await expect(this.locators.dropdownCheckBox).toBeChecked()
    }

    async checkProductsFilter() {
        await expect(this.locators.productFilterItem).toBeVisible();
    }

    async clickOnDropdownArrow() {
        await this.locators.dropdownArrow.click();
    }

    async checkCategoriesCheckboxes() {
        if(await this.locators.productFilterItem.isVisible()) {
            await expect(this.locators.constructionsCheckBox).toBeChecked();
            await expect(this.locators.othersCheckBox).toBeChecked();
        }
    }

    async checkUnitsContainerIsVisible() {
        await expect(this.locators.unitsContainer).toBeVisible();
    }

    async checkSerchInput() {
        await expect(this.locators.searchInput).toBeVisible();
        const searchInputText = await this.locators.searchInput.getAttribute('placeholder');
        await expect(searchInputText).toBe('Пошук оголошень або послуг');
    }
}

export default ProductsPage;
