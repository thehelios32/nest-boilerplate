export const RESPONSE_CUSTOM_TIMEOUT_META_KEY = 'ResponseCustomTimeoutMetaKey';

export enum ENUM_RESPONSE_STATUS_CODE_ERROR {
    UNKOWN_ERROR = 999,
    REQUEST_VALIDATION_ERROR = 1111,
    REQUEST_MISSING_REQUIRED_PARAM = 1112,
}

export enum ENUM_RESPONSE_STATUS_MESSAGE_ERROR {
    UNKOWN_ERROR = 'Unkown Error',
    REQUEST_VALIDATION_ERROR = 'Validation error',
    REQUEST_MISSING_REQUIRED_PARAM = 'Missign required param',
}
