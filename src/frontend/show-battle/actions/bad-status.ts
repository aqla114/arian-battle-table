export type BadStatus = {
    overwhelmed: boolean;
    slipped: boolean;
    abstracted: boolean;
    frenzied: boolean;
    stunned: boolean;
    knockback: boolean;
};

export const defaultBadStatus: BadStatus = {
    overwhelmed: false,
    slipped: false,
    abstracted: false,
    frenzied: false,
    stunned: false,
    knockback: false,
};

export const badStatusLabels: { [key in keyof BadStatus]: string } = {
    overwhelmed: '威圧',
    slipped: 'スリップ',
    abstracted: '放心',
    frenzied: '逆上',
    stunned: 'スタン',
    knockback: 'ノックバック(6)',
};
