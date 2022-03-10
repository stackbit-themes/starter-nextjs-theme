import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Section } from '../Section';
import { ImageBlock } from '../../blocks/ImageBlock';

export type Props = types.MediaGallerySection;

export const MediaGallerySection: React.FC<Props> = (props) => {
    const { elementId, colors, title, subtitle, images = [], columns = 4, spacing = 16, aspectRatio = '1:1', showCaption, enableHover, styles = {} } = props;
    return (
        <Section elementId={elementId} className="sb-component-media-gallery-section" colors={colors} styles={styles.self} {...pickDataAttrs(props)}>
            {title && (
                <h2 className={classNames(styles?.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                    {title}
                </h2>
            )}
            {subtitle && (
                <p
                    className={classNames('text-lg', 'sm:text-xl', styles?.subtitle ? mapStyles(styles.subtitle) : null, {
                        'mt-6': title
                    })}
                    {...toFieldPath('.subtitle')}
                >
                    {subtitle}
                </p>
            )}
            {images.length > 0 && (
                <div
                    className={classNames('grid', 'place-items-center', mapColStyles(columns), {
                        'mt-12': title || subtitle
                    })}
                    {...toFieldPath('.images')}
                    style={{
                        gap: spacing ? `${spacing}px` : undefined
                    }}
                >
                    {images.map((image, index) => (
                        <MediaGalleryImage
                            key={index}
                            image={image}
                            showCaption={showCaption}
                            enableHover={enableHover}
                            aspectRatio={aspectRatio}
                            {...toFieldPath(`.${index}`)}
                        />
                    ))}
                </div>
            )}
        </Section>
    );
};

type MediaGalleryImageProps = {
    image: types.ImageBlock;
    showCaption?: boolean;
    enableHover?: boolean;
    aspectRatio?: Props['aspectRatio'];
};

const MediaGalleryImage: React.FC<MediaGalleryImageProps & StackbitFieldPath> = (props) => {
    const { image, showCaption, enableHover, aspectRatio = '1:1' } = props;
    if (!image) {
        return null;
    }
    return (
        <figure
            className={classNames('overflow-hidden', 'relative', 'w-full', mapAspectRatioStyles(aspectRatio), {
                'h-0': aspectRatio !== 'auto'
            })}
        >
            <ImageBlock
                {...image}
                className={classNames('w-full', {
                    'h-full absolute left-0 top-0 object-cover': aspectRatio !== 'auto',
                    'transition-transform hover:scale-105': enableHover
                })}
                {...pickDataAttrs(props)}
            />
            {showCaption && image.caption && (
                <figcaption className="absolute bg-white bg-opacity-70 left-0 mx-2 bottom-2 p-1.5 text-xs pointer-events-none">{image.caption}</figcaption>
            )}
        </figure>
    );
};

function mapAspectRatioStyles(aspectRatio: string) {
    switch (aspectRatio) {
        case '1:1':
            return 'pt-1/1';
        case '2:3':
            return 'pt-3/2';
        case '3:2':
            return 'pt-2/3';
        case '3:4':
            return 'pt-4/3';
        case '4:3':
            return 'pt-3/4';
        case '16:9':
            return 'pt-9/16';
        default:
            return null;
    }
}

function mapColStyles(columns: number) {
    switch (columns) {
        case 2:
            return 'grid-cols-2';
        case 3:
            return 'grid-cols-2 sm:grid-cols-3';
        case 4:
            return 'grid-cols-2 sm:grid-cols-4';
        case 5:
            return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5';
        case 6:
            return 'grid-cols-2 sm:grid-cols-4 md:grid-cols-6';
        case 7:
            return 'grid-cols-2 sm:grid-cols-4 md:grid-cols-7';
        default:
            return null;
    }
}
