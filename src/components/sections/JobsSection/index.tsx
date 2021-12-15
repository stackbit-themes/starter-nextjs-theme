import * as React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import Action from '../../atoms/Action';

export default function JobsSection(props) {
    const cssId = props.elementId || null;
    const colors = props.colors || 'colors-a';
    const styles = props.styles || {};
    const sectionWidth = styles.self?.width || 'wide';
    const sectionHeight = styles.self?.height || 'auto';
    const sectionJustifyContent = styles.self?.justifyContent || 'center';
    const jobLists = props.jobLists || [];
    return (
        <div
            id={cssId}
            {...getDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-jobs-section',
                colors,
                'flex',
                'flex-col',
                'justify-center',
                mapMinHeightStyles(sectionHeight),
                styles.self?.margin,
                styles.self?.padding || 'py-12 px-4',
                styles.self?.borderColor,
                styles.self?.borderStyle ? mapStyles({ borderStyle: styles.self?.borderStyle }) : 'border-none',
                styles.self?.borderRadius ? mapStyles({ borderRadius: styles.self?.borderRadius }) : null
            )}
            style={{
                borderWidth: styles.self?.borderWidth ? `${styles.self?.borderWidth}px` : null
            }}
        >
            <div className={classNames('flex', 'w-full', mapStyles({ justifyContent: sectionJustifyContent }))}>
                <div className={classNames('w-full', mapMaxWidthStyles(sectionWidth))}>
                    {props.title && (
                        <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} data-sb-field-path=".title">
                            {props.title}
                        </h2>
                    )}
                    {props.subtitle && (
                        <p
                            className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                                'mt-6': props.title
                            })}
                            data-sb-field-path=".subtitle"
                        >
                            {props.subtitle}
                        </p>
                    )}
                    {jobLists.length > 0 && (
                        <div className={classNames('space-y-16 lg:space-y-24', { 'mt-12 lg:mt-16': props.title || props.subtitle })} data-sb-field-path=".jobLists">
                            {jobLists.map((jobList, index) => (
                                <JobList key={index} {...jobList} data-sb-field-path={`.${index}`} />
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function JobList(props) {
    const jobItems = props.items || [];
    return (
        <div className="border-b border-current pb-12 lg:pb-20" data-sb-field-path={props['data-sb-field-path']}>
            {props.title && (
                <h3 className="mb-10" data-sb-field-path=".title">{props.title}</h3>
            )}
            {jobItems.length > 0 && (
                <div className="space-y-16 lg:space-y-24" data-sb-field-path=".items">
                    {jobItems.map((jobItem, index) => (
                        <JobListItem key={index} {...jobItem} data-sb-field-path={`.${index}`} />
                    ))}
                </div>
            )}
        </div>
    );
}

function JobListItem(props) {
    const actions = props.actions || [];
    return (
        <div className="max-w-screen-sm" data-sb-field-path={props['data-sb-field-path']}>
            {props.title && (
                <h4 className="text-xl font-normal" data-sb-field-path=".title">{props.title}</h4>
            )}
            {props.location && (
                <p
                    className={classNames('text-xl', 'font-bold', { 'mt-4': props.title })}
                    data-sb-field-path=".location"
                >
                    {props.location}
                </p>
            )}
            {props.text && (
                <Markdown
                    options={{ forceBlock: true, forceWrapper: true }}
                    className={classNames('sb-markdown', {
                        'mt-10 lg:mt-12': props.title || props.location
                    })}
                    data-sb-field-path=".text"
                >
                    {props.text}
                </Markdown>
            )}
            {actions.length > 0 && (
                <div className={classNames('overflow-x-hidden', { 'mt-10 lg:mt-12': props.title || props.location || props.text })}>
                    <div className="flex flex-wrap items-center -mx-2" data-sb-field-path=".actions">
                        {actions.map((action, index) => (
                            <Action key={index} {...action} className="mb-3 mx-2 lg:whitespace-nowrap" data-sb-field-path={`.${index}`} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function mapMinHeightStyles(height) {
    switch (height) {
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
