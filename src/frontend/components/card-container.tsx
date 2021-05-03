import * as React from 'react';

type Props = React.PropsWithChildren<{
    className?: string;
    isClickable?: boolean;
}>;

export const CardContainer: React.FunctionComponent<Props> = props => {
    const { className, isClickable, children } = props;
    return <div className={`card-container ${className || ''} ${isClickable ? '--clickable' : ''}`}>{children}</div>;
};
