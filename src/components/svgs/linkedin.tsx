import * as React from 'react';
import { pickDataAttrs, StackbitFieldPath } from '../../utils/annotations';

export default function LinkedIn({ className, ...props }: StackbitFieldPath & { className: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...pickDataAttrs(props)}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-0.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h0.046c0.477-0.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-0.926-2.063-2.065 0-1.138 0.92-2.063 2.063-2.063 1.14 0 2.064 0.925 2.064 2.063 0 1.139-0.925 2.065-2.064 2.065zM7.119 20.452h-3.564v-11.452h3.564v11.452zM22.225 0h-20.454c-0.979 0-1.771 0.774-1.771 1.729v20.542c0 0.956 0.792 1.729 1.771 1.729h20.451c0.978 0 1.778-0.773 1.778-1.729v-20.542c0-0.955-0.8-1.729-1.778-1.729h0.003z"></path>
        </svg>
    );
}
