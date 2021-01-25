export type Skill = {
    id?: string; //TODO: 型違うかも。number?
    name: string;
    timing: string;
    determinationWay: string;
    target: string;
    range: string;
    restriction: string;
    detail: string;
};

export function Skill(
    name: string = '',
    timing: string = '',
    determinationWay: string = '',
    target: string = '',
    range: string = '',
    restriction: string = '',
    detail: string = '',
): Skill {
    return {
        name,
        timing,
        determinationWay,
        target,
        range,
        restriction,
        detail,
    };
}
