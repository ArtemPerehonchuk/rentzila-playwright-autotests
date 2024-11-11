import { test, expect, request, APIRequestContext } from "@playwright/test";
import HomePage from '../pages/home.page';
import OwnerUnitsPage from '../pages/owner.units.page';
import AdminMainPage from '../pages/admin.main.page';
import EditUnitPage from '../pages/edit.unit.page';
import AdminUnitsPage from '../pages/admin.units.page';
import AdminUnitReviewPage from '../pages/admin.unit.review.page'
import ApiHelper from "../helpers/api.helper";
import { faker } from "@faker-js/faker";

let apiRequestContext: APIRequestContext;
let homepage: HomePage;
let ownerUnitsPage: OwnerUnitsPage;
let adminMainPage: AdminMainPage;
let editUnitPage: EditUnitPage;
let adminUnitsPage: AdminUnitsPage;
let adminUnitReviewPage: AdminUnitReviewPage;
let apiHelper: ApiHelper;
let accessUserToken: string;
let accessAdminToken: string;

const VALID_EMAIL: string = process.env.VALID_EMAIL || '';
const VALID_PASSWORD: string = process.env.VALID_PASSWORD || '';
const ADMIN_EMAIL: string = process.env.ADMIN_EMAIL || '';
const ADMIN_PASSWORD: string = process.env.ADMIN_PASSWORD || '';

let ownerUnitsPageUrl: string;
let unitName: string;
let createdUnitId: number;
let activeUnitName: string;

test.beforeAll(async () => {
    apiRequestContext = await request.newContext();
    apiHelper = new ApiHelper(apiRequestContext);
    accessUserToken = await apiHelper.createUserAccessToken(); 
    accessAdminToken = await apiHelper.createAdminAccessToken();
});

test.afterAll(async () => {
    await apiHelper.deleteAllUnits(accessUserToken)
});

test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page, apiRequestContext);
    ownerUnitsPage = new OwnerUnitsPage(page);
    adminMainPage = new AdminMainPage(page);
    editUnitPage = new EditUnitPage(page);
    adminUnitsPage= new AdminUnitsPage(page);
    adminUnitReviewPage = new AdminUnitReviewPage(page);
    
    await homepage.navigate('/');
    await homepage.clickOnClosePopUpBtn();
    await homepage.clickOnEnterBtn()
    await homepage.fillInput('email', VALID_EMAIL);
    await homepage.fillInput('password', VALID_PASSWORD);
    await homepage.clickOnSubmitLoginFormBtn();

    unitName = faker.string.alpha({length: 15});

    await homepage.clickOnUserIcon();
    await homepage.clickOnProfileMyAnnouncementsItem();

    ownerUnitsPageUrl = await homepage.getUrl();
    
    await expect(ownerUnitsPageUrl).toContain('owner-units-page');

    await ownerUnitsPage.clickOnActiveAnnouncementsTab();

    if(await ownerUnitsPage.activeAnnouncementsTabTitle.isVisible()) {
        await apiHelper.createUnit(accessUserToken, unitName);

        createdUnitId = await apiHelper.getUnitId(accessUserToken, unitName);

        await apiHelper.uploadUnitPhoto(accessUserToken, createdUnitId);
        await homepage.logoutUser();
        await homepage.loginUser(ADMIN_EMAIL, ADMIN_PASSWORD);
        await adminMainPage.moveAnnouncementToActiveState(createdUnitId.toString());
        await homepage.logoutUser();
        await homepage.loginUser(VALID_EMAIL, VALID_PASSWORD);
        await homepage.clickOnUserIcon();
        await homepage.clickOnProfileMyAnnouncementsItem();
        await ownerUnitsPage.clickOnActiveAnnouncementsTab();
    }
});

