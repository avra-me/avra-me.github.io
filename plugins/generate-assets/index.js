import generateGif from "./generate-gif.js";
import generateIco from "./generate-ico.js";
import puppeteer from "puppeteer";

const avatarUrl = "http://localhost:8000/avatar";

const assetFormats = [
  {
    fileName: "favicon",
    fileFormat: "ico",
    width: 256,
    height: 256,
    formatInfo: {
      sizes: [16, 32, 64, 128, 256]
    },
  },
  {
    fileName: "128x128-animated.gif",
    fileFormat: "gif",
    width: 128,
    height: 128,
    formatInfo: { length: 23.5, fps: 30 },
  },
];

const generationFunctions = {
  gif: generateGif,
  ico: generateIco,
};

const createBrowser = (url, width, height) =>
  puppeteer
    .launch({
      headless: true,
      slowMo: 0,
      defaultViewport: { width, height },
    })
    .then(async (browser) => {
      const page = await browser.newPage();
      await page.goto(url, {
        waitUntil: ["networkidle2"],
      });
      await page.setViewport({ width, height });
      return { browser, page };
    });

const main = async () => {
  return assetFormats
    .map(async ({ fileName, width, fileFormat, height, formatInfo }) => {
      const filePath = `./static/${fileName}`;
      console.log(
        `Generating ${fileFormat} Preview ${fileName} to ${filePath}`
      );
      const { browser, page } = await createBrowser(avatarUrl, width, height);

      const generationFunction = generationFunctions[fileFormat];
      if (generationFunction) {
        await generationFunction({ filePath, formatInfo, width, height, page });
      }
      await browser.close();
    })
    .reduce((lastPromise, next) => lastPromise.then(() => next))
    .catch((e) => {
      console.log(e);
      process.exit(1);
    });
};

main();
