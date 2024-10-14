import { test, expect, request, APIRequestContext } from "@playwright/test";
import HomePage from '../pages/home.page';
import PrivacyPolicyPage from '../pages/privacy.policy.page';
import CookiePolicyPage from '../pages/cookie.policy.page';
import TermsConditionsPage from '../pages/terms.conditions.page';
import ProductsPage from "../pages/products.page";
import TendersPage from '../pages/tenders.page';
import { faker } from '@faker-js/faker';
import testData from '../data/test_data.json' assert {type: 'json'}


let apiRequestContext: APIRequestContext;

let homepage: HomePage;

const homepageUrl: string = process.env.HOMEPAGE_URL || '';
const pagesUrlPath = testData["pages URL path"];
const contactUsFormInputValues = testData["contuct us form inputs"];


test.beforeEach(async ({ page }) => {
    apiRequestContext = await request.newContext(); 
    homepage = new HomePage(page, apiRequestContext);
    await homepage.navigate('/');
});

test.only('test case C214: Verify that all elements on the footer are displayed and all links are clickable', async ({ page }) => {
    const privacyPolicyPage = new PrivacyPolicyPage(page);
    const cookiePolicyPage = new CookiePolicyPage(page);
    const termsConditionsPage = new TermsConditionsPage(page);
    const productsPage = new ProductsPage(page);
    const tendersPage = new TendersPage(page);
    
    await homepage.scrollToFooter();
    await homepage.checkFooterContainerIsVisible();
    await homepage.clickOnContactsEmail();
    await expect(await homepage.getUrl()).toBe(homepageUrl);
    await homepage.checkFooterElementsAreDisplayed();
    await homepage.clickOnPrivacyPolicyLink();
    await expect(await privacyPolicyPage.getUrl()).toContain(pagesUrlPath["privacy-policy"]);
    await privacyPolicyPage.checkPrivacyPolicyTitle();
    await homepage.clickOnCookiePolicyLink();
    await expect(await cookiePolicyPage.getUrl()).toContain(pagesUrlPath["cookey-policy"]);
    await cookiePolicyPage.checkCookiePolicyTitle();
    await homepage.clickOnTermsConditionsLink();
    await expect(await termsConditionsPage.getUrl()).toContain(pagesUrlPath["terms-conditions"]);
    await termsConditionsPage.checkCookiePolicyTitle();
    await homepage.clickOnAnnouncementsLink();
    await expect(productsPage.getUrl()).toContain(pagesUrlPath["products"]);
    await productsPage.checkSerchInputBgText('Пошук оголошень або послуг');
    await productsPage.clickOnLogo();
    await expect(await homepage.getUrl()).toBe(homepageUrl);
    await homepage.checkSearchServiceSpecialEquipmentTitle('Сервіс пошуку');
    await homepage.clickOnTendersLink();
    await expect(await tendersPage.getUrl()).toContain(pagesUrlPath["tenders-map"]);
    await tendersPage.checkSerchInputBgText('Пошук тендера за ключовими словами');
    await tendersPage.clickOnLogo();
    await expect(await homepage.getUrl()).toBe(homepageUrl);
    await homepage.checkContactsEmail('info@rentzila.com.ua');
});

test('test case C226: Verify "У Вас залишилися питання?" form', async ({ page }) => {
    const userName = faker.person.firstName();
    
    await homepage.scrollToConsultationForm();
    await homepage.checkConsultationFormIsVisible();
    await homepage.clickOnSubmitConsultationBtn();

    await expect(await homepage.checkInputErrorIsDisplayed('name', 'Поле не може бути порожнім')).toBe(true);
    await expect(await homepage.checkInputErrorIsDisplayed('phone', 'Поле не може бути порожнім')).toBe(true);

    await homepage.fillInput('name', 'test');
    await homepage.clickOnSubmitConsultationBtn();

    await expect(await homepage.checkInputErrorIsDisplayed('name', 'Поле не може бути порожнім')).toBe(false);
    await expect(await homepage.checkInputErrorIsDisplayed('phone', 'Поле не може бути порожнім')).toBe(true);

    await homepage.clickOnPhoneInput();
    await homepage.checkPhoneInputAfterClick('+380');

    await homepage.fillInput('phone', contactUsFormInputValues["correct phone"]);
    await homepage.clearInput('name');
    await homepage.clickOnSubmitConsultationBtn();

    await expect(await homepage.checkInputErrorIsDisplayed('name', 'Поле не може бути порожнім')).toBe(true);
    await expect(await homepage.checkInputErrorIsDisplayed('phone', 'Поле не може бути порожнім')).toBe(false);

    await homepage.fillInput('name', contactUsFormInputValues.test);
    await homepage.fillInput('phone', contactUsFormInputValues["incorrect phone with spaces"]);
    await homepage.clickOnSubmitConsultationBtn();
    await homepage.checkIncorrectPhoneErrorMsg('Телефон не пройшов валідацію');
    await homepage.fillInput('phone', contactUsFormInputValues["incorrect phone same digits and spaces"]);
    await homepage.clickOnSubmitConsultationBtn();
    await homepage.checkIncorrectPhoneErrorMsg('Телефон не пройшов валідацію');

    await homepage.fillInput('phone', contactUsFormInputValues["other correct phone"]);
    await homepage.clickOnSubmitConsultationBtn();
    await homepage.checkSuccessSubmitConsultationMsg();

    await homepage.clearInput('name');
    await homepage.clearInput('phone');
    await homepage.fillInput('name', userName);
    await homepage.fillInput('phone', contactUsFormInputValues["other correct phone"]);
    await homepage.clickOnSubmitConsultationBtn();
    await homepage.checkSuccessSubmitConsultationMsg();
    await homepage.checkUserDetailsContainUser(userName, contactUsFormInputValues["other correct phone"]);
});