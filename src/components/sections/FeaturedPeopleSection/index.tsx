import * as React from 'react';
import classNames from 'classnames';
import { pickDataAttrs, toFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Section } from '../Section';
import { Action } from '../../atoms/Action';
import { ImageBlock } from '../../blocks/ImageBlock';
import { Markdown } from '../../atoms/Markdown';

export type Props = Omit<types.FeaturedPeopleSection, 'people'> & {
    people: types.Person[];
};

export const FeaturedPeopleSection: React.FC<Props> = (props) => {
    const { elementId, colors, variant, title, subtitle, actions = [], people = [], styles = {} } = props;
    return (
        <Section elementId={elementId} className="sb-component-featured-people-section" colors={colors} styles={styles.self} {...pickDataAttrs(props)}>
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
            <FeaturedPeopleVariants variant={variant} people={people} hasTopMargin={!!(title || subtitle)} />
            <FeaturedPeopleActions actions={actions} styles={styles.actions} />
        </Section>
    );
};

type FeaturedPeopleActionsProps = {
    actions?: types.Action[];
    styles?: types.Styles;
};

const FeaturedPeopleActions: React.FC<FeaturedPeopleActionsProps> = (props) => {
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

type FeaturedPeopleVariantProps = {
    variant?: Props['variant'];
    people?: Props['people'];
    hasTopMargin?: boolean;
};

const FeaturedPeopleVariants: React.FC<FeaturedPeopleVariantProps> = (props) => {
    const { variant = 'variant-a', ...rest } = props;
    switch (variant) {
        case 'variant-a':
            return <PeopleVariantA {...rest} />;
        case 'variant-b':
            return <PeopleVariantB {...rest} />;
        case 'variant-c':
            return <PeopleVariantC {...rest} />;
        default:
            return null;
    }
};

const PeopleVariantA: React.FC<FeaturedPeopleVariantProps> = (props) => {
    const { people = [], hasTopMargin } = props;
    if (people.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('grid', 'gap-6', 'sm:grid-cols-2', 'lg:grid-cols-4', 'lg:gap-8', {
                'mt-12': hasTopMargin
            })}
            {...toFieldPath('.people')}
        >
            {people.map((person, index) => (
                <article key={index} {...toFieldPath(`.${index}`)}>
                    {person.image && (
                        <div className="relative w-full h-0 pt-1/1 mb-6">
                            <ImageBlock {...person.image} className="absolute top-0 left-0 object-cover w-full h-full" {...toFieldPath('.image')} />
                        </div>
                    )}
                    {(person.firstName || person.lastName) && (
                        <h3>
                            {person.firstName && <span {...toFieldPath('.firstName')}>{person.firstName}</span>}{' '}
                            {person.lastName && <span {...toFieldPath('.lastName')}>{person.lastName}</span>}
                        </h3>
                    )}
                    {person.role && (
                        <p className={classNames({ 'mt-1': person.firstName || person.lastName })} {...toFieldPath('.role')}>
                            {person.role}
                        </p>
                    )}
                </article>
            ))}
        </div>
    );
};

const PeopleVariantB: React.FC<FeaturedPeopleVariantProps> = (props) => {
    const { people = [], hasTopMargin } = props;
    if (people.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('grid', 'gap-x-8', 'gap-y-10', 'lg:grid-cols-2', {
                'mt-12': hasTopMargin
            })}
            {...toFieldPath('.people')}
        >
            {people.map((person, index) => (
                <article key={index} className="sm:flex" {...toFieldPath(`.${index}`)}>
                    {person.image && (
                        <div className="w-full sm:flex-shrink-0 sm:h-full sm:w-1/3">
                            <div className="relative block w-full h-0 pt-1/1">
                                <ImageBlock {...person.image} className="absolute top-0 left-0 object-cover w-full h-full" {...toFieldPath('.image')} />
                            </div>
                        </div>
                    )}
                    <div
                        className={classNames('mb-4', 'sm:flex-grow', {
                            'pt-6 sm:pt-0 sm:pl-6': person.image
                        })}
                    >
                        {(person.firstName || person.lastName) && (
                            <h3>
                                {person.firstName && <span {...toFieldPath('.firstName')}>{person.firstName}</span>}{' '}
                                {person.lastName && <span {...toFieldPath('.lastName')}>{person.lastName}</span>}
                            </h3>
                        )}
                        {person.role && <p {...toFieldPath('.role')}>{person.role}</p>}
                        {person.bio && (
                            <Markdown
                                text={person.bio}
                                className={classNames({
                                    'mt-4': person.firstName || person.lastName || person.role
                                })}
                                {...toFieldPath('.bio')}
                            />
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
};

const PeopleVariantC: React.FC<FeaturedPeopleVariantProps> = (props) => {
    const { people = [], hasTopMargin } = props;
    if (people.length === 0) {
        return null;
    }
    const middleIndex = Math.floor(people.length / 2);
    const peopleLeft = people.slice(0, middleIndex);
    const peopleRight = people.slice(middleIndex, people.length);
    return (
        <div
            className={classNames('grid', 'gap-x-6', 'gap-y-12', 'sm:grid-cols-2', {
                'mt-12': hasTopMargin
            })}
            {...toFieldPath('.people')}
        >
            <PeopleListVariantC people={peopleLeft} className="sm:mt-32" />
            <PeopleListVariantC people={peopleRight} annotIndexStart={middleIndex} />
        </div>
    );
};

const PeopleListVariantC: React.FC<{ people: Props['people']; className?: string; annotIndexStart?: number }> = ({
    people,
    className,
    annotIndexStart = 0
}) => {
    if (people.length === 0) {
        return null;
    }
    return (
        <div className={classNames('space-y-12', className)}>
            {people.map((person, index, arr) => (
                <article key={index} className={classNames(arr.length - 1 === index ? null : 'mb-12')} {...toFieldPath(`.${annotIndexStart + index}`)}>
                    {person.image && (
                        <div className="mb-4">
                            <ImageBlock {...person.image} className="w-full" {...toFieldPath('.image')} />
                        </div>
                    )}
                    {(person.firstName || person.lastName || person.role) && (
                        <h3 className={classNames({ 'mb-3': person.bio })}>
                            {person.firstName && <span {...toFieldPath('.firstName')}>{person.firstName}</span>}{' '}
                            {person.lastName && <span {...toFieldPath('.lastName')}>{person.lastName}</span>}{' '}
                            {(person.firstName || person.lastName) && person.role && <span className="mx-1">|</span>}{' '}
                            {person.role && <span {...toFieldPath('.role')}>{person.role}</span>}
                        </h3>
                    )}
                    {person.bio && <Markdown text={person.bio} className="sb-markdown" {...toFieldPath('.bio')} />}
                </article>
            ))}
        </div>
    );
};
