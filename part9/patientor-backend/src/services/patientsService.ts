import patientData from '../../data/patients';
import { Patient, PatientWithoutSSN, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';
const getPatients = (): Patient[] => {
  return patientData;
};

const PatientsNoSSN = (): PatientWithoutSSN[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
}

const createPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {id,...entry};

  patientData.push(newPatient);
  return newPatient;
}

const getPatientById = (id: string): Patient | undefined => {
  const patient = patientData.find(p => p.id === id);
  return patient;
}
  

export default { getPatients, PatientsNoSSN, createPatient, getPatientById };