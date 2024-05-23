import { NewPatient, Gender } from "./types";

const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseString(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: []
    };
    return newPatient;
};
const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(param);
};

const parseString = (string: any): string => {
    if (!string || !isString(string)) {
        throw new Error('Incorrect or missing string: ' + string);
    }
    return string;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseGender = (gender: any): Gender => {
    if (!isString(gender) || !isGender(gender)){
        throw new Error('Invalid gender');
    }
    return gender;
};

export default toNewPatient;