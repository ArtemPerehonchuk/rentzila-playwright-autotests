import { test, expect, request } from "@playwright/test";
import HomePage from '../pages/home.page';
import PrivacyPolicyPage from '../pages/privacy.policy.page';
import CookiePolicyPage from '../pages/cookie.policy.page';
import TermsConditionsPage from '../pages/terms.conditions.page';
import ProductsPage from "../pages/products.page";
import TendersPage from '../pages/tenders.page';
import { faker } from '@faker-js/faker'

const homepageUrl = 'https://dev.rentzila.com.ua/'

test.beforeEach(async ({ page }) => {
    const apiRequestContext = await request.newContext();
    const homepage = new HomePage(page, apiRequestContext);
    await homepage.navigate('/');
});

test('test case C214: Verify that all elements on the footer are displayed and all links are clickable', async ({ page }) => {
    const apiRequestContext = await request.newContext();
    const homepage = new HomePage(page, apiRequestContext);
    const privacyPolicyPage = new PrivacyPolicyPage(page);
    const cookiePolicyPage = new CookiePolicyPage(page);
    const termsConditionsPage = new TermsConditionsPage(page);
    const productsPage = new ProductsPage(page);
    const tendersPage = new TendersPage(page);
    
    await homepage.scrollToFooter();
    await homepage.checkFooter();
    await homepage.clickOnContactsEmail();
    await homepage.checkUrl(homepageUrl);
    await homepage.checkFooterElementsAreDisplayed();
    await homepage.clickOnPrivacyPolicyLink();
    await privacyPolicyPage.checkUrl('/privacy-policy/');
    await privacyPolicyPage.checkPrivacyPolicyTitle();
    await homepage.clickOnCookiePolicyLink();
    await cookiePolicyPage.checkUrl('/cookie-policy/');
    await cookiePolicyPage.checkCookiePolicyTitle();
    await homepage.clickOnTermsConditionsLink()
    await termsConditionsPage.checkUrl('/terms-conditions/');
    await termsConditionsPage.checkCookiePolicyTitle();
    await homepage.clickOnAnnouncementsLink();
    await productsPage.checkUrl('/products/');
    await productsPage.checkSerchInput();
    await productsPage.clickOnLogo();
    await homepage.checkUrl(homepageUrl);
    await homepage.checkSearchServiceSpecialEquipmentTitle();
    await homepage.clickOnTendersLink();
    await tendersPage.checkUrl('/tenders-map/');
    await tendersPage.checkSerchInput();
    await tendersPage.clickOnLogo();
    await homepage.checkUrl(homepageUrl);
})

test('test case C226: Verify "У Вас залишилися питання?" form', async ({ page }) => {
    const apiRequestContext = await request.newContext();
    const homepage = new HomePage(page, apiRequestContext);
    const userName = faker.person.firstName();
    
    await homepage.scrollToConsultationForm();
    await homepage.checkConsultationFormIsVisible();
    await homepage.clickOnSubmitConsultationBtn();

    await expect(await homepage.checkInputError('name')).toBe(true);
    await expect(await homepage.checkInputError('phone')).toBe(true);

    await homepage.fillInput('name', 'test');
    await homepage.clickOnSubmitConsultationBtn();

    await expect(await homepage.checkInputError('name')).toBe(false);
    await expect(await homepage.checkInputError('phone')).toBe(true);

    await homepage.clickOnPhoneInput();
    await homepage.checkPhoneInputAfterClick();

    await homepage.fillInput('phone', '+380506743060');
    await homepage.clearInput('name');
    await homepage.clickOnSubmitConsultationBtn();

    await expect(await homepage.checkInputError('name')).toBe(true);
    await expect(await homepage.checkInputError('phone')).toBe(false);

    await homepage.fillInput('name', 'Test');
    await homepage.fillInput('phone', '+38063 111 111');
    await homepage.clickOnSubmitConsultationBtn();
    await homepage.checkIncorrectPhoneErrorMsg();
    await homepage.fillInput('phone', ' +1 1111111111111');
    await homepage.clickOnSubmitConsultationBtn();
    await homepage.checkIncorrectPhoneErrorMsg();

    await homepage.fillInput('phone', '+380506743060');
    await homepage.clickOnSubmitConsultationBtn();
    await homepage.checkSuccessSubmitConsultationMsg();

    await homepage.clearInput('name');
    await homepage.clearInput('phone');
    await homepage.fillInput('name', userName);
    await homepage.fillInput('phone', '+380501234567');
    await homepage.clickOnSubmitConsultationBtn();
    await homepage.checkSuccessSubmitConsultationMsg();
    await homepage.checkUserDetailsContainUser(userName, '+380501234567');
})

