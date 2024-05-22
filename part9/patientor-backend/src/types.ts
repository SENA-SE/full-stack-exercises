export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    occupation: string;
    ssn: string;
}

export interface PatientWithoutSSN {
    id: string;
    name: string;
    dateOfBirth: string;
    gender: string;
    occupation: string;
}