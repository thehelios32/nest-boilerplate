export type IMessage = Record<string, string>;
export interface IErrors {
    readonly message: string | IMessage;
    readonly property: string;
}
export interface IErrorsImport {
    row: number;
    file?: string;
    errors: IErrors[];
}
export type IMessageOptionsProperties = Record<string, string>;
export interface IMessageOptions {
    readonly customLanguages?: string[];
    readonly properties?: IMessageOptionsProperties;
}

export type IMessageSetOptions = Omit<IMessageOptions, 'customLanguages'>;
