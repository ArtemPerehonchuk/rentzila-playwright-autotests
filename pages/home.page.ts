import { Page as PlaywrightPage, Locator, expect, request, APIRequestContext } from '@playwright/test';
import Page from './page';
import ApiHelper from '../helpers/api.helper';


class HomePage extends Page {
    
    public locators: { [key: string]: Locator };
    private apiHelper?: ApiHelper;

    constructor(page: PlaywrightPage, request?: APIRequestContext) {
        super(page);
        if(request) {
            this.apiHelper = new ApiHelper(request);
        }
        this.locators = {
            servicesContainer: this.page.locator('[data-testid="services"]'),
            servicesList: this.page.locator('div[class*="RentzilaProposes_categories_list"] > div[class*="RentzilaProposes_service"]'),
            servicesUnitsList: this.page.locator('div[class*="RentzilaProposes_proposes_list"]').first().locator('div[class*="RentzilaProposes_proposes_item"]'),
            announcementsNavMenuItem: this.page.getByTestId('Navbar').getByRole('link', { name: 'Оголошення', exact: true }),
            specialEquipmentContainer: this.page.getByTestId('specialEquipment'),
            specialEquipmentsList: this.page.locator('div[class*="RentzilaProposes_categories_list"]').nth(1).locator('div[class*="RentzilaProposes_service"]'),
            specialEquipmentsUnitsList: this.page.locator('div[class*="RentzilaProposes_proposes_list"]').nth(1).locator('div[class*="RentzilaProposes_proposes_item"]'),
            footerContainer: this.page.locator('div[class*="Footer_footer__Dhw_9"]'),
            footerRentzilaLogo: this.page.locator('div[class*="Footer_container"] > div[data-testid="logo"]'),
            aboutUsTitle: this.page.getByTestId('content'),
            privacyPolicyLink: this.page.getByTestId('politika-konfidenciinosti'),
            cookiePolicyLink: this.page.getByTestId('pravila-vikoristannya-failiv-cookie'),
            termsConditionsLink: this.page.getByTestId('umovi-dostupu-ta-koristuvannya'),
            announcementsLink: this.page.locator('[role="listitem"]').getByText('Оголошення'),
            tendersLink: this.page.locator('[role="listitem"] > a').getByText('Тендери'),
            jobRequestsLink: this.page.locator('[role="listitem"] > a').getByText('Запити на роботу'),
            contactsTitle: this.page.locator('div[class*="RentzilaContacts_title"]'),
            contactsEmail: this.page.locator('a[class*="RentzilaContacts_email"]'),
            copyrightLabel: this.page.getByTestId('copyright'),
            searchServicesSpecialEquipmentTitle: this.page.locator('h1[class*="HeroSection_title"]'),
            consultationForm: this.page.locator('div[class*="ConsultationForm_container"]'),
            submitConsultationBtn: this.page.locator('button[type="submit"]'),
            consultationFormErrorMessage: this.page.locator('p[class*="ConsultationForm_error_message"]'),
            consultationFormNameInput: this.page.locator('input[placeholder="Ім\'я"]'),
            consultationFormPhoneInput: this.page.locator('input[placeholder="Номер телефону"]'),
            enterBtn: this.page.locator('[class*="NavbarAuthBlock_buttonEnter"]'),
            loginEmailOrPhoneInput: this.page.locator('#email'),
            loginPasswordInput: this.page.locator('#password'),
            loginErrorInputsMsg: this.page.locator('p[class*="CustomReactHookInput_error_message"]'),
            autorizationForm: this.page.locator('[data-testid="authorizationContainer"]'),
            submitLoginFormBtn: this.page.locator('button[type="submit"]').getByText('Увійти'),
            hidePasswordIcon: this.page.locator('div[data-testid="reactHookButton"]'),
            userIcon: this.page.locator('div[data-testid="avatarBlock"]'),
            profileDropDown: this.page.locator('[class*="ProfileDropdownMenu_container"]'),
            profileDropDownEmail: this.page.locator('div[data-testid="email"]'),
            profileLogoutBtn: this.page.locator('div[data-testid="logout"]'),
            myProfileMenuItem: this.page.locator('div[data-testid="profile"]'),
            loginFormErrorMsg: this.page.locator('div[data-testid="errorMessage"]')
        };
    }

    async scrollToServicesContainer() {
        await this.locators.servicesContainer.scrollIntoViewIfNeeded();
    }

    async scrollToSpicialEquipmentContainer() {
        await this.locators.specialEquipmentContainer.scrollIntoViewIfNeeded();
    }

    async checkServices() {
        await expect(this.locators.servicesContainer).toBeVisible();
        await expect(this.locators.servicesList.first()).toBeVisible();
        
        const servicesUnitsCount = await this.locators.servicesUnitsList.count(); 
        await expect(this.locators.servicesUnitsList.first()).toBeVisible();
        await expect(servicesUnitsCount).toBe(7);
    }

