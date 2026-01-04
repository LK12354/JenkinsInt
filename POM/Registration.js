import { expect } from '@playwright/test';
require('dotenv').config({ path: './env/.env' });

export class RegistrationPage {

    constructor(page) {
        this.page = page;

        this.RegistrationLink = page.locator("//a[text()='Register']");
        this.loginInput = page.locator("//label[text()='Login']//following::input[1]");
        this.firstNameInput = page.locator("//label[normalize-space()='First Name']//following::input[1]");
        this.lastNameInput = page.locator("//label[normalize-space()='Last Name']//following::input[1]");
        this.passwordInput = page.locator("//label[normalize-space()='Password']//following::input[1]");
        this.consirmPasswordInput = page.locator("//label[normalize-space()='Confirm Password']//following::input[1]");
        this.registerButton = page.locator("//button[text()='Register']");
        this.cancelLink = page.locator("//a[text()='Cancel']");
        this.successMessage = page.locator("//div[normalize-space()='Registration is successful']");
        this.failureMessage = page.locator("//div[normalize-space()='UsernameExistsException: User already exists']");
    }

    async navigate() {
        await this.page.goto(process.env.BaseURL);
        expect(this.page).toHaveURL(/.*justtestit.org/);
    }

    async fillRegistrationForm(TestData) {
        expect(this.RegistrationLink).toBeVisible();
        await this.RegistrationLink.click();

        expect(this.loginInput).toBeVisible();
        expect(this.firstNameInput).toBeVisible();
        expect(this.lastNameInput).toBeVisible();
        expect(this.passwordInput).toBeVisible();
        expect(this.consirmPasswordInput).toBeVisible();

        if (TestData.login !== undefined) {
            await this.loginInput.fill(TestData.login);
        }

        if (TestData.firstName !== undefined) {
            await this.firstNameInput.fill(TestData.firstName);
        }

        if (TestData.lastName !== undefined) {
            await this.lastNameInput.fill(TestData.lastName);
        }

        if (TestData.password !== undefined) {
            await this.passwordInput.fill(TestData.password);
        }

        if (TestData.confirmPassword !== undefined) {
            await this.consirmPasswordInput.fill(TestData.confirmPassword);
        }
    }

    async submitForm() {
        expect(this.registerButton).toBeVisible();
        expect(this.cancelLink).toBeVisible();
        await this.registerButton.click();
    }

    async verifyRegistrationSuccess() {
        await expect(this.successMessage).toBeVisible();
    }

    async verifyRegistrationFailure() {
        await expect(this.failureMessage).toBeVisible();
    }
}