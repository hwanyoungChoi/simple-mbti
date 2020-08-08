import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import WebIntro from '../assets/web_intro.gif';
import WippyLogo from '../assets/wippy_logo.svg';
import ButtonContainer from '../components/common/ButtonContainer';
import TestTemplate from '../components/main-page/TestTemplate';

const MainPageBlock = styled.div`
    text-align: center;
`;

const IntroBlock = styled.div`
    padding-left: 48px;
    padding-right: 48px;
    padding-bottom: 48px;
    padding-top: 77px;
`;

const FooterBlock = styled.footer`
    bottom: 0;
`;

const Title = styled.header`
    font-size: 40px;
    font-weight: bold;
    line-height: 155.5%;
`;

const WebIntroImageWrapper = styled.div`
    margin-top: 72px;
`;

const WippyLogoImageWrapper = styled.div``;

function MainPage() {
    const [isStarted, setIsStarted] = useState<Boolean>(false);

    const handleStartButtonClicked = useCallback(() => setIsStarted(true), []);

    const renderIntro = useCallback(() => {
        return (
            <IntroBlock>
                <Title>친구 유형 테스트</Title>
                <WebIntroImageWrapper>
                    <img
                        src={WebIntro}
                        width={195}
                        height={195}
                        alt="web_intro"
                    />
                </WebIntroImageWrapper>
                <ButtonContainer
                    style={{
                        marginTop: 72,
                        width: '100%',
                        paddingTop: 13,
                        paddingBottom: 12,
                        backgroundColor: 'black',
                    }}
                    text="시작하기"
                    onClick={handleStartButtonClicked}
                />
            </IntroBlock>
        );
    }, [handleStartButtonClicked]);

    const renderTest = useCallback(() => {
        return <TestTemplate />;
    }, []);

    return (
        <MainPageBlock>
            {isStarted ? renderTest() : renderIntro()}
            <FooterBlock>
                <WippyLogoImageWrapper>
                    <img src={WippyLogo} alt="wippy_logo" />
                </WippyLogoImageWrapper>
            </FooterBlock>
        </MainPageBlock>
    );
}

export default MainPage;
