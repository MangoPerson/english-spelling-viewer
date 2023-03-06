'use client';
import { FormData } from "../functions";
import { useState } from "react";

export default function TextBox({ children, data, id, style}: 
    { children: string, data?: FormData, id?: string | number, style?: string}) 
{
    const [ value, setValue ] = useState(''); 

    if ( data && id ) {
        if (id.toString().endsWith('_')) {
            throw Error(`Box id should not end with an underscore. \n Given box id: ${id}`);
        }

        data[id] = value;
        data[id + '_'] = { value: value, setValue: setValue };
    }

    return (
        <input
            className={"bg-transparent border-2 border-neutral-500 rounded-md outline-none m-1 p-2 focus:border-neutral-100\
                hover:border-neutral-400 transition-all w-full " + style}
            type='text'
            placeholder={children}
            value={value}
            onChange={e => setValue(e.target.value)}
        />
    )
}

