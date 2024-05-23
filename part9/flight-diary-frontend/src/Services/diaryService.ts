import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
    const response = await axios.get<DiaryEntry[]>(baseUrl);
    return response.data;
};

const getOne = async (id: string) => {
    const response = await axios.get<DiaryEntry>(`${baseUrl}/${id}`);
    return response.data;
};

const createDiary = async (entry: NewDiaryEntry) => {
    const response = await axios.post<DiaryEntry>(baseUrl, entry);
    return response.data;
};

export { getAll, getOne, createDiary}