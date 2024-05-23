import {Patient, Gender, Entry} from '../types';
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

interface PatientDataProps {
    patients: Patient[];
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
}

const PatientData = ({patients}: PatientDataProps) => {
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
            {/* <h3>entries</h3>
            <ul>
                {patient.entries.map((entry: Entry) => (
                    <li key={entry.id}>
                        {entry.date} {entry.description}
                        <ul>
                            {entry.diagnosisCodes?.map((code: string) => (
                                <li key={code}>{code}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul> */}
        </Container>
    );
};

export default PatientData;