import { FormDataHistory } from '../interfaces/graphQlInterface';

function saveGetHistory(data: FormDataHistory) {
  const existingRequests = localStorage.getItem('history');

  let requestHistory = existingRequests ? JSON.parse(existingRequests) : [];
  requestHistory.push(data);

  localStorage.setItem('history', JSON.stringify(requestHistory));
}

export { saveGetHistory };
