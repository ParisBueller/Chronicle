import axios from 'axios';

import { FETCH_USER, FETCH_PROJECTS } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    console.log(res.data);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitProject = (values, history) => async dispatch => {
    const res = await axios.post('/api/projects', values);

    history.push('/dashboard');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchProjects = () => async dispatch => {
    const res = await axios.get('/api/projects')
    console.log(res.data);

    dispatch({ type: FETCH_PROJECTS, payload: res.data });
}
