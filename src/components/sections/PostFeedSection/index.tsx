import * as React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import { Link, Action } from '../../atoms';
import ImageBlock from '../../molecules/ImageBlock';
import ArrowRightIcon from '../../svgs/arrow-right';
import getPageUrlPath from '../../../utils/get-page-url-path';

export default function PostFeedSection(props) {
    const cssId = props.elementId || null;
    const colors = props.colors || 'colors-a';
    const sectionStyles = props.styles?.self || {};
    const sectionWidth = sectionStyles.width || 'wide';
    const sectionHeight = sectionStyles.height || 'auto';
    const sectionJustifyContent = sectionStyles.justifyContent || 'center';
    return (
        <div
            id={cssId}
            {...getDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-post-feed-section',
                colors,
                'flex',
                'flex-col',
                'justify-center',
                'relative',
                mapMinHeightStyles(sectionHeight),
                sectionStyles.margin,
                sectionStyles.padding || 'py-12 px-4',
                sectionStyles.borderColor,
                sectionStyles.borderRadius ? mapStyles({ borderRadius: sectionStyles.borderRadius }) : null,
                sectionStyles.borderStyle ? mapStyles({ borderStyle: sectionStyles.borderStyle }) : 'border-none'
            )}
            style={{
                borderWidth: sectionStyles.borderWidth ? `${sectionStyles.borderWidth}px` : null
            }}
        >
            <div className={classNames('flex', 'w-full', mapStyles({ justifyContent: sectionJustifyContent }))}>
                <div className={classNames('w-full', mapMaxWidthStyles(sectionWidth))}>
                    {postFeedHeader(props)}
                    {postFeedVariants(props)}
                    {postFeedActions(props)}
                    {props.pageLinks}
                </div>
            </div>
        </div>
    );
}

function postFeedHeader(props) {
    if (!props.title && !props.subtitle) {
        return null;
    }
    const styles = props.styles || {};
    return (
        <div>
            {props.title && (
                <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} data-sb-field-path=".title">
                    {props.title}
                </h2>
            )}
            {props.subtitle && (
                <p
                    className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, { 'mt-6': props.title })}
                    data-sb-field-path=".subtitle"
                >
                    {props.subtitle}
                </p>
            )}
        </div>
    );
}

function postFeedActions(props) {
    const actions = props.actions || [];
    if (actions.length === 0) {
        return null;
    }
    const styles = props.styles || {};
    return (
        <div className="mt-12 overflow-x-hidden">
            <div
                className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', styles.actions ? mapStyles(styles.actions) : null)}
                data-sb-field-path=".actions"
            >
                {props.actions.map((action, index) => (
                    <Action key={index} {...action} className="mb-3 mx-2 lg:whitespace-nowrap" data-sb-field-path={`.${index}`} />
                ))}
            </div>
        </div>
    );
}

function postFeedVariants(props) {
    const variant = props.variant || 'variant-a';
    switch (variant) {
        case 'variant-a':
            return postsVariantA(props);
        case 'variant-b':
            return postsVariantB(props);
        case 'variant-c':
            return postsVariantC(props);
    }
    return null;
}

