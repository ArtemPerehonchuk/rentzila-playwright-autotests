import { test, expect } from "@playwright/test";
import HomePage from '../pages/home.page';
import CreateUnitPage from '../pages/create.unit.page';
import PhotoTab from '../pages/photo.tab';
import ServicesTab from '../pages/services.tab'

const validEmail: string = process.env.VALID_EMAIL || '';
const validPassword: string = process.env.VALID_PASSWORD || '';

let createUnitPage: CreateUnitPage;
let homepage: HomePage;
let photoTab: PhotoTab;
let servicesTab: ServicesTab;

test.beforeEach(async ({ page }) => {
    homepage = new HomePage(page);
    createUnitPage = new CreateUnitPage(page);
    photoTab = new PhotoTab(page);
    servicesTab = new ServicesTab(page);

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
});

test.only('Test case C384: Verify same images uploading', async( {page} ) => {
    await photoTab.uploadTwoSamePhotos();
    await photoTab.checkInvalidPhotoPopUpVisibility(true);
    await photoTab.checkInvalidPhotoPopUpText('Ви не можете завантажити двічі один файл');
    await photoTab.clickOnClosePopUpBtn();
    await photoTab.checkInvalidPhotoPopUpVisibility(false);
    await photoTab.checkOneImgUploaded();
    await photoTab.uploadTwoSamePhotos();
    await photoTab.clickOnSubmitPopUpBtn();
    await photoTab.checkInvalidPhotoPopUpVisibility(false);
    await photoTab.checkOneImgUploaded();
    await photoTab.clickOutsidePopUp();
    await photoTab.checkInvalidPhotoPopUpVisibility(false);
    await photoTab.checkOneImgUploaded();
}) 

test('Test case C401: Verify uploading of invalid file type', async( {page} ) => {
    await photoTab.uploadIncorrectFileType();
    await photoTab.checkInvalidPhotoPopUpVisibility(true);
    await photoTab.checkInvalidPhotoPopUpText('Формат зображення не підтримується');
    await photoTab.clickOnClosePopUpBtn();
    await photoTab.checkInvalidPhotoPopUpVisibility(false);
    await photoTab.checkIncorectFileNotUploaded();
    await photoTab.uploadIncorrectFileType();
    await photoTab.checkSubmitPopUpBtnText('Зрозуміло');
    await photoTab.clickOnSubmitPopUpBtn();
    await photoTab.checkInvalidPhotoPopUpVisibility(false);
    await photoTab.checkIncorectFileNotUploaded();
    await photoTab.uploadIncorrectFileType();
    await photoTab.clickOutsidePopUp();
    await photoTab.checkInvalidPhotoPopUpVisibility(false);
    await photoTab.checkIncorectFileNotUploaded();
})

test('Test case C405: Verify uploading of invalid size file', async( {page} ) => {
    await photoTab.uploadIncorrectFileSize();
    await photoTab.checkInvalidPhotoPopUpVisibility(true);
    await photoTab.checkInvalidPhotoPopUpText('Ви не можете завантажити файл більше 20 МВ');
    await photoTab.clickOnClosePopUpBtn();
    await photoTab.checkInvalidPhotoPopUpVisibility(false);
    await photoTab.checkIncorectFileNotUploaded();
    await photoTab.uploadIncorrectFileSize();
    await photoTab.checkSubmitPopUpBtnText('Зрозуміло');
    await photoTab.clickOnSubmitPopUpBtn();
    await photoTab.checkInvalidPhotoPopUpVisibility(false);
    await photoTab.checkIncorectFileNotUploaded();
    await photoTab.uploadIncorrectFileSize();
    await photoTab.clickOutsidePopUp();
    await photoTab.checkInvalidPhotoPopUpVisibility(false);
    await photoTab.checkIncorectFileNotUploaded();
})

test('Test case 390: Verify ""Назад"" button', async({ page }) => {
    await photoTab.checkPrevBtnText('Назад');
    await photoTab.clickOnPrevBtn();
    await createUnitPage.checkCreateUnitTabsTitles(1);
    await createUnitPage.checkFieldsVisibility();
})

test('Test case 393: Verify ""Далі"" button', async({ page }) => {
    await createUnitPage.checkNextBtnText('Далі');
    await createUnitPage.clickOnNextBtn();
    await createUnitPage.checkCreateUnitTabsTitles(2);
    await photoTab.checkPhotoNotUploadedError('Додайте в оголошення від 1 до 12 фото технічного засобу');
    await photoTab.uploadPhoto();
    await createUnitPage.clickOnNextBtn();
    await createUnitPage.checkCreateUnitTitle('Створити оголошення');
    await createUnitPage.checkCreateUnitTabsTitles(3);
    await servicesTab.checkServicesFieldsVisibility();
})

test('Test case C593: Verify image uploading', async( {page}) => {
    await photoTab.checkPhotoTabTitle('Фото технічного засобу');
    await photoTab.checkUploadPhotoClueLine('Додайте в оголошення від 1 до 12 фото технічного засобу розміром до 20 МВ у форматі .jpg, .jpeg, .png. Перше фото буде основним');
    await photoTab.checkFileChooserIsDisplayed();  
    await photoTab.uploadToTwelvePhotos(1);
    await photoTab.checkFirstImgLable('Головне'); 
})

test('Test case C594: Verify image moving', async( {page}) => {
    await photoTab.uploadToTwelvePhotos(2);
    await photoTab.checkSwitchingImages();
})

test('Test case C595: Verify image deleting', async( {page}) => {
    await photoTab.uploadToTwelvePhotos(1);
    await photoTab.checkDeleteImgIconAppears();
    await photoTab.checkDeletingImages();
})