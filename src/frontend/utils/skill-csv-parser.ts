import parse from 'csv-parse/lib/sync';
import { FrontendSkill } from '../types/skill';

export function parseCsv(csvString: string): Omit<FrontendSkill, 'frontendId'>[] {
    const records = parse(csvString, {
        columns: ['timing', 'name', 'determinationWay', 'target', 'range', 'restriction', 'detail'],
        skip_empty_lines: true,
    });

    return records;
}
