const outdent = require('outdent');
const Image = require("@11ty/eleventy-img");

const shortcodes = [
    {
        name: "alert",
        func: function (level, message) {
            return outdent`
                <div class="alert alert-${level}">
                    ${message}
                </div>`
        },
    },
    {
        name: "cit",
        func: function () { return `<sup>[citation needed]</sup>` }
    },
    {
        name: "image",
        func: function (src, alt, sizes = "(min-width: 1024px) 100vw, 50vw", cls = "img-fluid rounded mx-auto d-block") {
            let options = {
                widths: [300, 600],
                formats: ["webp", "png"]
            };

            // generate images, while this is async we don’t wait
            Image(src, options);

            let imageAttributes = {
                class: cls,
                alt,
                sizes,
                loading: "lazy",
                decoding: "async",
            };
            // get metadata even the images are not fully generated
            let metadata = Image.statsSync(src, options);
            return Image.generateHTML(metadata, imageAttributes);
        }
    }
];


module.exports = {
    shortcodes
}