export type Metadata = {
    id: string;
    pageCssClasses: string[];
    urlPath: string;
    relSourcePath: string;
};

export type AllTypes = DocumentTypes | NestedTypes;
export type AllTypeNames = DocumentTypeNames | NestedTypeNames;

export type DocumentTypes = Config | PageLayout | Person | BlogCategory | PostFeedLayout | AuthorPostFeedLayout | CategoryPostFeedLayout | PostLayout;
export type DocumentTypeNames =
    | 'Config'
    | 'PageLayout'
    | 'Person'
    | 'BlogCategory'
    | 'PostFeedLayout'
    | 'AuthorPostFeedLayout'
    | 'CategoryPostFeedLayout'
    | 'PostLayout';

export type NestedTypes =
    | BackgroundImage
    | Badge
    | Button
    | CheckboxFormControl
    | ContactBlock
    | ContactSection
    | CtaSection
    | EmailFormControl
    | FaqItem
    | FaqSection
    | FeaturedItem
    | FeaturedItemsSection
    | FeaturedPeopleSection
    | FeaturedPostsSection
    | FeatureHighlightSection
    | Footer
    | FormBlock
    | Header
    | HeroSection
    | ImageBlock
    | JobList
    | JobListItem
    | JobsSection
    | Link
    | MediaGallerySection
    | PagedPostsSection
    | QuoteSection
    | RecentPostsSection
    | SelectFormControl
    | Social
    | Styles
    | Testimonial
    | TestimonialsSection
    | TextSection
    | TextareaFormControl
    | TextFormControl
    | VideoBlock;

export type NestedTypeNames =
    | 'BackgroundImage'
    | 'Badge'
    | 'Button'
    | 'CheckboxFormControl'
    | 'ContactBlock'
    | 'ContactSection'
    | 'CtaSection'
    | 'EmailFormControl'
    | 'FaqItem'
    | 'FaqSection'
    | 'FeaturedItem'
    | 'FeaturedItemsSection'
    | 'FeaturedPeopleSection'
    | 'FeaturedPostsSection'
    | 'FeatureHighlightSection'
    | 'Footer'
    | 'FormBlock'
    | 'Header'
    | 'HeroSection'
    | 'ImageBlock'
    | 'JobList'
    | 'JobListItem'
    | 'JobsSection'
    | 'Link'
    | 'MediaGallerySection'
    | 'PagedPostsSection'
    | 'QuoteSection'
    | 'RecentPostsSection'
    | 'SelectFormControl'
    | 'Social'
    | 'Styles'
    | 'Testimonial'
    | 'TestimonialsSection'
    | 'TextSection'
    | 'TextareaFormControl'
    | 'TextFormControl'
    | 'VideoBlock';

export type Sections =
    | RecentPostsSection
    | FeaturedPeopleSection
    | HeroSection
    | CtaSection
    | QuoteSection
    | FaqSection
    | MediaGallerySection
    | JobsSection
    | ContactSection
    | FeaturedPostsSection
    | FeatureHighlightSection
    | FeaturedItemsSection
    | TestimonialsSection
    | TextSection;

/** Document types */
export type Config = {
    /** File path relative to `contentDirPath` */
    __metadata: Metadata;
    type: 'Config';
    favicon?: string;
    header?: Header;
    footer?: Footer;
    titleSuffix?: string;
    defaultSocialImage?: string;
    defaultMetaTags?: MetaTag[];
};

export type SEO = {
    metaTitle?: string;
    metaDescription?: string;
    addTitleSuffix?: boolean;
    socialImage?: string;
    metaTags?: MetaTag[];
};

export type MetaTag = {
    property?:
        | 'og:title'
        | 'og:type'
        | 'og:image'
        | 'og:image:alt'
        | 'og:url'
        | 'og:description'
        | 'og:locale'
        | 'og:site_name'
        | 'og:video'
        | 'twitter:card'
        | 'twitter:site'
        | 'twitter:creator'
        | 'twitter:description'
        | 'twitter:title'
        | 'twitter:image'
        | 'twitter:image:alt'
        | 'twitter:player';
    content?: string;
};

export type PageLayout = SEO & {
    /** File path relative to `contentDirPath` */
    __metadata: Metadata;
    type: 'PageLayout';
    title: string;
    sections?: Sections[];
};

export type Person = {
    /** File path relative to `contentDirPath` */
    __metadata: Metadata;
    type: 'Person';
    firstName: string;
    lastName?: string;
    role?: string;
    bio?: string;
    image?: ImageBlock;
};

