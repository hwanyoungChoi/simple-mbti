import React, { useState } from 'react';
import styled from 'styled-components';

import WebIntro from '../assets/web_intro.gif';
import WippyLogo from '../assets/wippy_logo.svg';
import ButtonContainer from '../components/common/ButtonContainer';

const MainPageBlock = styled.div`
    padding-left: 48px;
    padding-right: 48px;
    padding-bottom: 48px;
    padding-top: 77px;

    text-align: center;
`;

const IntroBlock = styled.main``;

const FooterBlock = styled.footer`
    margin-top: 121px;
`;

const Title = styled.header`
    font-size: 40px;
    font-weight: bold;
    line-height: 155.5%;
`;

const WebIntroImageWrapper = styled.div`
    margin-top: 72px;
`;

const WippyLogoImage = styled.div``;

function MainPage() {
    const [isStarted, setIsStarted] = useState(false);

    const handleStartButtonClicked = () => {
        setIsStarted(true);
    };

    return (
        <MainPageBlock>
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
                    onClick={() => handleStartButtonClicked()}
                />
            </IntroBlock>
            <FooterBlock>
                <WippyLogoImage>
                    <img src={WippyLogo} alt="wippy_logo" />
                </WippyLogoImage>
            </FooterBlock>
        </MainPageBlock>
    );
}

export default MainPage;
