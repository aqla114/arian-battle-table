// package:
// file: arianrod.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from 'google-protobuf';

export class GetGuildCharactersRequest extends jspb.Message {
    getGuildId(): string;
    setGuildId(value: string): GetGuildCharactersRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetGuildCharactersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetGuildCharactersRequest): GetGuildCharactersRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: GetGuildCharactersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetGuildCharactersRequest;
    static deserializeBinaryFromReader(
        message: GetGuildCharactersRequest,
        reader: jspb.BinaryReader,
    ): GetGuildCharactersRequest;
}

export namespace GetGuildCharactersRequest {
    export type AsObject = {
        guildId: string;
    };
}

export class GetGuildCharactersResponse extends jspb.Message {
    clearCharactersList(): void;
    getCharactersList(): Array<Character>;
    setCharactersList(value: Array<Character>): GetGuildCharactersResponse;
    addCharacters(value?: Character, index?: number): Character;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetGuildCharactersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetGuildCharactersResponse): GetGuildCharactersResponse.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: GetGuildCharactersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetGuildCharactersResponse;
    static deserializeBinaryFromReader(
        message: GetGuildCharactersResponse,
        reader: jspb.BinaryReader,
    ): GetGuildCharactersResponse;
}

export namespace GetGuildCharactersResponse {
    export type AsObject = {
        charactersList: Array<Character.AsObject>;
    };
}

export class Character extends jspb.Message {
    getId(): string;
    setId(value: string): Character;
    getName(): string;
    setName(value: string): Character;
    getAttribute(): string;
    setAttribute(value: string): Character;
    getActionPriority(): number;
    setActionPriority(value: number): Character;
    getMobility(): number;
    setMobility(value: number): Character;
    getHp(): number;
    setHp(value: number): Character;
    getPhysicalDefence(): number;
    setPhysicalDefence(value: number): Character;
    getMagicalDefence(): number;
    setMagicalDefence(value: number): Character;
    getStrength(): number;
    setStrength(value: number): Character;
    getStrengthBase(): number;
    setStrengthBase(value: number): Character;
    getDexterity(): number;
    setDexterity(value: number): Character;
    getDexterityBase(): number;
    setDexterityBase(value: number): Character;
    getAgility(): number;
    setAgility(value: number): Character;
    getAgilityBase(): number;
    setAgilityBase(value: number): Character;
    getWisdom(): number;
    setWisdom(value: number): Character;
    getWisdomBase(): number;
    setWisdomBase(value: number): Character;
    getSensitivity(): number;
    setSensitivity(value: number): Character;
    getSensitivityBase(): number;
    setSensitivityBase(value: number): Character;
    getPower(): number;
    setPower(value: number): Character;
    getPowerBase(): number;
    setPowerBase(value: number): Character;
    getLuck(): number;
    setLuck(value: number): Character;
    getLuckBase(): number;
    setLuckBase(value: number): Character;
    clearSkillsList(): void;
    getSkillsList(): Array<Skill>;
    setSkillsList(value: Array<Skill>): Character;
    addSkills(value?: Skill, index?: number): Skill;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Character.AsObject;
    static toObject(includeInstance: boolean, msg: Character): Character.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: Character, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Character;
    static deserializeBinaryFromReader(message: Character, reader: jspb.BinaryReader): Character;
}

export namespace Character {
    export type AsObject = {
        id: string;
        name: string;
        attribute: string;
        actionPriority: number;
        mobility: number;
        hp: number;
        physicalDefence: number;
        magicalDefence: number;
        strength: number;
        strengthBase: number;
        dexterity: number;
        dexterityBase: number;
        agility: number;
        agilityBase: number;
        wisdom: number;
        wisdomBase: number;
        sensitivity: number;
        sensitivityBase: number;
        power: number;
        powerBase: number;
        luck: number;
        luckBase: number;
        skillsList: Array<Skill.AsObject>;
    };
}

export class Skill extends jspb.Message {
    getName(): string;
    setName(value: string): Skill;
    getTiming(): string;
    setTiming(value: string): Skill;
    getDeterminationWay(): string;
    setDeterminationWay(value: string): Skill;
    getTarget(): string;
    setTarget(value: string): Skill;
    getRange(): string;
    setRange(value: string): Skill;
    getRestriction(): string;
    setRestriction(value: string): Skill;
    getDetail(): string;
    setDetail(value: string): Skill;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Skill.AsObject;
    static toObject(includeInstance: boolean, msg: Skill): Skill.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: Skill, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Skill;
    static deserializeBinaryFromReader(message: Skill, reader: jspb.BinaryReader): Skill;
}

export namespace Skill {
    export type AsObject = {
        name: string;
        timing: string;
        determinationWay: string;
        target: string;
        range: string;
        restriction: string;
        detail: string;
    };
}
