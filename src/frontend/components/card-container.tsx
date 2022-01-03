import { FC, PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
    className?: string;
    isClickable?: boolean;
}>;

export const CardContainer: FC<Props> = props => {
    const { className, isClickable, children } = props;
    return <div className={`card-container ${className || ''} ${isClickable ? '--clickable' : ''}`}>{children}</div>;
};
