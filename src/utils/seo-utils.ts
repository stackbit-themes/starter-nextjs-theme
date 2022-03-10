import { AllPageLayoutProps, Site } from '../components/layouts';

export function seoGenerateMetaTags(page: AllPageLayoutProps, site: Site) {
    let pageMetaTags: Record<string, string> = {};

    if (site.defaultMetaTags?.length) {
        site.defaultMetaTags.forEach((metaTag) => {
            if (metaTag.property && metaTag.content) {
                pageMetaTags[metaTag.property] = metaTag.content;
            }
        });
    }

    const ogTitle = seoGenerateTitle(page, site);
    const ogImage = seoGenerateOgImage(page, site);

    pageMetaTags = {
        ...pageMetaTags,
        ...(ogTitle && { 'og:title': ogTitle }),
        ...(ogImage && { 'og:image': ogImage })
    };

    if (page.metaTags?.length) {
        page.metaTags.forEach((metaTag) => {
            if (metaTag.property && metaTag.content) {
                pageMetaTags[metaTag.property] = metaTag.content;
            }
        });
    }

    const metaTags: { property: string; content: string; format: 'property' | 'name' }[] = [];
    Object.keys(pageMetaTags).forEach((key) => {
        if (pageMetaTags[key] !== null) {
            metaTags.push({
                property: key,
                content: pageMetaTags[key],
                format: key.startsWith('og') ? 'property' : 'name'
            });
        }
    });

    return metaTags;
}

export function seoGenerateTitle(page: AllPageLayoutProps, site: Site) {
    let title = page.metaTitle ? page.metaTitle : page.title;
    if (site.titleSuffix && page.addTitleSuffix !== false) {
        title = `${title} - ${site.titleSuffix}`;
    }
    return title;
}

export function seoGenerateMetaDescription(page: AllPageLayoutProps, site: Site) {
    let metaDescription: string | undefined;
    // Blog posts use the exceprt as the default meta description
    if (page.type === 'PostLayout' && page.excerpt) {
        metaDescription = page.excerpt;
    }
    // page metaDescription field overrides all others
    if (page.metaDescription) {
        metaDescription = page.metaDescription;
    }
    return metaDescription;
}

export function seoGenerateOgImage(page: AllPageLayoutProps, site: Site) {
    let ogImage: string | undefined;
    // Use the sites default og:image field
    if (site.defaultSocialImage) {
        ogImage = site.defaultSocialImage;
    }
    // Blog posts use the featuredImage as the default og:image
    if (page.type === 'PostLayout' && page.featuredImage?.url) {
        ogImage = page.featuredImage.url;
    }
    // page socialImage field overrides all others
    if (page.socialImage) {
        ogImage = page.socialImage;
    }

    // ogImage should use an absolute URL. Get the Netlify domain URL from the Netlify environment variable process.env.URL
    const domainUrl = site.env?.URL;

    if (ogImage) {
        if (domainUrl) {
            return domainUrl + ogImage;
        } else {
            return ogImage;
        }
    }
    return null;
}
