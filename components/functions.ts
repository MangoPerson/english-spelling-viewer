import PocketBase from 'pocketbase';
import { Dispatch, SetStateAction } from 'react';

// Utility types

export type Setter<T> = (arg: T) => void;
export type ButtonAction = (arg?: any) => void;

export interface TextBox {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

// Utility classes

export class FormData {  
    boxes() {
        return Object.entries(this)
            .map(entry => entry[1])
            .filter(val => typeof val === 'object')
            .map(box => box as TextBox);
    }

    values() {
        return Object.entries(this)
            .map(entry => entry[1])
            .filter(val => typeof val === 'string')
            .map(value => value as string)
    }

    [ key: string ]: any;
}