import * as React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { toFieldPath, toObjectId, pickDataAttrs } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Section } from '../Section';
import { Link } from '../../atoms/Link';
import { Action } from '../../atoms/Action';
import { ImageBlock } from '../../blocks/ImageBlock';
import ArrowRightIcon from '../../svgs/arrow-right';

export type Props = types.PostFeedSection & {
    pageLinks?: React.ReactNode;
    posts?: PostFeedSectionPostsProps[];
    annotatePosts?: boolean;
};

export type PostFeedSectionPostsProps = types.PostLayoutResolvedWithoutSections;

export const PostFeedSection: React.FC<Props> = (props) => {
    const {
        elementId,
        colors,
        variant,
        title,
        subtitle,
        actions = [],
        posts = [],
        showDate,
        showAuthor,
        showExcerpt,
        pageLinks,
        annotatePosts,
        styles = {}
    } = props;
    return (
        <Section elementId={elementId} className="sb-component-post-feed-section" colors={colors} styles={styles.self} {...pickDataAttrs(props)}>
            {title && (
                <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                    {title}
                </h2>
            )}
            {subtitle && (
                <p
                    className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                        'mt-6': title
                    })}
                    {...toFieldPath('.subtitle')}
                >
                    {subtitle}
                </p>
            )}
            <PostFeedVariants
                variant={variant}
                posts={posts}
                showDate={showDate}
                showAuthor={showAuthor}
                showExcerpt={showExcerpt}
                hasTopMargin={!!(title || subtitle)}
                annotatePosts={annotatePosts}
            />
            <PostFeedActions actions={actions} styles={styles.actions} />
            {pageLinks}
        </Section>
    );
};

type PostFeedActionsProps = {
    actions?: types.Action[];
    styles?: types.Styles;
};

const PostFeedActions: React.FC<PostFeedActionsProps> = (props) => {
    const { actions = [], styles = {} } = props;
    if (actions.length === 0) {
        return null;
    }
    return (
        <div className="mt-12 overflow-x-hidden">
            <div className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', mapStyles(styles))} {...toFieldPath('.actions')}>
                {actions.map((action, index) => (
                    <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" {...toFieldPath(`.${index}`)} />
                ))}
            </div>
        </div>
    );
};

type PostFeedVariantProps = {
    variant?: Props['variant'];
    posts?: Props['posts'];
    showDate?: boolean;
    showAuthor?: boolean;
    showExcerpt?: boolean;
    hasTopMargin?: boolean;
    annotatePosts?: boolean;
};

const PostFeedVariants: React.FC<PostFeedVariantProps> = (props) => {
    const { variant = 'variant-a', ...rest } = props;
    switch (variant) {
        case 'variant-a':
            return <PostsVariantA {...rest} />;
        case 'variant-b':
            return <PostsVariantB {...rest} />;
        case 'variant-c':
            return <PostsVariantC {...rest} />;
        default:
            return null;
    }
};

