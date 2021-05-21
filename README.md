# Lab8_Starter

Dylan Cullen

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

1

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

Yes, because sending a message involves many parts: writing the message to the program, sending the message to another client, and displaying that message to the other client to name a few.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

No, the process should be simple enough that testing the entire code should be sufficient.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

The puppeteer will run with the chromium browser UI

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

You would have another line using page.click to go to the settings page