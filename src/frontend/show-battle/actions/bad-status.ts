export type BadStatus = {
    id?: string;
    overwhelmed: boolean;
    slipped: boolean;
    abstracted: boolean;
    frenzied: boolean;
    stunned: boolean;
    knockback: boolean;
    poisoned: number;
};

export const defaultBadStatus: BadStatus = {
    overwhelmed: false,
    slipped: false,
    abstracted: false,
    frenzied: false,
    stunned: false,
    knockback: false,
    poisoned: 0,
};

export const getBadStatusLabels: (poisened: number) => { [key in keyof Omit<BadStatus, 'id'>]: string } = poisoned => {
    return {
        overwhelmed: '威圧',
        slipped: 'スリップ',
        abstracted: '放心',
        frenzied: '逆上',
        stunned: 'スタン',
        knockback: 'ノックバック(6)',
        poisoned: `毒(${poisoned})`,
    };
};
