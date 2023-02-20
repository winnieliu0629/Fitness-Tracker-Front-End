const BASE_URL = "https://fitnesstrac-kr.herokuapp.com/api";

export async function registerUser(user) {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const result = await response.json();
    return result;
}

export async function userLogin(user) {
    const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    const result = await response.json();
    return result;
}

export async function userName(token) {
    const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    console.log("get user data", result);
    return result.username;
}

export async function userRoutines (username, token) {
    const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    return result;
}

export async function fetchAllActivities () {
    const response = await fetch(`${BASE_URL}/activities`);
    const result = await response.json();
    return result;
}

export async function addNewActivity (activity) {
    const response = await fetch(`${BASE_URL}/activities`, {
        method: "POST",
        body: JSON.stringify(activity)
    })
    const result = await response.json();
    return result;
}

export async function editActivity (activity, activityId) {
    const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
        method: "PATCH",
        body: JSON.stringify(activity)
    })
    const result = await response.json();
    return result;
}

export async function fetchPublicRoutinesbyActivity (activityId) {
    const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`)
    const result = await response.json();
    return result;
}

export async function fetchAllRoutines () {
    const response = await fetch(`${BASE_URL}/routines`);
    const result = await response.json();
    return result;
}

export async function addNewRoutine (routine) {
    const response = await fetch(`${BASE_URL}/routines`, {
        method: "POST",
        body: JSON.stringify(routine)
    })
    const result = await response.json();
    return result;
}

export async function editRoutine (routine, routineId) {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
        method: "PATCH",
        body: JSON.stringify(routine)
    })
    const result = await response.json();
    return result;
}

export async function deleteRoutine (routineId, token) {
    const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
        method: "DELETE",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    console.log("delete", result);
    if (result.error) throw result.error;
    return;
}

export async function addNewActivitytoRoutine (activity, activityId) {
    const response = await fetch(`${BASE_URL}/routines/${activityId}/activities`, {
        method: "POST",
        body: JSON.stringify(activity)
    })
    const result = await response.json();
    return result;
}

export async function editRoutineActivity (routine_activitiy, routineactivityId) {
    const response = await fetch(`${BASE_URL}/routine_activities/${routineactivityId}`, {
        method: "PATCH",
        body: JSON.stringify(routine_activitiy)
    })
    const result = await response.json();
    return result;
}

export async function deleteRoutineActivity (routineactivityId, token) {
    const response = await fetch(`${BASE_URL}/routine_activities/${routineactivityId}`, {
        method: "DELETE",
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        }
    })
    const result = await response.json();
    console.log("delete", result);
    if (result.error) throw result.error;
    return;
}