export type BlogCategory = {
    __metadata: Metadata;
    type: 'BlogCategory';
    title: string;
};

export type PostFeedLayout = SEO & {
    /** File path relative to `contentDirPath` */
    __metadata: Metadata;
    type: 'PostFeedLayout';
    title: string;
    /** set to 0 to show all posts on a single page */
    numOfPostsPerPage?: number;
    postFeed?: PagedPostsSection;
    topSections?: Sections[];
    bottomSections?: Sections[];
    styles?: Styles;
};

export type AuthorPostFeedLayout = Omit<PostFeedLayout, 'type'> & {
    type: 'AuthorPostFeedLayout';
    author: string;
};

export type CategoryPostFeedLayout = Omit<PostFeedLayout, 'type'> & {
    type: 'CategoryPostFeedLayout';
    category: string;
};

export type PostLayout = SEO & {
    /** File path relative to `contentDirPath` */
    __metadata: Metadata;
    type: 'PostLayout';
    title: string;
    date: string;
    author?: string;
    category?: string;
    excerpt?: string;
    featuredImage?: ImageBlock;
    bottomSections?: Sections[];
    markdown_content?: string;
};

export type Action = Button | Link;

/** Nested types */
export type BackgroundImage = {
    /** File path relative to `contentDirPath` */
    type: 'BackgroundImage';
    /** The URL of the image */
    url?: string;
    /** The unique ID for an HTML element, must not contain whitespace */
    backgroundSize?: 'auto' | 'cover' | 'contain';
    backgroundPosition?: 'bottom' | 'center' | 'left' | 'left-bottom' | 'left-top' | 'right' | 'right-bottom' | 'right-top' | 'top';
    backgroundRepeat?: 'repeat' | 'repeat-x' | 'repeat-y' | 'no-repeat';
    opacity?: number;
};

export type Badge = {
    /** File path relative to `contentDirPath` */
    type: 'Badge';
    label: string;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    styles?: Styles;
};

export type Button = {
    /** File path relative to `contentDirPath` */
    type: 'Button';
    label?: string;
    /** The alternative text for screen readers */
    altText?: string;
    url: string;
    showIcon?: boolean;
    icon?:
        | 'apple'
        | 'arrowLeft'
        | 'arrowLeftCircle'
        | 'arrowRight'
        | 'arrowRightCircle'
        | 'cart'
        | 'chevronLeft'
        | 'chevronRight'
        | 'facebook'
        | 'github'
        | 'googlePlay'
        | 'instagram'
        | 'linkedin'
        | 'mail'
        | 'play'
        | 'playCircle'
        | 'reddit'
        | 'send'
        | 'twitter'
        | 'vimeo'
        | 'youtube';
    iconPosition?: 'left' | 'right';
    style?: 'primary' | 'secondary';
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
};

export type CheckboxFormControl = {
    /** File path relative to `contentDirPath` */
    type: 'CheckboxFormControl';
    name: string;
    label?: string;
    isRequired?: boolean;
    width?: 'full' | '1/2';
};

export type ContactBlock = {
    /** File path relative to `contentDirPath` */
    type: 'ContactBlock';
    phoneNumber?: string;
    phoneAltText?: string;
    email?: string;
    emailAltText?: string;
    address?: string;
    addressAltText?: string;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
};

export type ContactSection = {
    /** File path relative to `contentDirPath` */
    type: 'ContactSection';
    colors?: Colors;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    backgroundSize?: 'full' | 'inset';
    title?: string;
    text?: string;
    form?: FormBlock;
    media?: ImageBlock | VideoBlock;
    styles?: Styles;
};

export type CtaSection = {
    /** File path relative to `contentDirPath` */
    type: 'CtaSection';
    colors?: Colors;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    backgroundSize?: 'full' | 'inset';
    backgroundImage?: BackgroundImage;
    title?: string;
    text?: string;
    actions?: Action[];
    styles?: Styles;
};

export type EmailFormControl = {
    /** File path relative to `contentDirPath` */
    type: 'EmailFormControl';
    name?: string;
    label?: string;
    hideLabel?: boolean;
    placeholder?: string;
    isRequired?: boolean;
    width?: 'full' | '1/2';
};

export type FaqItem = {
    /** File path relative to `contentDirPath` */
    type: 'FaqItem';
    question: string;
    answer: string;
    styles?: Styles;
};

