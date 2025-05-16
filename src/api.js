import axios from 'axios';

// 서버 base 주소
const BASE_URL = 'http://localhost:8080/api/cycle-log';

// 자전거 로그 목록 조회
export const getCycleLogs = () => axios.get(BASE_URL);

// 자전거 로그 상세정보 조회
export const getCycleLogDetailById = (id) => axios.get(`${BASE_URL}/${id}`)

// 자전거 로그 추가
export const addCycleLog = (cycleLog) => axios.post(BASE_URL, cycleLog)

// 자전거 로그 수정
export const updateCyceLog = (id, cycleLog) => axios.put(`${BASE_URL}/${id}`, cycleLog);

// 자전거 로그 삭제
export const deleteCycleLog = (id) => axios.delete(`${BASE_URL}/${id}`);
// export const deleteCycleLog = (id) => axios.get(`${BASE_URL}/delete-log`, {
//   params: {
//     id,
//   }
// });