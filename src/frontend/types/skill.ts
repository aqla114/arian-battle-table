export type Skill = {
    id?: number;
    name: string;
    timing: string;
    detemination_way: string;
    target: string;
    range: string;
    restriction: string;
    detail: string;
};

export function Skill(
    name: string = '',
    timing: string = '',
    detemination_way: string = '',
    target: string = '',
    range: string = '',
    restriction: string = '',
    detail: string = '',
): Skill {
    return {
        name,
        timing,
        detemination_way,
        target,
        range,
        restriction,
        detail,
    };
}
