const outdent = require('outdent');

const shortcodes = [
    { 
        name: "alert", 
        func: function(level, message) {
            return outdent`
                <div class="alert alert-${level}">
                    ${message}
                </div>`
        },
    },
    {
        name: "cit",
        func: function() { return `<sup>[citation needed]</sup>`}
    }
];




module.exports = {
    shortcodes
}