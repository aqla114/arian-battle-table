import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

// TODO: アイコンの色いい感じに分けるプロパティ生やす。
type Props = {
    name: string;
    icon: IconDefinition;
    onClick: (e: any) => void;
};

export const IconButton: React.SFC<Props> = (props: Props) => {
    return (
        <button type="button" className="icon-button" {...props}>
            <FontAwesomeIcon icon={props.icon} className={`icon-button__icon`} />
        </button>
    );
};
