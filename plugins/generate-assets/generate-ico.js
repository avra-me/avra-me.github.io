import toIco from "to-ico";
import fs from "fs";
import sharp from "sharp";

export default async ({ filePath, width, height, page, formatInfo }) => {
    const screenshotOptions = {
        clip: { width, height, x: 0, y: 0 },
        type: "png",
    };
    return page.screenshot(screenshotOptions).then((png) =>
        formatInfo.sizes.map((size) =>
            sharp(png)
                .resize(size, size)
                .toBuffer()
                .then(toIco)
                .then((ico) => fs.writeFileSync(`${filePath}-${size}.ico`, ico))
        )
    );
};
