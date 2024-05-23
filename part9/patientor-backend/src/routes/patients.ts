import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();
router.get('/', (_req, res) => {
    res.send(patientsService.getPatients());
    }
);

router.post('/', (req, res) => {
    // const patientData = req.body;
    // const newPatient = patientsService.createPatient({
    //     name: patientData.name,
    //     dateOfBirth: patientData.dateOfBirth,
    //     ssn: patientData.ssn,
    //     gender:patientData.gender,
    //     occupation: patientData.occupation
    // });
    try {
        const newPatient = toNewPatient(req.body);
        const createdPatient = patientsService.createPatient(newPatient);
        res.json(createdPatient);
    } catch (e: any) {
        res.status(400).send(e.message);
    }

}
);

router.get('/:id', (req, res) => {
    const patient = patientsService.getPatientById(req.params.id);
    if (patient) {
        res.send(patient);
    } else {
        res.sendStatus(404);
    }
});

export default router;