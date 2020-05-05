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
