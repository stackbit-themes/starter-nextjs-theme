import * as React from 'react';
import classNames from 'classnames';
import { StackbitObjectId, getObjectId, toFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { ImageBlock } from '../../blocks/ImageBlock';
import { Action } from '../../atoms/Action';
import { Social } from '../../atoms/Social';
import { Link } from '../../atoms/Link';
import { Markdown } from '../../atoms/Markdown';

type Props = types.Footer & StackbitObjectId;

export const Footer: React.FC<Props> = (props) => {
    const { colors = 'colors-a', logo, title, text, primaryLinks = [], socialLinks = [], legalLinks = [], contacts, copyrightText, styles = {} } = props;
    const objectId = getObjectId(props);
    const fieldPath = objectId ? `${objectId}:footer` : null;
    return (
        <footer className={classNames('sb-component', 'sb-component-footer', colors, styles.self?.padding ?? 'py-16 px-4')} {...toFieldPath(fieldPath)}>
            <div className={classNames('mx-auto', mapMaxWidthStyles(styles.self?.width ?? 'narrow'))}>
                {(logo || title || text) && (
                    <div className="mb-12">
                        <Link href="/" className="flex items-center sb-footer-logo" {...toFieldPath('.title#span[1]', '.logo#img[1]')}>
                            {logo && <ImageBlock {...logo} className={classNames('max-h-12', { 'mr-2': title })} {...toFieldPath('.logo')} />}
                            {title && (
                                <span className="text-2xl tracking-wide" {...toFieldPath('.title')}>
                                    {title}
                                </span>
                            )}
                        </Link>
                        {text && (
                            <Markdown text={text} className={classNames('sb-markdown', 'max-w-xl', { 'mt-8': title || logo })} {...toFieldPath('.text')} />
                        )}
                    </div>
                )}
                {(primaryLinks.length > 0 || socialLinks.length > 0 || contacts) && (
                    <div className="sm:flex sm:justify-between sm:items-end">
                        {primaryLinks.length > 0 && (
                            <div className="mb-6">
                                <ul className="flex flex-col items-start mb-6 space-y-6 text-lg" {...toFieldPath('.primaryLinks')}>
                                    {primaryLinks.map((link, index) => (
                                        <li key={index}>
                                            <Action {...link} {...toFieldPath(`.${index}`)} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {(socialLinks.length > 0 || contacts) && (
                            <div className="mb-6">
                                {socialLinks.length > 0 && (
                                    <ul className="flex items-center mb-6 space-x-10" {...toFieldPath('.socialLinks')}>
                                        {socialLinks.map((link, index) => (
                                            <li key={index}>
                                                <Social {...link} {...toFieldPath(`.${index}`)} />
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {contacts && <Contacts {...contacts} />}
                            </div>
                        )}
                    </div>
                )}
                <div className="sb-divider" />
                <div className="flex flex-col-reverse justify-between pt-6 lg:flex-row">
                    {/* Please keep this attribution up if you're using Stackbit's free plan. */}
                    {copyrightText && <Markdown text={copyrightText} />}
                    {legalLinks.length > 0 && (
                        <ul className="flex flex-col mb-6 space-y-2 lg:mb-0 sm:space-y-0 sm:space-x-5 sm:flex-row" {...toFieldPath('.legalLinks')}>
                            {legalLinks.map((link, index) => (
                                <li key={index}>
                                    <Action {...link} {...toFieldPath(`.${index}`)} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </footer>
    );
};

const Contacts: React.FC<types.ContactBlock> = (props) => {
    const { phoneNumber, phoneAltText, email, emailAltText, address, addressAltText } = props;
    return (
        <div className="mb-6 space-y-4 text-lg" {...toFieldPath('.contacts')}>
            {phoneNumber && (
                <p>
                    <a
                        href={`tel:${phoneNumber}`}
                        aria-label={phoneAltText}
                        title={phoneAltText}
                        {...toFieldPath('.phoneNumber', '.phoneNumber#@href', '.phoneAltText#@title')}
                    >
                        {phoneNumber}
                    </a>
                </p>
            )}
            {email && (
                <p>
                    <a
                        href={`mailto:${email}`}
                        aria-label={emailAltText}
                        title={emailAltText}
                        {...toFieldPath('.email', '.email#@href', '.emailAltText#@title')}
                    >
                        {email}
                    </a>
                </p>
            )}
            {address && (
                <p>
                    <a
                        href={`https://www.google.com/maps/search/${address}`}
                        aria-label={addressAltText}
                        title={addressAltText}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...toFieldPath('.address', '.address#@href', '.addressAltText#@title')}
                    >
                        {address}
                    </a>
                </p>
            )}
        </div>
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
