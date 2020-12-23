import parse = require('csv-parse/lib/sync');
import { Skill } from '../types/skill';

export function parseCsv(csvString: string): Skill[] {
    const records = parse(csvString, {
        columns: ['timing', 'name', 'determination_way', 'target', 'range', 'restriction', 'detail'],
        skip_empty_lines: true,
    });

    return records;
}
