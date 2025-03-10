import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IErrors, IErrorsImport, IMessage, IMessageOptions, IMessageSetOptions } from '../message.interface';
import { isArray, ValidationError } from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { IValidationErrorImport } from 'src/core/error/error.interface';
import { ENUM_MESSAGE_LANGUAGE } from '../message.constant';

@Injectable()
export class MessageService {
    private readonly defaultLanguage: string;

    constructor(
        private readonly i18n: I18nService,
        private readonly configService: ConfigService,
    ) {
        this.defaultLanguage = this.configService.get<string>('app.language');
    }

    async getRequestErrorsMessage(requestErrors: ValidationError[], customLanguages?: string[]): Promise<IErrors[]> {
        const messages: Array<IErrors[]> = [];
        for (const transfomer of requestErrors) {
            let children: Record<string, any>[] = transfomer.children;
            let constraints: string[] = Object.keys(transfomer.constraints || []);
            const errors: IErrors[] = [];
            let property: string = transfomer.property;
            let propertyValue: string = transfomer.value;

            if (children.length > 0) {
                while (children.length > 0) {
                    for (const child of children) {
                        property = `${property}.${child.property}`;

                        if (child.children && child.children.length > 0) {
                            children = child.children;
                            break;
                        } else if (child.constraints) {
                            constraints = Object.keys(child.constraints);
                            children = [];
                            propertyValue = child.value;
                            break;
                        }
                    }
                }
            }

            for (const constraint of constraints) {
                const message = await this.get(`request.${constraint}`, {
                    customLanguages,
                    properties: {
                        property,
                        value: propertyValue,
                    },
                });
                errors.push({
                    property,
                    message,
                });
            }

            messages.push(errors);
        }

        return messages.flat(1) as IErrors[];
    }

    async get(key: string, options?: IMessageOptions): Promise<string | IMessage> {
        const { properties, customLanguages } = options ? options : { properties: undefined, customLanguages: undefined };

        if (customLanguages && isArray(customLanguages) && customLanguages.length > 0) {
            const messages: IMessage = {};
            for (const customLanguage of customLanguages) {
                messages[customLanguage] = await this.setMessage(customLanguage, key, {
                    properties,
                });
            }

            if (Object.keys(messages).length === 1) {
                return messages[customLanguages[0]];
            }

            return messages;
        }

        return this.setMessage(this.defaultLanguage, key, {
            properties,
        });
    }

    async getImportErrorsMessage(errors: IValidationErrorImport[], customLanguages?: string[]): Promise<IErrorsImport[]> {
        const newErrors: IErrorsImport[] = [];
        for (const error of errors) {
            newErrors.push({
                row: error.row,
                file: error.file,
                errors: await this.getRequestErrorsMessage(error.errors, customLanguages),
            });
        }

        return newErrors;
    }

    private setMessage(lang: string, key: string, options?: IMessageSetOptions): any {
        return this.i18n.translate(key, {
            lang: lang || this.defaultLanguage,
            args: options && options.properties ? options.properties : undefined,
        });
    }

    async getLanguages(): Promise<string[]> {
        return Object.values(ENUM_MESSAGE_LANGUAGE);
    }
}
