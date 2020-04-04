import axios from 'axios';

import { FETCH_USER, FETCH_PROJECTS, FETCH_FEATURES, FETCH_KEYS } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitProject = (values, history) => async dispatch => {
    const res = await axios.post('/api/projects', values);

    history.push('/dashboard');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchProjects = () => async dispatch => {
    const res = await axios.get('/api/projects')

    dispatch({ type: FETCH_PROJECTS, payload: res.data });
}

export const fetchFeatures = () => async dispatch => {
    const res = await axios.get('/api/features')

    dispatch({ type: FETCH_FEATURES, payload: res.data});
}

export const fetchKeys = () => async dispatch => {
    const res = await axios.get('/api/keys');
    console.log(res.data);
    dispatch({ type: FETCH_KEYS, payload: res.data });
}
