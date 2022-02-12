const { generateImageSrc, imageCaption } = require("./ext/image");
const outdent = require("outdent");

const shortcodes = [
    {
        name: "alert",
        func: alert,
    },
    {
        name: "cit",
        func: citationNeeded
    },
    {
        name: "image",
        func: generateImageSrc
    },
    {
        name: "link",
        func: linkToExternal
    }
];

const pairedShortcodes = [
    {
        name: "image_caption",
        func: imageCaption
    }
];


function alert(level, message) {
    return outdent`
        <div class="alert alert-${level}">
            ${message}
        </div>`;
}

function citationNeeded() {
    return `<sup>[citation needed]</sup>`;
}

function linkToExternal(href) {
    return `<sup><a href=${href} target="_blank">*</a></sup>`;
}

module.exports = {
    shortcodes,
    pairedShortcodes
}