test('Test case C182: Edit Unit without changes', async({page}) => {
    const unitCardsLength = await ownerUnitsPage.getUnitCardsLength();

    if(unitCardsLength === 0) {
        await ownerUnitsPage.clickOnWaitingsAnnouncementsTab();
    }

    activeUnitName = await ownerUnitsPage.getFirstUnitNameText();

    await expect(unitCardsLength).not.toBe('');
    
    await ownerUnitsPage.clickOnEditUnitBtn();
   
    const editUnitPageUrl = await editUnitPage.getUrl();

    await expect(editUnitPageUrl).toContain('edit-unit');

    await editUnitPage.clickOnCancelUnitChangesBtn();

    await expect(ownerUnitsPageUrl).toContain('owner-units-page');

    await ownerUnitsPage.clickOnEditUnitBtn();
    await editUnitPage.clickOnSaveUnitChangesBtn();

    if(!await editUnitPage.successEditUnitMsg.isVisible()) {
        await editUnitPage.selectAdressOnMap()
    }

    await expect(editUnitPage.successEditUnitMsg).toBeVisible();
    await expect(editUnitPage.lookInMyAnnouncementsBtn).toBeVisible();

    await editUnitPage.clickOnLookInMyAnnouncementsBtn();

    if(unitCardsLength === 1) {
        await expect(ownerUnitsPage.activeAnnouncementsTabTitle).toBeVisible();
        await expect(await ownerUnitsPage.getActiveAnnouncementsTabTitleText()).toBe('У Вас поки немає активних оголошень');
        await adminUnitsPage.verifyEditedUnitPresentsInWaitingsTab('waitings', activeUnitName);
    }else if(unitCardsLength > 0 && unitCardsLength !== 1) {
        const editedUnitName = await ownerUnitsPage.verifyEditedUnitExludedFromUnitCards(unitName);

        await expect(editedUnitName).toBe('');
        await adminUnitsPage.verifyEditedUnitPresentsInWaitingsTab('actives', activeUnitName)
    }

    await apiHelper.deleteUnit(accessUserToken, createdUnitId);
})

test('Test case C272: Check ""Назва оголошення"" input field', async({page}) => {
    const nineCharStr = faker.string.alpha({length: 9});
    const over100CharStr = faker.string.alpha({length: 101});
    const tenCharStr = faker.string.alpha({length: 10});
    const inputValues = [
        '<>{};^',
        nineCharStr,
        over100CharStr
    ];

    const editedUnitName = await ownerUnitsPage.getFirstUnitNameText();

    await ownerUnitsPage.clickOnEditUnitBtn();
    await editUnitPage.clearUnitNameInput();
    await editUnitPage.clickOnSaveUnitChangesBtn();

    await expect(editUnitPage.unitNameInputError).toBeVisible();
    await expect(await editUnitPage.getUnitNameInputErrorText()).toBe('Це поле обов’язкове');

    for(const inputValue of inputValues) {
        await editUnitPage.fillUnitNameInput(inputValue);
        await editUnitPage.clickOnSaveUnitChangesBtn();

        switch(inputValue) {
            case '<>{};^':
                await expect(await editUnitPage.getUnitNameInputText()).toBe('');
                await expect(await editUnitPage.getUnitNameInputBgText()).toBe('Введіть назву оголошення');
                break

            case nineCharStr:
                await expect(editUnitPage.unitNameInputError).toBeVisible();
                await expect(await editUnitPage.getUnitNameInputErrorText()).toBe('У назві оголошення повинно бути не менше 10 символів');
                break

            case over100CharStr:
                await expect(editUnitPage.unitNameInputError).toBeVisible();
                await expect(await editUnitPage.getUnitNameInputErrorText()).toBe('У назві оголошення може бути не більше 100 символів');
                break
        }
    }

    await editUnitPage.clearUnitNameInput();

    await editUnitPage.fillUnitNameInput(tenCharStr);

    await expect(editUnitPage.unitNameInputError).not.toBeVisible();

    await editUnitPage.clickOnSaveUnitChangesBtn();

    if(!await editUnitPage.successEditUnitMsg.isVisible()) {
        await editUnitPage.selectAdressOnMap()
    }

    await expect(editUnitPage.successEditUnitMsg).toBeVisible();
    await expect(editUnitPage.lookInMyAnnouncementsBtn).toBeVisible();

    await adminUnitsPage.verifyEditedUnitPresentsInWaitingsTab('waitings', tenCharStr);

    await apiHelper.deleteUnit(accessUserToken, createdUnitId);
})

