import { SignJWT } from 'jose/jwt/sign';
import crypto from 'crypto';
import type * as types from 'types';

export const mapProps = async (props: types.FormBlock): Promise<types.FormBlock> => {
    if (!props.destination) {
        return props;
    }
    if (!process.env.STACKBIT_CONTACT_FORM_SECRET) {
        console.error(`No STACKBIT_CONTACT_FORM_SECRET provided. It will not work properly for production build.`);
        return props;
    }
    const secretKey = crypto.createHash('sha256').update(process.env.STACKBIT_CONTACT_FORM_SECRET).digest();
    const destination = await new SignJWT({ email: props.destination }).setProtectedHeader({ alg: 'HS256' }).sign(secretKey);
    return {
        ...props,
        destination
    };
};
