import React, { useState } from "react";
import styled from "styled-components";
import xIcon from "../assets/icons/x_grey.svg";
export const NickNameInput = ({ onTextChange }) => {
  const [text, setText] = useState(""); // 입력된 텍스트 상태 관리

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    onTextChange(newText);
  };

  const handleDelete = () => {
    setText("");
    onTextChange("");
  };

  return (
    <Container>
      <InputContainer>
        <StyledInput
          type="text"
          value={text}
          onChange={handleTextChange}
          maxLength={20} // 최대 20자
        />
        <DeleteButton onClick={handleDelete}>
          <img src={xIcon} alt="deleteIcon" />
        </DeleteButton>
      </InputContainer>
      <CharacterCount>({text.length}/20)</CharacterCount>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: end;
`;

const InputContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #ffffff;
  gap: 8px;
  align-items: center;
  padding-bottom: 6px;
`;

const StyledInput = styled.input`
  border: none;
  background-color: transparent;
  padding: 8px;
  font-size: 16px;
  width: 100%;
  max-width: 250px;
  border: none;
  outline: none;
  color: white;
  font-weight: 600;
`;

const CharacterCount = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 5px;
  color: white;
`;

const DeleteButton = styled.button`
  min-width: 24px;
  height: 24px;
  background-color: #c8d8ff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 12px;
    height: 12px;
  }
`;
