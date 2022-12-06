export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const CMPNT_REF_REGEX = /__component@[a-zA-Z_-]+/;
export const CMPNT_REF_ID_EXTRACT_REGEX = /[^__component/s@](.)*/;