test('Test case C273: Check ""Виробник транспортного засобу"" input field', async({page}) => {
    const randomString = faker.string.alpha({length: 15});
    const randomChar = faker.string.alpha({length: 1});
    const editedUnitName = await ownerUnitsPage.getFirstUnitNameText();

    await ownerUnitsPage.clickOnEditUnitBtn();
    await editUnitPage.clickOnVehicleManufacturerInputCloseIcon();

    await expect(await editUnitPage.getVehicleManufacturerInputBgText()).toBe('Введіть виробника транспортного засобу');

    await editUnitPage.clickOnSaveUnitChangesBtn();

    if(!await editUnitPage.successEditUnitMsg.isVisible()) {
        await editUnitPage.selectAdressOnMap()
    }

    await expect(editUnitPage.vehicleManufacturerInputError).toBeVisible();
    await expect(await editUnitPage.getVehicleManufacturerInputErrorText()).toBe('Це поле обов’язкове');

    await editUnitPage.fillVehicleManufacturerInput('<>{};^');

    await expect(await editUnitPage.getUnitNameInputText()).toBe('');

    await editUnitPage.fillVehicleManufacturerInput(randomString);

    await expect(editUnitPage.vehicleManufacturerNotFoundMsg).toBeVisible();

    const notFoundMsg = await editUnitPage.getVehicleManufacturerNotFoundMsgText(); 
    const capitalizedRandomString = randomString.charAt(0).toUpperCase() + randomString.slice(1);

    await expect(notFoundMsg).toBe(`На жаль, виробника “${capitalizedRandomString}“ не знайдено в нашій базі.
Щоб додати виробника - зв\`яжіться із службою підтримки`);

    await editUnitPage.clearVehicleManufacturerInput();
    await editUnitPage.fillVehicleManufacturerInput(randomChar);

    await expect(editUnitPage.vehicleManufacturerDropDown).toBeVisible();

    await editUnitPage.selectFirstVehicleManufacturerOption();

    const selectedOptionText = await editUnitPage.getVehicleManufacturerInputSelectedOptionText();

    await expect(editUnitPage.vehicleManufacturerInputError).not.toBeVisible();
    await expect(editUnitPage.vehicleManufacturerInputCloseIcon).toBeVisible();

    await editUnitPage.clickOnSaveUnitChangesBtn();

    await adminUnitsPage.verifyEditedUnitPresentsInWaitingsTab('waitings', editedUnitName);

    const activeTabClass = await adminUnitsPage.activesTab.getAttribute('class')

    if(activeTabClass?.includes('AdminUnits_active')) {
        await adminUnitsPage.clickOnAdminShowIcon();
    }else{
        await adminUnitsPage.clickOnAdminWatchUnitIcon();
    }

    await expect(await adminUnitReviewPage.getManufacturerFieldText()).toBe(selectedOptionText);
    
    await apiHelper.deleteUnit(accessUserToken, createdUnitId);
})

