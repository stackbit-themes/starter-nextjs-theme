import * as React from 'react';
import classNames from 'classnames';
import getVideoData from '../../../utils/get-video-data';

export default function VideoBlock(props) {
    if (!props.url) {
        return null;
    }
    const cssId = props.elementId || null;
    const cssClasses = props.className || null;
    const aspectRatio = props.aspectRatio || '16:9';
    const annotationPrefix = props['data-sb-field-path'] || '';
    const annotations = [
        `${annotationPrefix}`,
        `${annotationPrefix}.elementId#@id`
    ];
    return (
        <div
            id={cssId}
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
            data-sb-field-path={annotations.join(' ').trim()}
        >
            {videoEmbed(props)}
        </div>
    );
}

function videoEmbed(props) {
    const { url, autoplay, loop, muted, controls = true } = props;
    const videoData = getVideoData(url);
    if (!videoData.id || !videoData.service) {
        return <p className="absolute italic left-0 text-center top-1/2 transform -translate-y-1/2 w-full">Video URL is not supported.</p>;
    }
    if (videoData.service === 'custom') {
        return (
            <video
                {...(autoplay && { autoPlay: true })}
                {...(loop && { loop: true })}
                {...(muted && { muted: true })}
                {...(controls && { controls: true })}
                playsInline
                className="absolute left-0 top-0 h-full w-full"
            >
                <source src={videoData.id} type="video/mp4" data-sb-field-path=".url#@src" />
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
                    data-sb-field-path=".url#@src"
                    className="absolute left-0 top-0 h-full w-full"
                ></iframe>
            );
        } else if (videoData.service === 'vimeo') {
            return (
                <iframe
                    src={`https://player.vimeo.com/video/${videoData.id}?${queryParams}`}
                    title="Vimeo video player"
                    frameBorder="0"
                    allowFullScreen
                    data-sb-field-path=".url#@src"
                    className="absolute left-0 top-0 h-full w-full"
                ></iframe>
            );
        } else {
            return null;
        }
    }
}
