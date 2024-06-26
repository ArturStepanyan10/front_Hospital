import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {

    type: string;
    placeholder: string;
    value: string | number;
}