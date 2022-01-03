import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FC } from 'react';

type Size = 'small' | 'middle';

// TODO: アイコンの色いい感じに分けるプロパティ生やす。
type Props = {
    name: string;
    icon: IconDefinition;
    size?: Size;
    onClick: (e: any) => void;
};

export const IconButton: FC<Props> = ({ size = 'middle', ...props }: Props) => {
    return (
        <button type="button" className={`icon-button ${`--${size}`}`} {...props}>
            <FontAwesomeIcon icon={props.icon} className={`icon-button__icon`} />
        </button>
    );
};
