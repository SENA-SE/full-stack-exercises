import { DiaryEntry } from "./types";
import { getAll } from "./Services/diaryService";

import  { useEffect, useState } from 'react';

const App = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

    useEffect(() => {
        getAll().then(diaries => setDiaries(diaries));
    }, []);

    return (
        <div>
            <h1>Flight Diary</h1>
            <ul>
                {diaries.map(diary => (
                    <div key={diary.id}>
                        <h2>{diary.date}</h2>
                        <p>Visibility: {diary.visibility}</p>
                        <p>Weather: {diary.weather}</p>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default App;