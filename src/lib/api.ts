import axios from 'axios';

const SERVER_URL = 'https://static.wippy.io/r/web_test';

export interface IQuestions {
    question: string;
    answers: [string];
}

export interface IResult {
    logo: string;
    main_image: string;
    summary: string;
    description: string;
}

export async function fetchQuestionsAsync(): Promise<IQuestions[]> {
    const response = await axios.get(`${SERVER_URL}/questions.json`);

    return response.data;
}

export async function fetchResultAsync(): Promise<IResult[]> {
    const response = await axios.get(`${SERVER_URL}/web_result.json`);

    return response.data;
}
