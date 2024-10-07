import { test } from "@playwright/test";
import HomePage from '../pages/home.page';
import ProductsPage from '../pages/products.page';
import UnitPage from '../pages/unit.page';

const homepageUrl: string = process.env.HOMEPAGE_URL || '';

let homepage: HomePage;
let productsPage: ProductsPage;
let unitPage: UnitPage;

test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    productsPage = new ProductsPage(page);
    unitPage = new UnitPage(page);
    await homepage.navigate('/');
});

test('test case c212: Checking ""Послуги"" section on the main page', async ({ page }) => {
    const servicesList = homepage.servicesList;
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
        await unitPage.checkUnitIsVisible();
        await unitPage.clickOnLogo();
        await homepage.checkUrl(homepageUrl)
        await homepage.clickOnAnnouncementsNavMenuItem();
        await productsPage.checkProductsFilter();
        await productsPage.checkFilters(firstServicesUnitName);
        await homepage.clickOnLogo()
    }
})

test('test case c213: Checking ""Спецтехніка"" section on the main page', async ({ page }) => {
    const specialEquipmentsList = homepage.specialEquipmentsList;
    const specialEquipmentsCount = await specialEquipmentsList.count();

    for (let i = 0; i < specialEquipmentsCount; i++) {
        await homepage.scrollToSpecialEquipmentContainer();
        await homepage.checkSpecialEquipments();
        await specialEquipmentsList.nth(i).click({force: true});
        await homepage.clickFirstSpecialEquipmentUnit();
        await productsPage.checkProductsFilter();
        await productsPage.checkCategoriesCheckboxesAreChecked();
        await productsPage.checkUnitsContainerIsVisible();
        await productsPage.clickFirstProduct();
        await unitPage.checkUnitIsVisible();
        await unitPage.clickOnLogo();
        await homepage.checkUrl(homepageUrl);
        await homepage.clickOnAnnouncementsNavMenuItem();
        await productsPage.checkCategoriesCheckboxesAreChecked();
    }
})
