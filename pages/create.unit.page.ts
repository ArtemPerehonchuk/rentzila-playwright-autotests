import { Page as PlaywrightPage, Locator, expect } from '@playwright/test';
import Page from './page';
import categoryNames from '../data/category_names.json' assert { type: 'json' };
import { faker } from '@faker-js/faker';

class CreateUnitPage extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
        }
    
        createUnitTitle = this.page.locator('div[class*="CreateEditFlowLayout_title"]');
        createUnitTabs = this.page.getByRole('tab');
        createUnitTabsText = this.page.locator('div[class*="CustomLabel_label"] > span[class*="CustomLabel_labelTitle__O2bFl"]');
        tabNumber = this.page.locator('[data-testid="labelNumber"]');
        categoriesDropDown = this.page.locator('[data-testid="buttonDiv"]');
        nextBtn = this.page.locator('[data-testid="nextButton"]');
        categoryErrorMessage = this.page.locator('[class*="CategorySelect_errorTextVisible"]');
        categoriesPopUp = this.page.locator('div[data-testid="categoryPopupWrapper"]');
        categoriesPopUpCloseBtn = this.page.locator('[data-testid="closeIcon"]');
        categoriesDropDownArrowDown = this.page.locator('div[data-testid="buttonDiv"]>div  img[alt="Arrow-down"]');
        categoriesTitle = this.page.locator('div[class*="CategorySelect_title"]');
        announcementNameTitle = this.page.locator('div[class*="CustomInput_title"]').first();
        announcementNameInput = this.page.locator('input[data-testid="custom-input"]').first();
        announcementNameInputError = this.page.locator('[data-testid="descriptionError"]').first();
        vehicleManufacturerTitle = this.page.locator('div[class*="SelectManufacturer_title"]');
        vehicleManufacturerInputContainer = this.page.locator('div[class*="CustomSelectWithSearch_searchInput"]');
        vehicleManufacturerInput = this.page.locator('input[data-testid="input-customSelectWithSearch"]');
        vehicleManufacturerInputError = this.page.locator('div[class*="CustomSelectWithSearch_errorTextVisible"]');
        vehicleManufacturerInputSearchIcon = this.page.locator('div[class*="CustomSelectWithSearch_searchInput"] > svg');
        vehicleManifacturerDropDown = this.page.locator('div[class*="CustomSelectWithSearch_searchedServicesCat_wrapper"]');
        vehicleManufacturerDropDownOption = this.page.locator('div[class*="CustomSelectWithSearch_flexForServices"]');
        optionNotFoundMessage = this.page.locator('[data-testid="p2-notFound-addNewItem"]');
        selectedOptionInDropdown = this.page.locator('[class*="CustomSelectWithSearch_serviceText"]');
        clearVehicleManifacturerDropDownIcon = this.page.locator('button[class*="CustomSelectWithSearch_serviceBtn"]');
        modelNameTitle = this.page.locator('div[class*="CustomInput_title"]').getByText('Назва моделі');
        modelNameInput = this.page.locator('input[data-testid="custom-input"]').nth(1);
        modelNameInputError = this.page.locator('[data-testid="descriptionError"]');
        technicalInfoTitle = this.page.locator('div[class*="CustomTextAriaDescription_title"]').first();
        technicalInfoInput = this.page.locator('[data-testid="textarea-customTextAriaDescription"]').first();
        descriptionInfoTitle = this.page.locator('div[class*="CustomTextAriaDescription_title"]').nth(1);
        descriptionInfoInput = this.page.locator('[data-testid="textarea-customTextAriaDescription"]').nth(1);
        addressSelectionTitle = this.page.locator('[class*="AddressSelectionBlock_title"]');
        addressSelectionInput = this.page.locator('[data-testid="mapLabel"]');
        addressSelectionInputError = this.page.locator('[class*="AddressSelectionBlock_errorTextVisible"]');
        selectOnMapBtn = this.page.locator('[class*="AddressSelectionBlock_locationBtn"]');
        mapPopUp = this.page.locator('[data-testid="div-mapPopup"]');
        mapPopUpTitle = this.page.locator('[class*="MapPopup_title"]');
        mapPopUpCloseBtn = this.page.locator('[class*="MapPopup_title"]');
        addressLine = this.page.locator('[data-testid="address"]');
        mapPopUpSubmitBtn = this.page.locator('[class*="ItemButtons_darkBlueBtn"]');
        mapContainer = this.page.locator('#map');
        cancelBtn = this.page.locator('[data-testid="prevButton"]');

    async checkCreateUnitTitle(expectedTitle: string) {
        await expect(this.createUnitTitle).toBeVisible();
        const createUnitTitleText = await this.createUnitTitle.innerText();
        await expect(createUnitTitleText).toBe(expectedTitle);
    }

    async checkCreateUnitTabsTitles(activeTabNumber: number) {
        const tabNames = await this.createUnitTabsText.allInnerTexts();
        let activeTabIndex = activeTabNumber - 1;
        for (let i = 0; i < tabNames.length; i++) {
            await expect(this.createUnitTabs.nth(i)).toBeVisible();
            await expect(await this.createUnitTabsText.nth(i).innerText()).toBe(tabNames[i]);
            await expect(await this.tabNumber.nth(i).innerText()).toBe(String(i + 1));

            let tabAttr = await this.createUnitTabs.nth(i).getAttribute('aria-selected');

            if(i === activeTabIndex) {
                await expect(tabAttr).toBe('true');
            }else {
                await expect(tabAttr).toBe('false');
            }
        }
    }

    async checkTabsFields() {
        const tabNames = await this.createUnitTabsText.allInnerTexts();

        for(let i = 0; i < tabNames.length; i++) {
            await this.createUnitTabs.nth(i).click();
            if(tabNames[i] === 'Основна інформація') {
                const characteristicsTitle  = this.page.locator('div[class*="Characteristics_title"]');
                const announcementsNameInput = this.page.locator('[data-testid="custom-input"]').first();
                const vehicleManufacturerList = this.page.locator('[data-testid="input-customSelectWithSearch"]');
                const modelNameInput = this.page.locator('[data-testid="custom-input"]').nth(1);
                const descriptionInputs = this.page.locator('[data-testid="textarea-customTextAriaDescription"]');
                const mapLabel = this.page.locator('[data-testid="mapLabel"]');

                await expect(characteristicsTitle).toBeVisible();
                await expect(this.categoriesDropDown).toBeVisible();
                await expect(announcementsNameInput).toBeVisible();
                await expect(vehicleManufacturerList).toBeVisible();
                await expect(modelNameInput).toBeVisible();
                await expect(descriptionInputs.first()).toBeVisible();
                await expect(descriptionInputs.nth(1)).toBeVisible();
                await expect(mapLabel).toBeVisible();
            }
            else if(tabNames[i] === 'Фотографії') {
                const photoTitle  = this.page.locator('div[class*="ImagesUnitFlow_title"]');
                const imageContainer = this.page.locator('div[class*="ImagesUnitFlow_imageContainer"]');

                await expect(photoTitle).toBeVisible();
                await expect(imageContainer).toBeVisible();
            }
            else if(tabNames[i] === 'Послуги') {
                const customServicesTitle  = this.page.locator('div[class*="ServicesUnitFlow_title"]');
                const customServicesSearchInput = this.page.locator('div[class*="ServicesUnitFlow_searchInput"]');

                await expect(customServicesTitle).toBeVisible();
                await expect(customServicesSearchInput).toBeVisible();
            }
            else if(tabNames[i] === 'Вартість') {
                const customPricesTitle  = this.page.locator('div[class*="PricesUnitFlow_title"]');
                const paymentTypeSelect = this.page.locator('div[data-testid="div_CustomSelect"]');
                const customUnitPrice = this.page.locator('div[data-testid="input_wrapper_RowUnitPrice"]').first();

                await expect(customPricesTitle).toBeVisible();
                await expect(paymentTypeSelect).toBeVisible();
                await expect(customUnitPrice).toBeVisible();
            }
            else if(tabNames[i] === 'Контакти') {
                const contactsTitle  = this.page.locator('div[class*="AuthContactCard_title"]');
                const contactsCard = this.page.locator('div[class*="AuthContactCard_infoWrapper"]');

                await expect(contactsTitle).toBeVisible();
                await expect(contactsCard).toBeVisible();
            }
        }
    }

    async checkSection(sectionTitleLocator: Locator, sectionInputLocator: Locator, expectedTitleText: string, expectedInputBgText?: string, hasAsterisk?: boolean) {
        await this.page.waitForLoadState('domcontentloaded');
        await expect(sectionInputLocator).toBeVisible();
    
        const tagName = await sectionInputLocator.evaluate((element) => element.tagName.toLowerCase());

        let sectionBgText;
    
        if(tagName === 'div') {
            sectionBgText = await sectionInputLocator.innerText();
            await expect(this.categoriesDropDownArrowDown).toBeVisible();
        } else if(tagName === 'input') {
            sectionBgText = await sectionInputLocator.getAttribute('placeholder'); 
        } else if(sectionInputLocator === this.vehicleManufacturerInput) {
            await expect(this.vehicleManufacturerInputSearchIcon).toBeVisible()
        }

        const sectionTitleText = await sectionTitleLocator.innerText();

        if (hasAsterisk) {
            await expect(sectionTitleText).toContain(expectedTitleText);
            await expect(sectionTitleText).toContain('*');
        } else {
            await expect(sectionTitleText).toContain(expectedTitleText);
        }
        if (sectionBgText !== undefined && sectionBgText !== null) {
            await expect(sectionBgText).toContain(expectedInputBgText);
        } 
    }

    async clickOnNextBtn() {
        await this.nextBtn.click();
        await this.page.waitForTimeout(500);
    }

    async fillSectionInput(sectionInputLocator: Locator, value: string) {
        await this.clearSectionInput(sectionInputLocator);
        await sectionInputLocator.fill(value);
    }

    async clearSectionInput(sectionInputLocator: Locator) {
        await sectionInputLocator.clear();
    }

    async copyPasteValueInSectionInput(sectionInputLocator: Locator, value: string) {
        await this.clearSectionInput(sectionInputLocator);
        await sectionInputLocator.fill(value);

        const copiedValue = await sectionInputLocator.inputValue();

        await this.clearSectionInput(sectionInputLocator);
        await sectionInputLocator.fill(copiedValue);
    }

    async checkSectionError(sectionInputLocator: Locator, errorMessageLocator: Locator, expectedErrorText: string) {
        const isVisible = await errorMessageLocator.isVisible();
    
        if (isVisible) {
            const borderColor = await sectionInputLocator.evaluate((el: any) => window.getComputedStyle(el).borderColor);
            const errorMessageText = await errorMessageLocator.innerText();

            if (sectionInputLocator === this.vehicleManufacturerInputContainer) {
                await expect(borderColor).toBe('rgb(40, 49, 73)');
            } else {
                await expect(borderColor).toBe('rgb(247, 56, 89)');
            }
    
            await expect(errorMessageText).toBe(expectedErrorText);
            return true;
        }
    
        return false;
    }

    async checkSectionInputContent(sectionInputLocator: Locator, value: string) {
        const tagName = await sectionInputLocator.evaluate((element) => element.tagName.toLowerCase());
        if(tagName === 'input') {
            const currentInputValue = await sectionInputLocator.inputValue();
            await expect(currentInputValue).toBe(value);
        }
        const currentInputValue = await sectionInputLocator.innerText();
        await expect(currentInputValue).toBe(value);
    }

    async clickOnCategoriesDropDown() {
        await this.categoriesDropDown.click();
    }

    async checkCategoriesPopUp(titleText: string) {
        const categoriesPopUpTitle = this.page.locator('div[class*="CategoryPopup_title"]');

        const categoriesPopUpTitleText = await categoriesPopUpTitle.innerText();

        await this.checkCategoriesPopUpVisibility(true);
        await expect(categoriesPopUpTitle).toBeVisible();
        await expect(categoriesPopUpTitleText).toBe(titleText);
    }

    async clickOnCategoriesPopUpCloseBtn() {
        await this.categoriesPopUpCloseBtn.click();
    }

    async checkCategoriesPopUpVisibility(visibility: boolean) {
        if (visibility) {
            await expect(this.categoriesPopUp).toBeVisible();
        } else {
            await expect(this.categoriesPopUp).not.toBeVisible();
        }
    }

    async clickOutsidePopup() {
        await this.page.waitForSelector('[class*="NavbarCatalog_wrapper"]', { state: 'visible' });
        await this.page.click('[class*="NavbarCatalog_wrapper"]', { force: true });
    }

    async checkOptionsInCategoriesPopUp() {
        const firstCategoryItems = await this.page.locator('[data-testid="firstCategoryLabel"]');
        const firstCategoryItemsNames = await firstCategoryItems.allInnerTexts();
        const validFirstCategoryItemsNames = categoryNames.firstCategoryNames;

        for(let i = 0; i < firstCategoryItemsNames.length; i++ ) {
            await expect(validFirstCategoryItemsNames[i]).toContain(firstCategoryItemsNames[i]);

            await firstCategoryItems.nth(i).click();
            await this.page.waitForLoadState('domcontentloaded');

            const secondCategoryItems = await this.page.locator('[class*="SecondCategory_check_label"]');
            const secondCategoryItemsNames = await secondCategoryItems.allInnerTexts();
            const validSecondCategoryNames = categoryNames.secondCategoryNames;

            for(let j = 0; j < secondCategoryItemsNames.length; j++) {
                await expect(validSecondCategoryNames).toContain(secondCategoryItemsNames[j]);

                await secondCategoryItems.nth(j).click();
                await this.page.waitForLoadState('domcontentloaded');

                const thirdCategoryItems = await this.page.locator('[data-testid="thirdCategoryLabel"]');
                const thirdCategoryItemsNames = await thirdCategoryItems.allInnerTexts();
                const validThirdCategoryNames = categoryNames.thirdCategoryNames;

                for(let k = 0; k < thirdCategoryItemsNames.length; k++) {
                    await expect(validThirdCategoryNames).toContain(thirdCategoryItemsNames[k]);
                    await expect(thirdCategoryItems.nth(k)).toBeEnabled();

                    await thirdCategoryItems.nth(k).click({force: true});
                    await this.page.waitForLoadState('domcontentloaded');

                    await expect(this.categoriesDropDown).toBeEnabled();

                    const categoriesDropDownValue = await this.categoriesDropDown.innerText();

                    await expect(categoriesDropDownValue.toLowerCase()).toBe(thirdCategoryItemsNames[k].toLowerCase());

                    await this.clickOnCategoriesDropDown();
                }
            }
        }
    }

    async checkAnnouncementNameInput(input: string, error: string, specialChars: boolean = false, correctInput: boolean = false) {
        if(specialChars) {
            await this.fillSectionInput(this.announcementNameInput, input);
            await this.checkSectionInputContent(this.announcementNameInput, error);
            await this.copyPasteValueInSectionInput(this.announcementNameInput, input);
            await this.checkSectionInputContent(this.announcementNameInput, error);
        }else if(correctInput) {
            await this.fillSectionInput(this.announcementNameInput, input);
            await this.clickOnNextBtn();
            await expect(await this.checkSectionError(
                this.announcementNameInput,
                this.announcementNameInputError,
                error
            )).toBe(false);
            await this.copyPasteValueInSectionInput(this.announcementNameInput, input);
            await this.clickOnNextBtn();
            await expect(await this.checkSectionError(
                this.announcementNameInput,
                this.announcementNameInputError,
                error
            )).toBe(false);
        }else {
            await this.fillSectionInput(this.announcementNameInput, input);
            await expect(await this.checkSectionError(
                this.announcementNameInput,
                this.announcementNameInputError,
                error
            )).toBe(true);
            await this.copyPasteValueInSectionInput(this.announcementNameInput, input);
            await expect(await this.checkSectionError(
                this.announcementNameInput,
                this.announcementNameInputError,
                error
            )).toBe(true);
        }
    }

    async checkVehicleManufacturerDropDownIsVisible(isVisible: boolean) {
        if (isVisible) {
            await expect(this.vehicleManifacturerDropDown).toBeVisible();
        } else {
            await expect(this.vehicleManifacturerDropDown).not.toBeVisible();
        }
    }

    async checkVehicleManufacturerDropDownOption(value: string) {
        const dropDownOptionText = await this.vehicleManufacturerDropDownOption.innerText();
        const dropDownInputText = await this.vehicleManufacturerInput.inputValue();
        await expect(this.vehicleManufacturerDropDownOption).toBeVisible();
        await expect(dropDownOptionText).toBe(value);
        await expect(dropDownInputText).toBe(value);
    }

    async checkOptionNotFoundMessage(value: string) {
        const messageText = await this.optionNotFoundMessage.innerText();
        const inputValue = await this.vehicleManufacturerInput.inputValue();
        const symbolCount = inputValue.length;
        const valueLength = value.length;

        if(valueLength > 100) {
            await expect(symbolCount.toString()).toBe('100');
            const valueWithoutLastChar = value.slice(0, -1);
            await expect(messageText.toLowerCase()).toContain(valueWithoutLastChar.toLowerCase());
        }else {
            await expect(this.optionNotFoundMessage).toBeVisible();
            await expect(messageText).toContain(value);
            await this.optionNotFoundMessage.click();
            await this.checkUrl(`${process.env.HOMEPAGE_URL}create-unit/`);
            await expect(symbolCount).toBe(valueLength);
        }
    }

    async checkVehicalManufacturerInput(input: string) {
        await this.fillSectionInput(this.vehicleManufacturerInput, input);

        if(input.length > 100) {
            await this.checkOptionNotFoundMessage(input);
        }
        else if(input === 'АТЭК') {
            await this.checkVehicleManufacturerDropDownOption(input);
        }
        else if(input.length === 1 && input !== ' ') {
            await this.checkVehicleManufacturerDropDownIsVisible(true);
            await this.copyPasteValueInSectionInput(this.vehicleManufacturerInput, input);
            await this.checkVehicleManufacturerDropDownIsVisible(true);

            await this.checkOptionIsSelected();
            await this.clickOnClearIcon();
            await this.checkInputIsCleared();
        }
        else if(input === '123456789'){
            await this.checkOptionNotFoundMessage('123456789');
            await this.copyPasteValueInSectionInput(this.vehicleManufacturerInput, input);
            await this.checkOptionNotFoundMessage('123456789');
        } 
        else {
            await this.checkSectionInputContent(this.vehicleManufacturerInput, '');
        }
    }

    async checkOptionIsSelected() {
        const optionValue = await this.vehicleManufacturerDropDownOption.first().innerText();
        await this.vehicleManufacturerDropDownOption.first().click();
        const dropDownValue = await this.selectedOptionInDropdown.innerText();
        await expect(dropDownValue).toBe(optionValue)
    }

    async clickOnClearIcon() {
        await this.clearVehicleManifacturerDropDownIcon.click({force: true});
    }
    
    async checkInputIsCleared() {
        const inputValue = await this.vehicleManufacturerInput.inputValue();
        await expect(inputValue).toBe('');
    }

    async checkModelNameInput(input: string) {
        if(input.length > 15) {
            await this.fillSectionInput(this.modelNameInput, input);
            await expect(await this.checkSectionError(
                this.modelNameInput, 
                this.modelNameInputError, 
                'У назві моделі може бути не більше 15 символів')).toBe(true);
            await this.copyPasteValueInSectionInput(this.modelNameInput, input);
            await expect(await this.checkSectionError(
                this.modelNameInput, 
                this.modelNameInputError, 
                'У назві моделі може бути не більше 15 символів')).toBe(true);
        }else if(input.length <= 15 && input.length !== 0) {
            await this.fillSectionInput(this.modelNameInput, input);
            await expect(await this.checkSectionError(
                this.modelNameInput, 
                this.modelNameInputError, 
                '')).toBe(false)
        }
        else {
            await this.fillSectionInput(this.modelNameInput, input);
            await this.checkSectionInputContent(this.modelNameInput, '')
            await this.copyPasteValueInSectionInput(this.modelNameInput, input);
            await this.checkSectionInputContent(this.modelNameInput, '')
        }
    }

    async checkSectionInputIsClickable(sectionInputLocator: Locator) {
        await expect(await sectionInputLocator.isEnabled()).toBe(true);
    }

    async checkSectionInfoInput(sectionInfoInputLocator: Locator, input: string) {
        if(input = '<>{};^') {
            await this.fillSectionInput(sectionInfoInputLocator, input);
            await this.checkSectionInputContent(sectionInfoInputLocator, '');
            await this.copyPasteValueInSectionInput(sectionInfoInputLocator, '')
        }else if(input.length > 9000) {
            await this.fillSectionInput(sectionInfoInputLocator, input);

            const valueWithoutLastChar = input.slice(0, -1);
            const inputValue = await sectionInfoInputLocator.inputValue();

            await expect(inputValue.toLowerCase()).toBe(valueWithoutLastChar.toLowerCase())
        }
    }

    async clickOnSelectOnMapBtn() {
        await this.selectOnMapBtn.click();
    }

    async checkMapPopUpIsVisible() {
        await expect(this.mapPopUp).toBeVisible();
    }

    async checkMapPopUp(titleText: string, addressText: string) {
        const mapPopUpTitleText = await this.mapPopUpTitle.innerText();

        await this.page.waitForTimeout(1000);

        const addressLineText = await this.addressLine.innerText();

        await expect(mapPopUpTitleText).toBe(titleText);
        await expect(this.mapPopUpCloseBtn).toBeVisible();
        await expect(addressLineText).toBe(addressText);
    }

    async clickOnMapPopUpCloseBtn() {
        await this.mapPopUpCloseBtn.click();
    }
    async clickOnMapPopUpSubmitBtn() {
        await this.mapPopUpSubmitBtn.click({force: true});
    }

    async clickOnMapAndGetAddress() {
        const mapContainerSize = await this.mapContainer.boundingBox();
        if (mapContainerSize) {
            const randomX = mapContainerSize.x + Math.random() * mapContainerSize.width;
            const randomY = mapContainerSize.y + Math.random() * mapContainerSize.height;
    
            await this.page.mouse.click(randomX, randomY);
            const address = await this.addressLine.innerText();
            return address
        }
        return '';
    }

    async checkCancelBtnText(expectedText: string) {
        const btnText = await this.cancelBtn.innerText();
        await expect(btnText).toBe(expectedText);
    }

    async clickOnCancelBtn() {
        await this.cancelBtn.click();
    }
    
    async acceptAlert() {
        await this.page.on('dialog', async(dialog) => {
            await dialog.accept();
        })
        await this.page.waitForLoadState('domcontentloaded');
    }

    async checkNextBtnText(expectedText: string) {
        const nextBtnText = await this.nextBtn.innerText();
        await expect(nextBtnText).toBe(expectedText)
    }
    async checkNotificationsAppear() {
        await expect(this.categoryErrorMessage).toBeVisible();
        await expect(this.announcementNameInputError).toBeVisible();
        await expect(this.vehicleManufacturerInputError).toBeVisible();
        await expect(this.addressSelectionInputError).toBeVisible();
    }

    async fillCategory() {
        const firstCategoryItem = await this.page.locator('[data-testid="firstCategoryLabel"]').first();
        const secondCategoryItem = await this.page.locator('[class*="SecondCategory_check_label"]').first();
        const thirdCategoryItem = await this.page.locator('[data-testid="thirdCategoryLabel"]').first();

        await this.categoriesDropDown.click();
        await firstCategoryItem.click();
        await secondCategoryItem.click();
        await thirdCategoryItem.click();
    }

    async fillAnnouncementName() {
        const inputValue = faker.lorem.sentence()
        await this.announcementNameInput.fill(inputValue);
    }

    async fillVehicleManufacturer() {
        const inputValue = faker.string.alpha({length: 1});

        await this.vehicleManufacturerInput.fill(inputValue);
        await this.vehicleManufacturerDropDownOption.first().click();
    }

    async fillAddress() {
        await this.selectOnMapBtn.click();
        await this.clickOnMapAndGetAddress();
        await this.clickOnMapPopUpSubmitBtn();
    }


}

export default CreateUnitPage;