import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

export type Props = types.CheckboxFormControl & StackbitFieldPath;

export const CheckboxFormControl: React.FC<Props> = (props) => {
    const width = props.width ?? 'full';
    const labelId = `${props.name}-label`;
    const attr: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> = {};
    if (props.label) {
        attr['aria-labelledby'] = labelId;
    }
    if (props.isRequired) {
        attr.required = true;
    }
    return (
        <div
            className={classNames('sb-form-control', 'flex', 'items-center', {
                'sm:col-span-2': width === 'full'
            })}
            {...pickDataAttrs(props)}
        >
            <input id={props.name} className="sb-checkbox" type="checkbox" name={props.name} {...attr} {...toFieldPath('.name#@id', '.name#@name')} />
            {props.label && (
                <label id={labelId} className="sb-label" htmlFor={props.name} {...toFieldPath('.label', '.name#@for')}>
                    {props.label}
                </label>
            )}
        </div>
    );
};
