import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

export type Props = types.SelectFormControl & StackbitFieldPath;

export const SelectFormControl: React.FC<Props> = (props) => {
    const width = props.width ?? 'full';
    const labelId = `${props.name}-label`;
    const options = props.options ?? [];
    const attr: React.SelectHTMLAttributes<HTMLSelectElement> = {};
    if (props.label) {
        attr['aria-labelledby'] = labelId;
    }
    if (props.isRequired) {
        attr.required = true;
    }
    return (
        <div
            className={classNames('sb-form-control', {
                'sm:col-span-2': width === 'full'
            })}
            {...pickDataAttrs(props)}
        >
            {props.label && (
                <label
                    id={labelId}
                    className={classNames('sb-label', { 'sr-only': props.hideLabel })}
                    htmlFor={props.name}
                    {...toFieldPath('.label', '.name#@for')}
                >
                    {props.label}
                </label>
            )}
            <select id={props.name} className="sb-select" name={props.name} {...attr} {...toFieldPath('.name#@id', '.name#@name', '.options')}>
                {props.defaultValue && (
                    <option value="" {...toFieldPath('.defaultValue')}>
                        {props.defaultValue}
                    </option>
                )}
                {options.length > 0 &&
                    options.map((option, index) => (
                        <option key={index} value={option} {...toFieldPath(`.${index}`)}>
                            {option}
                        </option>
                    ))}
            </select>
        </div>
    );
};
