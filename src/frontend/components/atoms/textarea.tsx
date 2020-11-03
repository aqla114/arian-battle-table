import * as React from 'react';

type Props = {
    name: string;
    value: string | number | string[];
    className?: string;
    showBorder?: boolean;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const Textarea: React.SFC<Props> = ({ showBorder = true, ...props }: Props) => {
    return <textarea {...props} className={`textarea ${showBorder ? '--show-border' : ''} ${props.className}`} />;
};
