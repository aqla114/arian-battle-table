import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { Character } from './character';

@Entity('skills')
export class Skill {
    public static mk(
        name = '',
        timing = '',
        determination_way = '',
        target = '',
        range = '',
        restriction = '',
        detail = '',
    ): Skill {
        const s = new Skill();
        return Object.assign(s, { name, timing, determination_way, target, range, restriction, detail });
    }
    // TODO: ここら辺のカラム、色々と制約あるし ValueObject として表現したい。
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '', name: 'namme' })
    name: string;

    @Column({ default: '', name: 'timing' })
    timing: string;

    @Column({ default: '', name: 'determination_way' })
    determination_way: string;

    @Column({ default: '', name: 'target' })
    target: string;

    @Column({ default: '', name: 'range' })
    range: string;

    @Column({ default: '', name: 'restriction' })
    restriction: string;

    @Column({ default: '', name: 'detail' })
    detail: string;

    @ManyToOne(
        type => Character,
        character => character.skills,
    )
    character: Character;
}
