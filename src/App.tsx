/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useReducer }  from 'react';
import axios from 'axios'
import './App.css'
import { useDebounceEffect } from './utils';

function reducer(state: { value: Date }, action: any){
  switch (action.type){
      case 'INCREMENT':
          return { value: new Date(state.value.getTime() + 86400000) };
      case 'DECREMENT':
          return { value: new Date(state.value.getTime() - 86400000) };
      default:
          return state;
  }
}

const initialDate = new Date(new Date().getTime() - 86400000)
const format = (date: Date) => `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`

const App  = () => {
  const [movieInfo, setMovieInfo] = useState<any[]>([]);
  const [state, dispatch] = useReducer(reducer, {
      value: initialDate
  });
  const date = format(state.value);
 
  useDebounceEffect(async () => {
    const MovieInfo = await axios.get(`http://localhost:5173/api?key=f5eef3421c602c6cb7ea224104795888&targetDt=${date}`);
    setMovieInfo(MovieInfo.data.boxOfficeResult.dailyBoxOfficeList);
  }, 400, [date]);

  return (
    <>
      <h2>Movie Schedule</h2>
      <div className = "button_date">
          <button id="prev" onClick={()=> dispatch({type:'DECREMENT'})}>prev</button>
          <div className = "date_view">{date}</div>
          <button id="next" onClick={()=> dispatch({type:'INCREMENT'})}>next</button>
      </div>
      <table>
        <thead>
          <tr>
            <th> Rank </th>
            <th> Movie Name </th>
            <th> Audience Count </th>
            <th> Screen Count </th>
            <th> Show Count </th>
          </tr>     
        </thead>
        <tbody>
          {movieInfo.map((movie) => (
            <tr key={movie.movieCd}>
              <td id="rank">{movie.rank}</td>
              <td>{movie.movieNm}</td>
              <td>{movie.audiCnt}</td>
              <td>{movie.scrnCnt}</td>
              <td>{movie.showCnt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default App;
