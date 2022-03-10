import * as React from 'react';
import dayjs from 'dayjs';
import { toFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { Link } from '../../atoms/Link';
import { DynamicComponent } from '../../DynamicComponent';
import { Markdown } from '../../atoms/Markdown';
import type { SectionsProps } from '../../sections/mapSectionProps';

export type Props = Omit<types.PostLayoutResolvedWithoutSections, 'bottomSections'> & {
    bottomSections: SectionsProps[];
};

export const PostLayout: React.FC<Props> = (page) => {
    const dateTimeAttr = dayjs(page.date).format('YYYY-MM-DD HH:mm:ss');
    const formattedDate = dayjs(page.date).format('MMMM D, YYYY');

    return (
        <main id="main" className="sb-layout sb-post-layout">
            <article className="px-4 colors-a sm:px-8 py-14 lg:py-20">
                <div className="mx-auto max-w-screen-2xl">
                    <header className="max-w-screen-md mx-auto mb-12 text-center">
                        <div className="mb-4 text-lg">
                            <time dateTime={dateTimeAttr} {...toFieldPath('date')}>
                                {formattedDate}
                            </time>
                        </div>
                        {page.title && <h1 {...toFieldPath('title')}>{page.title}</h1>}
                        <PostAttribution post={page} />
                    </header>
                    {page.markdown_content && (
                        <Markdown className="max-w-screen-md mx-auto sb-markdown" {...toFieldPath('markdown_content')} text={page.markdown_content} />
                    )}
                </div>
            </article>
            {page.bottomSections && page.bottomSections.length > 0 && (
                <div {...toFieldPath('bottomSections')}>
                    {page.bottomSections.map((section, index) => (
                        <DynamicComponent key={index} {...section} {...toFieldPath(`bottomSections.${index}`)} />
                    ))}
                </div>
            )}
        </main>
    );
};

const PostAttribution: React.FC<{ post: Props }> = ({ post }) => {
    if (!post.author && !post.category) {
        return null;
    }
    return (
        <div className="mt-6 text-lg">
            {post.author && (
                <>
                    {'By '}
                    <PostAuthor author={post.author} />
                </>
            )}
            {post.category && (
                <>
                    {post.author ? ' in ' : 'In '}
                    <PostCategory category={post.category} />
                </>
            )}
        </div>
    );
};

const PostAuthor: React.FC<{ author: types.PersonProps }> = ({ author }) => {
    const children = (
        <>
            {author.firstName && <span {...toFieldPath('.firstName')}>{author.firstName}</span>}{' '}
            {author.lastName && <span {...toFieldPath('.lastName')}>{author.lastName}</span>}
        </>
    );
    return author.pageUrl ? (
        <Link {...toFieldPath('author')} href={author.pageUrl}>
            {children}
        </Link>
    ) : (
        <span {...toFieldPath('author')}>{children}</span>
    );
};

const PostCategory: React.FC<{ category: types.CategoryProps }> = ({ category }) => {
    return category.pageUrl ? (
        <Link {...toFieldPath('category')} href={category.pageUrl}>
            {category.title}
        </Link>
    ) : (
        <span {...toFieldPath('category')}>{category.title}</span>
    );
};
