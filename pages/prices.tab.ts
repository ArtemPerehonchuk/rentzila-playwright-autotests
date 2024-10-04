import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';
import { faker } from '@faker-js/faker';
import testData from '../data/test_data.json' assert {type: 'json'};

const incorrectPrices = Object.values(testData['incorrect prices']);


class PricesTab extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
        } 
    
    paymentMethodTitle = this.page.locator('[class*="PricesUnitFlow_paragraph"]').first();
    paymentMethodDropDown = this.page.locator('div[data-testid="div_CustomSelect"]');
    paymentMethodDropDownOptions = this.page.locator('[data-testid="item-customSelect"]');
    priceOfMinOrderTitle = this.page.locator('[class*="PricesUnitFlow_paragraph"]').nth(1);
    priceOfMinOrderInput = this.page.locator('[class*="RowUnitPrice_priceInput"]');
    currencyField = this.page.locator('[class*="RowUnitPrice_currencyWrapper"] > input');

    async checkPaymentMethodSection(expectedTitleText: string, expectedDropDownBgText: string) {
        const currentTitleText = await this.paymentMethodTitle.innerText();
        const currentDropDownBgText = await this.paymentMethodDropDown.innerText();

        await expect(this.paymentMethodTitle.first()).toBeVisible();
        await expect(currentTitleText).toContain(expectedTitleText);
        await expect(currentTitleText).toContain('*');
        await expect(currentDropDownBgText).toBe(expectedDropDownBgText);
    }

    async clickOnPaymentMethodDropDown() {
        await this.paymentMethodDropDown.click();
    }

    async checkPaymentMethodDropDownOptions(firstOption: string, secondOption: string, thirdOption: string) {
        await expect(await this.paymentMethodDropDownOptions.first().innerText()).toBe(firstOption);
        await expect(await this.paymentMethodDropDownOptions.nth(1).innerText()).toBe(secondOption);
        await expect(await this.paymentMethodDropDownOptions.nth(2).innerText()).toBe(thirdOption);
    }

    async checkPaymentMethodOptionSelection() {
        const paymentMethodOptions = await this.paymentMethodDropDownOptions.all();
        for(let i = paymentMethodOptions.length -1; i >= 0; i--) {
            let paymentOptionText = await paymentMethodOptions[i].innerText();
            await paymentMethodOptions[i].click();
            let displayedText = await this.paymentMethodDropDown.innerText();
            await expect(displayedText).toBe(paymentOptionText);
            await this.paymentMethodDropDown.click()
        }
    }

    async checkPriceOfMinOrderSection(expectedTitleText: string, expectedInputBgText: string) {
        const currentTitleText = await this.priceOfMinOrderTitle.innerText();
        const currentInputBgText = await this.priceOfMinOrderInput.getAttribute('placeholder');

        await expect(this.priceOfMinOrderTitle).toBeVisible();
        await expect(currentTitleText).toContain(expectedTitleText);
        await expect(currentTitleText).toContain('*');
        await expect(currentInputBgText).toBe(expectedInputBgText);
    }

    async checkPriceOfMinOrderInputWithTenNumbers() {
        const tenDigitNumber = (faker.number.int({ min: 1000000000, max: 9999999999 })).toString();
        await this.priceOfMinOrderInput.fill(tenDigitNumber);
        let currentInputValue = await this.priceOfMinOrderInput.inputValue();

        await expect(currentInputValue.length).toBe(9);
        await expect(currentInputValue).toBe(tenDigitNumber.slice(0, tenDigitNumber.length -1));

        await this.priceOfMinOrderInput.clear();
        await this.copyPasteValue(tenDigitNumber);

        currentInputValue = await this.priceOfMinOrderInput.inputValue();

        await expect(currentInputValue.length).toBe(9);
        await expect(currentInputValue).toBe(tenDigitNumber.slice(0, tenDigitNumber.length -1));
    }

    async checkPriceOfMinOrderWithIncorrectPrices() {
        for(const incorrectPrice of incorrectPrices) {
            await this.priceOfMinOrderInput.clear();
            await this.priceOfMinOrderInput.fill(incorrectPrice);
            const inputValue = await this.priceOfMinOrderInput.inputValue();

            if(incorrectPrice.includes('1')) {
                await expect(inputValue).toBe(incorrectPrice.split(' ').join(''));
            }else {
                await expect(inputValue).toBe('');
            }

            await this.copyPasteValue(incorrectPrice)

            if(incorrectPrice.includes('1')) {
                await expect(inputValue).toBe(incorrectPrice.split(' ').join(''));
            }else {
                await expect(inputValue).toBe('');
            }
        }
    }

    async checkPriceOfMinOrderInputWithNineNumbers() {
        const nineDigitNumber = (faker.number.int({ min: 100000000, max: 999999999 })).toString();
        await this.priceOfMinOrderInput.fill(nineDigitNumber);
        let currentInputValue = await this.priceOfMinOrderInput.inputValue();

        await expect(currentInputValue.length).toBe(9);
        await expect(currentInputValue).toBe(nineDigitNumber);

        await this.priceOfMinOrderInput.clear();
        await this.copyPasteValue(nineDigitNumber);

        currentInputValue = await this.priceOfMinOrderInput.inputValue();

        await expect(currentInputValue.length).toBe(9);
        await expect(currentInputValue).toBe(nineDigitNumber);
    }

    async copyPasteValue(value: string) {
        await this.page.evaluate((copiedValue) => {
            navigator.clipboard.writeText(copiedValue);
        }, value);
        await this.priceOfMinOrderInput.clear()
        await this.priceOfMinOrderInput.click();
        await this.page.keyboard.press('Meta+V');
    }

    async verifyCurrencyField(expectedText: string) {
        const currentText = await this.currencyField.inputValue();
        await expect(this.currencyField).toBeVisible();
        await expect(currentText).toBe(expectedText);
    }
}

export default PricesTab;
