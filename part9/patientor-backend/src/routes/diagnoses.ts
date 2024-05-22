import express from 'express';
import diagnosisService from '../services/diagonosisService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnosisService.getDiagnoses());
    }
);

router.post('/', (_req, res) => {
    res.send('Diagnosis added');
}
);

export default router;