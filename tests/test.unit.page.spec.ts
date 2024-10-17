import { test, expect } from "@playwright/test";
import HomePage from '../pages/home.page';
import CreateUnitPage from '../pages/create.unit.page'

import { faker } from '@faker-js/faker';
import { getStringWithSpaceIncide, getStringWithSpaceInEnd } from '../helpers/random_values';

const validEmail: string = process.env.VALID_EMAIL || '';
const validPassword: string = process.env.VALID_PASSWORD || '';
const homepageUrl: string = process.env.HOMEPAGE_URL || '';

let createUnitPage: CreateUnitPage;
let homepage: HomePage;

test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    createUnitPage = new CreateUnitPage(page);

    await homepage.navigate('/');
    await homepage.clickOnClosePopUpBtn();
    await homepage.clickOnCreateUnitBtn();
    await homepage.fillInput('email', validEmail);
    await homepage.fillInput('password', validPassword);
    await homepage.clickOnSubmitLoginFormBtn();
});

test('test case C294: Verify body title and tab titles', async( {page} ) => {
    await expect(createUnitPage.getCreateUnitTitle()).toBeVisible();
    await expect(await createUnitPage.getCreateUnitTitle().innerText()).toBe('Створити оголошення');
    await expect(await createUnitPage.checkCreateUnitTabsTitles(1)).toBe(true);

    const tabNames = await createUnitPage.getCreateUnitTabsText().allInnerTexts();

    for(let i = 0; i < tabNames.length; i++) {
        await createUnitPage.getCreateUnitTabs().nth(i).click();
        if(tabNames[i] === 'Основна інформація') {

            await expect(createUnitPage.getCharacteristicsTitle()).toBeVisible();
            await expect(createUnitPage.getCategoriesDropDown()).toBeVisible();
            await expect(createUnitPage.getAnnouncementNameInput()).toBeVisible();
            await expect(createUnitPage.getVehicleManufacturerList()).toBeVisible();
            await expect(createUnitPage.getModelNameInput()).toBeVisible();
            await expect(createUnitPage.getTechnicalInfoInput()).toBeVisible();
            await expect(createUnitPage.getDescriptionInfoInput()).toBeVisible();
            await expect(createUnitPage.getMapLabel()).toBeVisible();
        }
        else if(tabNames[i] === 'Фотографії') {
            const photoTitle  = createUnitPage.page.locator('div[class*="ImagesUnitFlow_title"]');
            const imageContainer = createUnitPage.page.locator('div[class*="ImagesUnitFlow_imageContainer"]');

            await expect(photoTitle).toBeVisible();
            await expect(imageContainer).toBeVisible();
        }
        else if(tabNames[i] === 'Послуги') {
            const customServicesTitle  = createUnitPage.page.locator('div[class*="ServicesUnitFlow_title"]');
            const customServicesSearchInput = createUnitPage.page.locator('div[class*="ServicesUnitFlow_searchInput"]');

            await expect(customServicesTitle).toBeVisible();
            await expect(customServicesSearchInput).toBeVisible();
        }
        else if(tabNames[i] === 'Вартість') {
            const customPricesTitle  = createUnitPage.page.locator('div[class*="PricesUnitFlow_title"]');
            const paymentTypeSelect = createUnitPage.page.locator('div[data-testid="div_CustomSelect"]');
            const customUnitPrice = createUnitPage.page.locator('div[data-testid="input_wrapper_RowUnitPrice"]').first();

            await expect(customPricesTitle).toBeVisible();
            await expect(paymentTypeSelect).toBeVisible();
            await expect(customUnitPrice).toBeVisible();
        }
        else if(tabNames[i] === 'Контакти') {
            const contactsTitle  = createUnitPage.page.locator('div[class*="AuthContactCard_title"]');
            const contactsCard = createUnitPage.page.locator('div[class*="AuthContactCard_infoWrapper"]');

            await expect(contactsTitle).toBeVisible();
            await expect(contactsCard).toBeVisible();
        }
    }
})