test('Test case C532: Check ""Check ""Назва моделі"" input field', async({page}) => {
    const random15CharString = faker.string.alpha({length: 15});
    const random16CharString = faker.string.alpha({length: 16});
    const editedUnitName = await ownerUnitsPage.getFirstUnitNameText();

    await ownerUnitsPage.clickOnEditUnitBtn();

    await expect(await editUnitPage.getModelNameInputBgText()).toBe('Введіть назву моделі');

    await editUnitPage.fillModelNameInput('<>{};^');

    await expect(await editUnitPage.getModelNameInputText()).toBe('');

    await editUnitPage.fillModelNameInput(random16CharString);

    await expect(editUnitPage.modelNameInputError).toBeVisible();
    await expect(await editUnitPage.getModelNameInputErrorText()).toBe('У назві моделі може бути не більше 15 символів')

    await editUnitPage.fillModelNameInput(random15CharString);

    await editUnitPage.clickOnSaveUnitChangesBtn();

    if(!await editUnitPage.successEditUnitMsg.isVisible()) {
        await editUnitPage.selectAdressOnMap()
    }

    await adminUnitsPage.verifyEditedUnitPresentsInWaitingsTab('waitings', editedUnitName);

    const activeTabClass = await adminUnitsPage.activesTab.getAttribute('class')

    if(activeTabClass?.includes('AdminUnits_active')) {
        await adminUnitsPage.clickOnAdminShowIcon();
    }else{
        await adminUnitsPage.clickOnAdminWatchUnitIcon();
    }

    await expect(await adminUnitReviewPage.getModelNameFieldText()).toBe(random15CharString);
    
    await apiHelper.deleteUnit(accessUserToken, createdUnitId);
})

test('Test case C533: Check ""Технічні характеристики"" input field', async({page}) => {
    const randomDescription = faker.lorem.sentence();
    const editedUnitName = await ownerUnitsPage.getFirstUnitNameText();

    await ownerUnitsPage.clickOnEditUnitBtn();
    await editUnitPage.clearTechnicalCharacteristicsInput();

    await expect(await editUnitPage.getTechnicalCharacteristicsInputText()).toBe('');

    await editUnitPage.clickOnSaveUnitChangesBtn();

    if(!await editUnitPage.successEditUnitMsg.isVisible()) {
        await editUnitPage.selectAdressOnMap()
    }

    await expect(editUnitPage.successEditUnitMsg).toBeVisible();
    await expect(editUnitPage.lookInMyAnnouncementsBtn).toBeVisible();

    await editUnitPage.clickOnLookInMyAnnouncementsBtn();
    await ownerUnitsPage.clickOnWaitingsAnnouncementsTab();
    await ownerUnitsPage.clickOnEditWaitingsUnitBtn();

    await expect(await editUnitPage.getTechnicalCharacteristicsInputText()).toBe('');

    await editUnitPage.fillTechnicalCharacteristicsInput('<>&{};^');

    await expect(await editUnitPage.getTechnicalCharacteristicsInputText()).toBe('');

    await editUnitPage.fillTechnicalCharacteristicsInput(randomDescription);
    await editUnitPage.clickOnSaveUnitChangesBtn();

    await expect(editUnitPage.successEditUnitMsg).toBeVisible();
    await expect(await editUnitPage.getSuccessEditUnitMsgText()).toBe('Вашe оголошення успішно відредаговане');
    await expect(editUnitPage.lookInMyAnnouncementsBtn).toBeVisible();

    await adminUnitsPage.verifyEditedUnitPresentsInWaitingsTab('waitings', editedUnitName);

    const activeTabClass = await adminUnitsPage.activesTab.getAttribute('class')

    if(activeTabClass?.includes('AdminUnits_active')) {
        await adminUnitsPage.clickOnAdminShowIcon();
    }else{
        await adminUnitsPage.clickOnAdminWatchUnitIcon();
    }

    await expect(await adminUnitReviewPage.getTechnicalCharacteristicsFieldText()).toBe(randomDescription);

    await apiHelper.deleteUnit(accessUserToken, createdUnitId);
})

