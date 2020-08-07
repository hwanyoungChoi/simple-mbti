import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    border: none;
    outline: none;
    border-radius: 10px;
    text-align: center;
    color: white;
    line-height: 155.5%;
`;

interface IButtonContainerProps {
    text: string;
    disabled?: boolean;
    style: React.CSSProperties;
    onClick: () => void;
}

function ButtonContainer(props: IButtonContainerProps) {
    const { text, disabled, style, onClick } = props;

    return (
        <Button style={style} disabled={disabled} onClick={onClick}>
            {text}
        </Button>
    );
}

export default ButtonContainer;
