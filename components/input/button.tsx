'use client';
import { ButtonAction } from "../functions"

export default function Button({ 
    children, 
    onClick, 
    className 
}: {
    children: any, 
    onClick?: ButtonAction, 
    className?: string
}) {
    return (
        <button 
            className={"bg-sky-600 hover:bg-sky-800 transition-all p-2 rounded-md w-full mx-1 my-3 text-neutral-200 text-center " + className}
            onClick={onClick}
        >
            {children}
        </button>
    )
}