test('Test case C534: Check ""Опис"" input field', async({page}) => {
    const randomDescription = faker.lorem.sentence();
    const editedUnitName = await ownerUnitsPage.getFirstUnitNameText();

    await ownerUnitsPage.clickOnEditUnitBtn();
    await editUnitPage.clearDetailDescriptionInput();

    await expect(await editUnitPage.getDetailDescriptionInputText()).toBe('');

    await editUnitPage.clickOnSaveUnitChangesBtn();

    if(!await editUnitPage.successEditUnitMsg.isVisible()) {
        await editUnitPage.selectAdressOnMap()
    }

    await expect(editUnitPage.successEditUnitMsg).toBeVisible();
    await expect(editUnitPage.lookInMyAnnouncementsBtn).toBeVisible();

    await editUnitPage.clickOnLookInMyAnnouncementsBtn();
    await ownerUnitsPage.clickOnWaitingsAnnouncementsTab();
    await ownerUnitsPage.clickOnEditWaitingsUnitBtn();

    await expect(await editUnitPage.getDetailDescriptionInputText()).toBe('');

    await editUnitPage.fillDetailDescriptionInput('<>&{};^');

    await expect(await editUnitPage.getDetailDescriptionInputText()).toBe('');

    await editUnitPage.fillDetailDescriptionInput(randomDescription);
    await editUnitPage.clickOnSaveUnitChangesBtn();

    await expect(editUnitPage.successEditUnitMsg).toBeVisible();
    await expect(await editUnitPage.getSuccessEditUnitMsgText()).toBe('Вашe оголошення успішно відредаговане');
    await expect(editUnitPage.lookInMyAnnouncementsBtn).toBeVisible();

    await adminUnitsPage.verifyEditedUnitPresentsInWaitingsTab('waitings', editedUnitName);

    const activeTabClass = await adminUnitsPage.activesTab.getAttribute('class');

    if(activeTabClass?.includes('AdminUnits_active')) {
        await adminUnitsPage.clickOnAdminShowIcon();
    }else{
        await adminUnitsPage.clickOnAdminWatchUnitIcon();
    }

    await expect(await adminUnitReviewPage.getDetailDescriptionFieldText()).toBe(randomDescription);

    await apiHelper.deleteUnit(accessUserToken, createdUnitId);
})

test('Test case C535: Check ""Місце розташування технічного засобу"" functionality', async({page}) => {
    const editedUnitName = await ownerUnitsPage.getFirstUnitNameText();

    await ownerUnitsPage.clickOnEditUnitBtn();
    await editUnitPage.clickOnSelectOnMapBtn();

    await expect(editUnitPage.mapPopUp).toBeVisible();
    
    let initialZoomValue = await editUnitPage.getMapZoomValue();

    await editUnitPage.clickOnMapPopUpZoomInBtn();

    let zoomInValue = await editUnitPage.getMapZoomValue();

    await expect(initialZoomValue).not.toBe(zoomInValue);

    await editUnitPage.clickOnMapPopUpZoomOutBtn();

    let zoomOutValue = await editUnitPage.getMapZoomValue();

    await expect(zoomInValue).not.toBe(zoomOutValue);

    await editUnitPage.scrollMouseOnMap(100);

    let scrolledZoomOutValue = await editUnitPage.getMapZoomValue();

    await expect(scrolledZoomOutValue).not.toBe(zoomOutValue);

    await editUnitPage.scrollMouseOnMap(-100);

    let scrolledZoomInValue = await editUnitPage.getMapZoomValue();

    await expect(scrolledZoomInValue).not.toBe(scrolledZoomOutValue);

    const initialLocation = await editUnitPage.getMapPopUpLocationText();
    let choosenLocation;

    do{
        await editUnitPage.clickOnMap();
        choosenLocation = await editUnitPage.getMapPopUpLocationText();
    }while(choosenLocation.includes('Ентузіастів'));

    await expect(choosenLocation).not.toBe(initialLocation);

    await editUnitPage.clickOnMapPopUpConfirmChoiseBtn();

    await expect(await editUnitPage.getUrl()).toContain('edit-unit');
    await expect(editUnitPage.mapPopUp).not.toBeVisible();
    await expect(await editUnitPage.getVehicleLocationText()).toBe(choosenLocation);

    await editUnitPage.clickOnSaveUnitChangesBtn();

    await expect(editUnitPage.successEditUnitMsg).toBeVisible();
    await expect(await editUnitPage.getSuccessEditUnitMsgText()).toBe('Вашe оголошення успішно відредаговане');
    await expect(editUnitPage.lookInMyAnnouncementsBtn).toBeVisible();
})