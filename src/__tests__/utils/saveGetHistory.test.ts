import { FormDataHistory } from '@/src/components/interfaces/graphQlInterface';
import { saveGetHistory } from '@/src/utils/saveGetHistory';

beforeEach(() => {
  localStorage.clear();
});

describe('saveGetHistory', () => {
  it('should save a new history entry to localStorage', () => {
    const data: FormDataHistory = {
      endpointUrl: 'rik',
      headers: 'morty',
      query: '',
      variables: '',
      timestamp: '',
      encodedHistoryUrl: '',
    };

    saveGetHistory(data);

    const history = JSON.parse(localStorage.getItem('history') || '[]');

    expect(history).toHaveLength(1);
    expect(history[0]).toEqual(data);
  });

  it('should append a new entry to existing history', () => {
    const existingData: FormDataHistory = {
      endpointUrl: 'rik',
      headers: 'morty',
      query: '',
      variables: '',
      timestamp: '',
      encodedHistoryUrl: '',
    };

    localStorage.setItem('history', JSON.stringify([existingData]));

    const newData: FormDataHistory = {
      endpointUrl: 'rik',
      headers: 'morty',
      query: '',
      variables: '',
      timestamp: '',
      encodedHistoryUrl: '',
    };

    saveGetHistory(newData);

    const history = JSON.parse(localStorage.getItem('history') || '[]');

    expect(history).toHaveLength(2);
    expect(history[1]).toEqual(newData);
  });

  it('should initialize history as an empty array if it does not exist', () => {
    const data: FormDataHistory = {
      endpointUrl: 'rik',
      headers: 'morty',
      query: '',
      variables: '',
      timestamp: '',
      encodedHistoryUrl: '',
    };

    saveGetHistory(data);

    const history = JSON.parse(localStorage.getItem('history') || '[]');

    expect(history).toHaveLength(1);
    expect(history[0]).toEqual(data);
  });
});
