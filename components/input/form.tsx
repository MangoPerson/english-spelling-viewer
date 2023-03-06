'use client';
import Button from "./button";
import TextBox from "./textbox";
import { ButtonAction, FormData  } from "../functions";

export default function Form({ children, data, buttonText, action, style }: 
    {children: any, data: FormData, buttonText: string, action?: ButtonAction, style?: string}) 
{
    children = Array.isArray(children) ? children: [children];

    const execute = (e: any) => {

        if (action) {
            action(e);
        }

        data.boxes().forEach(box => {
            box.setValue('');
        });
    }

    return (
        <div className={"h-auto flex justify-center items-center p-1 " + style}>
            <div className="text-center">
                {children.map((child: any, index: number) => {
                    if (child.type.name === TextBox.name) {
                        const id = child.props.id ? child.props.id : index;
                        
                        return (
                            <TextBox key={index} id={id} data={data}>
                                {child.props.children} 
                            </TextBox>
                        );
                    } else {
                        return (
                            <div key={index}>
                                {child}
                            </div>
                        )
                    }
                })}
                <Button onClick={execute}>{buttonText}</Button>
            </div>
        </div>
    )
}
