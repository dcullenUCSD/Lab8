describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });
/*
  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);
*/
  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    let url = page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    let header = await page.$eval('header > h1', (e) => e.innerHTML);
    expect(header).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    
    const expected = { 
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    }

    const entry = await page.$('journal-entry');
    const data = await entry.getProperty('entry');
    const plainValue = await data.jsonValue();
    
    expect(plainValue).toEqual(expected);

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    let body = await page.$eval('body', (b) => b.className);
    expect(body).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click("body > header > img");
    let url = page.url();
    expect(url).toBe('http://127.0.0.1:5500/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    let header = await page.$eval('header > h1', (e) => e.innerHTML);
    expect(header).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let body = await page.$eval('body', (b) => b.className);
    expect(body).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    let url = page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    await page.goBack();
    let url = page.url();
    expect(url).toBe('http://127.0.0.1:5500/');
  });

  // define and implement test12: When the user if on the homepage, the header title should be “Journal Entries”
  it('test12: When the user if on the homepage, the header title should be “Journal Entries”', async () => {
    let header = await page.$eval('header > h1', (e) => e.innerHTML);
    expect(header).toBe('Journal Entries');
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('test13: On the home page the <body> element should not have any class attribute', async () => {
    let body = await page.$eval('body', (b) => b.className);
    expect(body).toBe('');
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('test14: Verify the url is correct when clicking on the second entry', async () => {
    await page.click('body > main > journal-entry:nth-child(2)');
    let url = page.url();
    expect(url).toBe('http://127.0.0.1:5500/#entry2');
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('test15: Verify the title is current when clicking on the second entry', async () => {
    let header = await page.$eval('header > h1', (e) => e.innerHTML);
    expect(header).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('test16: Verify the entry page contents is correct when clicking on the second entry', async () => {
    const expected = {
      date:"4/26/2021",
      title:"Run, Forrest! Run!",
      content:"Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src:"https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg",
        alt:"forrest running"
      }
    };

    const entry = await page.$('body > main > journal-entry:nth-child(2)');
    const data = await entry.getProperty('entry');
    const plainValue = await data.jsonValue();
  
    expect(plainValue).toEqual(expected);
  }, 10000);

  // create your own test 17
  it('test17: Verify the title is current when clicking on the third entry', async () => {
    await page.goBack();
    await page.click('body > main > journal-entry:nth-child(3)')
    let header = await page.$eval('header > h1', (e) => e.innerHTML);
    expect(header).toBe('Entry 3');
  }, 10000);

  // create your own test 18
  it('test18: Verify the title is current when clicking on the fourth entry', async () => {
    await page.goBack();
    await page.click('body > main > journal-entry:nth-child(4)')
    let header = await page.$eval('header > h1', (e) => e.innerHTML);
    expect(header).toBe('Entry 4');
  }, 10000);

  // create your own test 19
  it('test19: Verify the title is current when clicking on the fifth entry', async () => {
    await page.goBack();
    await page.click('body > main > journal-entry:nth-child(5)')
    let header = await page.$eval('header > h1', (e) => e.innerHTML);
    expect(header).toBe('Entry 5');
  }, 10000);

  // create your own test 20
  it('test20: Verify the title is current when clicking on the tenth entry', async () => {
    await page.goBack();
    await page.click('body > main > journal-entry:nth-child(10)')
    let header = await page.$eval('header > h1', (e) => e.innerHTML);
    expect(header).toBe('Entry 10');
  }, 10000);

});
