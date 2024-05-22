import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();
router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
    }
);

router.post('/', (req, res) => {
    const patientData = req.body;
    const newPatient = patientsService.createPatient({
        name: patientData.name,
        dateOfBirth: patientData.dateOfBirth,
        ssn: patientData.ssn,
        gender:patientData.gender,
        occupation: patientData.occupation
    });
    res.json(newPatient);
}
);

export default router;