function postsVariantA(props) {
    const posts = props.posts || [];
    if (posts.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('grid', 'gap-x-6', 'gap-y-12', 'md:grid-cols-3', 'lg:gap-x-8', { 'mt-12': props.title || props.subtitle })}
            {...(props.annotatePosts ? { 'data-sb-field-path': '.posts' } : null)}
        >
            {posts.map((post, index) => (
                <article key={index}>
                    <Link href={getPageUrlPath(post)} className="block" data-sb-object-id={post.__metadata?.id}>
                        {post.featuredImage && (
                            <div
                                className="rounded-2xl mb-6 h-0 w-full pt-1/1 relative overflow-hidden lg:mb-10"

                            >
                                <ImageBlock
                                    {...post.featuredImage}
                                    className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    data-sb-field-path="featuredImage"
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="text-2xl" data-sb-field-path="title">
                                {post.title}
                            </h3>
                            {props.showDate && <PostDate post={post} className="mt-2" />}
                            {props.showExcerpt && post.excerpt && (
                                <p className="mt-6" data-sb-field-path="excerpt">
                                    {post.excerpt}
                                </p>
                            )}
                            <PostAttribution
                                showAuthor={props.showAuthor}
                                post={post}
                                className={classNames(props.showExcerpt && post.excerpt ? 'mt-6' : 'mt-2')}
                            />
                        </div>
                    </Link>
                </article>
            ))}
        </div>
    );
}

function postsVariantB(props) {
    const posts = props.posts || [];
    if (posts.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('grid', 'gap-x-6', 'gap-y-12', 'md:grid-cols-5', 'lg:gap-x-8', { 'mt-12': props.title || props.subtitle })}
            {...(props.annotatePosts ? { 'data-sb-field-path': '.posts' } : null)}
        >
            {posts.map((post, index) => (
                <article
                    key={index}
                    className={classNames(index % 4 === 0 || (index + 1) % 4 === 0 ? 'md:col-span-3' : 'md:col-span-2')}

                >
                    <Link href={getPageUrlPath(post)} className="block" data-sb-object-id={post.__metadata?.id}>
                        {post.featuredImage && (
                            <div
                                className="rounded-2xl mb-6 h-0 w-full pt-9/16 relative overflow-hidden md:pt-0 md:h-64 lg:h-96 lg:mb-10"
                                data-sb-field-path="featuredImage"
                            >
                                <ImageBlock
                                    {...post.featuredImage}
                                    className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="text-2xl" data-sb-field-path="title">
                                {post.title}
                            </h3>
                            {props.showDate && <PostDate post={post} className="mt-2" />}
                            {props.showExcerpt && post.excerpt && (
                                <p className="mt-6" data-sb-field-path="excerpt">
                                    {post.excerpt}
                                </p>
                            )}
                            <PostAttribution
                                showAuthor={props.showAuthor}
                                post={post}
                                className={classNames(props.showExcerpt && post.excerpt ? 'mt-6' : 'mt-2')}
                            />
                        </div>
                    </Link>
                </article>
            ))}
        </div>
    );
}

function postsVariantC(props) {
    const posts = props.posts || [];
    if (posts.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('grid', 'gap-6', 'md:grid-cols-3', 'lg:gap-8', { 'mt-12': props.title || props.subtitle })}
            {...(props.annotatePosts ? { 'data-sb-field-path': '.posts' } : null)}
        >
            {posts.map((post, index) => {
                return (
                    <article key={index} className="sb-card rounded-2xl overflow-hidden">
                        <Link href={getPageUrlPath(post)} className="block" data-sb-object-id={post.__metadata.id}>
                            <div className="flex flex-col min-h-full">

                                {post.featuredImage && (
                                    <div

                                        className="h-0 w-full pt-9/16 relative overflow-hidden"
                                        data-sb-field-path="featuredImage"
                                    >
                                        <ImageBlock
                                            {...post.featuredImage}
                                            className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col flex-grow px-4 pt-6 pb-8 sm:px-6">
                                    <div className="flex-grow">
                                        {props.showDate && <PostDate post={post} className="mb-2" />}
                                        <h3 className="text-2xl" data-sb-field-path="title">

                                            {post.title}

                                        </h3>
                                        <PostAttribution showAuthor={props.showAuthor} post={post} className="mt-2" />
                                        {props.showExcerpt && post.excerpt && (
                                            <p className="mt-3" data-sb-field-path="excerpt">
                                                {post.excerpt}
                                            </p>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <div className="sb-component sb-component-block sb-component-link">
                                            <span>Read post</span>
                                            <ArrowRightIcon className="fill-current h-5 w-5 ml-3" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </Link>
                    </article>
                );
            })}
        </div>
    );
}

function PostDate({ post, className = '' }) {
    if (!post.date) {
        return null;
    }
    const date = post.date;
    const dateTimeAttr = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    const formattedDate = dayjs(date).format('MMMM D, YYYY');
    return (
        <div className={className ? className : null}>
            <time dateTime={dateTimeAttr} data-sb-field-path="date">
                {formattedDate}
            </time>
        </div>
    );
}

function PostAttribution({ showAuthor, post, className = '' }) {
    const author = showAuthor ? postAuthor(post) : null;
    const category = postCategory(post);
    if (!author && !category) {
        return null;
    }
    return (
        <div className={className ? className : null}>
            {author && (
                <>
                    {'By '}
                    {author}
                </>
            )}
            {category && (
                <>
                    {author ? ' in ' : 'In '}
                    {category}
                </>
            )}
        </div>
    );
}

function postAuthor(post) {
    if (!post.author) {
        return null;
    }
    const author = post.author;
    const children = (
        <>
            {author.firstName && <span data-sb-field-path=".firstName">{author.firstName}</span>}{' '}
            {author.lastName && <span data-sb-field-path=".lastName">{author.lastName}</span>}
        </>
    );
    if (author.slug) {
        return (
            <Link data-sb-field-path="author" href={`/blog/author/${author.slug}`}>
                {children}
            </Link>
        );
    } else {
        return <span data-sb-field-path="author">{children}</span>;
    }
}

function postCategory(post) {
    if (!post.category) {
        return null;
    }
    const category = post.category;
    return (
        <Link data-sb-field-path="category" href={getPageUrlPath(category)}>
            {category.title}
        </Link>
    );
}

function mapMinHeightStyles(height) {
    switch (height) {
        case 'auto':
            return 'min-h-0';
        case 'screen':
            return 'min-h-screen';
    }
    return null;
}

function mapMaxWidthStyles(width) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-md';
        case 'wide':
            return 'max-w-screen-xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}
