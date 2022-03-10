import * as React from 'react';
import NextLink from 'next/link';
import { StackbitFieldPath } from '@stackbit/annotations';

type AnchorProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export type Props = { href: string } & AnchorProps & StackbitFieldPath;

export const Link: React.FC<Props> = ({ children, href, ...other }) => {
    // Pass Any internal link to Next.js Link, for anything else, use <a> tag
    const internal = /^\/(?!\/)/.test(href);
    if (internal) {
        return (
            <NextLink href={href}>
                <a {...other}>{children}</a>
            </NextLink>
        );
    }

    return (
        <a href={href} {...other}>
            {children}
        </a>
    );
};