    async checkSpecialEquipments() {
        await expect(this.locators.specialEquipmentContainer).toBeVisible();
        await expect(this.locators.specialEquipmentsList.first()).toBeVisible();
        
        const specialEquipmentsCount = await this.locators.specialEquipmentsUnitsList.count(); 
        await expect(this.locators.specialEquipmentsUnitsList.first()).toBeVisible();
        await expect(specialEquipmentsCount).toBe(7);
    }

    async clickFirstServicesUnit() {
        await this.locators.servicesUnitsList.first().click();
    }

    async clickFirstSpecialEquipmentUnit() {
        await this.locators.specialEquipmentsUnitsList.first().click()
    }

    async getFirstServicesUnitName(): Promise<string> {
        return await this.locators.servicesUnitsList.first().innerText();
    }

    async getFirstSpecialEquipmentsUnitName(): Promise<string> {
        return await this.locators.specialEquipmentsUnitsList.first().innerText();
    }

    async clickOnAnnouncementsNavMenuItem() {
        await this.locators.announcementsNavMenuItem.click({force: true});
    }

    async scrollToFooter() {
        await this.locators.footerContainer.scrollIntoViewIfNeeded();
    }
    
    async checkFooter() {
        await expect(this.locators.footerContainer).toBeVisible();
    }

    async checkFooterElementsAreDisplayed() {
        await expect(this.locators.aboutUsTitle).toBeVisible();
        await expect(this.locators.privacyPolicyLink).toBeVisible();
        await expect(this.locators.cookiePolicyLink).toBeVisible();
        await expect(this.locators.termsConditionsLink).toBeVisible();
        await expect(this.locators.announcementsLink).toBeVisible();
        await expect(this.locators.tendersLink).toBeVisible();
        await expect(this.locators.jobRequestsLink).toBeVisible();
        await expect(this.locators.contactsTitle).toBeVisible();
        await expect(this.locators.contactsEmail).toBeVisible();
        await expect(this.locators.footerRentzilaLogo).toBeVisible();
        await expect(this.locators.copyrightLabel).toBeVisible();
    }

