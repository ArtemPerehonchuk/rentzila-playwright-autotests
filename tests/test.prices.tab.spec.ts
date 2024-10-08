import { test, expect } from "@playwright/test";
import HomePage from '../pages/home.page';
import CreateUnitPage from '../pages/create.unit.page';
import PhotoTab from '../pages/photo.tab';
import ServicesTab from '../pages/services.tab';
import PricesTab from '../pages/prices.tab'

const validEmail: string = process.env.VALID_EMAIL || '';
const validPassword: string = process.env.VALID_PASSWORD || '';

let selectedService: string;

let createUnitPage: CreateUnitPage;
let homepage: HomePage;
let photoTab: PhotoTab;
let servicesTab: ServicesTab;
let pricesTab: PricesTab;

test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    createUnitPage = new CreateUnitPage(page);
    photoTab = new PhotoTab(page);
    servicesTab = new ServicesTab(page);
    pricesTab = new PricesTab(page);

    await homepage.navigate('/');
    await homepage.clickOnClosePopUpBtn();
    await homepage.clickOnCreateUnitBtn();
    await homepage.fillInput('email', validEmail);
    await homepage.fillInput('password', validPassword);
    await homepage.clickOnSubmitLoginFormBtn();
    await createUnitPage.fillCategory();
    await createUnitPage.fillAnnouncementName();
    await createUnitPage.fillVehicleManufacturer();
    await createUnitPage.fillAddress();
    await createUnitPage.clickOnNextBtn();
    await photoTab.uploadFoto();
    await createUnitPage.clickOnNextBtn();
    await servicesTab.selectService();
    selectedService = await servicesTab.getSelectedService();
    await createUnitPage.clickOnNextBtn();
});

test('Test case C417: Verify ""Спосіб оплати"" section', async({page}) => {
    await pricesTab.checkPaymentMethodSection('Спосіб оплати', 'Готівкою / на картку');
    await pricesTab.clickOnPaymentMethodDropDown();
    await pricesTab.checkPaymentMethodDropDownOptions('Готівкою / на картку', 'Безготівковий розрахунок (без ПДВ)', 'Безготівковий розрахунок (з ПДВ)');
    await pricesTab.checkPaymentMethodOptionSelection();
})

test('Test case C418: Verify ""Вартість мінімального замовлення"" section', async({page}) => {
    await pricesTab.checkPriceOfMinOrderSection('Вартість мінімального замовлення', 'Наприклад, 1000');
    await pricesTab.checkPriceOfMinOrderInputWithTenNumbers();
    await pricesTab.checkPriceOfMinOrderWithIncorrectPrices();
    await pricesTab.checkPriceOfMinOrderInputWithNineNumbers();
    await pricesTab.verifyCurrencyField('UAH');
})

test('Test case C482: Verify adding price for service', async({page}) => {
    await pricesTab.checkServicePriceSection('Вартість Ваших послуг', 'За бажанням Ви можете додати вартість конкретних послуг,');
    await pricesTab.checkAddPriceBtn('Додати вартість');
    await pricesTab.clickOnAddPriceBtn();
    await pricesTab.checkAddPriceBtnNotVisible();
    await pricesTab.checkAddPriceSectionVisibility();
    await pricesTab.checkAddPriceInputWithTenNumbers();
    await pricesTab.checkAddPriceInputWithIncorrectPrices();
    await pricesTab.checkAddPriceInputWithNineNumbers();
    await pricesTab.checkAddPriceCurrencyInput('UAH');
    await pricesTab.checkSelectAddPriceOptionDropDown('Година');
    await pricesTab.checkOptionSelectionInAddPriceDropDown();
    await pricesTab.clickOnRemovePriceBtn();
    await pricesTab.checkServicePriceSectionNotVisible();
    await pricesTab.checkAddPriceBtn('Додати вартість');
})

test('Test case C488: Verify ""Назад"" button', async({page}) => {
    await pricesTab.checkPrevBtnText('Назад');
    await pricesTab.clickOnPrevBtn();
    await createUnitPage.checkCreateUnitTabsTitles(3);
})

test('Test case C489: Verify ""Далі"" button', async({page}) => {
    await createUnitPage.checkNextBtnText('Далі');
    await createUnitPage.clickOnNextBtn();
    await createUnitPage.checkCreateUnitTabsTitles(4);
    await pricesTab.checkPriceOfMinOrderInputError('Це поле обов’язкове');
})

test('Test case C596: Verify adding an invalid price in the "Вартість мінімального замовлення *" input', async({page}) => {
    await pricesTab.fillPriceOfMinOrderInput('0');
    await pricesTab.checkValueInPriceOfMinOrderInput('');
    await pricesTab.fillPriceOfMinOrderInput('1');
    await pricesTab.checkValueInPriceOfMinOrderInput('1');
    await createUnitPage.clickOnNextBtn();
    await pricesTab.checkPriceOfMinOrderInputError('Мінімальна вартiсть має бути не менше 1000 грн');
    await pricesTab.clearPriceOfMinOrderInput();
    await pricesTab.checkPriceOfMinOrderInputError('Це поле обов’язкове');
    await pricesTab.fillPriceOfMinOrderInput('1000');
    await pricesTab.checkValueInPriceOfMinOrderInput('1000');
    await pricesTab.checkPriceOfMinOrderInpuErrorNotVisible();
})

test('Test case C636: Verify the data entry in the "Вартість мінімального замовлення *" input', async({page}) => {
    await pricesTab.checkPriceOfMinOrderWithIncorrectPrices();
    await pricesTab.checkPriceOfMinOrderInputWithTenNumbers();
})

test('Test case C637: Verify UI of the "Вартість Ваших послуг *" section', async({page}) => {
    await pricesTab.checkServicePriceSection('Вартість Ваших послуг', 'За бажанням Ви можете додати вартість конкретних послуг, які надає технічний засіб');
    await pricesTab.checkAddPriceBtn('Додати вартість');

    await expect(selectedService).toBe(await pricesTab.getServiceFromAddPriceSection());

    await pricesTab.clickOnAddPriceBtn();
    await pricesTab.checkAddPriceBtnNotVisible();
    await pricesTab.checkRemovePriceBtnIsVisible();
    await pricesTab.checkAddPriceSectionVisibility();
    await pricesTab.checkAddPriceInputBgText('Наприклад, 1000');
    await pricesTab.checkAddPriceCurrencyInput('UAH');
    await pricesTab.checkSelectAddPriceOptionDropDown('Година');
})

test('Test case C638: Verify the data entry in the "Вартість Ваших послуг *" price input', async({page}) => {
    await pricesTab.clickOnAddPriceBtn();
    await pricesTab.checkAddPriceSectionVisibility();
    await pricesTab.checkAddPriceInputBgText('Наприклад, 1000');
    await pricesTab.checkAddPriceInputWithIncorrectPrices();
    await pricesTab.checkAddPriceInputWithNineNumbers();
})