export type FaqSection = {
    /** File path relative to `contentDirPath` */
    type: 'FaqSection';
    colors?: Colors;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    title?: string;
    subtitle?: string;
    actions?: Action[];
    items?: FaqItem[];
    styles?: Styles;
};

export type FeaturedItem = {
    /** File path relative to `contentDirPath` */
    type: 'FeaturedItem';
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    title?: string;
    subtitle?: string;
    text?: string;
    featuredImage?: ImageBlock;
    actions?: Action[];
    enableHover?: boolean;
    styles?: Styles;
};

export type FeaturedItemsSection = {
    /** File path relative to `contentDirPath` */
    type: 'FeaturedItemsSection';
    title?: string;
    subtitle?: string;
    items?: FeaturedItem[];
    actions?: Action[];
    columns?: number;
    enableHover?: boolean;
    colors?: Colors;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    styles?: Styles;
};

export type FeaturedPeopleSection = {
    /** File path relative to `contentDirPath` */
    type: 'FeaturedPeopleSection';
    colors?: Colors;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    variant?: 'variant-a' | 'variant-b' | 'variant-c';
    title?: string;
    subtitle?: string;
    actions?: Action[];
    people?: string[];
    styles?: Styles;
};

export type PostFeedSection = {
    colors?: Colors;
    elementId?: string;
    title?: string;
    subtitle?: string;
    showDate?: boolean;
    showAuthor?: boolean;
    showExcerpt?: boolean;
    variant?: 'variant-a' | 'variant-b' | 'variant-c';
    actions?: Action[];
    styles?: Styles;
};

export type FeaturedPostsSection = PostFeedSection & {
    /** File path relative to `contentDirPath` */
    type: 'FeaturedPostsSection';
    posts: string[];
};

export type RecentPostsSection = PostFeedSection & {
    /** File path relative to `contentDirPath` */
    type: 'RecentPostsSection';
    recentCount: number;
};

export type PagedPostsSection = PostFeedSection & {
    /** File path relative to `contentDirPath` */
    type: 'PagedPostsSection';
};

export type FeatureHighlightSection = {
    /** File path relative to `contentDirPath` */
    type: 'FeatureHighlightSection';
    colors?: Colors;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    backgroundSize?: 'full' | 'inset';
    title?: string;
    subtitle?: string;
    badge?: Badge;
    text?: string;
    actions?: Action[];
    media?: ImageBlock | VideoBlock;
    styles?: Styles;
};

export type Footer = {
    /** File path relative to `contentDirPath` */
    type: 'Footer';
    colors?: Colors;
    logo?: ImageBlock;
    title?: string;
    text?: string;
    contacts?: ContactBlock;
    copyrightText?: string;
    primaryLinks?: Action[];
    socialLinks?: Social[];
    legalLinks?: Action[];
    styles?: Styles;
};

export type FormBlock = {
    /** File path relative to `contentDirPath` */
    type: 'FormBlock';
    variant?: 'variant-a' | 'variant-b';
    fields?: (TextFormControl | EmailFormControl | CheckboxFormControl | SelectFormControl | TextareaFormControl)[];
    submitLabel?: string;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId: string;
    action?: string;
    destination?: string;
    styles?: Styles;
};

export type Header = {
    /** File path relative to `contentDirPath` */
    type: 'Header';
    headerVariant?: 'variant-a' | 'variant-b' | 'variant-c' | 'variant-d' | 'variant-e';
    primaryColors?: Colors;
    secondaryColors?: Colors;
    title?: string;
    isTitleVisible?: boolean;
    logo?: ImageBlock;
    primaryLinks?: Action[];
    secondaryLinks?: Action[];
    styles?: Styles;
};

export type HeroSection = {
    /** File path relative to `contentDirPath` */
    type: 'HeroSection';
    colors?: Colors;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    title?: string;
    subtitle?: string;
    badge?: Badge;
    text?: string;
    actions?: Action[];
    media?: FormBlock | ImageBlock | VideoBlock;
    styles?: Styles;
};

export type ImageBlock = {
    /** File path relative to `contentDirPath` */
    type: 'ImageBlock';
    /** The URL of the image */
    url?: string;
    /** The alternative text for screen readers */
    altText?: string;
    /** The caption of the timage */
    caption?: string;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
};

export type JobList = {
    /** File path relative to `contentDirPath` */
    type: 'JobList';
    title?: string;
    items?: JobListItem[];
};

