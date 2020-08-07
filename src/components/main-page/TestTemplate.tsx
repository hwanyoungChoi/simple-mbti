import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { fetchQuestionsAsync, IQuestions } from '../../lib/api';
import ButtonContainer from '../common/ButtonContainer';

const TestBlock = styled.div`
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 48px;
    padding-top: 40px;
`;

const QuestionBlock = styled.div`
    display: flex;
    align-items: center;
    background: black;
    color: white;
    border-radius: 20px;
    font-weight: bold;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 29px;
    padding-top: 26px;
    margin-bottom: 40px;
`;

const QuestionNumber = styled.div`
    font-size: 32px;
    line-height: 44px;
    margin-right: 12px;
`;

const QuestionText = styled.div`
    font-size: 18px;
    line-height: 140%;
    text-align: left;
`;

const AnswerRadio = styled.input.attrs({ type: 'radio' })`
    visibility: hidden;

    & + & {
        margin-top: 8px;
    }

    &:checked {
        box-shadow: 0 0 0 3px orange;
        width: 100%;
    }

    &:checked + label {
        color: #ff0056;
        border-color: #ff0056;
    }

    &:checked + .title {
        color: #ff0056;
    }
`;

const AnswerLabel = styled.label`
    display: flex;
    align-items: center;
    border: 1px dashed #cbcbcb;
    box-sizing: border-box;
    border-radius: 10px;

    padding-left: 24px;
    padding-right: 16px;
    padding-bottom: 26px;
    padding-top: 26px;
`; 

const AnswerTitle = styled.div.attrs({ className: 'title' })`
    font-size: 32px;
    line-height: 44px;
    font-weight: bold;
`;

const AnswerText = styled.div`
    font-size: 16px;
    line-height: 155.5%;
    font-weight: 500;
    text-align: left;
`;

function TestTemplate() {
    const history = useHistory();
    
    const [questions, setQuestions] = useState<IQuestions[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setQuestions(await fetchQuestionsAsync());
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleAnswerSelected = useCallback((answer: string) => {
        if (selectedAnswers[currentIndex]) {
            const newSelectedAnswers = [...selectedAnswers];
            newSelectedAnswers[currentIndex] = answer;
            setSelectedAnswers(newSelectedAnswers);
            return;
        }
        setSelectedAnswers([...selectedAnswers, answer]);
    }, [currentIndex, selectedAnswers]);

    const handleNextButtonClicked = useCallback(() => {
        if (currentIndex === questions.length - 1) {
            history.push('/result', { selectedAnswers });
        }
        setCurrentIndex(currentIndex + 1);
    }, [currentIndex, history, questions.length, selectedAnswers]);

    if (loading) {
        return <TestBlock>로딩 중입니다...</TestBlock>;
    }

    if (!questions) {
        return <TestBlock>데이터를 불러오는 중입니다...</TestBlock>;
    }

    const question = questions[currentIndex]?.question;
    const answerA = questions[currentIndex]?.answers[0];
    const answerB = questions[currentIndex]?.answers[1];

    return (
        <TestBlock>
            <QuestionBlock>
                <QuestionNumber>{currentIndex + 1}.</QuestionNumber>
                <QuestionText>{question}</QuestionText>
            </QuestionBlock>
            <AnswerRadio
                id="A"
                name="answer"
                onClick={() => handleAnswerSelected('A')}
                checked={selectedAnswers[currentIndex] === 'A' ? true : false}
            />
            <AnswerLabel htmlFor="A">
                <AnswerTitle style={{ marginRight: 15 }}>A</AnswerTitle>
                <AnswerText>{answerA}</AnswerText>
            </AnswerLabel>
            <AnswerRadio
                id="B"
                name="answer"
                onClick={() => handleAnswerSelected('B')}
                checked={selectedAnswers[currentIndex] === 'B' ? true : false}
            />
            <AnswerLabel htmlFor="B">
                <AnswerTitle style={{ marginRight: 17 }}>B</AnswerTitle>
                <AnswerText>{answerB}</AnswerText>
            </AnswerLabel>
            <ButtonContainer
                style={{
                    paddingTop: 18,
                    paddingBottom: 18,
                    width: '100%',
                    lineHeight: '21px',
                    marginTop: 106,
                }}
                text="다음"
                disabled={selectedAnswers[currentIndex] ? false : true}
                onClick={handleNextButtonClicked}
            />
        </TestBlock>
    );
}

export default TestTemplate;