    async clickOnPrivacyPolicyLink() {
        await this.locators.privacyPolicyLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickOnCookiePolicyLink() {
        await this.locators.cookiePolicyLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickOnTermsConditionsLink() {
        await this.locators.termsConditionsLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickOnAnnouncementsLink() {
        await this.locators.announcementsLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async checkSearchServiceSpecialEquipmentTitle() {
        await expect(await this.locators.searchServicesSpecialEquipmentTitle.innerText()).toContain('Сервіс пошуку');
    }

    async clickOnTendersLink() {
        await this.locators.tendersLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async clickOnContactsEmail() {
        await this.locators.contactsEmail.click();
    }

    async checkContactsEmail() {
        const emailAttr = await this.locators.contactsEmail.getAttribute('href');
        await expect(emailAttr).toContain('mailto:')
    }

    async scrollToConsultationForm() {
        await this.locators.consultationForm.scrollIntoViewIfNeeded();
    }

    async checkConsultationFormIsVisible() {
        await expect(this.locators.consultationForm).toBeVisible();
    }

    async clickOnSubmitConsultationBtn() {
        await this.locators.submitConsultationBtn.click();
        await this.page.waitForTimeout(3000);
    }

    async checkInputError(inputName: string) {
        const inputValues = {
            name: await this.locators.consultationFormNameInput.evaluate((el) => (el as HTMLInputElement).value),
            phone: await this.locators.consultationFormPhoneInput.evaluate((el) => (el as HTMLInputElement).value),
            email: await this.locators.loginEmailOrPhoneInput.evaluate((el) => (el as HTMLInputElement).value),
            password: await this.locators.loginPasswordInput.evaluate((el) => (el as HTMLInputElement).value)
        };
    
        const showError = async (inputLocator: any, errorLocator: any, errorIndex: number) => {
            const borderColor = await inputLocator.evaluate((el: any) => window.getComputedStyle(el).borderColor);
            await expect(borderColor).toBe('rgb(247, 56, 89)');
            await expect(errorLocator.nth(errorIndex)).toBeVisible();
            const errorMessageText = await errorLocator.nth(errorIndex).innerText();
            await expect(errorMessageText).toBe('Поле не може бути порожнім');
            return true;
        };
    
        if (inputName === 'name' && inputValues.name === '') {
            return await showError(this.locators.consultationFormNameInput, this.locators.consultationFormErrorMessage, 0);
        }
    
        if (inputName === 'phone' && inputValues.phone === '') {
            const errorIndex = inputValues.name === '' ? 1 : 0;
            return await showError(this.locators.consultationFormPhoneInput, this.locators.consultationFormErrorMessage, errorIndex);
        }

        if (inputName === 'email' && inputValues.email === '') {
            return await showError(this.locators.loginEmailOrPhoneInput, this.locators.loginErrorInputsMsg, 0);
        }
        if (inputName === 'password' && inputValues.password === '') {
            const errorIndex = inputValues.email === '' ? 1 : 0;
            return await showError(this.locators.loginPasswordInput, this.locators.loginErrorInputsMsg, errorIndex);
        }
    
        return false;
    }

    async fillInput(inputName: string, inputValue: string) {
        if (inputValue !== '') {
            switch (inputName) {
                case 'name':
                    await this.locators.consultationFormNameInput.fill(inputValue);
                    break;
                case 'phone':
                    await this.locators.consultationFormPhoneInput.fill(inputValue);
                    break;
                case 'email':
                    await this.locators.loginEmailOrPhoneInput.fill(inputValue);
                    break;
                case 'password':
                    await this.locators.loginPasswordInput.fill(inputValue);
                    break;
                default:
                    throw new Error(`Unknown input name: ${inputName}`);
            }
        }
    }

    async clickOnPhoneInput() {
        await this.locators.consultationFormPhoneInput.click();
    }

    async checkPhoneInputAfterClick() {
        const inputPhoneValue = await this.locators.consultationFormPhoneInput.evaluate((el) => {
            return (el as HTMLInputElement).value;
        });
        await expect(inputPhoneValue).toBe('+380')
    }

    async clearInput(inputName: string) {
        switch(inputName) {
            case 'name':
                await this.locators.consultationFormNameInput.clear();
                break;
            case 'phone':
                await this.locators.consultationFormPhoneInput.clear();
                break;
            case 'email':
                await this.locators.loginEmailOrPhoneInput.clear();
                break;
            case 'password':
                await this.locators.loginPasswordInput.clear();
                break;
            default:
                throw new Error(`Unknown input name: ${inputName}`);
        }
    }

    async checkIncorrectPhoneErrorMsg() {
        const phoneBorderColor = await this.locators.consultationFormPhoneInput.evaluate((el) => {
            return window.getComputedStyle(el).borderColor;
        });
        await expect(phoneBorderColor).toBe('rgb(247, 56, 89)');
        await expect(this.locators.consultationFormErrorMessage.first()).toBeVisible();
        const consultationFormPhoneErrorMessageText = await this.locators.consultationFormErrorMessage.first().innerText();
        await expect(consultationFormPhoneErrorMessageText).toBe('Телефон не пройшов валідацію');
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

        const containsUser = userList.some((user: any) => 
            user.name === userName && user.phone === userPhone
        );

        await expect(containsUser).toBe(true);
    }

    async clickOnEnterBtn() {
        await this.locators.enterBtn.click();
    }

    async checkAutorizationFormIsDisplayed() {
        await expect(this.locators.autorizationForm).toBeVisible();
    }

    async clickOnSubmitLoginFormBtn() {
        await this.locators.submitLoginFormBtn.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async checkInputValue(inputName: string, inputValue: string) {
        switch(inputName) {
            case 'email':
                await expect(await this.locators.loginEmailOrPhoneInput.inputValue()).toBe(inputValue);
                break

            case 'password':
                await expect(await this.locators.loginPasswordInput.inputValue()).toBe(inputValue);
                break
        }
    }

    async clickOnHidePasswordIcon() {
        await this.locators.hidePasswordIcon.click();
    }

    async checkPasswordInputType(typeName: string) {
        const passwordInputType = await this.locators.loginPasswordInput.getAttribute('type')
        switch(typeName){
            case 'hidden':
                await expect(passwordInputType).toBe('password');
                break;
            
            case 'shown':
                await expect(passwordInputType).toBe('text');
                break;
        }
    }

    async checkUserIconIsDisplayed(shouldBeVisible: boolean) {
        if(shouldBeVisible) {
            await expect(this.locators.userIcon).toBeVisible();
        }else {
            await expect(this.locators.userIcon).not.toBeVisible();
        }
    }

    async clickOnUserIcon() {
        await this.locators.userIcon.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async checkProfileDropDownIsDisplayed() {
        await expect(this.locators.profileDropDown).toBeVisible();
    }

    async checkProfileDropDownEmail(expectedEmail: string) {
        const currentEmail = await this.locators.profileDropDownEmail.innerText();
        await expect(currentEmail).toBe(expectedEmail);
    }

    async logout() {
        await this.locators.profileLogoutBtn.click();
    }

    async clickOnMyProfileMenuItem() {
        await this.locators.myProfileMenuItem.click();
        await this.page.waitForTimeout(2000);
    }
    
    async checkIncorrectInputFormat() {
        await this.checkAutorizationFormIsDisplayed();
        await this.checkUserIconIsDisplayed(false);
        if (await this.locators.loginErrorInputsMsg.isVisible()) {
            await expect(this.locators.loginErrorInputsMsg).toBeVisible();
        } 
        else if (await this.locators.loginFormErrorMsg.isVisible()) {
            await expect(this.locators.loginFormErrorMsg).toBeVisible();
        }
    }
}

export default HomePage;
