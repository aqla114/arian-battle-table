import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Character } from './character';

@Entity('bad_status')
export class BadStatus {
    public static mk() {
        const b = new BadStatus();
        Object.assign(b, {
            isActed: false,
            overwhelmed: false,
            slipped: false,
            abstracted: false,
            frenzied: false,
            stunned: false,
            knockback: false,
            poisoned: false,
        });
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
    knockback!: boolean;

    @Column({ default: 0, name: 'poisoned' })
    poisoned!: boolean;

    @OneToOne(
        type => Character,
        character => character.badStatus,
    )
    @JoinColumn()
    character: Character;
}
