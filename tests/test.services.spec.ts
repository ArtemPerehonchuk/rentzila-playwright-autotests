import { test, request } from "@playwright/test";
import HomePage from '../pages/home.page';
import ProductsPage from '../pages/products.page';
import UnitPage from '../pages/unit.page';

const homepageUrl = 'https://dev.rentzila.com.ua/'

test.beforeEach(async ({ page }) => {
    const apiRequestContext = await request.newContext();
    const homepage = new HomePage(page, apiRequestContext);
    await homepage.navigate('/');
});

test('test case c212: Checking ""Послуги"" section on the main page', async ({ page }) => {
    const apiRequestContext = await request.newContext();
    const homepage = new HomePage(page, apiRequestContext);
    const productsPage = new ProductsPage(page);
    const unitPage = new UnitPage(page);
    const servicesList = homepage.locators.servicesList;
    const servicesCount = await servicesList.count();
    let firstServicesUnitName;

    for (let i = 0; i < servicesCount; i++) {
        await homepage.scrollToServicesContainer();
        await homepage.checkServices();
        await servicesList.nth(i).click();
        firstServicesUnitName = await homepage.getFirstServicesUnitName();
        await homepage.clickFirstServicesUnit();
        await productsPage.checkProductsFilter();
        await productsPage.checkFilters(firstServicesUnitName);
        await productsPage.checkUnitsContainerIsVisible();
        await productsPage.clickFirstProduct();
        await unitPage.checkUnit();
        await unitPage.clickOnLogo();
        await homepage.checkUrl(homepageUrl)
        await homepage.clickOnAnnouncementsNavMenuItem();
        await productsPage.checkProductsFilter();
        await productsPage.checkFilters(firstServicesUnitName);
        await homepage.clickOnLogo()
    }
})

test('test case c213: Checking ""Спецтехніка"" section on the main page', async ({ page }) => {
    const apiRequestContext = await request.newContext();
    const homepage = new HomePage(page, apiRequestContext);
    const productsPage = new ProductsPage(page);
    const unitPage = new UnitPage(page);
    const specialEquipmentsList = homepage.locators.specialEquipmentsList;
    const specialEquipmentsCount = await specialEquipmentsList.count();

    for (let i = 0; i < specialEquipmentsCount; i++) {
        await homepage.scrollToSpicialEquipmentContainer();
        await homepage.checkSpecialEquipments();
        await specialEquipmentsList.nth(i).click({force: true});
        await homepage.clickFirstSpecialEquipmentUnit();
        await productsPage.checkProductsFilter();
        await productsPage.checkCategoriesCheckboxes();
        await productsPage.checkUnitsContainerIsVisible();
        await productsPage.clickFirstProduct();
        await unitPage.checkUnit();
        await unitPage.clickOnLogo();
        await homepage.checkUrl(homepageUrl);
        await homepage.clickOnAnnouncementsNavMenuItem();
        await productsPage.checkCategoriesCheckboxes();
        await homepage.clickOnLogo();
    }
})
