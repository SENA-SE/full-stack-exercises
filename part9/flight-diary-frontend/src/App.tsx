/* eslint-disable @typescript-eslint/no-explicit-any */
import { DiaryEntry, WeatherType, Visibility } from "./types";
import { getAll, createDiary } from "./Services/diaryService";

import  { useEffect, useState } from 'react';

const App = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
    const [date, setDate] = useState('');
    const [weather, setWeather] = useState('Sunny');
    const [visibility, setVisibility] = useState('Clear');
    const [comment, setComment] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        getAll().then(diaries => setDiaries(diaries));
    }, []);

    const handleDiarySubmit = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        const newDiary = await createDiary({ date, weather: weather as WeatherType, visibility: visibility as Visibility, comment });
        setDiaries([...diaries, newDiary]);
        setDate('');
        setWeather('');
        setVisibility('');
        setComment('');
      } catch (error: any) {
        setErrorMsg(error.response.data.error);
      }
    }

    return (
        <div>
          <div>
            <p style={{color:'red'}}>{errorMsg}</p>
            <h1> Add a new diary entry</h1>
            <form onSubmit={handleDiarySubmit}>
              <div>
                <label>Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                <div>
                  <label>Weather</label>
                  <select value={weather} onChange={(e) => setWeather(e.target.value)}>
                    <option value="sunny">Sunny</option>
                    <option value="rainy">Rainy</option>
                    <option value="cloudy">Cloudy</option>
                    <option value="windy">Windy</option>
                    <option value="stormy">Stormy</option>
                  </select>
                </div>
                <div>
                  <label>Visibility</label>
                  <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
                    <option value="great">Great</option>
                    <option value="good">Good</option>
                    <option value="ok">Ok</option>
                    <option value="poor">Poor</option>
                    </select>
                </div>

                <div>
                  <label>Comment</label>
                  <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
                </div>

                <button type="submit">Submit</button>
              </div>

            </form>
          </div>

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
};

export default App;