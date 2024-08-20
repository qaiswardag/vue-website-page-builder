const config = {
    slugifyOptions: {
        replacement: "_", // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: true, // strip special characters except replacement, defaults to `false`
        locale: [
            "de",
            "fr",
            "es",
            "it",
            "pt",
            "pl",
            "nl",
            "da",
            "sv",
            "no",
            "fi",
            "ar",
            "en",
        ], // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
        // replace: /[^a-zA-Z0-9]+/g,
    },
};

export default config;
