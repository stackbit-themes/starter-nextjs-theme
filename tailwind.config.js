const plugin = require('tailwindcss/plugin');
const themeStyle = require('./content/data/style.json');

module.exports = {
    presets: [require('@stackbit/components/styles/tailwind.default.config.js')],
    theme: {
        extend: {
            colors: {
                main: themeStyle.main,
                light: themeStyle.light,
                'on-light': themeStyle.onLight,
                dark: themeStyle.dark,
                'on-dark': themeStyle.onDark,
                primary: themeStyle.primary,
                'on-primary': themeStyle.onPrimary,
                secondary: themeStyle.secondary,
                'on-secondary': themeStyle.onSecondary,
                complementary: themeStyle.complementary,
                'on-complementary': themeStyle.onComplementary,
                'complementary-alt': themeStyle.complementaryAlt,
                'on-complementary-alt': themeStyle.onComplementaryAlt
            },
            fontFamily: {
                'sans': ['Poppins', 'sans-serif'],
                'serif': ['"Noto Serif"', 'serif']
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        plugin(function ({ addBase, addComponents, theme }) {
            addBase({
                body: {
                    fontFamily: theme(`fontFamily.${themeStyle.fontBody}`)
                },
                'h1,h2,h3,h4,h5,h6': {
                    fontFamily: theme(`fontFamily.${themeStyle.fontHeadlines}`)
                },
                h1: {
                    fontSize: theme(`fontSize.${themeStyle.h1.size}`),
                    fontWeight: theme(`fontWeight.${themeStyle.h1.weight}`),
                    letterSpacing: theme(`letterSpacing.${themeStyle.h1.letterSpacing}`),
                    textDecoration: themeStyle.h1.decoration,
                    textTransform: themeStyle.h1.case
                },
                h2: {
                    fontSize: theme(`fontSize.${themeStyle.h2.size}`),
                    fontWeight: theme(`fontWeight.${themeStyle.h2.weight}`),
                    letterSpacing: theme(`letterSpacing.${themeStyle.h2.letterSpacing}`),
                    textDecoration: themeStyle.h2.decoration,
                    textTransform: themeStyle.h2.case
                },
                h3: {
                    fontSize: theme(`fontSize.${themeStyle.h3.size}`),
                    fontWeight: theme(`fontWeight.${themeStyle.h3.weight}`),
                    letterSpacing: theme(`letterSpacing.${themeStyle.h3.letterSpacing}`),
                    textDecoration: themeStyle.h3.decoration,
                    textTransform: themeStyle.h3.case
                },
                h4: {
                    fontSize: theme(`fontSize.${themeStyle.h4.size}`),
                    fontWeight: theme(`fontWeight.${themeStyle.h4.weight}`),
                    letterSpacing: theme(`letterSpacing.${themeStyle.h4.letterSpacing}`),
                    textDecoration: themeStyle.h4.decoration,
                    textTransform: themeStyle.h4.case
                },
                h5: {
                    fontSize: theme(`fontSize.${themeStyle.h5.size}`),
                    fontWeight: theme(`fontWeight.${themeStyle.h5.weight}`),
                    letterSpacing: theme(`letterSpacing.${themeStyle.h5.letterSpacing}`),
                    textDecoration: themeStyle.h5.decoration,
                    textTransform: themeStyle.h5.case
                },
                h6: {
                    fontSize: theme(`fontSize.${themeStyle.h6.size}`),
                    fontWeight: theme(`fontWeight.${themeStyle.h6.weight}`),
                    letterSpacing: theme(`letterSpacing.${themeStyle.h6.letterSpacing}`),
                    textDecoration: themeStyle.h6.decoration,
                    textTransform: themeStyle.h6.case
                }
            }),
            addComponents({
                '.sb-component-button-primary': {
                    borderRadius: theme(`borderRadius.${themeStyle.buttonPrimary.borderRadius}`),
                    boxShadow: theme(`boxShadow.${themeStyle.buttonPrimary.shadow}`),
                    fontWeight: themeStyle.buttonPrimary.weight,
                    letterSpacing: theme(`letterSpacing.${themeStyle.buttonPrimary.letterSpacing}`),
                    padding: `${themeStyle.buttonPrimary.verticalPadding}px ${themeStyle.buttonPrimary.horizontalPadding}px`,
                    textTransform: themeStyle.buttonPrimary.case
                },
                '.sb-component-button-secondary': {
                    borderRadius: theme(`borderRadius.${themeStyle.buttonSecondary.borderRadius}`),
                    borderStyle: theme(`borderStyle.${themeStyle.buttonSecondary.borderStyle}`),
                    boxShadow: theme(`boxShadow.${themeStyle.buttonSecondary.shadow}`),
                    fontWeight: themeStyle.buttonSecondary.weight,
                    letterSpacing: theme(`letterSpacing.${themeStyle.buttonSecondary.letterSpacing}`),
                    padding: `${themeStyle.buttonSecondary.verticalPadding}px ${themeStyle.buttonSecondary.horizontalPadding}px`,
                    textTransform: themeStyle.buttonSecondary.case
                },
                '.sb-component-link': {
                    fontWeight: themeStyle.link.weight,
                    letterSpacing: theme(`letterSpacing.${themeStyle.link.letterSpacing}`),
                    textTransform: themeStyle.link.case
                }
            });
        })
    ]
};
