import patientData from '../../data/patients';
import { Patient, PatientWithoutSSN, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';
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

const createPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {id,...entry};

  patientData.push(newPatient);
  return newPatient;
}


export default { getPatients, PatientsNoSSN, createPatient };