import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Section } from '../Section';
import { ImageBlock } from '../../blocks/ImageBlock';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.TestimonialsSection;

export const TestimonialsSection: React.FC<Props> = (props) => {
    const { elementId, colors, variant = 'variant-a', title, subtitle, testimonials = [], styles = {} } = props;
    return (
        <Section elementId={elementId} className="sb-component-testimonials-section" colors={colors} styles={styles.self} {...pickDataAttrs(props)}>
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
            <TestimonialVariants variant={variant} testimonials={testimonials} hasTopMargin={!!(title || subtitle)} />
        </Section>
    );
};

type TestimonialVariantsProps = {
    variant?: Props['variant'];
    testimonials?: Props['testimonials'];
    hasTopMargin?: boolean;
};

const TestimonialVariants: React.FC<TestimonialVariantsProps> = (props) => {
    const { variant = 'variant-a', ...rest } = props;
    switch (variant) {
        case 'variant-a':
            return <TestimonialsVariantA {...rest} />;
        case 'variant-b':
            return <TestimonialsVariantB {...rest} />;
        case 'variant-c':
            return <TestimonialsVariantC {...rest} />;
        default:
            return null;
    }
};

const TestimonialsVariantA: React.FC<TestimonialVariantsProps> = (props) => {
    const { testimonials = [], hasTopMargin } = props;
    if (testimonials.length === 0) {
        return null;
    }
    return (
        <div className={classNames('space-y-12', { 'mt-12': hasTopMargin })} {...toFieldPath('.testimonials')}>
            {testimonials.map((testimonial, index) => (
                <blockquote key={index} className="flex flex-col md:items-center md:flex-row" {...toFieldPath(`.${index}`)}>
                    {testimonial.image && (
                        <div className="flex-shrink-0 max-w-lg mb-8 md:mb-0 md:mr-8 md:w-2/5">
                            <ImageBlock {...testimonial.image} className="w-full rounded-2xl" {...toFieldPath('.image')} />
                        </div>
                    )}
                    <div className="flex-grow">
                        {testimonial.quote && (
                            <Markdown
                                text={testimonial.quote}
                                className="text-3xl sb-markdown sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-tight"
                                {...toFieldPath('.quote')}
                            />
                        )}
                        {(testimonial.name || testimonial.title) && (
                            <footer className="mt-8 md:mt-12">
                                {testimonial.name && (
                                    <div
                                        className={classNames('text-xl', 'sm:text-2xl', testimonial.styles?.name ? mapStyles(testimonial.styles?.name) : null)}
                                        {...toFieldPath('.name')}
                                    >
                                        {testimonial.name}
                                    </div>
                                )}
                                {testimonial.title && (
                                    <div
                                        className={classNames(testimonial.styles?.title ? mapStyles(testimonial.styles?.title) : null, {
                                            'mt-2': testimonial.name
                                        })}
                                        {...toFieldPath('.title')}
                                    >
                                        {testimonial.title}
                                    </div>
                                )}
                            </footer>
                        )}
                    </div>
                </blockquote>
            ))}
        </div>
    );
};

const TestimonialsVariantB: React.FC<TestimonialVariantsProps> = (props) => {
    const { testimonials = [], hasTopMargin } = props;
    if (testimonials.length === 0) {
        return null;
    }
    return (
        <div className={classNames('space-y-12', { 'mt-12': hasTopMargin })} {...toFieldPath('.testimonials')}>
            {testimonials.map((testimonial, index) => (
                <blockquote key={index} {...toFieldPath(`.${index}`)}>
                    {testimonial.quote && (
                        <Markdown
                            text={testimonial.quote}
                            className="text-3xl sb-markdown sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-tight"
                            {...toFieldPath('.quote')}
                        />
                    )}
                    {(testimonial.name || testimonial.title || testimonial.image) && (
                        <footer className="flex items-center mt-12 md:mt-16">
                            {testimonial.image && (
                                <div className="flex-shrink-0 w-20 mr-8 sm:w-28">
                                    <ImageBlock {...testimonial.image} className="w-full" {...toFieldPath('.image')} />
                                </div>
                            )}
                            {(testimonial.name || testimonial.title) && (
                                <div className="flex-grow">
                                    {testimonial.name && (
                                        <div
                                            className={classNames(
                                                'text-xl',
                                                'sm:text-2xl',
                                                testimonial.styles?.name ? mapStyles(testimonial.styles?.name) : null
                                            )}
                                            {...toFieldPath('.name')}
                                        >
                                            {testimonial.name}
                                        </div>
                                    )}
                                    {testimonial.title && (
                                        <div
                                            className={classNames(testimonial.styles?.title ? mapStyles(testimonial.styles?.title) : null, {
                                                'mt-2': testimonial.name
                                            })}
                                            {...toFieldPath('.title')}
                                        >
                                            {testimonial.title}
                                        </div>
                                    )}
                                </div>
                            )}
                        </footer>
                    )}
                </blockquote>
            ))}
        </div>
    );
};

const TestimonialsVariantC: React.FC<TestimonialVariantsProps> = (props) => {
    const { testimonials = [], hasTopMargin } = props;
    if (testimonials.length === 0) {
        return null;
    }
    return (
        <div className={classNames('space-y-12', { 'mt-12': hasTopMargin })} {...toFieldPath('.testimonials')}>
            {testimonials.map((testimonial, index) => (
                <blockquote key={index} className="text-center" {...toFieldPath(`.${index}`)}>
                    {testimonial.quote && (
                        <Markdown
                            text={testimonial.quote}
                            className="text-3xl sb-markdown sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-tight"
                            {...toFieldPath('.quote')}
                        />
                    )}
                    {(testimonial.name || testimonial.title || testimonial.image) && (
                        <footer className="mt-12 md:mt-16">
                            {testimonial.image && (
                                <div
                                    className={classNames('mx-auto', 'w-20', 'sm:w-28', {
                                        'mb-6': testimonial.name || testimonial.title
                                    })}
                                >
                                    <ImageBlock {...testimonial.image} className="w-full" {...toFieldPath('.image')} />
                                </div>
                            )}
                            {testimonial.name && (
                                <div
                                    className={classNames('text-xl', 'sm:text-2xl', testimonial.styles?.name ? mapStyles(testimonial.styles?.name) : null)}
                                    {...toFieldPath('.name')}
                                >
                                    {testimonial.name}
                                </div>
                            )}
                            {testimonial.title && (
                                <div
                                    className={classNames(testimonial.styles?.title ? mapStyles(testimonial.styles?.title) : null, {
                                        'mt-2': testimonial.name
                                    })}
                                    {...toFieldPath('.title')}
                                >
                                    {testimonial.title}
                                </div>
                            )}
                        </footer>
                    )}
                </blockquote>
            ))}
        </div>
    );
};
