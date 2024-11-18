import { ENUM_HELPER_DATE_DIFF } from "../constants/helper-date-diff.enum";
import { ENUM_HELPER_DATE_FORMAT } from "../constants/helper-date-format.enum";


export interface IHelperDateOptions {
    timezone?: string;
}

export interface IHelperDateOptionsDiff extends IHelperDateOptions {
    format?: ENUM_HELPER_DATE_DIFF;
}

export interface IHelperDateOptionsCreate extends IHelperDateOptions {
    date?: string | number | Date;
}

export interface IHelperDateOptionsFormat extends IHelperDateOptions {
    format?: ENUM_HELPER_DATE_FORMAT | string;
}

export interface IHelperDateOptionsForward extends IHelperDateOptions {
    fromDate?: Date;
}

export type IHelperDateOptionsBackward = IHelperDateOptionsForward;

export interface IHelperDateOptionsMonth extends IHelperDateOptions {
    year?: number;
}
