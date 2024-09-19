import { test, expect } from "@playwright/test";
import HomePage from '../pages/home.page';
import ProfilePage from '../pages/profile.page';
import * as fs from 'fs';

const testData = JSON.parse(fs.readFileSync('data/test_data.json', 'utf8'));

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

    await homepage.fillInput('email', testData['valid-email']);
    await homepage.clickOnSubmitLoginFormBtn();
    await homepage.checkAutorizationFormIsDisplayed();
    await expect(await homepage.checkInputError('email')).toBe(false);
    await expect(await homepage.checkInputError('password')).toBe(true);

    await homepage.clearInput('email');
    await homepage.checkAutorizationFormIsDisplayed();
    await expect(await homepage.checkInputError('email')).toBe(true);
    await expect(await homepage.checkInputError('password')).toBe(true);

    await homepage.fillInput('password', testData['valid-password']);
    await homepage.clickOnSubmitLoginFormBtn();
    await homepage.checkAutorizationFormIsDisplayed();
    await expect(await homepage.checkInputError('email')).toBe(true);
    await expect(await homepage.checkInputError('password')).toBe(false);
})

test('test case C201: Authorization with valid email and password', async( {page} ) => {
    const homepage = new HomePage(page);

    await homepage.fillInput('email', testData['valid-email']);
    await homepage.checkInputValue('email', testData['valid-email']);
    await homepage.fillInput('password', testData['valid-password']);
    await homepage.checkInputValue('password', testData['valid-password']);

    await homepage.clickOnHidePasswordIcon();
    await homepage.checkPasswordInputType('shown');
    await homepage.clickOnHidePasswordIcon();
    await homepage.checkPasswordInputType('hidden');

    await homepage.clickOnSubmitLoginFormBtn();
    await homepage.checkUserIconIsDisplayed(true);
    await homepage.checkUrl(testData['homepageUrl']);

    await homepage.clickOnUserIcon();
    await homepage.checkProfileDropDownIsDisplayed();
    await homepage.checkProfileDropDownEmail(testData['valid-email']);
    await homepage.logout();
    await homepage.checkUserIconIsDisplayed(false);
})

test('test case C202: Authorization with valid phone and password', async( {page} ) => {
    const homepage = new HomePage(page);
    const profilePage = new ProfilePage(page);

    const correctPhoneNumbers: string[] = Object.values(testData['correct-phone-numbers']) as string[];

    for(const phoneNumber of correctPhoneNumbers) {    
        await homepage.fillInput('email', phoneNumber);
        await expect(await homepage.checkInputError('email')).toBe(false);
        await homepage.fillInput('password', testData['valid-password']);
        await expect(await homepage.checkInputError('password')).toBe(false);

        await homepage.clickOnSubmitLoginFormBtn();
        await homepage.checkUserIconIsDisplayed(true);
        await homepage.checkUrl(testData['homepageUrl']);

        await homepage.clickOnUserIcon();
        await homepage.clickOnMyProfileMenuItem();
        await profilePage.checkUrl('/owner-cabinet/');
        await profilePage.checkPhoneInputIsDisplayed();
        await profilePage.checkPhoneInputValue(testData['valid-phone']);
        await profilePage.clickOnLogoutBtn();
        await homepage.checkUrl(testData['homepageUrl']);

        await homepage.clickOnEnterBtn();
    }
})

test('test case C207: Authorization with invalid phone', async( { page } ) => {
    const homepage = new HomePage(page);

    const incorrectPhoneNumbers: string[] = Object.values(testData['incorrect-phone-numbers']) as string[];

    await homepage.fillInput('password', testData['valid-password']);
    await homepage.checkInputValue('password', testData['valid-password']);

    for (const phoneNumber of incorrectPhoneNumbers) {
        await homepage.fillInput('email', phoneNumber);
        await homepage.clickOnSubmitLoginFormBtn();
        await homepage.checkIncorrectInputFormat();
    }
})

test('test case C576: Authorization with invalid email', async( { page } ) => {
    const homepage = new HomePage(page);

    const incorrectEmails: string[] = Object.values(testData['incorrect-emails']) as string[];

    await homepage.fillInput('password', testData['valid-password']);
    await homepage.checkInputValue('password', testData['valid-password']);

    for (const email of incorrectEmails) {
        await homepage.fillInput('email', email);
        await homepage.clickOnSubmitLoginFormBtn();
        await homepage.checkIncorrectInputFormat();
    }
})

test('test case C577: Authorization with invalid password', async( { page } ) => {
    const homepage = new HomePage(page);

    const incorrectPasswords: string[] = Object.values(testData['incorrect-passwords']) as string[];

    await homepage.fillInput('email', testData['valid-email']);
    await homepage.checkInputValue('email', testData['valid-email']);

    for (const password of incorrectPasswords) {
        await homepage.fillInput('password', password);
        await homepage.clickOnSubmitLoginFormBtn();
        await homepage.checkIncorrectInputFormat();
    }

});




