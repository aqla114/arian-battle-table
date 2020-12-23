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
