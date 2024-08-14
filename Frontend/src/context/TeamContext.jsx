// import React, { createContext, useContext, useReducer } from 'react';
// import { teamReducer, initialTeamState } from '../redux/slices/taskSlice';
// import { fetchTeams } from '../utils/api';

// const TeamContext = createContext();

// export const TeamProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(teamReducer, initialTeamState);

//     const loadTeams = async () => {
//         try {
//             const response = await fetchTeams();
//             dispatch({ type: 'LOAD_TEAMS_SUCCESS', payload: response.data });
//         } catch (error) {
//             console.error("Failed to load teams:", error.message);
//             dispatch({ type: 'LOAD_TEAMS_FAILURE', payload: error.message });
//         }
//     };

//     return (
//         <TeamContext.Provider value={{ state, loadTeams }}>
//             {children}
//         </TeamContext.Provider>
//     );
// };

// export const useTeam = () => useContext(TeamContext);


import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { fetchTasks } from '../utils/api';


// Initial state and reducer function for team
const initialTeamState = {
    teams: [],
    loading: false,
    error: null,
};

const teamReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_TEAMS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'LOAD_TEAMS_SUCCESS':
            return { ...state, loading: false, teams: action.payload };
        case 'LOAD_TEAMS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
    const [state, dispatch] = useReducer(teamReducer, initialTeamState);

    const loadTeams = async () => {
        dispatch({ type: 'LOAD_TEAMS_REQUEST' });
        try {
            const response = await fetchTasks();
            dispatch({ type: 'LOAD_TEAMS_SUCCESS', payload: response.data });
        } catch (error) {
            console.error("Failed to load teams:", error.message);
            dispatch({ type: 'LOAD_TEAMS_FAILURE', payload: error.message });
        }
    };

    useEffect(() => {
        loadTeams(); // Load teams on component mount
    }, []);

    return (
        <TeamContext.Provider value={{ state, loadTeams }}>
            {children}
        </TeamContext.Provider>
    );
};

export const useTeam = () => useContext(TeamContext);
