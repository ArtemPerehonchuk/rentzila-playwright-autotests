import { Page as PlaywrightPage, expect, Locator } from '@playwright/test';
import Page from './page';
import { faker } from '@faker-js/faker';
import testData from '../data/test_data.json' assert {type: 'json'};

const incorrectPrices = Object.values(testData['incorrect prices']);
const addPriceOptions = testData['add price options'];
const hoursDropDownItems = ['8 год', '4 год'];


class PricesTab extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
        } 
    
    paymentMethodTitle = this.page.locator('[class*="PricesUnitFlow_paragraph"]').first();
    paymentMethodDropDown = this.page.locator('div[data-testid="div_CustomSelect"]');
    paymentMethodDropDownOptions = this.page.locator('[data-testid="item-customSelect"]');
    priceOfMinOrderTitle = this.page.locator('[class*="PricesUnitFlow_paragraph"]').nth(1);
    priceOfMinOrderInput = this.page.locator('[class*="RowUnitPrice_priceInput"]');
    priceOfMinOrderInputContainer = this.page.locator('[data-testid="input_wrapper_RowUnitPrice"]').first();
    currencyField = this.page.locator('[class*="RowUnitPrice_currencyWrapper"] > input');
    servicePriseTitle = this.page.locator('[data-testid="div_servicePrices_PricesUnitFlow"]');
    servicePriceClue = this.page.locator('[class*="PricesUnitFlow_description"]');
    addPriceBtn = this.page.locator('[data-testid="addPriceButton_ServicePrice"]');
    addBtnIcon = this.page.locator('[data-testid="addPriceButton_ServicePrice"] > svg');
    addPriceInput = this.page.locator('[data-testid="priceInput_RowUnitPrice"]').nth(2);
    addPriceCurrency = this.page.locator('[data-testid="priceInput_RowUnitPrice"]').nth(3);
    selectAddPriceOptionDropDown = this.page.locator('[data-testid="div_CustomSelect"]').nth(1);
    selectAddPriceOptionDropDownArrow = this.page.locator('[data-testid="arrowImage"]').nth(1);
    addPriceDropDownOptions = this.page.locator('li[class*="CustomSelect_option"]');
    hoursDropDown = this.page.locator('[class*="RowUnitPrice_selectTiming"] > [class*="CustomSelect_select"]').nth(1);
    hoursDropDownArrow = this.page.locator('[data-testid="arrowImage"]').nth(2);
    hoursDropDownOptions = this.page.locator('[data-testid="listItems-customSelect"] > [data-testid="item-customSelect"]');
    removePriceBtn = this.page.locator('[data-testid="div_removePrice_RowUnitPrice"]');
    additionalServicePriceSection = this.page.locator('[class*="RowUnitPrice_wrapper"]').nth(1);
    prevBtn = this.page.locator('[data-testid="prevButton"]');
    priceOfMinOrderInputError = this.page.locator('[class*="RowUnitPrice_error"]');
    serviceInAddPriceSection = this.page.locator('[class*="ServicePrice_service"] > span')

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

        await this.copyPasteValue(this.priceOfMinOrderInput);

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

            await this.copyPasteValue(this.priceOfMinOrderInput)

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

        await this.copyPasteValue(this.priceOfMinOrderInput);

        currentInputValue = await this.priceOfMinOrderInput.inputValue();

        await expect(currentInputValue.length).toBe(9);
        await expect(currentInputValue).toBe(nineDigitNumber);
    }

    async copyPasteValue(inputLocator: Locator) {
        await inputLocator.waitFor({ state: 'visible' });
        await inputLocator.click();
        await this.page.keyboard.press('Meta+A');
        await this.page.keyboard.press('Meta+C');
        await inputLocator.clear();
        await inputLocator.click();
        await this.page.keyboard.press('Meta+V');
    }

    async verifyCurrencyField(expectedText: string) {
        const currentText = await this.currencyField.inputValue();
        await expect(this.currencyField).toBeVisible();
        await expect(currentText).toBe(expectedText);
    }

    async checkServicePriceSection(expectedTitleText: string, expectedClueText: string) {
        const currentTitleText = await this.servicePriseTitle.innerText();
        const currentClueText = await this.servicePriceClue.innerText();

        await expect(this.servicePriseTitle).toBeVisible();
        await expect(currentTitleText).toContain(expectedTitleText);
        await expect(currentTitleText).toContain('*');
        await expect(currentClueText).toContain(expectedClueText);
    }

    async checkAddPriceBtn(expectedText: string) {
        const currentText = await this.addPriceBtn.innerText();
        await expect(currentText).toBe(expectedText);
        await expect(this.addBtnIcon).toBeVisible();
    }

    async clickOnAddPriceBtn() {
        await this.addPriceBtn.click();
    }

    async checkAddPriceBtnNotVisible() {
        await expect(this.addPriceBtn).not.toBeVisible();
    }

    async checkAddPriceSectionVisibility() {
        await expect(this.addPriceInput).toBeVisible();
        await expect(this.addPriceCurrency).toBeVisible();
        await expect(this.selectAddPriceOptionDropDown).toBeVisible();
    }

    async checkAddPriceInputWithTenNumbers() {
        const tenDigitNumber = (faker.number.int({ min: 1000000000, max: 9999999999 })).toString();
        await this.addPriceInput.fill(tenDigitNumber);
        let currentInputValue = await this.addPriceInput.inputValue();

        await expect(currentInputValue.length).toBe(9);
        await expect(currentInputValue).toBe(tenDigitNumber.slice(0, tenDigitNumber.length -1));

        await this.copyPasteValue(this.addPriceInput);

        currentInputValue = await this.addPriceInput.inputValue();

        await expect(currentInputValue.length).toBe(9);
        await expect(currentInputValue).toBe(tenDigitNumber.slice(0, tenDigitNumber.length -1));
    }

    async checkAddPriceInputWithIncorrectPrices() {
        for(const incorrectPrice of incorrectPrices) {
            await this.addPriceInput.clear();
            await this.addPriceInput.fill(incorrectPrice);
            const inputValue = await this.addPriceInput.inputValue();

            if(incorrectPrice.includes('1')) {
                await expect(inputValue).toBe(incorrectPrice.split(' ').join(''));
            }else {
                await expect(inputValue).toBe('');
            }

            await this.copyPasteValue(this.addPriceInput)

            if(incorrectPrice.includes('1')) {
                await expect(inputValue).toBe(incorrectPrice.split(' ').join(''));
            }else {
                await expect(inputValue).toBe('');
            }
        }
    }

    async checkAddPriceInputWithNineNumbers() {
        const nineDigitNumber = (faker.number.int({ min: 100000000, max: 999999999 })).toString();
        await this.addPriceInput.fill(nineDigitNumber);
        let currentInputValue = await this.addPriceInput.inputValue();

        await expect(currentInputValue.length).toBe(9);
        await expect(currentInputValue).toBe(nineDigitNumber);

        await this.copyPasteValue(this.addPriceInput);

        currentInputValue = await this.addPriceInput.inputValue();

        await expect(currentInputValue.length).toBe(9);
        await expect(currentInputValue).toBe(nineDigitNumber);
    }

    async checkAddPriceInputBgText(expectedText: string) {
       const currentText =  await this.addPriceInput.getAttribute('placeholder');
       await expect(currentText).toBe(expectedText);
    }

    async checkAddPriceCurrencyInput(expectedBgText: string) {
        const currentBgText = await this.addPriceCurrency.inputValue();
        await expect(this.addPriceCurrency).toBeVisible();
        await expect(currentBgText).toBe(expectedBgText);
    }

    async checkSelectAddPriceOptionDropDown(expectedBgText: string) {
        const currentBgText = await this.selectAddPriceOptionDropDown.innerText();
        await expect(this.selectAddPriceOptionDropDown).toBeVisible();
        await expect(currentBgText).toBe(expectedBgText);
        await expect(this.selectAddPriceOptionDropDownArrow).toBeVisible();
    }

    async checkOptionSelectionInAddPriceDropDown() {
        const count = await this.addPriceDropDownOptions.count();
        for(let i = 0; i < count; i++) {
            await this.selectAddPriceOptionDropDown.click();
            await this.page.waitForLoadState('networkidle');
            const currentOptionText = await this.addPriceDropDownOptions.nth(i).innerText();
            await this.addPriceDropDownOptions.nth(i).click();
            if(currentOptionText === 'Зміна') {
                let hoursDropDownBgText = await this.hoursDropDown.innerText();
                await expect(this.hoursDropDown).toBeVisible();
                await expect(hoursDropDownBgText).toBe('8');
                await expect(this.hoursDropDownArrow).toBeVisible();
    
                for(let i = 0; i < hoursDropDownItems.length; i++) {
                    await this.hoursDropDown.click();

                    const hoursDropDownOptionText = await this.hoursDropDownOptions.nth(i).innerText();

                    await expect(hoursDropDownItems).toContain(hoursDropDownOptionText);
                    await this.hoursDropDownOptions.nth(i).click();
                    hoursDropDownBgText = await this.hoursDropDown.innerText();
                    await expect(hoursDropDownBgText).toBe(hoursDropDownOptionText);
                }
                
            }
            await expect(addPriceOptions).toContain(currentOptionText);
            const currentAddPriceDropDownBgText = await this.addPriceDropDownOptions.innerText();
            await expect(currentAddPriceDropDownBgText).toBe(currentOptionText);
        }
    }

    async clickOnRemovePriceBtn() {
        await this.removePriceBtn.click();
    }

    async checkServicePriceSectionNotVisible() {
        await expect(this.additionalServicePriceSection).not.toBeVisible();
    }

    async checkPrevBtnText(expectedText: string) {
        const currentText = await this.prevBtn.innerText();
        await expect(currentText).toBe(expectedText);
    }
    
    async clickOnPrevBtn() {
        await this.prevBtn.click();
    }

    async checkPriceOfMinOrderInputError(expectedText: string) {
        const currentText = await this.priceOfMinOrderInputError.innerText();
        const borderColor = await this.priceOfMinOrderInputContainer.evaluate((el: any) => window.getComputedStyle(el).borderColor)
        await expect(this.priceOfMinOrderInputError).toBeVisible();
        await expect(currentText).toBe(expectedText);
        await expect(borderColor).toBe('rgb(247, 56, 89)');
    }

    async fillPriceOfMinOrderInput(value: string) {
        await this.priceOfMinOrderInput.fill(value);
    }

    async checkValueInPriceOfMinOrderInput(expectedValue: string) {
        const currentValue = await this.priceOfMinOrderInput.inputValue();
        await expect(currentValue).toBe(expectedValue);
    }

    async clearPriceOfMinOrderInput() {
        await this.priceOfMinOrderInput.clear();
    }

    async checkPriceOfMinOrderInpuErrorNotVisible() {
        await expect(this.priceOfMinOrderInputContainer).toHaveCSS('border-color', 'rgb(229, 229, 229)')
        await expect(this.priceOfMinOrderInputError).not.toBeVisible();
    }

    async getServiceFromAddPriceSection() {
        const service = await this.serviceInAddPriceSection.innerText();
        return service;
    }

    async checkRemovePriceBtnIsVisible() {
        await expect(this.removePriceBtn).toBeVisible();
    }
}

export default PricesTab;