test('test case C296: Verify category (Категорія) section', async( {page} ) => {
    test.setTimeout(150000);

    await expect(createUnitPage.getCategoriesTitle()).toBeVisible();
    await expect(createUnitPage.getCategoriesDropDown()).toBeVisible();
    await expect(createUnitPage.getCategoriesDropDownArrowDown()).toBeVisible();
    await expect(await createUnitPage.getCategoriesTitleText()).toContain('Категорія');
    await expect(await createUnitPage.getCategoriesTitleText()).toContain('*');
    await expect(await createUnitPage.getCategoriesDropDownBgText()).toContain('Виберіть категорію');

    await createUnitPage.clickOnNextBtn();

    await expect(createUnitPage.getCategoryErrorMessage()).toBeVisible();
    await expect(await createUnitPage.getCategoryInputErrorText()).toBe('Це поле обов’язкове');
    await expect(await createUnitPage.getCategoriesDropDown()).toHaveCSS('border-color', 'rgb(247, 56, 89)');

    await createUnitPage.clickOnCategoriesDropDown();

    await expect(createUnitPage.getCategoriesPopUp()).toBeVisible();
    await expect(await createUnitPage.getCategoriesPopUpTitleText()).toBe('Вибір категорії технічного засобу');

    await createUnitPage.clickOnCategoriesPopUpCloseBtn();

    await expect(await createUnitPage.getCategoriesPopUp()).not.toBeVisible();

    await createUnitPage.clickOnCategoriesDropDown();
    await createUnitPage.clickOutsidePopup();

    await expect(await createUnitPage.getCategoriesPopUp()).not.toBeVisible();

    await createUnitPage.clickOnCategoriesDropDown();
    await createUnitPage.checkOptionsInCategoriesPopUp();
})

test('test case C297: Verify unit name section', async( {page} ) => {
    await expect(createUnitPage.getAnnouncementNameTitle()).toBeVisible();
    await expect(createUnitPage.getAnnouncementNameInput()).toBeVisible();
    await expect(await createUnitPage.getAnnouncementNameTitleText()).toContain('Назва оголошення');
    await expect(await createUnitPage.getAnnouncementNameTitleText()).toContain('*');
    await expect(await createUnitPage.getAnnouncementNameInputBgText()).toContain('Введіть назву оголошення');

    await createUnitPage.clickOnNextBtn();

    await expect(createUnitPage.getAnnouncementNameInputError()).toBeVisible();
    await expect(await createUnitPage.getAnnouncementNameInputErrorText()).toBe('Це поле обов’язкове');
    await expect(await createUnitPage.getAnnouncementNameInput()).toHaveCSS('border-color', 'rgb(247, 56, 89)');

    const randomToNineCharNumber = String(faker.number.int({min: 1, max: 999999999}));
    const random101CharString = faker.string.alpha({ length: 101 });
    const randomTenCharString = faker.string.alpha({ length: 10 });
    const randomOneCharString = faker.string.alpha({ length: 1 });
    const inputValues = [
        randomToNineCharNumber, 
        random101CharString,
        '<>{};^',
        randomTenCharString
    ]

    for (const value of inputValues) {
        await createUnitPage.clearSectionInput(createUnitPage.getAnnouncementNameInput())
        await createUnitPage.getAnnouncementNameInput().type(value)

        switch(value) {
            case randomToNineCharNumber:
                await expect(createUnitPage.getAnnouncementNameInputError()).toBeVisible();
                await expect(await createUnitPage.getAnnouncementNameInputErrorText()).toBe('У назві оголошення повинно бути не менше 10 символів');
                await expect(await createUnitPage.getAnnouncementNameInput()).toHaveCSS('border-color', 'rgb(247, 56, 89)');

                await createUnitPage.copyPasteValueInSectionInput(createUnitPage.getAnnouncementNameInput());

                await expect(createUnitPage.getAnnouncementNameInputError()).toBeVisible();
                await expect(await createUnitPage.getAnnouncementNameInputErrorText()).toBe('У назві оголошення повинно бути не менше 10 символів');
                await expect(await createUnitPage.getAnnouncementNameInput()).toHaveCSS('border-color', 'rgb(247, 56, 89)');
                break
            
            case random101CharString:
                await expect(createUnitPage.getAnnouncementNameInputError()).toBeVisible();
                await expect(await createUnitPage.getAnnouncementNameInputErrorText()).toBe('У назві оголошення може бути не більше 100 символів');
                await expect(await createUnitPage.getAnnouncementNameInput()).toHaveCSS('border-color', 'rgb(247, 56, 89)');
                await expect(await createUnitPage.getAnnouncementInputValueCharCount()).toBe(100);

                await createUnitPage.copyPasteValueInSectionInput(createUnitPage.getAnnouncementNameInput());
                await createUnitPage.getAnnouncementNameInput().type(randomOneCharString);

                await expect(createUnitPage.getAnnouncementNameInputError()).toBeVisible();
                await expect(await createUnitPage.getAnnouncementNameInputErrorText()).toBe('У назві оголошення може бути не більше 100 символів');
                await expect(await createUnitPage.getAnnouncementNameInput()).toHaveCSS('border-color', 'rgb(247, 56, 89)');
                break
            
            case '<>{};^':
                await expect(createUnitPage.getAnnouncementNameInputError()).toBeVisible();
                await expect(await createUnitPage.getAnnouncementNameInputErrorText()).toBe('У назві оголошення повинно бути не менше 10 символів');
                await expect(await createUnitPage.getAnnouncementNameInputValueText()).toBe('');
                await expect(await createUnitPage.getAnnouncementNameInput()).toHaveCSS('border-color', 'rgb(247, 56, 89)');
                break
            
            case randomTenCharString:
                await expect(createUnitPage.getAnnouncementNameInputError()).not.toBeVisible();
                await expect(await createUnitPage.getAnnouncementNameInput()).toHaveCSS('border-color', 'rgb(229, 229, 229)');

                await createUnitPage.copyPasteValueInSectionInput(createUnitPage.getAnnouncementNameInput());

                await expect(createUnitPage.getAnnouncementNameInputError()).not.toBeVisible();
                await expect(await createUnitPage.getAnnouncementNameInput()).toHaveCSS('border-color', 'rgb(229, 229, 229)');
                break
        }
    }
})

