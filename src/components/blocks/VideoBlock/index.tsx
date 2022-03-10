import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

export type Props = types.VideoBlock & { className?: string } & StackbitFieldPath;

export const VideoBlock: React.FC<Props> = (props) => {
    if (!props.url) {
        return null;
    }
    const cssClasses = props.className ?? null;
    const aspectRatio = props.aspectRatio ?? '16:9';
    const annotationPrefix = props['data-sb-field-path'];
    const annotations = annotationPrefix ? [`${annotationPrefix}`, `${annotationPrefix}.elementId#@id`] : [];
    return (
        <div
            id={props.elementId}
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-video-block',
                cssClasses,
                'overflow-hidden',
                'relative',
                'w-full',
                'h-0',
                {
                    'pt-3/4': aspectRatio === '4:3',
                    'pt-9/16': aspectRatio === '16:9'
                }
            )}
            {...toFieldPath(...annotations)}
        >
            <VideoEmbed url={props.url} autoplay={props.autoplay} loop={props.loop} muted={props.muted} controls={props.controls} />
        </div>
    );
};

type VideoEmbedProps = {
    url: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
};

const VideoEmbed: React.FC<VideoEmbedProps> = (props) => {
    const { url, autoplay, loop, muted, controls = true } = props;
    const videoData = getVideoData(url!);
    if (!videoData.id || !videoData.service) {
        return <p className="absolute left-0 w-full italic text-center transform -translate-y-1/2 top-1/2">Video URL is not supported.</p>;
    }
    if (videoData.service === 'custom') {
        return (
            <video
                {...(autoplay && { autoPlay: true })}
                {...(loop && { loop: true })}
                {...(muted && { muted: true })}
                {...(controls && { controls: true })}
                playsInline
                className="absolute top-0 left-0 w-full h-full"
            >
                <source src={videoData.id} type="video/mp4" {...toFieldPath('.url#@src')} />
            </video>
        );
    } else {
        const paramsObj: any = {};
        paramsObj.autoplay = autoplay ? '1' : '0';
        paramsObj.controls = controls ? '1' : '0';
        paramsObj.loop = loop ? '1' : '0';
        if (videoData.service === 'youtube') {
            paramsObj.mute = muted ? '1' : '0';
        } else if (videoData.service === 'vimeo') {
            paramsObj.muted = muted ? '1' : '0';
            paramsObj.transparent = '0';
        }
        const queryParams = new URLSearchParams(paramsObj).toString();
        if (videoData.service === 'youtube') {
            return (
                <iframe
                    src={`https://www.youtube.com/embed/${videoData.id}?${queryParams}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    {...toFieldPath('.url#@src')}
                    className="absolute top-0 left-0 w-full h-full"
                />
            );
        } else if (videoData.service === 'vimeo') {
            return (
                <iframe
                    src={`https://player.vimeo.com/video/${videoData.id}?${queryParams}`}
                    title="Vimeo video player"
                    frameBorder="0"
                    allowFullScreen
                    {...toFieldPath('.url#@src')}
                    className="absolute top-0 left-0 w-full h-full"
                />
            );
        } else {
            return null;
        }
    }
};

// Based on https://github.com/radiovisual/get-video-id
function getVideoData(videoUrl: string) {
    let videoData: any = {
        id: null,
        service: null
    };

    if (/youtube|youtu\.be|y2u\.be|i.ytimg\./.test(videoUrl)) {
        videoUrl = videoUrl.replace('/www.', '/');
        videoUrl = videoUrl.replace('-nocookie', '');
        videoData = {
            id: getYoutubeId(videoUrl),
            service: 'youtube'
        };
    } else if (/vimeo/.test(videoUrl)) {
        videoUrl = videoUrl.replace('/www.', '/');
        videoData = {
            id: getVimeoId(videoUrl),
            service: 'vimeo'
        };
    } else if (/\.mp4/.test(videoUrl)) {
        videoData = {
            id: videoUrl,
            service: 'custom'
        };
    }
    return videoData;
}

function getVimeoId(vimeoStr: string) {
    let str = vimeoStr;

    if (str.includes('#')) {
        [str] = str.split('#');
    }

    if (str.includes('?') && !str.includes('clip_id=')) {
        [str] = str.split('?');
    }

    let id;
    let array;

    const event = /https?:\/\/vimeo\.com\/event\/(\d+)$/;

    const eventMatches = event.exec(str);

    if (eventMatches && eventMatches[1]) {
        return eventMatches[1];
    }

    const primary = /https?:\/\/vimeo\.com\/(\d+)/;

    const matches = primary.exec(str);
    if (matches && matches[1]) {
        return matches[1];
    }

    const vimeoPipe = ['https?://player.vimeo.com/video/[0-9]+$', 'https?://vimeo.com/channels', 'groups', 'album'].join('|');

    const vimeoRegex = new RegExp(vimeoPipe, 'gim');

    if (vimeoRegex.test(str)) {
        array = str.split('/');
        if (array && array.length > 0) {
            id = array.pop();
        }
    } else if (/clip_id=/gim.test(str)) {
        array = str.split('clip_id=');
        if (array && array.length > 0) {
            [id] = array[1].split('&');
        }
    }

    return id;
}

function getYoutubeId(youtubeStr: string) {
    let str = youtubeStr;

    // Remove time hash at the end of the string
    str = str.replace(/#t=.*$/, '');

    // Strip the leading protocol
    str = str.replace(/^https?:\/\//, '');

    // Shortcode
    const shortcode = /youtube:\/\/|youtu\.be\/|y2u\.be\//g;

    if (shortcode.test(str)) {
        const shortcodeid = str.split(shortcode)[1];
        return stripParameters(shortcodeid);
    }

    // /v/ or /vi/
    const inlinev = /\/v\/|\/vi\//g;

    if (inlinev.test(str)) {
        const inlineid = str.split(inlinev)[1];
        return stripParameters(inlineid);
    }

    // V= or vi=
    const parameterv = /v=|vi=/g;

    if (parameterv.test(str)) {
        const array = str.split(parameterv);
        return stripParameters(array[1].split('&')[0]);
    }

    // Format an_webp
    const parameterwebp = /\/an_webp\//g;

    if (parameterwebp.test(str)) {
        const webp = str.split(parameterwebp)[1];
        return stripParameters(webp);
    }

    // /e/
    const eformat = /\/e\//g;

    if (eformat.test(str)) {
        const estring = str.split(eformat)[1];
        return stripParameters(estring);
    }

    // Embed
    const embedreg = /\/embed\//g;

    if (embedreg.test(str)) {
        const embedid = str.split(embedreg)[1];
        return stripParameters(embedid);
    }

    // ignore /user/username pattern
    const usernamereg = /\/user\/([a-zA-Z\d]*)$/g;

    if (usernamereg.test(str)) {
        return undefined;
    }

    // User
    const userreg = /\/user\/(?!.*videos)/g;

    if (userreg.test(str)) {
        const elements = str.split('/');
        return stripParameters(elements.pop()!);
    }

    // Attribution_link
    const attrreg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;

    if (attrreg.test(str)) {
        return stripParameters(str.match(attrreg)![1]);
    }

    return undefined;
}

function stripParameters(shortcodeString: string) {
    // Split parameters or split folder separator
    if (shortcodeString.includes('?')) {
        return shortcodeString.split('?')[0];
    }

    if (shortcodeString.includes('/')) {
        return shortcodeString.split('/')[0];
    }

    if (shortcodeString.includes('&')) {
        return shortcodeString.split('&')[0];
    }

    return shortcodeString;
}
