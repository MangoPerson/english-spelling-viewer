'use client';
import { ButtonAction } from "../functions"

export default function Button({ children, onClick, style }:
    {children: any, onClick?: ButtonAction, style?: string}) 
{
    return (
        <button 
            className={"btn " + style}
            onClick={onClick}
        >
            {children}
        </button>
    )
}