test('test case C298: Verify vehicle manufacturer section', async( {page} ) => {
    await expect(createUnitPage.getVehicleManufacturerTitle()).toBeVisible();
    await expect(createUnitPage.getVehicleManufacturerInput()).toBeVisible();
    await expect(await createUnitPage.getVehicleManufacturerTitleText()).toContain('Виробник транспортного засобу');
    await expect(await createUnitPage.getVehicleManufacturerTitleText()).toContain('*');
    await expect(await createUnitPage.getVehicleManufacturerInputBgText()).toContain('Введіть виробника транспортного засобу');
   
    await createUnitPage.clickOnNextBtn();

    await expect(createUnitPage.getVehicleManufacturerInputError()).toBeVisible();
    await expect(createUnitPage.getVehicleManufacturerInputSearchIcon()).toBeVisible();
    await expect(await createUnitPage.getVehicleManufacturerInputErrorText()).toBe('Це поле обов’язкове');
    await expect(await createUnitPage.getVehicleManufacturerInputContainer()).toHaveCSS('border-color', 'rgb(40, 49, 73)');

    const random101CharString = faker.string.alpha({ length: 101 });
    const randomOneCharString = faker.string.alpha({ length: 1 });
    const InputValues = [
        'АТЭК',
        ' ',
        '<>{};^',
        '123456789',
    ]

    await createUnitPage.fillSectionInput(createUnitPage.getVehicleManufacturerInput(), randomOneCharString);

    await expect(createUnitPage.getVehicleManifacturerDropDown()).toBeVisible();
    await expect(createUnitPage.getVehicleManufacturerDropDownOption()).toBeVisible();

    await createUnitPage.copyPasteValueInSectionInput(createUnitPage.getVehicleManufacturerInput());

    await expect(createUnitPage.getVehicleManifacturerDropDown()).toBeVisible();
    await expect(createUnitPage.getVehicleManufacturerDropDownOption()).toBeVisible();

    for(const value of InputValues) {
        await createUnitPage.fillSectionInput(createUnitPage.getVehicleManufacturerInput(), value);

        switch(value) {
            case 'АТЭК':
                await expect(createUnitPage.getVehicleManifacturerDropDown()).toBeVisible();
                await expect(createUnitPage.getVehicleManufacturerDropDownOption()).toBeVisible();
                await expect(await createUnitPage.getVehicleManufacturerDropDownOptionText()).toBe('АТЭК');

                await createUnitPage.fillSectionInput(createUnitPage.getVehicleManufacturerInput(), value.toLowerCase());

                await expect(await createUnitPage.getVehicleManufacturerDropDownOptionText()).toBe('АТЭК');
                break

            case ' ':
                await expect(createUnitPage.getVehicleManifacturerDropDown()).not.toBeVisible();
                await expect(createUnitPage.getVehicleManufacturerDropDownOption()).not.toBeVisible();
                break

            case '<>{};^':
                await expect(createUnitPage.getVehicleManifacturerDropDown()).not.toBeVisible();
                await expect(createUnitPage.getVehicleManufacturerDropDownOption()).not.toBeVisible();
                break

            case '123456789':
                await expect(await createUnitPage.getOptionNotFoundErrorText()).toContain(value);
                await expect(await createUnitPage.getVehicleManufacturerInputValueLength()).toBe(value.length);
                break
        }
    }

    await createUnitPage.fillSectionInput(createUnitPage.getVehicleManufacturerInput(), random101CharString);
    
    await expect(await createUnitPage.getVehicleManufacturerInputValueLength()).toBe(100);

    await createUnitPage.fillSectionInput(createUnitPage.getVehicleManufacturerInput(), randomOneCharString);
    const optionText = await createUnitPage.getVehicleManufacturerDropDownOptionText();
    await createUnitPage.clickOnOptionInVehicleManufacturerDropDown();

    await expect(await createUnitPage.getVehicleManufacturerSelectedOptionText()).toBe(optionText);

    await createUnitPage.clickOnClearIcon();

    await expect(await createUnitPage.getVehicleManufacturerInputText()).toBe('');
})

