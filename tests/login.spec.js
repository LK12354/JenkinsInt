import {test,expect} from '@playwright/test';
import {loginPage} from '../POM/login.js';
import {RegistrationPage} from '../POM/Registration.js';

test('login with the user credential', async ({ page, request }) => {
    const registerPage = new RegistrationPage(page);
    const lp = new loginPage(page);

    await registerPage.navigate();
    await lp.login();

    // Testing API request for the failed post request

  const response = await request.post(
    'https://k51qryqov3.execute-api.ap-southeast-2.amazonaws.com/prod/oauth/token',
    {
      form: {
        grant_type: 'password',
        username: 'krishna',
        password: 'Krishna@123'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );

  console.log("Status:", response.status());

  const raw = await response.text();   
  console.log("Raw response:", raw);

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    body = raw;  
  }

  console.log("Parsed response:", body);
  expect(response.status()).toBe(200);
});