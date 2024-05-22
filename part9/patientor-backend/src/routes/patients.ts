import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();
router.get('/', (_req, res) => {
    res.send(patientsService.PatientsNoSSN());
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

export default router;