test('test case C299: Verify model name input field', async( {page} ) => {
    await expect(createUnitPage.getModelNameTitle()).toBeVisible();
    await expect(createUnitPage.getModelNameInput()).toBeVisible();
    await expect(await createUnitPage.getModelNameTitleText()).toContain('Назва моделі');
    await expect(await createUnitPage.getModelNameInputBgText()).toBe('Введіть назву моделі');

    const random16CharStr = faker.string.alpha({ length: 16 });
    const random10To15CharStr = faker.string.alpha({ length: {min: 10, max: 15} });
    const randomStrWithSpaceInEnd = getStringWithSpaceInEnd();
    const randomStrWithSpaceIncide = getStringWithSpaceIncide();
    const InputValues = [
        random16CharStr,
        randomStrWithSpaceInEnd,
        randomStrWithSpaceIncide,
        ' ',
        '<>{};^',
        random10To15CharStr
    ]

    for(const input of InputValues) {
        await createUnitPage.fillSectionInput(createUnitPage.getModelNameInput(), input);

        if(input === random16CharStr || input === randomStrWithSpaceInEnd || input === randomStrWithSpaceIncide) {
            await expect(createUnitPage.getModelNameInputError()).toBeVisible();
            await expect(await createUnitPage.getModelNameInputErrorText()).toBe('У назві моделі може бути не більше 15 символів');
            await expect(createUnitPage.getModelNameInput()).toHaveCSS('border-color', 'rgb(247, 56, 89)');

            await createUnitPage.copyPasteValueInSectionInput(createUnitPage.getModelNameInput());

            await expect(createUnitPage.getModelNameInputError()).toBeVisible();
            await expect(await createUnitPage.getModelNameInputErrorText()).toBe('У назві моделі може бути не більше 15 символів');
            await expect(createUnitPage.getModelNameInput()).toHaveCSS('border-color', 'rgb(247, 56, 89)');

            await createUnitPage.clearSectionInput(createUnitPage.getModelNameInput());
        }
        else if(input === ' ' || input === '<>{};^') {
            await expect(await createUnitPage.getModelNameInputText()).toBe('');
        }
        else if(input === random10To15CharStr){
            await expect(createUnitPage.getModelNameInputError()).not.toBeVisible()
        };
    }
})

test('test case C317: Verify technical characteristics section', async( {page} ) => {
    await expect(createUnitPage.getTechnicalInfoTitle()).toBeVisible();
    await expect(createUnitPage.getTechnicalInfoInput()).toBeVisible();
    await expect(await createUnitPage.getTechnicalInfoTitleText()).toBe('Технічні характеристики');
    await expect(await createUnitPage.getTechnicalInfoInput()).toBeEnabled();
    await expect(await createUnitPage.getTechnicalInfoInputText()).toBe('');

    const random9000CharStr = faker.string.alpha({ length: 9000});
    const randomOneCharStr = faker.string.alpha({ length: 1});
    const inputValues = [
        '<>{};^',
        random9000CharStr
    ]

    for(const input of inputValues) {
        await createUnitPage.fillSectionInput(createUnitPage.getTechnicalInfoInput(), input) 
            switch(input) {
                case '<>{};^':
                    await expect(await createUnitPage.getTechnicalInfoInputText()).toBe('');
                    break
                case random9000CharStr:
                    await createUnitPage.getTechnicalInfoInput().type(randomOneCharStr);
                    await expect((await createUnitPage.getTechnicalInfoInputText()).length).toBe(9000);
                    break
        }
    }
})

