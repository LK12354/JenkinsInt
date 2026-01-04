import {test} from '@playwright/test';
import {RegistrationPage} from '../POM/Registration.js';


const TestData2 = require('../TestData/registrationFailure.json');

test.describe('User Registration Tests', () => {

    test('@Sanity Successful User Registration', async ({page}) => {

        const TestData = require('../TestData/registrationSuccess.json');
        
        const RP = new RegistrationPage(page);
        await RP.navigate();
        await RP.fillRegistrationForm(TestData);
        await RP.submitForm();
        await RP.verifyRegistrationSuccess();
    });

    test('@sanity Registration with Existing Username leads to failure', async ({page}) => {

        const TestData = require('../TestData/registrationFailure.json');
        
        const RP = new RegistrationPage(page);
        await RP.navigate();
        await RP.fillRegistrationForm(TestData2);
        await RP.submitForm();
        await RP.verifyRegistrationFailure();
    });

});