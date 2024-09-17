import { Page as PlaywrightPage, Locator, expect, request, APIRequestContext } from '@playwright/test';
import Page from './page';
import ApiHelper from '../helpers/api.helper';


class HomePage extends Page {
    
    public locators: { [key: string]: Locator };
    private apiHelper: ApiHelper;

    constructor(page: PlaywrightPage, request: APIRequestContext) {
        super(page);
        this.apiHelper = new ApiHelper(request);
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
            consultationFormPhoneInput: this.page.locator('input[placeholder="Номер телефону"]')
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
    
        return false;
    }

    async fillInput(inputName: string, inputValue: string) {
        if(inputName == 'name' && inputValue !== '') {
            await this.locators.consultationFormNameInput.fill(inputValue);
        }else if(inputName == 'phone' && inputValue !== '') {
            await this.locators.consultationFormPhoneInput.fill(inputValue);
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
        if(inputName == 'name') {
            await this.locators.consultationFormNameInput.clear();
        }else if(inputName == 'phone') {
            await this.locators.consultationFormPhoneInput.clear();
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
        return await this.apiHelper.getUserDetails();
    }

    async checkUserDetailsContainUser(userName: string, userPhone: string) {
        const userList = await this.getUsersList();

        const containsUser = userList.some((user: any) => 
            user.name === userName && user.phone === userPhone
        );

        await expect(containsUser).toBe(true);
    }
}

export default HomePage;
