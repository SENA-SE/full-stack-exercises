import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

const getAllDiagnoses = async (): Promise<Diagnosis[]> => {
    const { data: diagnoses } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
    return diagnoses;
};

export default { getAllDiagnoses };