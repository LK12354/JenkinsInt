import {expect} from '@playwright/test';
require('dotenv').config({ path: './env/.env' });

export class loginPage {
    constructor(page) {
        this.page = page;
        this.loginInput = page.locator("//input[@name='login']");
        this.passwordInput = page.locator("//input[@name='password']");
        this.loginButton = page.locator("//button[text()='Login']");
        this.errorMessage = page.locator("//span[@text()='Invalid username/password']");
    }

    async login(){
        expect(this.loginInput).toBeVisible();
        expect(this.passwordInput).toBeVisible();
        expect(this.loginButton).toBeVisible();

        await this.loginInput.fill(process.env.login);
        await this.passwordInput.fill(process.env.password);
        await this.loginButton.click();
    }

}