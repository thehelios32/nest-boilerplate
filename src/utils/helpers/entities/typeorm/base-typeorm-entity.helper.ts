import { PrimaryGeneratedColumn, CreateDateColumn, Column, UpdateDateColumn } from 'typeorm';
import { Nullable } from '../../types/nullable.type';

export interface IBaseTypeormEntityHelper {
    id: number;
}
export interface IBaseUserEntityHelper {
    login: string;
    source: string;
}

export interface IBaseEntityWithTimestampHelper extends IBaseTypeormEntityHelper {
    createdAt: Date;
    updatedAt?: Date;
}

export interface IBaseEntityWithTimestampAndUserHelper extends IBaseTypeormEntityHelper {
    createdAt: Date;
    updatedAt: Date;
    createdBy: IBaseUserEntityHelper;
    updatedBy: IBaseUserEntityHelper;
}
export interface IBaseEntityWithUserHelper {
    createdBy: IBaseUserEntityHelper;
    updatedBy: Nullable<IBaseUserEntityHelper>;
}

export class BaseEntityHelper implements IBaseTypeormEntityHelper {
    @PrimaryGeneratedColumn()
    id: number;
}

export class BaseUserEntityHelper {
    @Column()
    login: string;
    @Column()
    source: string;
}

export class BaseEntityWithUserHelper {
    @Column()
    createdBy: BaseUserEntityHelper;

    @Column({ nullable: true })
    updatedBy: Nullable<BaseUserEntityHelper>;
}

export class BaseEntityWithTimestampsHelper extends BaseEntityHelper implements IBaseEntityWithTimestampHelper {
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export class BaseEntityWithTimestampsAndUserHelper extends BaseEntityWithTimestampsHelper implements IBaseEntityWithUserHelper {
    @Column()
    createdBy: BaseUserEntityHelper;

    @Column({ nullable: true })
    updatedBy: Nullable<BaseUserEntityHelper>;
}
