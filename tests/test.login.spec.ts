import { test, expect } from "@playwright/test";
import HomePage from '../pages/home.page';
import ProfilePage from '../pages/profile.page';
import testData from '../data/test_data.json' assert {type: 'json'};

let homepage: HomePage;

const validEmail: string = process.env.VALID_EMAIL || '';
const validPassword: string = process.env.VALID_PASSWORD || '';
const validPhone: string = process.env.VALID_PHONE || '';
const homepageUrl: string = process.env.HOMEPAGE_URL || '';
const incorrectPhoneNumbers = Object.values(testData["incorrect-phone-numbers"]);
const incorrectEmails = Object.values(testData["incorrect-emails"]);
const incorrectPasswords = Object.values(testData["incorrect-passwords"]);
const pagesUrlPath = testData["pages URL path"];
const correctPhoneNumbers: string[] = [
        process.env.CORRECT_PHONE_NUMBERS_FULL || '',
        process.env.CORRECT_PHONE_NUMBERS_WITHOUT_PLUS || '',
        process.env.CORRECT_PHONE_NUMBERS_WITHOUT_PLUS38 || ''
    ];

test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    await homepage.navigate('/');
    await homepage.clickOnEnterBtn();
});

test('test case C200: Authorization with empty fields', async( {page} ) => {

    await homepage.clickOnSubmitLoginFormBtn();

    await homepage.checkAutorizationFormIsDisplayed();
    await expect(await homepage.checkInputErrorIsDisplayed('email', 'Поле не може бути порожнім')).toBe(true);
    await expect(await homepage.checkInputErrorIsDisplayed('password', 'Поле не може бути порожнім')).toBe(true);

    await homepage.fillInput('email', validEmail);
    await homepage.clickOnSubmitLoginFormBtn();
    await homepage.checkAutorizationFormIsDisplayed();
    await expect(await homepage.checkInputErrorIsDisplayed('email', 'Поле не може бути порожнім')).toBe(false);
    await expect(await homepage.checkInputErrorIsDisplayed('password', 'Поле не може бути порожнім')).toBe(true);

    await homepage.clearInput('email');
    await homepage.checkAutorizationFormIsDisplayed();
    await expect(await homepage.checkInputErrorIsDisplayed('email', 'Поле не може бути порожнім')).toBe(true);
    await expect(await homepage.checkInputErrorIsDisplayed('password', 'Поле не може бути порожнім')).toBe(true);

    await homepage.fillInput('password', validPassword);
    await homepage.clickOnSubmitLoginFormBtn();
    await homepage.checkAutorizationFormIsDisplayed();
    await expect(await homepage.checkInputErrorIsDisplayed('email', 'Поле не може бути порожнім')).toBe(true);
    await expect(await homepage.checkInputErrorIsDisplayed('password', 'Поле не може бути порожнім')).toBe(false);
})

test('test case C201: Authorization with valid email and password', async( {page} ) => {

    await homepage.fillInput('email', validEmail);
    await homepage.checkInputValue('email', validEmail);
    await homepage.fillInput('password', validPassword);
    await homepage.checkInputValue('password', validPassword);

    await homepage.clickOnHidePasswordIcon();
    await homepage.checkPasswordInputType('shown', 'text');
    await homepage.clickOnHidePasswordIcon();
    await homepage.checkPasswordInputType('hidden', 'password');

    await homepage.clickOnSubmitLoginFormBtn();
    await homepage.checkUserIconIsDisplayed(true);
    await homepage.checkUrl(homepageUrl);

    await homepage.clickOnUserIcon();
    await homepage.checkProfileDropDownIsDisplayed();
    await homepage.checkProfileDropDownEmail(validEmail);
    await homepage.logout();
    await homepage.checkUserIconIsDisplayed(false);
})

test('test case C202: Authorization with valid phone and password', async( {page} ) => {
    const profilePage = new ProfilePage(page);

    for(const phoneNumber of correctPhoneNumbers) {    
        await homepage.fillInput('email', phoneNumber);
        await expect(await homepage.checkInputErrorIsDisplayed('email', 'Поле не може бути порожнім')).toBe(false);
        await homepage.fillInput('password', validPassword);
        await expect(await homepage.checkInputErrorIsDisplayed('password', 'Поле не може бути порожнім')).toBe(false);

        await homepage.clickOnSubmitLoginFormBtn();
        await homepage.checkUserIconIsDisplayed(true);
        await homepage.checkUrl(homepageUrl);

        await homepage.clickOnUserIcon();
        await homepage.clickOnMyProfileMenuItem();
        await profilePage.checkUrl(pagesUrlPath["owner-cabinet"]);
        await profilePage.checkPhoneInputIsDisplayed();
        await profilePage.checkPhoneInputValue(validPhone);
        await profilePage.clickOnLogoutBtn();
        await homepage.checkUrl(homepageUrl);

        await homepage.clickOnEnterBtn();
    }
})

test('test case C207: Authorization with invalid phone', async( { page } ) => {

    await homepage.fillInput('password', validPassword);
    await homepage.checkInputValue('password', validPassword);

    for (const phoneNumber of incorrectPhoneNumbers) {
        await homepage.fillInput('email', phoneNumber);
        await homepage.clickOnSubmitLoginFormBtn();
        await homepage.checkIncorrectEmailOrPhoneInputFormat('Неправильний формат email або номера телефону');
    }
})

test('test case C576: Authorization with invalid email', async( { page } ) => {

    await homepage.fillInput('password', validPassword);
    await homepage.checkInputValue('password', validPassword);

    for (const email of incorrectEmails) {
        await homepage.fillInput('email', email);
        await homepage.clickOnSubmitLoginFormBtn();
        await homepage.checkIncorrectEmailOrPhoneInputFormat('Неправильний формат email або номера телефону');
    }
})

test('test case C577: Authorization with invalid password', async( { page } ) => {

    await homepage.fillInput('email', validEmail);
    await homepage.checkInputValue('email', validEmail);

    for (const password of incorrectPasswords) {
        await homepage.fillInput('password', password);
        await homepage.clickOnSubmitLoginFormBtn();
        await homepage.checkIncorrectPasswordInputFormat('Пароль повинен містити', 'Невірний e-mail або пароль');
    }
});