test('test case C318: Verify description section', async( {page} ) => {
    await expect(createUnitPage.getDescriptionInfoTitle()).toBeVisible();
    await expect(createUnitPage.getDescriptionInfoInput()).toBeVisible();
    await expect(await createUnitPage.getDescriptionInfoTitleText()).toBe('Детальний опис');
    await expect(await createUnitPage.getDescriptionInfoInput()).toBeEnabled();
    await expect(await createUnitPage.getTechnicalInfoInputText()).toBe('');

    const random9000CharStr = faker.string.alpha({ length: 9000});
    const randomOneCharStr = faker.string.alpha({ length: 1});
    const inputValues = [
        '<>{};^',
        random9000CharStr
    ]

    for(const input of inputValues) {
        await createUnitPage.fillSectionInput(createUnitPage.getDescriptionInfoInput(), input) 
            switch(input) {
                case '<>{};^':
                    await expect(await createUnitPage.getDescriptionInfoInputText()).toBe('');
                    break
                case random9000CharStr:
                    await createUnitPage.getDescriptionInfoInput().type(randomOneCharStr);

                    await expect((await createUnitPage.getDescriptionInfoInputText()).length).toBe(9000);
                    break
        }
    }
})

test('test case C319: Verify vehicle location division', async( {page} ) => {
    await expect(createUnitPage.getAddressSelectionTitle()).toBeVisible();
    await expect(createUnitPage.getAddressSelectionInput()).toBeVisible();
    await expect(await createUnitPage.getAddressSelectionTitleText()).toContain('Місце розташування технічного засобу');
    await expect(await createUnitPage.getAddressSelectionTitleText()).toContain('*');
    await expect(await createUnitPage.getAddressSelectionInputText()).toBe('Виберіть на мапі');

    await createUnitPage.clickOnNextBtn();

    await expect(createUnitPage.getAddressSelectionInputError()).toBeVisible();
    await expect(await createUnitPage.getAddressSelectionInputErrorText()).toBe('Виберіть коректне місце на мапі України');
    await expect(createUnitPage.getAddressSelectionInput()).toHaveCSS('border-color', 'rgb(247, 56, 89)');

    await createUnitPage.clickOnSelectOnMapBtn();

    await expect(createUnitPage.getMapPopUp()).toBeVisible();
    await expect(await createUnitPage.getMapPopUpTitleText()).toBe('Техніка на мапі');
    await expect(await createUnitPage.getMapPopUpAddressLineText()).toBe('Київ, вулиця Володимирська 21/20 Україна, Київська область');
    await expect(createUnitPage.getMapPopUpCloseBtn()).toBeVisible();

    await createUnitPage.clickOnMapPopUpSubmitBtn();

    await expect(createUnitPage.getMapPopUp()).not.toBeVisible();
    await expect(await createUnitPage.getAddressLineText()).toBe('Київ, вулиця Володимирська 21/20 Україна, Київська область');

    await createUnitPage.clickOnSelectOnMapBtn();

    const newAddress: string = await createUnitPage.clickOnMapAndGetAddress();

    await createUnitPage.clickOutsidePopup();

    await expect(await createUnitPage.getAddressLineText()).toBe(newAddress);
})

test('test case C326: Verify ""Скасувати"" button', async( {page} ) => {
    await expect(await createUnitPage.getCancelBtnText()).toBe('Скасувати');

    await createUnitPage.clickOnCancelBtn();
    await createUnitPage.acceptAlert();

    await expect(await createUnitPage.getUrl()).toBe(homepageUrl);
})

test('test case C329: Verify ""Далі"" button', async( {page} ) => {
    await expect(await createUnitPage.getNextBtnText()).toBe('Далі')

    await createUnitPage.clickOnNextBtn();

    await expect(createUnitPage.getCategoryErrorMessage()).toBeVisible();
    await expect(createUnitPage.getAnnouncementNameInputError()).toBeVisible();
    await expect(createUnitPage.getVehicleManufacturerInputError()).toBeVisible();
    await expect(createUnitPage.getAddressSelectionInputError()).toBeVisible();

    await createUnitPage.fillCategory();
    await createUnitPage.fillAnnouncementName();
    await createUnitPage.fillVehicleManufacturer();
    await createUnitPage.fillAddress();
    await createUnitPage.clickOnNextBtn();

    await expect(await createUnitPage.getCreateUnitTitleText()).toBe('Створити оголошення');
    await createUnitPage.checkCreateUnitTabsTitles(2);
})