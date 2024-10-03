import { Page as PlaywrightPage, expect, request, APIRequestContext } from '@playwright/test';
import Page from './page';
import ApiHelper from '../helpers/api.helper';


class HomePage extends Page {
    private apiHelper?: ApiHelper;

    constructor(page: PlaywrightPage, request?: APIRequestContext) {
        super(page);
        if(request) {
            this.apiHelper = new ApiHelper(request);
        }
    }

    servicesContainer = this.page.locator('[data-testid="services"]');
    servicesList = this.page.locator('div[class*="RentzilaProposes_categories_list"] > div[class*="RentzilaProposes_service"]');
    servicesUnitsList = this.page.locator('div[class*="RentzilaProposes_proposes_list"]').first().locator('div[class*="RentzilaProposes_proposes_item"]');
    announcementsNavMenuItem = this.page.locator('[class*="Navbar_link"][href="/products/"]');
    specialEquipmentContainer = this.page.getByTestId('specialEquipment');
    specialEquipmentsList = this.page.locator('div[class*="RentzilaProposes_categories_list"]').nth(1).locator('div[class*="RentzilaProposes_service"]');
    specialEquipmentsUnitsList = this.page.locator('div[class*="RentzilaProposes_proposes_list"]').nth(1).locator('div[class*="RentzilaProposes_proposes_item"]');
    footerContainer = this.page.locator('div[class*="Footer_footer__Dhw_9"]');
    footerRentzilaLogo = this.page.locator('div[class*="Footer_container"] > div[data-testid="logo"]');
    aboutUsTitle = this.page.getByTestId('content');
    privacyPolicyLink = this.page.getByTestId('politika-konfidenciinosti');
    cookiePolicyLink = this.page.getByTestId('pravila-vikoristannya-failiv-cookie');
    termsConditionsLink = this.page.getByTestId('umovi-dostupu-ta-koristuvannya');
    announcementsLink = this.page.locator('div[role="listitem"] > a[href="/products/"]');
    tendersLink = this.page.locator('div[role="listitem"] > a[href="/tenders-map/"]');
    jobRequestsLink = this.page.locator('div[role="listitem"] > a[href="/requests-map/"]');
    contactsTitle = this.page.locator('div[class*="RentzilaContacts_title"]');
    contactsEmail = this.page.locator('a[class*="RentzilaContacts_email"]');
    copyrightLabel = this.page.getByTestId('copyright');
    searchServicesSpecialEquipmentTitle = this.page.locator('h1[class*="HeroSection_title"]');
    consultationForm = this.page.locator('div[class*="ConsultationForm_container"]');
    submitConsultationBtn = this.page.locator('button[type="submit"]');
    consultationFormErrorMessage = this.page.locator('p[class*="ConsultationForm_error_message"]');
    consultationFormNameInput = this.page.locator('input[name="name"]');
    consultationFormPhoneInput = this.page.locator('#mobile');
    enterBtn = this.page.locator('[class*="NavbarAuthBlock_buttonEnter"]');
    loginEmailOrPhoneInput = this.page.locator('#email');
    loginPasswordInput = this.page.locator('#password');
    loginErrorInputsMsg = this.page.locator('p[class*="CustomReactHookInput_error_message"]');
    autorizationForm = this.page.locator('[data-testid="authorizationContainer"]');
    submitLoginFormBtn = this.page.locator('[class*="LoginForm_form"] [class*="ItemButtons_darkBlueRoundBtn"]');
    hidePasswordIcon = this.page.locator('div[data-testid="reactHookButton"]');
    userIcon = this.page.locator('div[data-testid="avatarBlock"]');
    profileDropDown = this.page.locator('[class*="ProfileDropdownMenu_container"]');
    profileDropDownEmail = this.page.locator('div[data-testid="email"]');
    profileLogoutBtn = this.page.locator('div[data-testid="logout"]');
    myProfileMenuItem = this.page.locator('div[data-testid="profile"]');
    invalidEmailOrPasswordError = this.page.locator('div[data-testid="errorMessage"]');
    createUnitBtn = this.page.locator('a[class*="Navbar_addAnnouncement"]');
    closePopUpBtn = this.page.locator('[data-testid="crossButton"]');
    

