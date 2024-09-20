import { test, expect } from "@playwright/test";
import HomePage from '../pages/home.page';
import ProfilePage from '../pages/profile.page';

import dotenv from 'dotenv';

dotenv.config();

const validEmail: string = process.env.VALID_EMAIL || '';
const validPassword: string = process.env.VALID_PASSWORD || '';
const validPhone: string = process.env.VALID_PHONE || '';
const homepageUrl: string = process.env.HOMEPAGE_URL || '';

test.beforeEach(async ({ page }) => {
    const homepage = new HomePage(page);
    await homepage.navigate('/');
    await homepage.clickOnEnterBtn();
});

test('test case C200: Authorization with empty fields', async( {page} ) => {
    const homepage = new HomePage(page);

    await homepage.clickOnSubmitLoginFormBtn();

    await homepage.checkAutorizationFormIsDisplayed();
    await expect(await homepage.checkInputError('email')).toBe(true);
    await expect(await homepage.checkInputError('password')).toBe(true);

    await homepage.fillInput('email', validEmail);
    await homepage.clickOnSubmitLoginFormBtn();
    await homepage.checkAutorizationFormIsDisplayed();
    await expect(await homepage.checkInputError('email')).toBe(false);
    await expect(await homepage.checkInputError('password')).toBe(true);

    await homepage.clearInput('email');
    await homepage.checkAutorizationFormIsDisplayed();
    await expect(await homepage.checkInputError('email')).toBe(true);
    await expect(await homepage.checkInputError('password')).toBe(true);

    await homepage.fillInput('password', validPassword);
    await homepage.clickOnSubmitLoginFormBtn();
    await homepage.checkAutorizationFormIsDisplayed();
    await expect(await homepage.checkInputError('email')).toBe(true);
    await expect(await homepage.checkInputError('password')).toBe(false);
})

test('test case C201: Authorization with valid email and password', async( {page} ) => {
    const homepage = new HomePage(page);

    await homepage.fillInput('email', validEmail);
    await homepage.checkInputValue('email', validEmail);
    await homepage.fillInput('password', validPassword);
    await homepage.checkInputValue('password', validPassword);

    await homepage.clickOnHidePasswordIcon();
    await homepage.checkPasswordInputType('shown');
    await homepage.clickOnHidePasswordIcon();
    await homepage.checkPasswordInputType('hidden');

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
    const homepage = new HomePage(page);
    const profilePage = new ProfilePage(page);

    const correctPhoneNumbers: string[] = [
        process.env.CORRECT_PHONE_NUMBERS_FULL || '',
        process.env.CORRECT_PHONE_NUMBERS_WITHOUT_PLUS || '',
        process.env.CORRECT_PHONE_NUMBERS_WITHOUT_PLUS38 || ''
    ];

    for(const phoneNumber of correctPhoneNumbers) {    
        await homepage.fillInput('email', phoneNumber);
        await expect(await homepage.checkInputError('email')).toBe(false);
        await homepage.fillInput('password', validPassword);
        await expect(await homepage.checkInputError('password')).toBe(false);

        await homepage.clickOnSubmitLoginFormBtn();
        await homepage.checkUserIconIsDisplayed(true);
        await homepage.checkUrl(homepageUrl);

        await homepage.clickOnUserIcon();
        await homepage.clickOnMyProfileMenuItem();
        await profilePage.checkUrl('/owner-cabinet/');
        await profilePage.checkPhoneInputIsDisplayed();
        await profilePage.checkPhoneInputValue(validPhone);
        await profilePage.clickOnLogoutBtn();
        await homepage.checkUrl(homepageUrl);

        await homepage.clickOnEnterBtn();
    }
})

test('test case C207: Authorization with invalid phone', async( { page } ) => {
    const homepage = new HomePage(page);

    const incorrectPhoneNumbers: string[] = [
        process.env.INCORRECT_PHONE_NUMBERS_WITHOUT_COUNTRY_CODE || '',
        process.env.INCORRECT_PHONE_NUMBERS_WITHOUTLN || '',
        process.env.INCORRECT_PHONE_NUMBERS_WITH_DASHES || '',
        process.env.INCORRECT_PHONE_NUMBERS_WITH_SPACES || '',
        process.env.INCORRECT_PHONE_NUMBERS_WITH_BRACKET || '',
        process.env.INCORRECT_PHONE_NUMBERS_WITHOUT_COUNTRY_CODE_BRACKETS || '',
        process.env.INCORRECT_PHONE_NUMBERS_ELEVEN_DIGITS || '',
        process.env.INCORRECT_PHONE_NUMBERS_OTHER_COUNTRY_CODE || '',
        process.env.INCORRECT_PHONE_NUMBERS_WITHOUT_38 || ''
    ];

    await homepage.fillInput('password', validPassword);
    await homepage.checkInputValue('password', validPassword);

    for (const phoneNumber of incorrectPhoneNumbers) {
        await homepage.fillInput('email', phoneNumber);
        await homepage.clickOnSubmitLoginFormBtn();
        await homepage.checkIncorrectInputFormat();
    }
})

test('test case C576: Authorization with invalid email', async( { page } ) => {
    const homepage = new HomePage(page);

    const incorrectEmails: string[] = [
        process.env.INCORRECT_EMAILS_SPACE || '',
        process.env.INCORRECT_EMAILS_CYRILLIC || '',
        process.env.INCORRECT_EMAILS_WITHOUT_AT || '',
        process.env.INCORRECT_EMAILS_WITHOUT_DOT || '',
        process.env.INCORRECT_EMAILS_WITHOUT_CO || '',
        process.env.INCORRECT_EMAILS_WITHOUT_GMAIL || '',
        process.env.INCORRECT_EMAILS_WITHOUT_AT_GMAIL || '',
        process.env.INCORRECT_EMAILS_WITH_TWO_AT || ''
    ];

    await homepage.fillInput('password', validPassword);
    await homepage.checkInputValue('password', validPassword);

    for (const email of incorrectEmails) {
        await homepage.fillInput('email', email);
        await homepage.clickOnSubmitLoginFormBtn();
        await homepage.checkIncorrectInputFormat();
    }
})

test('test case C577: Authorization with invalid password', async( { page } ) => {
    const homepage = new HomePage(page);

    const incorrectPasswords: string[] = [
        process.env.INCORRECT_PASSWORDS_SPACE_AT_END || '',
        process.env.INCORRECT_PASSWORDS_SPACE_AT_BEGINNING || '',
        process.env.INCORRECT_PASSWORDS_NON_EXISTENT || '',
        process.env.INCORRECT_PASSWORDS_NO_UPPERCASE || '',
        process.env.INCORRECT_PASSWORDS_NO_LOWERCASE || '',
        process.env.INCORRECT_PASSWORDS_CYRILLIC || ''
    ];

    await homepage.fillInput('email', validEmail);
    await homepage.checkInputValue('email', validEmail);

    for (const password of incorrectPasswords) {
        await homepage.fillInput('password', password);
        await homepage.clickOnSubmitLoginFormBtn();
        await homepage.checkIncorrectInputFormat();
    }
});




