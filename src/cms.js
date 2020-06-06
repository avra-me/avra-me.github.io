/**
 * The default export of `netlify-cms-app` is an object with all of the Netlify CMS
 * extension registration methods, such as `registerWidget` and
 * `registerPreviewTemplate`.
 */
import CMS from "netlify-cms-app";
import React from "react";
import ThemePreview from "./previews/ThemePreview";
import HomePreview from "./previews/HomePreview";
import FooterPreview from "./previews/FooterPreview";
/**
 * Any imported styles should be automatically be applied to the editor preview
 * pane thus eliminating the need to use `registerPreviewStyle` for imported
 * styles. However if you are experiencing build errors regarding importing css,
 * sass or scss into a cms module when deploying to the netlify platform, you
 * may need to follow the implementation found in netlify documentation here:
 * https://www.netlifycms.org/docs/beta-features/#raw-css-in-registerpreviewstyle
 * All of the example imports below would result in styles being applied to the
 * preview pane.
 */

CMS.registerPreviewTemplate("theme", ThemePreview);
CMS.registerPreviewTemplate("about", HomePreview);
CMS.registerPreviewTemplate("footer", FooterPreview);
