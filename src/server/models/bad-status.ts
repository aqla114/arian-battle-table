import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { defaultBadStatus } from '../../types/bad-status';
import { Character } from './character';

@Entity('bad_status')
export class BadStatus {
    public static mk(): BadStatus {
        const b = new BadStatus();
        return Object.assign(b, defaultBadStatus);
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 0, name: 'overwhelmed' })
    overwhelmed!: boolean;

    @Column({ default: 0, name: 'slipped' })
    slipped!: boolean;

    @Column({ default: 0, name: 'abstracted' })
    abstracted!: boolean;

    @Column({ default: 0, name: 'frenzied' })
    frenzied!: boolean;

    @Column({ default: 0, name: 'stunned' })
    stunned!: boolean;

    @Column({ default: 0, name: 'knockback' })
    knockback!: number;

    @Column({ default: 0, name: 'poisoned' })
    poisoned!: number;

    @OneToOne(
        type => Character,
        character => character.badStatus,
    )
    @JoinColumn()
    character: Character;
}
