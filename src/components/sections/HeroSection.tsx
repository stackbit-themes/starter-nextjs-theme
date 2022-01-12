import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../utils/get-data-attrs';
import { Action, Badge } from '../atoms';
import type * as types from '.contentlayer/types';
import { FC } from 'react';
import { DynamicComponent } from '../DynamicComponent';

export type Props = types.HeroSection;

export const HeroSection: FC<Props> = (props) => {
  const cssId = props.elementId ?? null;
  const colors = props.colors ?? 'colors-a';
  const sectionStyles = props.styles?.self ?? {};
  const sectionWidth = sectionStyles.width ?? 'wide';
  const sectionHeight = sectionStyles.height ?? 'auto';
  const sectionJustifyContent = sectionStyles.justifyContent ?? 'center';
  const sectionFlexDirection = sectionStyles.flexDirection ?? 'row';
  const sectionAlignItems = sectionStyles.alignItems ?? 'center';

  return (
    <div
      id={cssId}
      {...getDataAttrs(props)}
      className={classNames(
        'sb-component',
        'sb-component-section',
        'sb-component-hero-section',
        colors,
        'flex',
        'flex-col',
        'justify-center',
        mapMinHeightStyles(sectionHeight),
        sectionStyles.margin,
        sectionStyles.padding ?? 'py-12 px-4',
        sectionStyles.borderColor,
        sectionStyles.borderStyle ? mapStyles({ borderStyle: sectionStyles.borderStyle }) : 'border-none',
        sectionStyles.borderRadius ? mapStyles({ borderRadius: sectionStyles.borderRadius }) : null
      )}
      style={{
        borderWidth: sectionStyles.borderWidth ? `${sectionStyles.borderWidth}px` : null
      }}
    >
      <div className={classNames('flex', 'w-full', mapStyles({ justifyContent: sectionJustifyContent }))}>
        <div className={classNames('w-full', mapMaxWidthStyles(sectionWidth))}>
          <div
            className={classNames(
              'flex',
              mapFlexDirectionStyles(sectionFlexDirection),
              mapStyles({ alignItems: sectionAlignItems }),
              'space-y-8',
              {
                'lg:space-y-0 lg:space-x-8': sectionFlexDirection === 'row',
                'space-y-reverse lg:space-y-0 lg:space-x-8 lg:space-x-reverse': sectionFlexDirection === 'row-reverse',
                'space-y-reverse': sectionFlexDirection === 'col-reverse'
              }
            )}
          >
            <div className="flex-1 w-full">
              <HeroBody {...props} />
              <HeroActions {...props} />
            </div>
            {props.media && (
              <div className="flex-1 w-full">
                <DynamicComponent {...props.media} data-sb-field-path=".media" />{' '}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroBody: FC<types.HeroSection> = (props) => {
  const styles = props.styles ?? {};
  return (
    <div>
      {props.badge && <Badge {...props.badge} data-sb-field-path=".badge" />}
      {props.title && (
        <h2
          className={classNames('h1', styles.title ? mapStyles(styles.title) : null, { 'mt-4': props.badge?.label })}
          data-sb-field-path=".title"
        >
          {props.title}
        </h2>
      )}
      {props.subtitle && (
        <p
          className={classNames('text-xl', 'sm:text-2xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
            'mt-4': props.title
          })}
          data-sb-field-path=".subtitle"
        >
          {props.subtitle}
        </p>
      )}
      {props.text && (
        <div
          className={classNames('sb-markdown', 'sm:text-lg', styles.text ? mapStyles(styles.text) : null, {
            'mt-6': props.title || props.subtitle
          })}
          data-sb-field-path=".text"
          dangerouslySetInnerHTML={{ __html: props.text.html }}
        />
        // <Markdown
        //   options={{ forceBlock: true, forceWrapper: true }}
        //   className={classNames('sb-markdown', 'sm:text-lg', styles.text ? mapStyles(styles.text) : null, {
        //     'mt-6': props.title || props.subtitle
        //   })}
        //   data-sb-field-path=".text"
        // >
        //   {props.text}
        // </Markdown>
      )}
    </div>
  );
};

const HeroActions: FC<types.HeroSection> = (props) => {
  const actions = props.actions ?? [];
  if (actions.length === 0) {
    return null;
  }
  const styles = props.styles ?? {};
  return (
    <div
      className={classNames('overflow-x-hidden', {
        'mt-8': props.title || props.subtitle || props.text || props.badge
      })}
    >
      <div
        className={classNames(
          'flex',
          'flex-wrap',
          'items-center',
          '-mx-2',
          styles.actions ? mapStyles(styles.actions) : null
        )}
        data-sb-field-path=".actions"
      >
        {actions.map((action, index) => (
          <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" data-sb-field-path={`.${index}`} />
        ))}
      </div>
    </div>
  );
};

function mapMinHeightStyles(height: string) {
  switch (height) {
    case 'screen':
      return 'min-h-screen';
  }
  return null;
}

function mapMaxWidthStyles(width: string) {
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

function mapFlexDirectionStyles(flexDirection: string) {
  switch (flexDirection) {
    case 'row':
      return ['flex-col', 'lg:flex-row'];
    case 'row-reverse':
      return ['flex-col-reverse', 'lg:flex-row-reverse'];
    case 'col':
      return ['flex-col'];
    case 'col-reverse':
      return ['flex-col-reverse'];
  }
  return null;
}
