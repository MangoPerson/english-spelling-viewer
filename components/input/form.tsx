import Button from "./button";
import TextBox from "./textbox";
import { ButtonAction, FormData  } from "../functions";

export default function Form({ 
    children, 
    data, 
    buttonText, 
    action, 
    className,
    buttonStyle
}: {
    children: any, 
    data: FormData, 
    buttonText: string, 
    action?: ButtonAction, 
    className?: string,
    buttonStyle?: string
}) {
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
        <div className={"h-auto justify-center items-center p-1 text-white text-center " + className}>
                {children.map((child: any, index: number) => {
                    if (child.type.name === TextBox.name) {
                        const id = child.props.id ? child.props.id : index;
                        const style = child.props.className ? child.props.className : '';
                        
                        return (
                            <TextBox key={index} id={id} data={data} className={style}>
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
                <Button onClick={execute} className={buttonStyle}>{buttonText}</Button>
        </div>
    )
}
