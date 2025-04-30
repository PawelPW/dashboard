import { use } from "react";

export const saveMaterialProgress = async (
  userId: number,
  materialId: number,
  completed: boolean
) => {
    console.log("Saving material progress:")
    const response = await fetch("/api/progress/materials", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId,
            materialId,
            completed,
        }),
    });        
    return response.json();
};

export const saveQuizProgress = async (
    userId: number,
    quizId: number,
    score: number,
    completed: boolean
) => {
    const response = await fetch("/api/progress/quiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId,
            quizId,
            score,
            completed,
        }),
    });
    return response.json();
};

export const saveChallengeProgress = async (
    userId: number,
    challengeId: number,
    attempts: number,
    completed: boolean
) => {
    const response = await fetch("/api/progress/challenge", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId,
            challengeId,
            attempts,
            completed,
        }),
    });
    return response.json();
};

export const getMaterialProgress = async (userId: number) => {
    const response = await fetch(`/api/progress/material?userId=${userId}`);
    return response.json();
};

export const getQuizProgress = async (userId: number) => {
    const response = await fetch(`/api/progress/quiz?userId=${userId}`);
    return response.json();
};

export const getChallengeProgress = async (userId: number) => { 
    const response = await fetch(`/api/progress/challenge?userId=${userId}`);
    return response.json();
};
