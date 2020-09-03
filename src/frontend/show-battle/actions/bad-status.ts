export type BadStatus = {
    id?: string;
    overwhelmed: boolean;
    slipped: boolean;
    abstracted: boolean;
    frenzied: boolean;
    stunned: boolean;
    knockback: number;
    poisoned: number;
};

export const defaultBadStatus: BadStatus = {
    overwhelmed: false,
    slipped: false,
    abstracted: false,
    frenzied: false,
    stunned: false,
    knockback: 0,
    poisoned: 0,
};

export const getBadStatusLabels: ({
    poisoned,
    knockback,
}: Pick<BadStatus, 'poisoned' | 'knockback'>) => { [key in keyof Omit<BadStatus, 'id'>]: string } = props => {
    return {
        overwhelmed: '威圧',
        slipped: 'スリップ',
        abstracted: '放心',
        frenzied: '逆上',
        stunned: 'スタン',
        knockback: `ノックバック(${props.knockback})`,
        poisoned: `毒(${props.poisoned})`,
    };
};
