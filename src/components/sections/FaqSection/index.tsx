import * as React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Section } from '../Section';
import { Action } from '../../atoms/Action';
import ChevronIcon from '../../svgs/chevron-right';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.FaqSection & StackbitFieldPath;

export const FaqSection: React.FC<Props> = (props) => {
    const { elementId, colors, title, subtitle, actions = [], items = [], styles = {} } = props;
    return (
        <Section elementId={elementId} className="sb-component-faq-section" colors={colors} styles={styles.self} {...pickDataAttrs(props)}>
            <div className="flex flex-wrap">
                {(title || subtitle || actions.length > 0) && (
                    <div className={classNames('w-full', { 'lg:w-1/3 lg:pr-3': items.length > 0 })}>
                        {title && (
                            <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p
                                className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                                    'mt-2': title
                                })}
                                {...toFieldPath('.subtitle')}
                            >
                                {subtitle}
                            </p>
                        )}
                        {actions.length > 0 && (
                            <div
                                className={classNames('overflow-x-hidden', {
                                    'mt-6': title || subtitle
                                })}
                            >
                                <div
                                    className={classNames('flex', 'flex-wrap', 'items-center', '-mx-2', styles.actions ? mapStyles(styles.actions) : null)}
                                    {...toFieldPath('.actions')}
                                >
                                    {actions.map((action, index) => (
                                        <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" {...toFieldPath(`.${index}`)} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {items.length > 0 && (
                    <div
                        className={classNames('w-full', {
                            'mt-12 lg:mt-0 lg:w-2/3 lg:pl-3': title || subtitle || actions.length > 0
                        })}
                        {...toFieldPath('.items')}
                    >
                        {items.map((item, index) => (
                            <FaqItem key={index} {...item} {...toFieldPath(`.${index}`)} />
                        ))}
                    </div>
                )}
            </div>
        </Section>
    );
};

const FaqItem: React.FC<types.FaqItem & StackbitFieldPath> = (props) => {
    const { question, answer, styles = {} } = props;
    const [isActive, setIsActive] = useState(false);
    return (
        <div className="pb-8 mb-8 border-b border-current sb-faq-section-item" {...pickDataAttrs(props)}>
            {question && (
                <h3
                    className={classNames(
                        'flex',
                        'items-center',
                        'justify-between',
                        'cursor-pointer',
                        'text-2xl',
                        styles.question ? mapStyles(styles.question) : null
                    )}
                    onClick={() => setIsActive(!isActive)}
                >
                    <span {...toFieldPath('.question')}>{question}</span>
                    <span className={classNames('ml-4', isActive ? 'transform rotate-90' : null)}>
                        <ChevronIcon className="w-6 h-6 fill-current" />
                    </span>
                </h3>
            )}
            {answer && (
                <Markdown
                    text={answer}
                    className={classNames('sb-markdown', 'mt-6', styles.answer ? mapStyles(styles.answer) : null, !isActive ? 'hidden' : null)}
                    {...toFieldPath('.answer')}
                />
            )}
        </div>
    );
};
