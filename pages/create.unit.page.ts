import { Page as PlaywrightPage, Locator, expect } from '@playwright/test';
import Page from './page';
import categoryNames from '../data/category_names.json' assert { type: 'json' };
import { faker } from '@faker-js/faker';

class CreateUnitPage extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
    }
    
    getCreateUnitTitle() {return this.page.locator('div[class*="CreateEditFlowLayout_title"]')};
    getCreateUnitTabs() {return this.page.getByRole('tab')};
    getCreateUnitTabsText() {return this.page.locator('div[class*="CustomLabel_label"] > span[class*="CustomLabel_labelTitle__O2bFl"]')};
    getTabNumber() {return this.page.locator('[data-testid="labelNumber"]')};
    getCategoriesDropDown() {return this.page.locator('[data-testid="buttonDiv"]')};
    getNextBtn() {return this.page.locator('[data-testid="nextButton"]')};
    getCategoryErrorMessage() {return this.page.locator('[class*="CategorySelect_errorTextVisible"]')};
    getCategoriesPopUp() {return this.page.locator('div[data-testid="categoryPopupWrapper"]')};
    getCategoriesPopUpCloseBtn() {return this.page.locator('[data-testid="closeIcon"]')};
    getCategoriesDropDownArrowDown() {return this.page.locator('div[data-testid="buttonDiv"]>div  img[alt="Arrow-down"]')};
    getCategoriesTitle() {return this.page.locator('div[class*="CategorySelect_title"]')};
    getCategoriesPopUpTitle() {return this.page.locator('div[class*="CategoryPopup_title"]')};
    getAnnouncementNameTitle() {return this.page.locator('div[class*="CustomInput_title"]').first()};
    getAnnouncementNameInput() {return this.page.locator('input[data-testid="custom-input"]').first()};
    getAnnouncementNameInputError() {return this.page.locator('[data-testid="descriptionError"]').first()};
    getVehicleManufacturerTitle() {return this.page.locator('div[class*="SelectManufacturer_title"]')};
    getVehicleManufacturerInputContainer() {return this.page.locator('div[class*="CustomSelectWithSearch_searchInput"]')};
    getVehicleManufacturerInput() {return this.page.locator('input[data-testid="input-customSelectWithSearch"]')};
    getVehicleManufacturerInputError() {return this.page.locator('div[class*="CustomSelectWithSearch_errorTextVisible"]')};
    getVehicleManufacturerInputSearchIcon() {return this.page.locator('div[class*="CustomSelectWithSearch_searchInput"] > svg')};
    getVehicleManufacturerSelectedOption() {return this.page.locator('[class*="CustomSelectWithSearch_serviceText"]')}
    getVehicleManifacturerDropDown() {return this.page.locator('div[class*="CustomSelectWithSearch_searchedServicesCat_wrapper"]')};
    getVehicleManufacturerDropDownOption() {return this.page.locator('div[class*="CustomSelectWithSearch_flexForServices"]').first()};
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
    getMapPopUpAddressLine() {return this.page.locator('[class*="MapPopup_address"]')}
    getMapPopUpCloseBtn() {return this.page.locator('[class*="MapPopup_title"]')};
    getAddressLine() {return this.page.locator('[data-testid="address"]')};
    getSelectedAddress() {return this.page.locator('[class*="AddressSelectionBlock_mapLabelChosen"]')};
    getMapPopUpSubmitBtn() {return this.page.locator('[class*="ItemButtons_darkBlueBtn"]')};
    getMapContainer() {return this.page.locator('#map')};
    getCancelBtn() {return this.page.locator('[data-testid="prevButton"]')};
    getCharacteristicsTitle () {return this.page.locator('div[class*="Characteristics_title"]')};
    getVehicleManufacturerList() {return this.page.locator('[data-testid="input-customSelectWithSearch"]')};
    getMapLabel() {return this.page.locator('[data-testid="mapLabel"]')};

    async getCreateUnitTitleText() {
        return await this.getCreateUnitTitle().innerText();
    }

    async checkCreateUnitTabsTitles(activeTabNumber: number) {
        if(await this.getCreateUnitTabs().isVisible) {
            const tabNames = await this.getCreateUnitTabsText().allInnerTexts();
            let activeTabIndex = activeTabNumber - 1;
            for (let i = 0; i < tabNames.length; i++) {
                await expect(this.getCreateUnitTabs().nth(i)).toBeVisible();
                await expect(await this.getCreateUnitTabsText().nth(i).innerText()).toBe(tabNames[i]);
                await expect(await this.getTabNumber().nth(i).innerText()).toBe(String(i + 1));

                let tabAttr = await this.getCreateUnitTabs().nth(i).getAttribute('aria-selected');

                if(i === activeTabIndex) {
                    await expect(tabAttr).toBe('true');
                }else {
                    await expect(tabAttr).toBe('false');
                }
            }
            return true
        }else return false
    }

    async getCategoriesTitleText() {
        return await this.getCategoriesTitle().innerText();
    }

    async getCategoriesDropDownBgText() {
        return await this.getCategoriesDropDown().innerText();
    }

    async getCategoryInputErrorText() {
        return await this.getCategoryErrorMessage().innerText();
    }

    async clickOnNextBtn() {
        await this.getNextBtn().click({force: true});
        await this.page.waitForTimeout(1000);
    }

    async fillSectionInput(sectionInputLocator: Locator, value: string) {
        await this.clearSectionInput(sectionInputLocator);
        await sectionInputLocator.click();
        await sectionInputLocator.fill(value);
    }

    async clearSectionInput(sectionInputLocator: Locator) {
        await sectionInputLocator.clear();
    }

    async copyPasteValueInSectionInput(sectionInputLocator: Locator) {
        await sectionInputLocator.click();
        await this.page.keyboard.press('Meta+A');
        await this.page.keyboard.press('Meta+c');
        await this.clearSectionInput(sectionInputLocator);
        await sectionInputLocator.click();
        await this.page.keyboard.press('Meta+V');
    }

    async checkSectionErrorIsDisplayed(sectionInputLocator: Locator, errorMessageLocator: Locator, expectedErrorText: string) {
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

    async clickOnCategoriesDropDown() {
        await this.getCategoriesDropDown().click();
    }

    async getCategoriesPopUpTitleText() {
        return await this.getCategoriesPopUpTitle().innerText();
    }

    async getAnnouncementNameTitleText() {
        return await this.getAnnouncementNameTitle().innerText();
    } 

    async getAnnouncementNameInputBgText() {
        return await this.getAnnouncementNameInput().getAttribute('placeholder');
    } 

    async getAnnouncementNameInputValueText() {
        return await this.getAnnouncementNameInput().inputValue();
    }

    async getAnnouncementNameInputErrorText() {
        return await this.getAnnouncementNameInputError().innerText();
    } 

    async getAnnouncementInputValueCharCount() {
        const value = await this.getAnnouncementNameInput().inputValue();
        return value.length;
    }

    async getVehicleManufacturerTitleText() {
        return await this.getVehicleManufacturerTitle().innerText();
    } 

    async getVehicleManufacturerInputBgText() {
        return await this.getVehicleManufacturerInput().getAttribute('placeholder');
    } 

    async getVehicleManufacturerInputErrorText() {
        return await this.getVehicleManufacturerInputError().innerText();
    } 

    async getVehicleManufacturerInputValueLength() {
        const currentValue = await this.getVehicleManufacturerInput().inputValue();
        return currentValue.length;
    }

    async getVehicleManufacturerDropDownOptionText() {
        return await this.getVehicleManufacturerDropDownOption().innerText();
    }

    async clickOnOptionInVehicleManufacturerDropDown() {
        await this.getVehicleManufacturerDropDownOption().click();
    }

    async getOptionNotFoundErrorText() {
        return await this.getOptionNotFoundMessage().innerText();
    }

    async getVehicleManufacturerSelectedOptionText() {
        return await this.getVehicleManufacturerSelectedOption().innerText();
    }

    async getVehicleManufacturerInputText() {
        return await this.getVehicleManufacturerInput().inputValue();
    }

    async clickOnCategoriesPopUpCloseBtn() {
        await this.getCategoriesPopUpCloseBtn().click();
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

    async clickOnClearIcon() {
        await this.getClearVehicleManifacturerDropDownIcon().click({force: true});
    }
    
    async getModelNameTitleText() {
        return await this.getModelNameTitle().innerText();
    }

    async getModelNameInputBgText() {
        return await this.getModelNameInput().getAttribute('placeholder');
    }

    async getModelNameInputErrorText() {
        return await this.getModelNameInputError().innerText();
    }

    async getModelNameInputText() {
        return await this.getModelNameInput().inputValue();
    }
   
    async getTechnicalInfoTitleText() {
        return await this.getTechnicalInfoTitle().innerText();
    }

    async getTechnicalInfoInputText() {
        return await this.getTechnicalInfoInput().inputValue();
    }

    async getDescriptionInfoTitleText() {
        return await this.getDescriptionInfoTitle().innerText();
    }

    async getDescriptionInfoInputText() {
        return await this.getDescriptionInfoInput().inputValue();
    }

    async getAddressSelectionTitleText() {
        return await this.getAddressSelectionTitle().innerText();
    }

    async getAddressSelectionInputText() {
        return await this.getAddressSelectionInput().innerText();
    }

    async getAddressSelectionInputErrorText() {
        return await this.getAddressSelectionInputError().innerText();
    }

    async clickOnSelectOnMapBtn() {
        await this.getSelectOnMapBtn().click();
        await this.page.waitForTimeout(1000)
    }

    async getMapPopUpTitleText() {
        return await this.getMapPopUpTitle().innerText();
    }

    async getMapPopUpAddressLineText() {
        return await this.getMapPopUpAddressLine().innerText();
    }

    async getAddressLineText() {
        return await this.getSelectedAddress().innerText();
    }

    async clickOnMapPopUpCloseBtn() {
        await this.getMapPopUpCloseBtn().click();
    }
    
    async clickOnMapPopUpSubmitBtn() {
        await this.getMapPopUpSubmitBtn().click({force: true});
        await this.page.waitForTimeout(2000)
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

    async getCancelBtnText() {
        return await this.getCancelBtn().innerText();
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

    async getNextBtnText() {
        return await this.getNextBtn().innerText();
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