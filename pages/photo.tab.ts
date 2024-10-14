import { Page as PlaywrightPage, expect } from '@playwright/test';
import Page from './page';
import path from 'path';
import testData from '../data/test_data.json' assert {type: 'json'};

const photoFileNames = testData['photo file names'];

class PhotoTab extends Page {  

    constructor(page: PlaywrightPage) {
        super(page);
        } 
    
    imageBlocks =  this.page.locator('[data-testid="imageBlock"]');
    uploadFileInput = this.page.locator('[data-testid="input_ImagesUnitFlow"]');
    invalidPhotoPopUp = this.page.locator('[data-testid="errorPopup"]');
    closePopUpBtn = this.page.locator('[data-testid="closeIcon"]');
    submitPopUpBtn = this.page.locator('[class*="ItemButtons_darkBlueBtn"]');
    elementOutsidePopUp = this.page.locator('[class*="NavbarCatalog_wrapper"]');
    prevBtn = this.page.locator('[data-testid="prevButton"]');
    uploadPhotoClueLine = this.page.locator('div[data-testid="description"]');
    photoTabTitle = this.page.locator('div[class="ImagesUnitFlow_paragraph__gQRyS"]');
    firstImgLable = this.page.locator('[data-testid="mainImageLabel"]');
    deleteImgIcons = this.page.locator('[data-testid="deleteImage"]');
    unitImages = this.page.locator('[data-testid="unitImage"]');


    async uploadPhoto() {
        await this.imageBlocks.nth(0).focus();
        await this.uploadFileInput.setInputFiles(path.resolve('data/photo/pexels-mikebirdy-170811.jpg'));
    }

    async uploadTwoSamePhotos() {
        for(let i = 0; i < 2; i++) {
            await this.imageBlocks.nth(i).focus();
            await this.uploadFileInput.setInputFiles(path.resolve('data/photo/pexels-mikebirdy-170811.jpg'));
        }
    }

    async checkInvalidPhotoPopUpVisibility(visibility: boolean) {
        if(visibility !== true) {
            await expect(this.invalidPhotoPopUp).not.toBeVisible();
        }else {
            await expect(this.invalidPhotoPopUp).toBeVisible();
        }
    }

    async checkInvalidPhotoPopUpText(expectedText: string) {
        const currentText = await this.invalidPhotoPopUp.innerText();
        await expect(currentText).toContain(expectedText);
    }

    async clickOnClosePopUpBtn() {
        await this.closePopUpBtn.click();
    }

    async checkOneImgUploaded() {
        let imageUploaded;
        for(let i = 0; i < 2; i++) {
            imageUploaded = await this.imageBlocks.nth(i).getAttribute('draggable');
            if(i === 0) {
                await expect(imageUploaded).toBe('true');
            }else {
                await  expect(imageUploaded).toBe('false');
            }
        }
    }

    async clickOnSubmitPopUpBtn() {
        await this.submitPopUpBtn.click();
    }

    async clickOutsidePopUp() {
        await this.elementOutsidePopUp.click({force: true});
    }

    async uploadIncorrectFileType() {
            await this.imageBlocks.nth(0).focus();
            await this.uploadFileInput.setInputFiles(path.resolve('data/test.txt'));
    }

    async checkIncorectFileNotUploaded() {
       let imageUploaded = await this.imageBlocks.nth(0).getAttribute('draggable');
       await expect(imageUploaded).toBe('false');
    }

    async checkSubmitPopUpBtnText(expectedText: string) {
        const currentText = await this.submitPopUpBtn.textContent();
        await expect(currentText).toBe(expectedText);
    }

    async uploadIncorrectFileSize() {
        await this.imageBlocks.nth(0).focus();
        await this.uploadFileInput.setInputFiles(path.resolve('data/photo/21mb.jpg'));
    }

    async checkPrevBtnText(expectedText: string) {
        const currentText = await this.prevBtn.innerText();
        await expect(currentText).toBe(expectedText);
    }
    
    async clickOnPrevBtn() {
        await this.prevBtn.click();
    }
    
