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

    await createUnitPage.checkCreateUnitTitle('Створити оголошення');
    await createUnitPage.checkCreateUnitTabsTitles(1);
    await createUnitPage.checkTabsFields();
})

test('test case C296: Verify category (Категорія) section', async( {page} ) => {
    test.setTimeout(90000);

    await createUnitPage.checkSection(
        createUnitPage.categoriesTitle,
        createUnitPage.categoriesDropDown,
        'Категорія',
        'Виберіть категорію'
    );
    await createUnitPage.clickOnNextBtn();
    await expect(await createUnitPage.checkSectionError(
        createUnitPage.categoriesDropDown,
        createUnitPage.categoryErrorMessage,
        'Це поле обов’язкове'
    )).toBe(true);
    await createUnitPage.clickOnCategoriesDropDown();
    await createUnitPage.checkCategoriesPopUp('Вибір категорії технічного засобу');
    await createUnitPage.clickOnCategoriesPopUpCloseBtn();
    await createUnitPage.checkCategoriesPopUpVisibility(false);
    await createUnitPage.clickOnCategoriesDropDown();
    await createUnitPage.clickOutsidePopup();
    await createUnitPage.checkCategoriesPopUpVisibility(false);
    await createUnitPage.clickOnCategoriesDropDown();
    await createUnitPage.checkOptionsInCategoriesPopUp();
})

test('test case C297: Verify unit name section', async( {page} ) => {
    await createUnitPage.checkSection(
        createUnitPage.announcementNameTitle,
        createUnitPage.announcementNameInput,
        'Назва оголошення',
        'Введіть назву оголошення'
    );
    await createUnitPage.clickOnNextBtn();

    const inputValues = [
        {input: '', error: 'Це поле обов’язкове'},
        {input: String(faker.number.int({min: 1, max: 999999999})), error: 'У назві оголошення повинно бути не менше 10 символів'}, 
        {input: faker.string.alpha({ length: 101 }), error: 'У назві оголошення може бути не більше 100 символів'},
        {input: '<>{};^', error: '', specialChars: true},
        {input: faker.string.alpha({ length: 10 }), error: '', correctInput: true}
    ]

    for (const {input, error, specialChars, correctInput} of inputValues) {
        await createUnitPage.checkAnnouncementNameInput(input, error, specialChars, correctInput);
    }
})

test('test case C298: Verify vehicle manufacturer section', async( {page} ) => {
    await createUnitPage.checkSection(
        createUnitPage.vehicleManufacturerTitle,
        createUnitPage.vehicleManufacturerInput,
        'Виробник транспортного засобу',
        'Введіть виробника транспортного засобу'
    );
    await createUnitPage.clickOnNextBtn();
    await expect(await createUnitPage.checkSectionError(
                createUnitPage.announcementNameInput,
                createUnitPage.announcementNameInputError,
                'Це поле обов’язкове'
            )).toBe(true);

    const InputValues = [
        '<>{};^',
        ' ',
        '123456789',
        faker.string.alpha({ length: 101 }),
        'АТЭК',
        faker.string.alpha({ length: 1 })
    ]

    for(const input of InputValues) {
        await createUnitPage.checkVehicalManufacturerInput(input);
    }
})

test('test case C299: Verify model name input field', async( {page} ) => {
    await createUnitPage.checkSection(
        createUnitPage.modelNameTitle,
        createUnitPage.modelNameInput,
        'Назва моделі',
        'Введіть назву моделі',
        false
    );

    const InputValues = [
        faker.string.alpha({ length: 16 }),
        getStringWithSpaceInEnd(),
        getStringWithSpaceIncide(),
        ' ',
        '<>{};^',
        faker.string.alpha({ length: {min: 1, max: 15} }),
    ]

    for(const input of InputValues) {
        await createUnitPage.checkModelNameInput(input);
    }
})

test('test case C317: Verify technical characteristics section', async( {page} ) => {
    await createUnitPage.checkSection(
        createUnitPage.technicalInfoTitle,
        createUnitPage.technicalInfoInput,
        'Технічні характеристики'
    );
    await createUnitPage.checkSectionInputContent(createUnitPage.technicalInfoInput, '');
    await createUnitPage.checkSectionInputIsClickable(createUnitPage.technicalInfoInput);

    const inputValues = [
        '<>{};^',
        faker.string.alpha({ length: 9001}),
    ]

    for(const input of inputValues) {
        await createUnitPage.checkSectionInfoInput(createUnitPage.technicalInfoInput, input);
    }
})

test('test case C318: Verify description section', async( {page} ) => {
    await createUnitPage.checkSection(
        createUnitPage.descriptionInfoTitle,
        createUnitPage.descriptionInfoInput,
        'Детальний опис'
    );
    await createUnitPage.checkSectionInputContent(createUnitPage.descriptionInfoInput, '');
    await createUnitPage.checkSectionInputIsClickable(createUnitPage.descriptionInfoInput);

    const inputValues = [
        '<>{};^',
        faker.string.alpha({ length: 9001}),
    ]

    for(const input of inputValues) {
        await createUnitPage.checkSectionInfoInput(createUnitPage.descriptionInfoInput, input);
    }
})

test('test case C319: Verify vehicle location division', async( {page} ) => {
    await createUnitPage.checkSection(
        createUnitPage.addressSelectionTitle,
        createUnitPage.addressSelectionInput,
        'Місце розташування технічного засобу',
        'Виберіть на мапі',
        true
    );
    await createUnitPage.clickOnNextBtn();
    await createUnitPage.checkSectionError(
        createUnitPage.addressSelectionInput,
        createUnitPage.addressSelectionInputError,
        'Виберіть коректне місце на мапі України'
    );
    await createUnitPage.clickOnSelectOnMapBtn();
    await createUnitPage.checkMapPopUpIsVisible();
    await createUnitPage.checkMapPopUp('Техніка на мапі', 'Київ, вулиця Володимирська 21/20 Україна, Київська область');
    await createUnitPage.clickOnMapPopUpSubmitBtn();
    await createUnitPage.checkSectionInputContent(createUnitPage.addressSelectionInput, 'Київ, вулиця Володимирська 21/20 Україна, Київська область');
    await createUnitPage.clickOnSelectOnMapBtn();

    const newAddress: string = await createUnitPage.clickOnMapAndGetAddress();

    await createUnitPage.clickOutsidePopup();
    await createUnitPage.checkSectionInputContent(createUnitPage.addressSelectionInput, newAddress)

})

test('test case C326: Verify ""Скасувати"" button', async( {page} ) => {
    await createUnitPage.checkCancelBtnText('Скасувати');
    await createUnitPage.clickOnCancelBtn();
    await createUnitPage.acceptAlert();
    await createUnitPage.checkUrl(homepageUrl);
})

test('test case C329: Verify Далі button', async( {page} ) => {
    try {
        await createUnitPage.checkNextBtnText('Далі');
        await createUnitPage.clickOnNextBtn();
        await createUnitPage.checkNotificationsAppear();
        await createUnitPage.fillCategory();
        await createUnitPage.fillAnnouncementName();
        await createUnitPage.fillVehicleManufacturer();
        await createUnitPage.fillAddress();
        await createUnitPage.clickOnNextBtn();
        await createUnitPage.checkCreateUnitTitle('Створити оголошення');
        await createUnitPage.checkCreateUnitTabsTitles(2);
    } catch (error) {
        await page.screenshot({ path: `test-results/onfailure-error.png`, fullPage: true });
        throw error;
    }
})