export type JobListItem = {
    /** File path relative to `contentDirPath` */
    type: 'JobListItem';
    title?: string;
    location?: string;
    text?: string;
    actions?: Action[];
};

export type JobsSection = {
    /** File path relative to `contentDirPath` */
    type: 'JobsSection';
    colors?: Colors;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    title?: string;
    subtitle?: string;
    jobLists?: JobList[];
    styles?: Styles;
};

export type Link = {
    /** File path relative to `contentDirPath` */
    type: 'Link';
    label?: string;
    /** The alternative text for screen readers */
    altText?: string;
    url: string;
    showIcon?: boolean;
    icon?:
        | 'apple'
        | 'arrowLeft'
        | 'arrowLeftCircle'
        | 'arrowRight'
        | 'arrowRightCircle'
        | 'cart'
        | 'chevronLeft'
        | 'chevronRight'
        | 'facebook'
        | 'github'
        | 'googlePlay'
        | 'instagram'
        | 'linkedin'
        | 'mail'
        | 'play'
        | 'playCircle'
        | 'reddit'
        | 'send'
        | 'twitter'
        | 'vimeo'
        | 'youtube';
    iconPosition?: 'left' | 'right';
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
};

export type MediaGallerySection = {
    /** File path relative to `contentDirPath` */
    type: 'MediaGallerySection';
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    colors?: Colors;
    title?: string;
    subtitle?: string;
    images?: ImageBlock[];
    spacing?: number;
    columns?: number;
    aspectRatio?: '1:1' | '3:2' | '2:3' | '4:3' | '3:4' | '16:9' | 'auto';
    imageSizePx?: number;
    showCaption?: boolean;
    enableHover?: boolean;
    styles?: Styles;
};

export type QuoteSection = {
    /** File path relative to `contentDirPath` */
    type: 'QuoteSection';
    colors?: Colors;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    quote: string;
    name?: string;
    title?: string;
    backgroundImage?: BackgroundImage;
    styles?: Styles;
};

export type SelectFormControl = {
    /** File path relative to `contentDirPath` */
    type: 'SelectFormControl';
    name: string;
    label?: string;
    hideLabel?: boolean;
    defaultValue?: string;
    options?: string[];
    isRequired?: boolean;
    width?: 'full' | '1/2';
};

export type Social = {
    /** File path relative to `contentDirPath` */
    type: 'Social';
    label?: string;
    altText?: string;
    url: string;
    icon?: 'facebook' | 'github' | 'instagram' | 'linkedin' | 'reddit' | 'twitter' | 'vimeo' | 'youtube';
    style?: 'link' | 'primary' | 'secondary';
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
};

export type Styles = {
    /** File path relative to `contentDirPath` */
    self?: any;
    [key: string]: any;
};

export type Testimonial = {
    /** File path relative to `contentDirPath` */
    type: 'Testimonial';
    quote: string;
    name?: string;
    title?: string;
    image?: ImageBlock;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    styles?: Styles;
};

export type TestimonialsSection = {
    /** File path relative to `contentDirPath` */
    type: 'TestimonialsSection';
    colors?: Colors;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
    variant?: 'variant-a' | 'variant-b' | 'variant-c';
    title?: string;
    subtitle?: string;
    testimonials?: Testimonial[];
    styles?: Styles;
};

export type TextSection = {
    /** File path relative to `contentDirPath` */
    type: 'TextSection';
    title?: string;
    subtitle?: string;
    text?: string;
    styles?: Styles;
    colors?: Colors;
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
};

export type TextareaFormControl = {
    /** File path relative to `contentDirPath` */
    type: 'TextareaFormControl';
    name: string;
    label?: string;
    hideLabel?: boolean;
    placeholder?: string;
    isRequired?: boolean;
    width?: 'full' | '1/2';
};

export type TextFormControl = {
    /** File path relative to `contentDirPath` */
    type: 'TextFormControl';
    name: string;
    label?: string;
    hideLabel?: boolean;
    placeholder?: string;
    isRequired?: boolean;
    width?: 'full' | '1/2';
};

export type VideoBlock = {
    /** File path relative to `contentDirPath` */
    type: 'VideoBlock';
    title?: string;
    url?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    aspectRatio?: '4:3' | '16:9';
    /** The unique ID for an HTML element, must not contain whitespace */
    elementId?: string;
};

export type Colors = 'colors-a' | 'colors-b' | 'colors-c' | 'colors-d' | 'colors-e' | 'colors-f' | 'colors-g' | 'colors-h';
