import { Page as PlaywrightPage, Locator, expect } from '@playwright/test';
import Page from './page';
import categoryNames from '../data/category_names.json' assert { type: 'json' };
import { faker } from '@faker-js/faker';

class CreateUnitPage extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
        }
    
        getCreateUnitTitle(): Locator {return  this.page.locator('div[class*="CreateEditFlowLayout_title"]')};
        getCreateUnitTabs() {return  this.page.getByRole('tab')};
        getCreateUnitTabsText() {return  this.page.locator('div[class*="CustomLabel_label"] > span[class*="CustomLabel_labelTitle__O2bFl"]')};
        getTabNumber() {return  this.page.locator('[data-testid="labelNumber"]')};
        getMainInfoTitle() {return this.page.locator('div[class*="Characteristics_title"]')};
        getCategoriesDropDown() {return this.page.locator('[data-testid="buttonDiv"]')};
        getNextBtn() {return this.page.locator('[data-testid="nextButton"]')};
        getCategoryErrorMessage() {return this.page.locator('[class*="CategorySelect_errorTextVisible"]')};
        getCategoriesPopUp() {return this.page.locator('div[data-testid="categoryPopupWrapper"]')};
        getCategoriesPopUpCloseBtn() {return this.page.locator('[data-testid="closeIcon"]')};
        getCategoriesDropDownArrowDown() {return this.page.locator('div[data-testid="buttonDiv"]>div  img[alt="Arrow-down"]')};
        getCategoriesTitle() {return this.page.locator('div[class*="CategorySelect_title"]')};
        getAnnouncementNameTitle() {return this.page.locator('div[class*="CustomInput_title"]').first()};
        getAnnouncementNameInput() {return this.page.locator('input[data-testid="custom-input"]').first()};
        getAnnouncementNameInputError() {return this.page.locator('[data-testid="descriptionError"]').first()};
        getVehicleManufacturerTitle() {return this.page.locator('div[class*="SelectManufacturer_title"]')};
        getVehicleManufacturerInputContainer() {return this.page.locator('div[class*="CustomSelectWithSearch_searchInput"]')};
        getVehicleManufacturerInput() {return this.page.locator('input[data-testid="input-customSelectWithSearch"]')};
        getVehicleManufacturerInputError() {return this.page.locator('div[class*="CustomSelectWithSearch_errorTextVisible"]')};
        getVehicleManufacturerInputSearchIcon() {return this.page.locator('div[class*="CustomSelectWithSearch_searchInput"] > svg')};
        getVehicleManifacturerDropDown() {return this.page.locator('div[class*="CustomSelectWithSearch_searchedServicesCat_wrapper"]')};
        getVehicleManufacturerDropDownOption() {return this.page.locator('div[class*="CustomSelectWithSearch_flexForServices"]')};
        getOptionNotFoundMessage() {return this.page.locator('[data-testid="p2-notFound-addNewItem"]')};
        getSelectedOptionInDropdown() {return this.page.locator('[class*="CustomSelectWithSearch_serviceText"]')};
        getClearVehicleManifacturerDropDownIcon() {return this.page.locator('button[class*="CustomSelectWithSearch_serviceBtn"]')};
        getModelNameTitle() {return this.page.locator('div[class*="CustomInput_title"]').getByText('Назва моделі')};
        getModelNameInput() {return this.page.locator('input[data-testid="custom-input"]').nth(1)};
        getModelNameInputError() {return this.page.locator('[data-testid="descriptionError"]')};
        getTechnicalInfoTitle() {return this.page.locator('div[class*="CustomTextAriaDescription_title"]').first()};
        getTechnicalInfoInput() {return this.page.locator('[data-testid="textarea-customTextAriaDescription"]').first()};
        getDescriptionInfoTitle() {return this.page.locator('div[class*="CustomTextAriaDescription_title"]').nth(1)};
        getDescriptionInfoInput() {return this.page.locator('[data-testid="textarea-customTextAriaDescription"]').nth(1)};
        getAddressSelectionTitle() {return this.page.locator('[class*="AddressSelectionBlock_title"]')};
        getAddressSelectionInput() {return this.page.locator('[data-testid="mapLabel"]')};
        getAddressSelectionInputError() {return this.page.locator('[class*="AddressSelectionBlock_errorTextVisible"]')};
        getSelectOnMapBtn() {return this.page.locator('[class*="AddressSelectionBlock_locationBtn"]')};
        getMapPopUp() {return this.page.locator('[data-testid="div-mapPopup"]')};
        getMapPopUpTitle() {return this.page.locator('[class*="MapPopup_title"]')};
        getMapPopUpCloseBtn() {return this.page.locator('[class*="MapPopup_title"]')};
        getAddressLine() {return this.page.locator('[data-testid="address"]')};
        getMapPopUpSubmitBtn() {return this.page.locator('[class*="ItemButtons_darkBlueBtn"]')};
        getMapContainer() {return this.page.locator('#map')};
        getCancelBtn() {return this.page.locator('[data-testid="prevButton"]')};

    async checkCreateUnitTitle(expectedTitle: string) {
        await expect(await this.getCreateUnitTitle()).toBeVisible();
        const createUnitTitleText = await this.getCreateUnitTitle().innerText();
        await expect(createUnitTitleText).toBe(expectedTitle);
    }

    async checkCreateUnitTabsTitles(activeTabNumber: number) {
        const tabNames = await this.getCreateUnitTabsText().allInnerTexts();
        let activeTabIndex = activeTabNumber - 1;
        for (let i = 0; i < tabNames.length; i++) {

            await expect(await this.getCreateUnitTabs().nth(i)).toBeVisible();
            await expect(await this.getCreateUnitTabsText().nth(i).innerText()).toBe(tabNames[i]);
            await expect(await this.getTabNumber().nth(i).innerText()).toBe(String(i + 1));

            let tabAttr = await this.getCreateUnitTabs().nth(i).getAttribute('aria-selected');

            if(i === activeTabIndex) {
                await expect(tabAttr).toBe('true');
            }else {
                await expect(tabAttr).toBe('false');
            }
        }
    }

    async checkTabsFields() {
        const tabNames = await this.getCreateUnitTabsText().allInnerTexts();

        for(let i = 0; i < tabNames.length; i++) {
            await this.getCreateUnitTabs().nth(i).click();
            if(tabNames[i] === 'Основна інформація') {

                await expect(this.getMainInfoTitle()).toBeVisible();
                await expect(this.getCategoriesTitle()).toBeVisible();
                await expect(this.getCategoriesDropDown()).toBeVisible();
                await expect(this.getAnnouncementNameTitle()).toBeVisible();
                await expect(this.getAnnouncementNameInput()).toBeVisible();
                await expect(this.getVehicleManufacturerTitle()).toBeVisible();
                await expect(this.getVehicleManufacturerInput()).toBeVisible();
                await expect(this.getModelNameTitle()).toBeVisible();
                await expect(this.getModelNameInput()).toBeVisible();
                await expect(this.getDescriptionInfoInput()).toBeVisible();
                await expect(this.getTechnicalInfoInput()).toBeVisible();
                await expect(this.getAddressSelectionInput()).toBeVisible();
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
            await expect(this.getCategoriesDropDownArrowDown()).toBeVisible();
        } else if(tagName === 'input') {
            sectionBgText = await sectionInputLocator.getAttribute('placeholder'); 
        } else if(sectionInputLocator === this.getVehicleManufacturerInput()) {
            await expect(this.getVehicleManufacturerInputSearchIcon()).toBeVisible()
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
        await this.getNextBtn().waitFor({ state: 'visible', timeout: 5000 });
        await this.getNextBtn().click({force: true});
        await this.page.waitForLoadState('load');
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

            if (sectionInputLocator === this.getVehicleManufacturerInputContainer()) {
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
        await this.getCategoriesDropDown().click();
    }

    async checkCategoriesPopUp(titleText: string) {
        const categoriesPopUpTitle = this.page.locator('div[class*="CategoryPopup_title"]');

        const categoriesPopUpTitleText = await categoriesPopUpTitle.innerText();

        await this.checkCategoriesPopUpVisibility(true);
        await expect(categoriesPopUpTitle).toBeVisible();
        await expect(categoriesPopUpTitleText).toBe(titleText);
    }

    async clickOnCategoriesPopUpCloseBtn() {
        await this.getCategoriesPopUpCloseBtn().click();
    }

    async checkCategoriesPopUpVisibility(visibility: boolean) {
        if (visibility) {
            await expect(this.getCategoriesPopUp()).toBeVisible();
        } else {
            await expect(this.getCategoriesPopUp()).not.toBeVisible();
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

                    await expect(this.getCategoriesDropDown()).toBeEnabled();

                    const categoriesDropDownValue = await this.getCategoriesDropDown().innerText();

                    await expect(categoriesDropDownValue.toLowerCase()).toBe(thirdCategoryItemsNames[k].toLowerCase());

                    await this.clickOnCategoriesDropDown();
                }
            }
        }
    }

    async checkAnnouncementNameInput(input: string, error: string, specialChars: boolean = false, correctInput: boolean = false) {
        if(specialChars) {
            await this.fillSectionInput(this.getAnnouncementNameInput(), input);
            await this.checkSectionInputContent(this.getAnnouncementNameInput(), error);
            await this.copyPasteValueInSectionInput(this.getAnnouncementNameInput(), input);
            await this.checkSectionInputContent(this.getAnnouncementNameInput(), error);
        }else if(correctInput) {
            await this.fillSectionInput(this.getAnnouncementNameInput(), input);
            await this.clickOnNextBtn();
            await expect(await this.checkSectionError(
                this.getAnnouncementNameInput(),
                this.getAnnouncementNameInputError(),
                error
            )).toBe(false);
            await this.copyPasteValueInSectionInput(this.getAnnouncementNameInput(), input);
            await this.clickOnNextBtn();
            await expect(await this.checkSectionError(
                this.getAnnouncementNameInput(),
                this.getAnnouncementNameInputError(),
                error
            )).toBe(false);
        }else {
            await this.fillSectionInput(this.getAnnouncementNameInput(), input);
            await expect(await this.checkSectionError(
                this.getAnnouncementNameInput(),
                this.getAnnouncementNameInputError(),
                error
            )).toBe(true);
            await this.copyPasteValueInSectionInput(this.getAnnouncementNameInput(), input);
            await expect(await this.checkSectionError(
                this.getAnnouncementNameInput(),
                this.getAnnouncementNameInputError(),
                error
            )).toBe(true);
        }
    }

    async checkVehicleManufacturerDropDownIsVisible(isVisible: boolean) {
        if (isVisible) {
            await expect(this.getVehicleManifacturerDropDown()).toBeVisible();
        } else {
            await expect(this.getVehicleManifacturerDropDown()).not.toBeVisible();
        }
    }

    async checkVehicleManufacturerDropDownOption(value: string) {
        const dropDownOptionText = await this.getVehicleManufacturerDropDownOption().innerText();
        const dropDownInputText = await this.getVehicleManufacturerInput().inputValue();
        await expect(this.getVehicleManufacturerDropDownOption()).toBeVisible();
        await expect(dropDownOptionText).toBe(value);
        await expect(dropDownInputText).toBe(value);
    }

    async checkOptionNotFoundMessage(value: string) {
        const messageText = await this.getOptionNotFoundMessage().innerText();
        const inputValue = await this.getVehicleManufacturerInput().inputValue();
        const symbolCount = inputValue.length;
        const valueLength = value.length;

        if(valueLength > 100) {
            await expect(symbolCount.toString()).toBe('100');
            const valueWithoutLastChar = value.slice(0, -1);
            await expect(messageText.toLowerCase()).toContain(valueWithoutLastChar.toLowerCase());
        }else {
            await expect(this.getOptionNotFoundMessage()).toBeVisible();
            await expect(messageText).toContain(value);
            await this.getOptionNotFoundMessage().click();
            await this.checkUrl(`${process.env.HOMEPAGE_URL}create-unit/`);
            await expect(symbolCount).toBe(valueLength);
        }
    }

    async checkVehicalManufacturerInput(input: string) {
        await this.fillSectionInput(this.getVehicleManufacturerInput(), input);

        if(input.length > 100) {
            await this.checkOptionNotFoundMessage(input);
        }
        else if(input === 'АТЭК') {
            await this.checkVehicleManufacturerDropDownOption(input);
        }
        else if(input.length === 1 && input !== ' ') {
            await this.checkVehicleManufacturerDropDownIsVisible(true);
            await this.copyPasteValueInSectionInput(this.getVehicleManufacturerInput(), input);
            await this.checkVehicleManufacturerDropDownIsVisible(true);

            await this.checkOptionIsSelected();
            await this.clickOnClearIcon();
            await this.checkInputIsCleared();
        }
        else if(input === '123456789'){
            await this.checkOptionNotFoundMessage('123456789');
            await this.copyPasteValueInSectionInput(this.getVehicleManufacturerInput(), input);
            await this.checkOptionNotFoundMessage('123456789');
        } 
        else {
            await this.checkSectionInputContent(this.getVehicleManufacturerInput(), '');
        }
    }

    async checkOptionIsSelected() {
        const optionValue = await this.getVehicleManufacturerDropDownOption().first().innerText();
        await this.getVehicleManufacturerDropDownOption().first().click();
        const dropDownValue = await this.getSelectedOptionInDropdown().innerText();
        await expect(dropDownValue).toBe(optionValue)
    }

    async clickOnClearIcon() {
        await this.getClearVehicleManifacturerDropDownIcon().click({force: true});
    }
    
    async checkInputIsCleared() {
        const inputValue = await this.getVehicleManufacturerInput().inputValue();
        await expect(inputValue).toBe('');
    }

    async checkModelNameInput(input: string) {
        if(input.length > 15) {
            await this.fillSectionInput(this.getModelNameInput(), input);
            await expect(await this.checkSectionError(
                this.getModelNameInput(), 
                this.getModelNameInputError(), 
                'У назві моделі може бути не більше 15 символів')).toBe(true);
            await this.copyPasteValueInSectionInput(this.getModelNameInput(), input);
            await expect(await this.checkSectionError(
                this.getModelNameInput(), 
                this.getModelNameInputError(), 
                'У назві моделі може бути не більше 15 символів')).toBe(true);
        }else if(input.length <= 15 && input.length !== 0) {
            await this.fillSectionInput(this.getModelNameInput(), input);
            await expect(await this.checkSectionError(
                this.getModelNameInput(), 
                this.getModelNameInputError(), 
                '')).toBe(false)
        }
        else {
            await this.fillSectionInput(this.getModelNameInput(), input);
            await this.checkSectionInputContent(this.getModelNameInput(), '')
            await this.copyPasteValueInSectionInput(this.getModelNameInput(), input);
            await this.checkSectionInputContent(this.getModelNameInput(), '')
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
        await this.getSelectOnMapBtn().click();
    }

    async checkMapPopUpIsVisible() {
        await expect(this.getMapPopUp()).toBeVisible();
    }

    async checkMapPopUp(titleText: string, addressText: string) {
        const mapPopUpTitleText = await this.getMapPopUpTitle().innerText();

        await this.page.waitForTimeout(1000);

        const addressLineText = await this.getAddressLine().innerText();

        await expect(mapPopUpTitleText).toBe(titleText);
        await expect(this.getMapPopUpCloseBtn()).toBeVisible();
        await expect(addressLineText).toBe(addressText);
    }

    async clickOnMapPopUpCloseBtn() {
        await this.getMapPopUpCloseBtn().click();
    }

    async clickOnMapPopUpSubmitBtn() {
        await this.getMapPopUpSubmitBtn().click({force: true});
        await this.page.waitForTimeout(2000);
    }

    async clickOnMapAndGetAddress() {
        const mapContainerSize = await this.getMapContainer().boundingBox();
        if (mapContainerSize) {
            const randomX = mapContainerSize.x + Math.random() * mapContainerSize.width;
            const randomY = mapContainerSize.y + Math.random() * mapContainerSize.height;
    
            await this.page.mouse.click(randomX, randomY);
            await this.page.waitForLoadState('load');
            const address = await this.getAddressLine().innerText();
            return address
        }
        return '';
    }

    async checkCancelBtnText(expectedText: string) {
        const btnText = await this.getCancelBtn().innerText();
        await expect(btnText).toBe(expectedText);
    }

    async clickOnCancelBtn() {
        await this.getCancelBtn().click();
    }
    
    async acceptAlert() {
        await this.page.on('dialog', async(dialog) => {
            await dialog.accept();
        })
        await this.page.waitForLoadState('domcontentloaded');
    }

    async checkNextBtnText(expectedText: string) {
        const nextBtnText = await this.getNextBtn().innerText();
        await expect(nextBtnText).toBe(expectedText)
    }
    async checkNotificationsAppear() {
        await expect(this.getCategoryErrorMessage()).toBeVisible();
        await expect(this.getAnnouncementNameInputError()).toBeVisible();
        await expect(this.getVehicleManufacturerInputError()).toBeVisible();
        await expect(this.getAddressSelectionInputError()).toBeVisible();
    }

    async fillCategory() {
        const firstCategoryItem = await this.page.locator('[data-testid="firstCategoryLabel"]').first();
        const secondCategoryItem = await this.page.locator('[class*="SecondCategory_check_label"]').first();
        const thirdCategoryItem = await this.page.locator('[data-testid="thirdCategoryLabel"]').first();

        await this.getCategoriesDropDown().click();
        await firstCategoryItem.click();
        await secondCategoryItem.click();
        await thirdCategoryItem.click();
    }

    async fillAnnouncementName() {
        const inputValue = faker.lorem.sentence()
        await this.getAnnouncementNameInput().fill(inputValue);
    }

    async fillVehicleManufacturer() {
        const inputValue = faker.string.alpha({length: 1});

        await this.getVehicleManufacturerInput().fill(inputValue);
        await this.getVehicleManufacturerDropDownOption().first().click();
    }

    async fillAddress() {
        await this.getSelectOnMapBtn().click();
        await this.clickOnMapAndGetAddress();
        await this.clickOnMapPopUpSubmitBtn();
    }


}

export default CreateUnitPage;