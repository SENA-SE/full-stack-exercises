import patientData from '../../data/patients';
import { Patient, PatientWithoutSSN } from '../types';

const getPatients = (): Patient[] => {
  return patientData;
};

const PatientsNoSSN = (): PatientWithoutSSN[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
}

export default { getPatients, PatientsNoSSN };