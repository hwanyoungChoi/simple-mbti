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

    background: black;
    color: white;
    border-radius: 20px;
    font-weight: bold;
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 29px;
    padding-top: 26px;
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

const AnswerBlock = styled.div`
    margin-top: 40px;
`; 

function TestTemplate() {
    const history = useHistory();
    
    const [questions, setQuestions] = useState<IQuestions[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setQuestions(await fetchQuestionsAsync());
            setLoading(false);
        }
        fetchData();
    }, []);

    const handleNextButtonClicked = useCallback(() => {
        if (currentIndex === questions.length - 1) {
            history.push('/result');
        }
        setCurrentIndex(currentIndex + 1)
    }, [currentIndex, history, questions.length]);

    if (loading) {
        return <TestBlock>로딩 중입니다...</TestBlock>;
    }

    if (!questions) {
        return <TestBlock>데이터를 불러오는 중입니다...</TestBlock>;
    }

    return (
        <TestBlock>
            <QuestionBlock>
                <QuestionNumber>{currentIndex + 1}.</QuestionNumber>
                <QuestionText>{questions[currentIndex]?.question}</QuestionText>
            </QuestionBlock>
            <AnswerBlock>{questions[currentIndex]?.answers}</AnswerBlock>
            <ButtonContainer
                style={{
                    paddingTop: 18,
                    paddingBottom: 18,
                    width: '100%',
                    lineHeight: '21px',
                    marginTop: 106,
                }}
                text="다음"
                onClick={handleNextButtonClicked}
            />
        </TestBlock>
    );
}

export default TestTemplate;