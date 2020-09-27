import PNG from "png-js";
import GIFEncoder from "gifencoder";
import fs from "fs";
import * as readline from "readline";

function decode(png) {
    return new Promise((resolve, reject) => {
        try {
            png.decode((pixels) => resolve(pixels));
        } catch (e) {
            reject(e);
        }
    });
}

export const createEncoder = ({
    filePath,
    width,
    height,
    length,
    fps,
    quality = 10,
}) => {
    const encoder = new GIFEncoder(width, height);
    encoder.createWriteStream().pipe(fs.createWriteStream(filePath));
    encoder.start();
    // Repeat the length in seconds * the number of frames in a given second
    encoder.setRepeat(length * fps);
    // Take a frame every 1000/frames per second
    encoder.setDelay(1000 / fps);
    encoder.setQuality(quality);
    return encoder;
};

export const generateGif = async ({
    encoder,
    page,
    width,
    height,
    length,
    fps,
}) => {
    let timeoutId, intervalId;
    const screenshotOptions = { clip: { width, height, x: 0, y: 0 } };
    const inFlightPromises = [];
    const state = {
        processing: 0,
        completed: 0,
    };

    const logCurrentState = () => {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0, 1);
        process.stdout.write(
            `Captured ${state.processing} | Completed ${
                state.completed
            } | Expected ${length * fps}\n`
        );
    };

    const setInFlight = () => {
        state.processing += 1;
        logCurrentState();
    };

    const setDone = () => {
        state.completed += 1;
        logCurrentState();
    };

    const addScreenToGif = (reject) => async () => {
        const promise = page
            .screenshot(screenshotOptions)
            .then((screen) => new PNG(screen))
            .then((png) => decode(png))
            .then((pixels) => encoder.addFrame(pixels))
            .then(() => setDone())
            .catch(reject);
        inFlightPromises.push(promise);
        setInFlight();
        return promise;
    };

    const onComplete = (resolve) => async () => {
        // Prevent new screen grabs being queued
        clearInterval(intervalId);
        clearInterval(timeoutId);
        // Wait for in flight screenshots
        await Promise.allSettled(inFlightPromises);
        console.log("Image generation complete");
        if (resolve) {
            resolve();
        }
    };

    return new Promise((resolve, reject) => {
        timeoutId = setTimeout(onComplete(resolve), length * 1000);
        intervalId = setInterval(addScreenToGif(reject), 1000 / fps);
    }).finally(onComplete());
};

export default async ({ filePath, width, height, formatInfo, page }) => {
    const encoder = createEncoder({ filePath, width, height, ...formatInfo });
    await generateGif({ encoder, page, width, height, ...formatInfo });
    encoder.finish();
};
