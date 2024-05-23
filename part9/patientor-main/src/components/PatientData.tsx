import {Patient, Gender, Entry, Diagnosis} from '../types';
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';


interface PatientDataProps {
    patients: Patient[];
    diagnoses: Diagnosis[];
}

const genderIcon = (gender: Gender) => {
    switch(gender){
        case "female":
            return <FemaleIcon />;
        case "male":
            return <MaleIcon />;
        default:
            return null;
    }
};

const PatientData = ({patients, diagnoses}: PatientDataProps) => {
    const { id } = useParams<{ id: string }>();
    const patient = patients.find(p => p.id === id);
    if (!patient) return null;

    return (
        <Container>
            <h2>
                {patient.name} 
                {genderIcon(patient.gender)}
            </h2>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <h3>entries</h3>
            {patient.entries.map((entry: Entry) => (
                <div key={entry.id}>
                    <p>{entry.date} <i>{entry.description}</i></p>
                    <ul>
                        {/* {entry.diagnosisCodes?.map((code: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined, index: Key | null | undefined) => (
                            <li key={index}>{code}</li>
                        ))} */}
                        {entry.diagnosisCodes?.map((code: string) => (
                            <li key={code}>{code} {diagnoses.find(d => d.code === code)?.name}</li>
                        ))}
                    </ul>
                </div>
            ))}

        </Container>
    );
};

export default PatientData;