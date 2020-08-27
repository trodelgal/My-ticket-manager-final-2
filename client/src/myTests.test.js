const puppeteer = require('puppeteer');
const nock = require('nock');
const useNock = require('nock-puppeteer');
const full4s = require('@suvelocity/tester');

const mockData = [
    {
        "id": "043fa86c-09a4-5053-bab8-91cd20bbb08c",
        "title": "Notifications not working",
        "content": "Hi I was working with wix crm backend notificatication and just stoped working.\n\nSee the code bellow\n\nCRM Backend code\n\nimport wixCrm from 'wix-crm-backend';\n\nexport function notifySiteContributors(body, titulo, acao, url) {\n wixCrm.notifications.notify(\n body,\n        [\"Mobile\", \"Browser\", \"Dashboard\"], {\n \"title\": titulo,\n \"actionTitle\": acao,\n \"actionTarget\": { \"url\": url },\n \"recipients\": { \"role\": \"All_Contributors\" }\n    })\n}\n\n\n\nfrontend code\n\nimport { notifySiteContributors } from 'backend/CRM';\n\n\nexport function botaofinalizar_click(event) {\n let itemObj = $w(\"#dataset3\").getCurrentItem();\n let os = itemObj.title.replace('/', '%2F')\n let link = 'www.otimicar.com/respostas-cotacao-pecas-/' + os\n $w('#text217').show()\n notifySiteContributors(\n String('OS ' + $w('#osText').text + ' ' + $w('#text207').text + ' ' + $w('#text208').text + ' ' + $w('#text214').text),\n String('Cotação de peça respondida por ' + $w('#text223').text),\n 'VEJA AGORA A RESPOSTA',\n link)\n}\n\nThe error =>\n\n\nUnhandled rejection Error: server responded with 400 - {\"message\":\"\",\"details\":{}}     at handleServerError (/dynamic-modules/edm_root/2b595510-de9c-11e9-aaa2-279ac5c14f62/node_modules/@wix/wix-crm-backend/src/notifications/api.ts:162:11)     at Object.<anonymous> (/dynamic-modules/edm_root/2b595510-de9c-11e9-aaa2-279ac5c14f62/node_modules/@wix/wix-crm-backend/src/notifications/api.ts:109:9)     at Generator.throw (<anonymous>)     at rejected (/dynamic-modules/edm_root/2b595510-de9c-11e9-aaa2-279ac5c14f62/node_modules/@wix/wix-crm-backend/dist/src/notifications/api.js:5:65)     at bound (domain.js:396:14)     at runBound (domain.js:409:12)     at tryCatcher (/elementory/node_modules/bluebird/js/main/util.js:26:23)     at Promise._settlePromiseFromHandler (/elementory/node_modules/bluebird/js/main/promise.js:510:31)     at Promise._settlePromiseAt (/elementory/node_modules/bluebird/js/main/promise.js:584:18)     at Async._drainQueue (/elementory/node_modules/bluebird/js/main/async.js:128:12)     at Async._drainQueues (/elementory/node_modules/bluebird/js/main/async.js:133:10)     at Immediate.Async.drainQueues [as _onImmediate] (/elementory/node_modules/bluebird/js/main/async.js:15:14)     at runCallback (timers.js:705:18)     at tryOnImmediate (timers.js:676:5)     at processImmediate (timers.js:658:5)     at process.topLevelDomainCallback (domain.js:121:23)\n\n\n\n",
        "userEmail": "humpatok@weamvu.ai",
        "creationTime": 1531424040238
    },
]

let page;
let browser;
let encoder;

jest.setTimeout(300000);
const projectName = '1.Ticket Manager UI';
describe(projectName, () => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    useNock(page, ['http://localhost:3000/api']);

    await full4s.beforeAll();
  });
  afterEach(async () => {
    await full4s.afterEach(page);
  })
  afterAll(async () => {
    await full4s.afterAll(projectName);
    await browser.close();
  });

  test('can move ticket to done tickets list', async () =>{
    const getAllTicketsMock= await nock('http://localhost:3000/', { allowUnmocked: true })
        .get('/api/tickets')
        .query(() => true)
        .reply(200, mockData);
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })
    const elements = await page.$$('.ticket');
    expect(elements.length).toBe(mockData.length);
    expect(getAllTicketsMock.isDone()).toBe(true);
    const doneButton = await page.$(".doneButton")
    await doneButton.click();
    const elementsAfterDone = await page.$('.ticket');
    expect(elementsAfterDone.length).toBe(undefined);
  })
  test('can show all the content by see button click', async () =>{
    const getAllTicketsMock = await nock('http://localhost:3000/', { allowUnmocked: true })
        .get('/api/tickets')
        .query(() => true)
        .reply(200, mockData);
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' })
    const elements = await page.$$('.ticket');
    expect(elements.length).toBe(mockData.length);
    const elementBeforeSeeMore = await page.$eval('.contentText', e=>e.innerText);
    expect(elementBeforeSeeMore.length<700).toBe(true)
    const seeMoreButton = await page.$(" #seeMoreButton")
    await seeMoreButton.click();
    const elementsAfterSeeMore = await page.$eval('.contentText', e=>e.innerText);
    expect(elementsAfterSeeMore.length<700).toBe(false);
  })

})