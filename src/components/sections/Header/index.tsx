import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { StackbitObjectId, getObjectId, toFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { Action } from '../../atoms/Action';
import { Link } from '../../atoms/Link';
import { ImageBlock } from '../../blocks/ImageBlock';
import CloseIcon from '../../svgs/close';
import MenuIcon from '../../svgs/menu';

export type Props = types.Header & StackbitObjectId;

export const Header: React.FC<Props> = (props) => {
    const { primaryColors = 'colors-a', styles = {}, ...rest } = props;
    const objectId = getObjectId(props);
    const fieldPath = objectId ? `${objectId}:header` : null;
    return (
        <header
            className={classNames('sb-component', 'sb-component-header', primaryColors, 'relative', styles.self?.padding ?? 'py-5 px-4')}
            {...toFieldPath(fieldPath)}
        >
            <div className={classNames('mx-auto', mapMaxWidthStyles(styles.self?.width ?? 'narrow'))}>
                <Link href="#main" className="sr-only">
                    Skip to main content
                </Link>
                <HeaderVariants {...rest} />
            </div>
        </header>
    );
};

const HeaderVariants: React.FC<Props> = (props) => {
    const { headerVariant = 'variant-a', ...rest } = props;
    switch (headerVariant) {
        case 'variant-a':
            return <HeaderVariantA {...rest} />;
        case 'variant-b':
            return <HeaderVariantB {...rest} />;
        case 'variant-c':
            return <HeaderVariantC {...rest} />;
        case 'variant-d':
            return <HeaderVariantD {...rest} />;
        case 'variant-e':
            return <HeaderVariantE {...rest} />;
    }
};

const HeaderVariantA: React.FC<Props> = (props) => {
    const { title, isTitleVisible, logo, primaryLinks = [], secondaryLinks = [] } = props;
    return (
        <div className="relative flex items-center">
            {(logo || (title && isTitleVisible)) && (
                <div className="mr-8">
                    <SiteLogoLink title={title} isTitleVisible={isTitleVisible} logo={logo} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden mr-8 space-x-8 lg:flex lg:items-center" {...toFieldPath('.primaryLinks')}>
                    <ListOfLinks links={primaryLinks} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul className="hidden ml-auto space-x-8 lg:flex lg:items-center" {...toFieldPath('.secondaryLinks')}>
                    <ListOfLinks links={secondaryLinks} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
};

const HeaderVariantB: React.FC<Props> = (props) => {
    const { title, isTitleVisible, logo, primaryLinks = [], secondaryLinks = [] } = props;
    return (
        <div className="relative flex items-center">
            {(logo || (title && isTitleVisible)) && (
                <div className="mr-8">
                    <SiteLogoLink title={title} isTitleVisible={isTitleVisible} logo={logo} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul
                    className="absolute hidden w-auto space-x-8 transform -translate-x-1/2 -translate-y-1/2 lg:flex lg:items-center left-1/2 top-1/2"
                    {...toFieldPath('.primaryLinks')}
                >
                    <ListOfLinks links={primaryLinks} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul className="hidden ml-auto space-x-8 lg:flex lg:items-center" {...toFieldPath('.secondaryLinks')}>
                    <ListOfLinks links={secondaryLinks} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
};

const HeaderVariantC: React.FC<Props> = (props) => {
    const { title, isTitleVisible, logo, primaryLinks = [], secondaryLinks = [] } = props;
    return (
        <div className="relative flex items-center">
            {(logo || (title && isTitleVisible)) && (
                <div className="mr-8">
                    <SiteLogoLink title={title} isTitleVisible={isTitleVisible} logo={logo} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden ml-auto space-x-8 lg:flex lg:items-center" {...toFieldPath('.primaryLinks')}>
                    <ListOfLinks links={primaryLinks} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul
                    className={classNames('hidden', 'lg:flex', 'lg:items-center', 'space-x-8', primaryLinks.length > 0 ? 'ml-8' : 'ml-auto')}
                    {...toFieldPath('.secondaryLinks')}
                >
                    <ListOfLinks links={secondaryLinks} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
};

const HeaderVariantD: React.FC<Props> = (props) => {
    const { title, isTitleVisible, logo, primaryLinks = [], secondaryLinks = [] } = props;
    return (
        <div className="relative flex items-center">
            {(logo || (title && isTitleVisible)) && (
                <div className="mr-8 lg:mr-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-y-1/2 lg:-translate-x-1/2">
                    <SiteLogoLink title={title} isTitleVisible={isTitleVisible} logo={logo} />
                </div>
            )}
            {primaryLinks.length > 0 && (
                <ul className="hidden space-x-8 lg:flex lg:items-center" {...toFieldPath('.primaryLinks')}>
                    <ListOfLinks links={primaryLinks} />
                </ul>
            )}
            {secondaryLinks.length > 0 && (
                <ul className="hidden ml-auto space-x-8 lg:flex lg:items-center" {...toFieldPath('.secondaryLinks')}>
                    <ListOfLinks links={secondaryLinks} />
                </ul>
            )}
            {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
        </div>
    );
};

const HeaderVariantE: React.FC<Props> = (props) => {
    const { title, isTitleVisible, logo, primaryLinks = [], secondaryLinks = [] } = props;
    return (
        <>
            <div className="relative flex items-center">
                {(logo || (title && isTitleVisible)) && (
                    <div className="mr-8 lg:mr-0 lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-y-1/2 lg:-translate-x-1/2">
                        <SiteLogoLink title={title} isTitleVisible={isTitleVisible} logo={logo} />
                    </div>
                )}
                {secondaryLinks.length > 0 && (
                    <ul className="hidden ml-auto space-x-8 lg:flex lg:items-center" {...toFieldPath('.secondaryLinks')}>
                        {ListOfLinks({ links: secondaryLinks })}
                    </ul>
                )}
                {(primaryLinks.length > 0 || secondaryLinks.length > 0) && <MobileMenu {...props} />}
            </div>
            {primaryLinks.length > 0 && (
                <ul className="hidden mt-4 space-x-8 lg:flex lg:items-center lg:justify-center" {...toFieldPath('.primaryLinks')}>
                    <ListOfLinks links={primaryLinks} />
                </ul>
            )}
        </>
    );
};

const MobileMenu: React.FC<Props> = (props) => {
    const { secondaryColors = 'colors-a', title, isTitleVisible, logo, primaryLinks = [], secondaryLinks = [] } = props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            setIsMenuOpen(false);
        };
        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router.events]);

    return (
        <div className="ml-auto lg:hidden">
            <button aria-label="Open Menu" className="p-2 -mr-1 focus:outline-none" onClick={() => setIsMenuOpen(true)}>
                <span className="sr-only">Open Menu</span>
                <MenuIcon className="w-6 h-6 fill-current" />
            </button>
            <div
                className={classNames(
                    secondaryColors,
                    'fixed',
                    'inset-0',
                    'px-4',
                    'sm:px-8',
                    'py-5',
                    'overflow-y-auto',
                    'z-20',
                    isMenuOpen ? 'block' : 'hidden'
                )}
            >
                <div className="flex flex-col min-h-full">
                    <div className="flex items-center justify-between mb-10">
                        {(logo || (title && isTitleVisible)) && <SiteLogoLink title={title} isTitleVisible={isTitleVisible} logo={logo} />}
                        <button aria-label="Close Menu" className="p-2 -mr-1 focus:outline-none" onClick={() => setIsMenuOpen(false)}>
                            <CloseIcon className="w-6 h-6 fill-current" />
                        </button>
                    </div>
                    {primaryLinks.length > 0 && (
                        <ul className="flex-grow mb-10 space-y-6" {...toFieldPath('.primaryLinks')}>
                            <ListOfLinks links={primaryLinks} inMobileMenu />
                        </ul>
                    )}
                    {secondaryLinks.length > 0 && (
                        <ul className="mb-10 space-y-5" {...toFieldPath('.secondaryLinks')}>
                            <ListOfLinks links={secondaryLinks} inMobileMenu />
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

const SiteLogoLink: React.FC<{ title?: string; isTitleVisible?: boolean; logo?: types.ImageBlock }> = ({ title, isTitleVisible, logo }) => {
    return (
        <Link href="/" aria-label={title} className="flex items-center sb-header-logo">
            {logo && <ImageBlock {...logo} className={classNames('max-h-12', { 'mr-2': isTitleVisible })} {...toFieldPath('.logo')} />}
            {title && isTitleVisible && (
                <span className="text-2xl tracking-wide" {...toFieldPath('.title')}>
                    {title}
                </span>
            )}
        </Link>
    );
};

type Action = types.Button | types.Link;

const ListOfLinks: React.FC<{ links: Action[]; inMobileMenu?: boolean }> = ({ links, inMobileMenu = false }) => {
    return (
        <>
            {links.map((link, index) => (
                <li key={index}>
                    <Action {...link} className={classNames(inMobileMenu && link.type === 'Button' ? 'w-full' : '')} {...toFieldPath(`.${index}`)} />
                </li>
            ))}
        </>
    );
};

function mapMaxWidthStyles(width: string) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-xl';
        case 'wide':
            return 'max-w-screen-2xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}
