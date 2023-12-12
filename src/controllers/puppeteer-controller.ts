import puppeteer from 'puppeteer-extra';
import chromium from 'chrome-aws-lambda';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin())
export const youtubePuppeteer = async function (redirectUrl: string) {
    if (!redirectUrl) return { error: "No Redirect URL found" };

    const youtubeBrowser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        dumpio: process.env.STAGE === 'dev',
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true
    });
    const page = await youtubeBrowser.newPage();
    await page.goto(redirectUrl);
    await page.setBypassCSP(true)    
    await page.setViewport({ width: 1080, height: 1024 });
    await page.waitForNetworkIdle();
    await page.screenshot({ path: `./screenshotLog/youtube/youtube_image_log_${Date.now()}.png` });
    await page.type('[id="identifierId"]', 'shivarchitthakur3');
    await page.screenshot({ path: `./screenshotLog/youtube/youtube_image_log_${Date.now()}.png` });
    await page.click('[id="identifierNext"]');
    await page.waitForNetworkIdle();
    await page.screenshot({ path: `./screenshotLog/youtube/youtube_image_log_${Date.now()}.png` });
    await youtubeBrowser.close();
    return;
}