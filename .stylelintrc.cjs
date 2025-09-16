module.exports = {
    extends: [
        'stylelint-config-standard-scss'
    ],
    customSyntax: 'postcss-scss',
    rules: {
        // Allow CSS variables in color functions, etc.
        'function-no-unknown': null,
        // Allow nested selectors common in SCSS partials
        'selector-nested-pattern': null,
        // Our tokens/palette often use custom properties
        'property-no-unknown': null,
        // Permit at-rules commonly used with SCSS/Hugo
        'at-rule-no-unknown': null,
        // Relaxations to fit existing codebase style
        'comment-empty-line-before': null,
        'scss/double-slash-comment-empty-line-before': null,
        'media-feature-range-notation': null,
        'no-descending-specificity': null,
        'declaration-block-no-redundant-longhand-properties': null,
        'shorthand-property-no-redundant-values': null,
        'alpha-value-notation': null,
        'color-function-notation': null,
        'value-keyword-case': null,
        'color-hex-length': null,
        'custom-property-pattern': null,
        'import-notation': null,
        'font-family-name-quotes': null,
        // Keep vendor prefixing free; autoprefixer not in use here
        'property-no-vendor-prefix': null,
        'value-no-vendor-prefix': null,
        'selector-no-vendor-prefix': null,
    },
    ignoreFiles: [
        'public/**/*',
        'resources/_gen/**/*',
        'static/css/**/*'
    ]
};
