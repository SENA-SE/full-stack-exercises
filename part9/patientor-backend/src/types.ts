export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    occupation: string;
    ssn: string;
    entries: Entry[];
}

export interface PatientWithoutSSN {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export interface Entry {
    id: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
    description: string;
    type: string;
    discharge?: {
        date: string;
        criteria: string;
    };
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
    healthCheckRating?: number;
    employerName?: string;
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;