const PostsVariantA: React.FC<PostFeedVariantProps> = (props) => {
    const { posts = [], showDate, showAuthor, showExcerpt, hasTopMargin, annotatePosts } = props;
    if (posts.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('grid', 'gap-x-6', 'gap-y-12', 'md:grid-cols-3', 'lg:gap-x-8', {
                'mt-12': hasTopMargin
            })}
            {...(annotatePosts ? toFieldPath('.posts') : null)}
        >
            {posts.map((post, index) => (
                <article key={index} {...toObjectId(post.__metadata.id)}>
                    <Link href={post.__metadata.urlPath} className="block">
                        {post.featuredImage && (
                            <div className="rounded-2xl mb-6 h-0 w-full pt-1/1 relative overflow-hidden lg:mb-10">
                                <ImageBlock
                                    {...post.featuredImage}
                                    className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    {...toFieldPath('featuredImage')}
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="text-2xl" {...toFieldPath('title')}>
                                {post.title}
                            </h3>
                            {showDate && <PostDate post={post} className="mt-2" />}
                            {showExcerpt && post.excerpt && (
                                <p className="mt-6" {...toFieldPath('excerpt')}>
                                    {post.excerpt}
                                </p>
                            )}
                            <PostAttribution showAuthor={showAuthor} post={post} className={classNames(showExcerpt && post.excerpt ? 'mt-6' : 'mt-2')} />
                        </div>
                    </Link>
                </article>
            ))}
        </div>
    );
};

const PostsVariantB: React.FC<PostFeedVariantProps> = (props) => {
    const { posts = [], showDate, showAuthor, showExcerpt, hasTopMargin, annotatePosts } = props;
    if (posts.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('grid', 'gap-x-6', 'gap-y-12', 'md:grid-cols-5', 'lg:gap-x-8', {
                'mt-12': hasTopMargin
            })}
            {...(annotatePosts ? toFieldPath('.posts') : null)}
        >
            {posts.map((post, index) => (
                <article
                    key={index}
                    className={classNames(index % 4 === 0 || (index + 1) % 4 === 0 ? 'md:col-span-3' : 'md:col-span-2')}
                    {...toObjectId(post.__metadata.id)}
                >
                    <Link href={post.__metadata.urlPath} className="block">
                        {post.featuredImage && (
                            <div
                                className="rounded-2xl mb-6 h-0 w-full pt-9/16 relative overflow-hidden md:pt-0 md:h-64 lg:h-96 lg:mb-10"
                                {...toFieldPath('featuredImage')}
                            >
                                <ImageBlock
                                    {...post.featuredImage}
                                    className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        )}
                        <div>
                            <h3 className="text-2xl" {...toFieldPath('title')}>
                                {post.title}
                            </h3>
                            {showDate && <PostDate post={post} className="mt-2" />}
                            {showExcerpt && post.excerpt && (
                                <p className="mt-6" {...toFieldPath('excerpt')}>
                                    {post.excerpt}
                                </p>
                            )}
                            <PostAttribution showAuthor={showAuthor} post={post} className={classNames(showExcerpt && post.excerpt ? 'mt-6' : 'mt-2')} />
                        </div>
                    </Link>
                </article>
            ))}
        </div>
    );
};

const PostsVariantC: React.FC<PostFeedVariantProps> = (props) => {
    const { posts = [], showDate, showAuthor, showExcerpt, hasTopMargin, annotatePosts } = props;
    if (posts.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('grid', 'gap-6', 'md:grid-cols-3', 'lg:gap-8', {
                'mt-12': hasTopMargin
            })}
            {...(annotatePosts ? toFieldPath('.posts') : null)}
        >
            {posts.map((post, index) => {
                return (
                    <article key={index} className="sb-card rounded-2xl overflow-hidden" {...toObjectId(post.__metadata.id)}>
                        <Link href={post.__metadata.urlPath} className="block">
                            <div className="flex flex-col min-h-full">
                                {post.featuredImage && (
                                    <div className="h-0 w-full pt-9/16 relative overflow-hidden" {...toFieldPath('featuredImage')}>
                                        <ImageBlock
                                            {...post.featuredImage}
                                            className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    </div>
                                )}
                                <div className="flex flex-col flex-grow px-4 pt-6 pb-8 sm:px-6">
                                    <div className="flex-grow">
                                        {showDate && <PostDate post={post} className="mb-2" />}
                                        <h3 className="text-2xl" {...toFieldPath('title')}>
                                            {post.title}
                                        </h3>
                                        <PostAttribution showAuthor={showAuthor} post={post} className="mt-2" />
                                        {showExcerpt && post.excerpt && (
                                            <p className="mt-3" {...toFieldPath('excerpt')}>
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
};

const PostDate: React.FC<{ post: PostFeedSectionPostsProps; className?: string }> = ({ post, className = '' }) => {
    if (!post.date) {
        return null;
    }
    const date = post.date;
    const dateTimeAttr = dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    const formattedDate = dayjs(date).format('MMMM D, YYYY');
    return (
        <div className={className}>
            <time dateTime={dateTimeAttr} {...toFieldPath('date')}>
                {formattedDate}
            </time>
        </div>
    );
};

const PostAttribution: React.FC<{ showAuthor?: boolean; post: PostFeedSectionPostsProps; className?: string }> = ({ showAuthor, post, className = '' }) => {
    if (!post.author && !post.category) {
        return null;
    }
    return (
        <div className={className}>
            {showAuthor && post.author && (
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
    if (!author) {
        return null;
    }
    return (
        <span {...toFieldPath('author')}>
            {author.firstName && <span {...toFieldPath('.firstName')}>{author.firstName}</span>}{' '}
            {author.lastName && <span {...toFieldPath('.lastName')}>{author.lastName}</span>}
        </span>
    );
};

const PostCategory: React.FC<{ category: types.CategoryProps }> = ({ category }) => {
    if (!category) {
        return null;
    }
    return <span {...toFieldPath('category')}>{category.title}</span>;
};
