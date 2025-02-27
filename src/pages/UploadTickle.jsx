import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import styled from "styled-components";
import cameraIcon from "../assets/icons/camera.svg";
import deleteIcon from "../assets/icons/x_grey.svg";
import TagInput from "../components/Input/TagInput";
import { addTickleData, postRelayData } from "../apis/relayApi";
import useToastStore from "../store/useToastStore";
import useUploadStore from "../store/useUploadStore";
import ImgWithBlur from "../components/common/ImgWithBlur";

const UploadTickle = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const userImage = sessionStorage.getItem("userImage");
  const userName = sessionStorage.getItem("userName");

  const {
    intro,
    title,
    content,
    image,
    tags,
    tickleId,
    relayId,
    setContent,
    setImage,
    removeImage,
  } = useUploadStore();

  const fileInputRef = useRef(null);
  const addToast = useToastStore((state) => state.addToast);

  useEffect(() => {
    if (!userImage || !userName) {
      navigate("/guest-login", {
        replace: true,
      });
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    removeImage();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting) return; // 중복 클릭 방지

    setIsSubmitting(true);
    if (!image) {
      addToast("사진을 필수로 업로드해주세요!");
      setTimeout(() => {
        setIsSubmitting(false); // 1.5초 후 해제
      }, 1500);
      return;
    }

    try {
      const fromNewRelay = location.state?.fromNewRelay;

      if (fromNewRelay) {
        const requestData = {
          title,
          tags,
          relayDescription: intro,
          tickleDescription: content,
          userImage,
          file: image,
          userName,
        };

        const response = await postRelayData(requestData);
        navigate(
          `/relay/${response.data.relayId}/tickle/${response.data.tickleId}`,
          { state: { fromUpload: true } }
        );
      } else {
        const tickleData = {
          relayId,
          tickleDescription: content,
          userImage,
          file: image,
          userName,
        };

        const response = await addTickleData(tickleData);
        navigate(
          `/relay/${response.data.relayId}/tickle/${response.data.tickleId}`,
          { state: { fromUpload: true } }
        );
      }
      useUploadStore.getState().resetAll(); // 상태 초기화
    } catch (error) {
      console.error("데이터 전송 실패:", error);
      addToast("업로드에 실패했습니다.");
    } finally {
      setIsSubmitting(false); // 버튼 활성화
    }
  };
  return (
    <Container>
      <Header
        title="사진 업로드"
        buttonText="생성"
        onBtnClick={handleSubmit}
        disabled={isSubmitting}
      />
      <FormContainer>
        <TitleInputWrapper>
          <Input type="text" value={title} readOnly titleStyle />
          <label htmlFor="fileUpload">
            <CameraBtn src={cameraIcon} alt="카메라 버튼" />
          </label>
          <HiddenFileInput
            ref={fileInputRef}
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </TitleInputWrapper>
        <TagInput tags={tags} editMode={false} />
        <ContentContainer>
          <CharCount>({content.length}/30)</CharCount>
          <TextArea
            value={content}
            placeholder="비하인드 스토리 사진을 공유해보세요!"
            onChange={(e) => {
              if (e.target.value.length <= 30) {
                setContent(e.target.value);
              }
            }}
          />
          {image && (
            <ImageWrapper>
              <ImgWithBlur imageSrc={URL.createObjectURL(image)} />

              <RemoveButton
                src={deleteIcon}
                alt="delete"
                onClick={handleRemoveImage}
              />
            </ImageWrapper>
          )}
        </ContentContainer>
      </FormContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 80px;
`;

const Input = styled.input`
  margin-left: 20px;
  padding: 10px;
  font-size: 16px;
  border: none;
  outline: none;
  flex: 1;
  ${({ titleStyle }) =>
    titleStyle &&
    `
    font-weight: bold;
    color: black;
  `}
`;

const TextArea = styled.textarea`
  min-height: 50px;
  font-size: 16px;
  font-family: Pretendard;
  border: none;
  outline: none;
  resize: none;
`;

const TitleInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
`;

const CameraBtn = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  object-fit: cover;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ContentContainer = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  margin: 10px;
  position: relative;
  width: 40%;
  aspect-ratio: 9 / 16;
  overflow: hidden;
`;

const RemoveButton = styled.img`
  z-index: 5;
  position: absolute;
  top: 0px;
  right: 0px;
  width: 10px;
  height: 10px;
  padding: 4px;
  cursor: pointer;
  background: #ffffff80;
`;

const CharCount = styled.p`
  font-size: 12px;
  color: #333;
  text-align: right;
  margin: 0 0 10px;
`;
export default UploadTickle;