    async scrollToServicesContainer() {
        await this.servicesContainer.scrollIntoViewIfNeeded();
    }

    async scrollToSpecialEquipmentContainer() {
        await this.specialEquipmentContainer.scrollIntoViewIfNeeded();
    }

    async checkServices() {
        await expect(this.servicesContainer).toBeVisible();
        await expect(this.servicesList.first()).toBeVisible();
        
        const servicesUnitsCount = await this.servicesUnitsList.count(); 
        await expect(this.servicesUnitsList.first()).toBeVisible();
        await expect(servicesUnitsCount).toBe(7);
    }

    async checkSpecialEquipments() {
        await expect(this.specialEquipmentContainer).toBeVisible();
        await expect(this.specialEquipmentsList.first()).toBeVisible();
        
        const specialEquipmentsCount = await this.specialEquipmentsUnitsList.count(); 
        await expect(this.specialEquipmentsUnitsList.first()).toBeVisible();
        await expect(specialEquipmentsCount).toBe(7);
    }

    async clickFirstServicesUnit() {
        await this.servicesUnitsList.first().click();
    }

    async clickFirstSpecialEquipmentUnit() {
        await this.specialEquipmentsUnitsList.first().click()
    }

    async getFirstServicesUnitName(): Promise<string> {
        return await this.servicesUnitsList.first().innerText();
    }

    async getFirstSpecialEquipmentsUnitName(): Promise<string> {
        return await this.specialEquipmentsUnitsList.first().innerText();
    }

    async clickOnAnnouncementsNavMenuItem() {
        await this.announcementsNavMenuItem.click({force: true});
    }

    async scrollToFooter() {
        await this.footerContainer.scrollIntoViewIfNeeded();
    }
    
    async checkFooterContainerIsVisible() {
        await expect(this.footerContainer).toBeVisible();
    }

    async checkFooterElementsAreDisplayed() {
        await expect(this.aboutUsTitle).toBeVisible();
        await expect(this.privacyPolicyLink).toBeVisible();
        await expect(this.cookiePolicyLink).toBeVisible();
        await expect(this.termsConditionsLink).toBeVisible();
        await expect(this.announcementsLink).toBeVisible();
        await expect(this.tendersLink).toBeVisible();
        await expect(this.jobRequestsLink).toBeVisible();
        await expect(this.contactsTitle).toBeVisible();
        await expect(this.contactsEmail).toBeVisible();
        await expect(this.footerRentzilaLogo).toBeVisible();
        await expect(this.copyrightLabel).toBeVisible();
    }

