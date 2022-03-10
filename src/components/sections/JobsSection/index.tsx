import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Section } from '../Section';
import { Action } from '../../atoms/Action';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.JobsSection;

export const JobsSection: React.FC<Props> = (props) => {
    const { elementId, colors, title, subtitle, jobLists = [], styles = {} } = props;
    return (
        <Section elementId={elementId} className="sb-component-jobs-section" colors={colors} styles={styles.self} {...pickDataAttrs(props)}>
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
            {jobLists.length > 0 && (
                <div
                    className={classNames('space-y-16 lg:space-y-24', {
                        'mt-12 lg:mt-16': title || subtitle
                    })}
                    {...toFieldPath('.jobLists')}
                >
                    {jobLists.map((jobList, index) => (
                        <JobList key={index} {...jobList} {...toFieldPath(`.${index}`)} />
                    ))}
                </div>
            )}
        </Section>
    );
};

const JobList: React.FC<types.JobList & StackbitFieldPath> = (props) => {
    const { title, items = [] } = props;
    return (
        <div className="pb-12 border-b border-current lg:pb-20" {...pickDataAttrs(props)}>
            {title && (
                <h3 className="mb-10" {...toFieldPath('.title')}>
                    {title}
                </h3>
            )}
            {items.length > 0 && (
                <div className="space-y-16 lg:space-y-24" {...toFieldPath('.items')}>
                    {items.map((jobItem, index) => (
                        <JobListItem key={index} {...jobItem} {...toFieldPath(`.${index}`)} />
                    ))}
                </div>
            )}
        </div>
    );
};

const JobListItem: React.FC<types.JobListItem & StackbitFieldPath> = (props) => {
    const { title, location, text, actions = [] } = props;
    return (
        <div className="max-w-screen-sm" {...pickDataAttrs(props)}>
            {title && (
                <h4 className="text-xl font-normal" {...toFieldPath('.title')}>
                    {title}
                </h4>
            )}
            {location && (
                <p className={classNames('text-xl', 'font-bold', { 'mt-4': title })} {...toFieldPath('.location')}>
                    {location}
                </p>
            )}
            {text && (
                <Markdown
                    text={text}
                    className={classNames('sb-markdown', {
                        'mt-10 lg:mt-12': title || location
                    })}
                    {...toFieldPath('.text')}
                />
            )}
            {actions.length > 0 && (
                <div
                    className={classNames('overflow-x-hidden', {
                        'mt-10 lg:mt-12': title || location || text
                    })}
                >
                    <div className="flex flex-wrap items-center -mx-2" {...toFieldPath('.actions')}>
                        {actions.map((action, index) => (
                            <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" {...toFieldPath(`.${index}`)} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
