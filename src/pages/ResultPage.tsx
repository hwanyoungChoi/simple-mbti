import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import ButtonContainer from '../components/common/ButtonContainer';
import { fetchResultAsync, IResult } from '../lib/api';

const ResultBlock = styled.div`
    text-align: center;
`;

const WippyLogoImageWrapper = styled.div`
    margin-top: 40px;
`;

const ResultImageWrapper = styled.div`
    margin-top: 72px;
`;

const SummaryBlock = styled.div`
    margin-top: 40px;
    padding: 0 61px;
    font-size: 14px;
    line-height: 14px;
`;

const DescriptionBlock = styled.div`
    background: #e9a737;
    margin-top: 72px;
    padding-top: 40px;
    padding-bottom: 48px;

    color: white;
    font-size: 14px;
`;

const Description = styled.div`
    padding: 0 16px;
    text-align: left;
    line-height: 140%;
`;

const ButtonBlock = styled.div`
    padding: 0 20px;
`;

function Result() {
    const history = useHistory();
    const location = useLocation();

    const [result, setResult] = useState<IResult>();
    const [loading, setLoading] = useState<Boolean>(false);

    useEffect(() => {
        console.log(location.state);
    }, [location]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setResult(await fetchResultAsync());
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleRestartButtonClicked = useCallback(() => {
        history.push('/');
    }, [history]);

    if (loading) {
        return <ResultBlock>로딩 중입니다...</ResultBlock>;
    }

    if (!result) {
        return <ResultBlock>데이터를 불러오는 중입니다...</ResultBlock>;
    }

    return (
        <ResultBlock>
            <WippyLogoImageWrapper>
                <img src={result.logo} alt="logo" />
            </WippyLogoImageWrapper>
            <ResultImageWrapper>
                <img
                    src={result.main_image}
                    width={132}
                    height={132}
                    alt="result_image"
                />
            </ResultImageWrapper>
            <SummaryBlock>"{result.summary}"</SummaryBlock>
            <DescriptionBlock>
                <Description>{result.description}</Description>
            </DescriptionBlock>
            <ButtonBlock>
                <ButtonContainer
                    style={{
                        marginTop: 40,
                        width: '100%',
                        paddingTop: 12,
                        paddingBottom: 12,
                        fontSize: 14,
                        lineHeight: '155.5%',
                    }}
                    text="다시하기"
                    onClick={handleRestartButtonClicked}
                />
            </ButtonBlock>
        </ResultBlock>
    );
}

export default Result;
