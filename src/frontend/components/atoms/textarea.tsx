import { ChangeEvent, DetailedHTMLProps, FunctionComponent, TextareaHTMLAttributes } from 'react';

type Props = {
    name: string;
    value: string | number | string[];
    className?: string;
    showBorder?: boolean;
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
} & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const Textarea: FunctionComponent<Props> = ({ showBorder = true, ...props }: Props) => {
    return <textarea {...props} className={`textarea ${showBorder ? '--show-border' : ''} ${props.className}`} />;
};