    async checkPhotoNotUploadedError(expectedText: string) {
        const borderColor = await this.uploadPhotoClueLine.evaluate((el: any) => window.getComputedStyle(el).borderColor);
        const currentText = await this.uploadPhotoClueLine.innerText();

        await expect(this.uploadPhotoClueLine).toBeVisible();
        await expect(borderColor).toBe('rgb(247, 56, 89)');
        await expect(currentText).toContain(expectedText);
    }

    async checkPhotoTabTitle(expectedText: string) {
        const currentText = await this.photoTabTitle.innerText();
        await expect(this.photoTabTitle).toBeVisible();
        await expect(currentText).toContain(expectedText);
        await expect(currentText).toContain('*');
    }

    async checkUploadPhotoClueLine(expectedText: string) {
        const currentText = await this.uploadPhotoClueLine.innerText();

        await expect(currentText).toContain(expectedText);
    }

    async clickOnImageBlock() {
        await this.imageBlocks.first().click();
    }

    async checkFileChooserIsDisplayed() {
        const imageBlockItems = await this.imageBlocks.all();
        for(let i = 0; i < imageBlockItems.length; i++) {
            const [fileChooser] = await Promise.all([
                this.page.waitForEvent('filechooser'),
                this.imageBlocks.nth(i).click()
            ])
            expect(fileChooser).toBeDefined();
        }
    }

    async uploadToTwelvePhotos(minPhotoCount: number) {
        const randomNumber = Math.floor(Math.random() * (13 - minPhotoCount)) + minPhotoCount;
        for(let i = 1; i <= randomNumber; i++) {
            await this.imageBlocks.nth(i - 1).focus();
            await this.uploadFileInput.setInputFiles(path.resolve(`data/photo/${photoFileNames[i - 1]}.jpg`));
            await this.page.waitForLoadState('networkidle')
        }
    }

    async checkFirstImgLable(expectedText: string) {
        const currentText = await this.firstImgLable.innerText();
        await expect(this.firstImgLable).toBeVisible();
        await expect(currentText).toBe(expectedText);
    }

    async checkSwitchingImages() {
        const imageBlockItems = await this.imageBlocks.all();
        const imagesCount = imageBlockItems.length;
        const maxIndex = imagesCount - 1;
        const firstImageAttrBefore = await this.unitImages.first().getAttribute('src');

        for(let i = maxIndex; i > 0; i--) {
            let imgSrcAttr = await this.unitImages.nth(i).getAttribute('src');
            if(imgSrcAttr !== '') {
                await this.imageBlocks.nth(i).dragTo(this.imageBlocks.first());
                await this.page.waitForLoadState('load');

                const firstImageAttrAfter = await this.unitImages.first().getAttribute('src');

                await expect(firstImageAttrBefore).not.toBe(firstImageAttrAfter);
            }
        }
    }

    async checkDeleteImgIconAppears() {
        const imageBlockItems = await this.imageBlocks.all();
        const imagesCount = imageBlockItems.length;
        const maxIndex = imagesCount - 1;

        for(let i = maxIndex; i >= 0; i--) {
            let imgSrcAttr = await this.unitImages.nth(i).getAttribute('src');
            if(imgSrcAttr !== '') {
                await this.imageBlocks.nth(i).hover();
                await expect(this.deleteImgIcons.nth(i)).toBeVisible();
            }
        }
    }

    async checkDeletingImages() {
        const imageBlockItems = await this.imageBlocks.all();
        const maxIndex = imageBlockItems.length - 1;
        let imgSrcAttr;

        for(let i = maxIndex; i >= 0; i--) {
            imgSrcAttr = await this.unitImages.nth(i).getAttribute('src');

            if(imgSrcAttr !== '') {
                await this.imageBlocks.nth(i).hover();
                await this.deleteImgIcons.nth(i).click();

                imgSrcAttr = await this.unitImages.nth(i).getAttribute('src');
                
                await expect(imgSrcAttr).toBe('');
            }
        }
    }
 }

export default PhotoTab;