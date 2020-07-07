module.exports = {
  ignoreFiles: [
    './tests/',
  ],
  rules: {
    'at-rule-no-unknown': true,
    'at-rule-no-vendor-prefix': true,
    'block-no-empty': true,
    'block-opening-brace-space-before': 'always',
    'color-hex-case': 'upper',
    'color-hex-length': 'long',
    'color-named': 'never',
    'color-no-invalid-hex': true,
    'comment-empty-line-before': ['always', {
      ignore: ['stylelint-commands', 'after-comment'],
    }],
    'comment-no-empty': true,
    'comment-whitespace-inside': 'always',
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'font-family-no-duplicate-names': true,
    'font-family-no-missing-generic-family-keyword': true,
    'function-calc-no-unspaced-operator': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'function-url-quotes': 'always',
    indentation: [2, {}],
    'keyframe-declaration-no-important': true,
    'max-empty-lines': 2,
    'media-feature-colon-space-before': 'never',
    'media-feature-colon-space-after': 'always',
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-parentheses-space-inside': 'never',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    'no-duplicate-selectors': true,
    'no-empty-source': true,
    'no-extra-semicolons': true,
    'no-invalid-double-slash-comments': true,
    'number-leading-zero': 'always',
    'property-no-unknown': true,
    'property-no-vendor-prefix': true,
    'rule-empty-line-before': ['always-multi-line', {
      except: ['first-nested'],
      ignore: ['after-comment'],
    }],
    'selector-attribute-brackets-space-inside': 'never',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-quotes': 'always',
    'selector-combinator-space-after': 'always',
    'selector-list-comma-newline-after': 'always',
    'selector-max-compound-selectors': 4,
    'selector-max-id': 0,
    'selector-no-qualifying-type': [true, {
      ignore: ['attribute'],
    }],
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-parentheses-space-inside': 'never',
    'selector-pseudo-class-no-unknown': true,
    'selector-pseudo-element-colon-notation': 'double',
    'selector-pseudo-element-no-unknown': true,
    'selector-type-no-unknown': true,
    'string-quotes': 'single',
    'unit-whitelist': ['em', 'rem', '%', 'vh', 'vw', 's', 'turn', 'fr', 'deg', 'ms'],
    'value-no-vendor-prefix': true,
  },
};