    async clickOnPrivacyPolicyLink() {
        await this.privacyPolicyLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickOnCookiePolicyLink() {
        await this.cookiePolicyLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickOnTermsConditionsLink() {
        await this.termsConditionsLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickOnAnnouncementsLink() {
        await this.announcementsLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async checkSearchServiceSpecialEquipmentTitle(expectedTitle: string) {
        await expect(await this.searchServicesSpecialEquipmentTitle.innerText()).toContain(expectedTitle);
    }

    async clickOnTendersLink() {
        await this.tendersLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickOnContactsEmail() {
        await this.contactsEmail.click();
    }

    async checkContactsEmail(expectedEmail: string) {
        const emailAttr = await this.contactsEmail.getAttribute('href');
        await expect(emailAttr).toContain(expectedEmail)
    }

    async scrollToConsultationForm() {
        await this.consultationForm.scrollIntoViewIfNeeded();
    }

    async checkConsultationFormIsVisible() {
        await expect(this.consultationForm).toBeVisible();
    }

    async clickOnSubmitConsultationBtn() {
        await this.submitConsultationBtn.click();
        await this.page.waitForTimeout(3000);
    }

    async checkInputErrorIsDisplayed(inputName: string, errorText: string) {
        const inputValues = {
            name: await this.consultationFormNameInput.evaluate((el) => (el as HTMLInputElement).value),
            phone: await this.consultationFormPhoneInput.evaluate((el) => (el as HTMLInputElement).value),
            email: '',
            password: ''
        };

        if (await this.loginEmailOrPhoneInput.isVisible()) {
            inputValues.email = await this.loginEmailOrPhoneInput.evaluate((el) => (el as HTMLInputElement).value);
        }

        if (await this.loginPasswordInput.isVisible()) {
            inputValues.password = await this.loginPasswordInput.evaluate((el) => (el as HTMLInputElement).value);
        }
    
        const showError = async (inputLocator: any, errorLocator: any, errorIndex: number) => {
            const borderColor = await inputLocator.evaluate((el: any) => window.getComputedStyle(el).borderColor);
            await expect(borderColor).toBe('rgb(247, 56, 89)');
            await expect(errorLocator.nth(errorIndex)).toBeVisible();
            const errorMessageText = await errorLocator.nth(errorIndex).innerText();
            await expect(errorMessageText).toBe(errorText);
            return true;
        };
    
        if (inputName === 'name' && inputValues.name === '') {
            return await showError(this.consultationFormNameInput, this.consultationFormErrorMessage, 0);
        }
    
        if (inputName === 'phone' && inputValues.phone === '') {
            const errorIndex = inputValues.name === '' ? 1 : 0;
            return await showError(this.consultationFormPhoneInput, this.consultationFormErrorMessage, errorIndex);
        }

        if (inputName === 'email' && inputValues.email === '') {
            return await showError(this.loginEmailOrPhoneInput, this.loginErrorInputsMsg, 0);
        }
        if (inputName === 'password' && inputValues.password === '') {
            const errorIndex = inputValues.email === '' ? 1 : 0;
            return await showError(this.loginPasswordInput, this.loginErrorInputsMsg, errorIndex);
        }
    
        return false;
    }

    async fillInput(inputName: string, inputValue: string) {
        if (inputValue !== '') {
            switch (inputName) {
                case 'name':
                    await this.consultationFormNameInput.fill(inputValue);
                    break;
                case 'phone':
                    await this.consultationFormPhoneInput.fill(inputValue);
                    break;
                case 'email':
                    await this.loginEmailOrPhoneInput.fill(inputValue);
                    break;
                case 'password':
                    await this.loginPasswordInput.fill(inputValue);
                    break;
                default:
                    throw new Error(`Unknown input name: ${inputName}`);
            }
        }
    }

    async clickOnPhoneInput() {
        await this.consultationFormPhoneInput.click();
    }

    async checkPhoneInputAfterClick(expectedValue: string) {
        const inputPhoneValue = await this.consultationFormPhoneInput.evaluate((el) => {
            return (el as HTMLInputElement).value;
        });
        await expect(inputPhoneValue).toBe(expectedValue)
    }

    async clearInput(inputName: string) {
        switch(inputName) {
            case 'name':
                await this.consultationFormNameInput.clear();
                break;
            case 'phone':
                await this.consultationFormPhoneInput.clear();
                break;
            case 'email':
                await this.loginEmailOrPhoneInput.clear();
                break;
            case 'password':
                await this.loginPasswordInput.clear();
                break;
            default:
                throw new Error(`Unknown input name: ${inputName}`);
        }
    }

    async checkIncorrectPhoneErrorMsg(expectedText: string) {
        const phoneBorderColor = await this.consultationFormPhoneInput.evaluate((el) => {
            return window.getComputedStyle(el).borderColor;
        });
        await expect(phoneBorderColor).toBe('rgb(247, 56, 89)');
        await expect(this.consultationFormErrorMessage.first()).toBeVisible();
        const consultationFormPhoneErrorMessageText = await this.consultationFormErrorMessage.first().innerText();
        await expect(consultationFormPhoneErrorMessageText).toBe(expectedText);
    }

    async checkSuccessSubmitConsultationMsg() {
        await this.page.on('dialog', async (dialog) => {
            expect(dialog.type()).toBe('alert');
            await dialog.accept();
        });
    }

    async getUsersList() {
        if (this.apiHelper) {
            return await this.apiHelper.getUserDetails();
        }
    }

    async checkUserDetailsContainUser(userName: string, userPhone: string) {
        
        const userList = await this.getUsersList();

        const containsUser = userList.some((user: any) => {
            return user.name === userName && user.phone === userPhone
    });

        await expect(containsUser).toBe(true);
    }

    async clickOnEnterBtn() {
        await this.enterBtn.click();
        await this.page.waitForTimeout(2000);
    }

    async checkAutorizationFormIsDisplayed() {
        await expect(this.autorizationForm).toBeVisible();
    }

    async clickOnSubmitLoginFormBtn() {
        await this.submitLoginFormBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async checkInputValue(inputName: string, inputValue: string) {
        switch(inputName) {
            case 'email':
                await expect(await this.loginEmailOrPhoneInput.inputValue()).toBe(inputValue);
                break

            case 'password':
                await expect(await this.loginPasswordInput.inputValue()).toBe(inputValue);
                break
        }
    }

    async clickOnHidePasswordIcon() {
        await this.hidePasswordIcon.click();
    }

    async checkPasswordInputType(typeName: string, typeValue: string) {
        const passwordInputType = await this.loginPasswordInput.getAttribute('type')
        switch(typeName){
            case 'hidden':
                await expect(passwordInputType).toBe(typeValue);
                break;
            
            case 'shown':
                await expect(passwordInputType).toBe(typeValue);
                break;
        }
    }

    async checkUserIconIsDisplayed(shouldBeVisible: boolean) {
        if(shouldBeVisible) {
            await expect(this.userIcon).toBeVisible();
        }
    }

    async clickOnUserIcon() {
        await this.userIcon.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async checkProfileDropDownIsDisplayed() {
        await expect(this.profileDropDown).toBeVisible();
    }

    async checkProfileDropDownEmail(expectedEmail: string) {
        const currentEmail = await this.profileDropDownEmail.innerText();
        await expect(currentEmail).toBe(expectedEmail);
    }

    async logout() {
        await this.profileLogoutBtn.click();
    }

    async clickOnMyProfileMenuItem() {
        await this.myProfileMenuItem.click();
        await this.page.waitForTimeout(2000);
    }
    
    async checkIncorrectEmailOrPhoneInputFormat(expectedText: string) {
        await this.loginErrorInputsMsg.isVisible();
        const errorText = await this.loginErrorInputsMsg.innerText();
        await expect(errorText).toBe(expectedText);
    }

    async checkIncorrectPasswordInputFormat(incorrectFormatError: string, ivalidCredentialsError: string) {
        await this.checkAutorizationFormIsDisplayed();
        await this.checkUserIconIsDisplayed(false);

        if(await this.invalidEmailOrPasswordError.isVisible()) {
            const errorText = await this.invalidEmailOrPasswordError.innerText()
            await expect(errorText).toBe(ivalidCredentialsError);
        }
        else if(await this.loginErrorInputsMsg.isVisible()) {
            const errorText = await this.loginErrorInputsMsg.innerText()
            await expect(errorText).toContain(incorrectFormatError);
        }       
    }

    async clickOnCreateUnitBtn() {
        await this.createUnitBtn.click();
    }

    async clickOnClosePopUpBtn() {
        await this.closePopUpBtn.click();
    }
}

export default HomePage;
