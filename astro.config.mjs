import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
    site: 'https://alamiyaclean.com',
    integrations: [
        tailwind(),
        sitemap({
            i18n: {
                defaultLocale: 'ar',
                locales: {
                    ar: 'ar-SA',
                },
            },
        }),
    ],
    output: 'static',
});
