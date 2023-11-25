import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

import React, { useCallback, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';

import { IOnboardingFlowState } from '../interfaces/IOnboardingFlowState';
import { IProfile } from '../interfaces/IProfile';
import {
    getProfile,
    insertOnboardingResponse,
    updateProfile
} from '../services/ProfileService';
import { getItem, setItem } from '../utils/SecureStoreUtils';
import { useUser } from './UserContext';
import { ITask } from '@/interfaces/ITask';
import { IPersona } from '@/interfaces/IPersona';
import { ISubTask } from '@/interfaces/ISubTask';
import { fetchAllUserTasks } from '@/services/TaskService';
import { fetchUserPersona } from '@/services/PersonaService';

type TaskContextData = {
    tasks: ITask[] | null;
    persona: IPersona | null;
    fetchTasks: (userID: number) => Promise<void>;
    // completeTask: (taskID: number) => Promise<void>;
    // fetchTaskSubTasks: (taskID: number) => Promise<void>;
    // completeSubTask: (subtaskID: number) => Promise<void>;
};

type TaskProviderProps = {
    children?: React.ReactNode;
};

const TaskContext = createContext<TaskContextData | undefined>(undefined);

export const TaskProvider: React.FC<TaskProviderProps> = ({
    children
}) => {
    const [tasks, setTasks] = useState<ITask[] | null>(null);
    const [persona, setPersona] = useState<IPersona | null>(null);
    const { user } = useUser();

    const fetchTasks = useCallback(async (userID: number): Promise<void> => {
        try {
            const fetchedTasks = await fetchAllUserTasks(userID.toString());
            console.log('fetchedTasks', fetchedTasks);
            if (fetchedTasks) {
                setTasks(fetchedTasks);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
            // Handle error - show message or perform recovery action
        }
    }, []);

    // const fetchTaskSubTasks = useCallback(async (taskID: number): Promise<ISubTask[] | null> => {
    //     try {
    //         const fetchedSubtasks = await getSubTasks(taskID.toString());
    //         console.log('fetchedSubtasks', fetchedSubtasks);
    //         if (fetchedSubtasks) {
    //             return fetchedSubtasks;
    //         }
    //     } catch (error) {
    //         console.error('Error fetching subtasks:', error);
    //         // Handle error - show message or perform recovery action
    //     }
    // }, []);

    // const completeTask = useCallback(async (taskID: number): Promise<void> => {
    //     try {
    //         const completedTask = await completeTask(taskID.toString());
    //         console.log('completedTask', completedTask);
    //         if (completedTask) {
    //             // set that task to completed
    //             return;
    //         }
    //     } catch (error) {
    //         console.error('Error completing task:', error);
    //         // Handle error - show message or perform recovery action
    //     }
    // }, []);



    useEffect(() => {
        const init = async () => {
            const persona = await fetchUserPersona(user.persona_id);
            setPersona(persona);
        }

        if (user?.persona_id) {
            fetchTasks(user.id);
            init();
        }
    }, [user]);

    const contextValue: TaskContextData = {
        tasks,
        persona,
        fetchTasks,
        // fetchTaskSubTasks,
        // completeTask,
        // completeSubTask
    };

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTask = (): TaskContextData => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTask must be used within a TaskProvider');
    }

    return context;
}