import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import homeOn from "../assets/bottomTab/home_on.svg";
import homeOff from "../assets/bottomTab/home_off.svg";
import searchOn from "../assets/bottomTab/search_on.svg";
import searchOff from "../assets/bottomTab/search_off.svg";
import uploadIcon from "../assets/bottomTab/upload.svg";
import notifyOn from "../assets/bottomTab/notify_on.svg";
import notifyOff from "../assets/bottomTab/notify_off.svg";
import mypageOn from "../assets/bottomTab/mypage_on.svg";
import mypageOff from "../assets/bottomTab/mypage_off.svg";

const tabItems = [
  { name: "홈", path: "/", iconOn: homeOn, iconOff: homeOff },
  { name: "검색", path: "/search", iconOn: searchOn, iconOff: searchOff },
  { name: "업로드", path: "/upload", iconOn: uploadIcon, iconOff: uploadIcon },
  { name: "알림", path: "/alarm", iconOn: notifyOn, iconOff: notifyOff },
  { name: "마이페이지", path: "/mypage", iconOn: mypageOn, iconOff: mypageOff },
];

const BottomTab = () => {
  return (
    <BottomTabContainer>
      {tabItems.map(({ name, path, iconOn, iconOff }) => (
        <StyledNavLink key={name} to={path}>
          {({ isActive }) => (
            <>
              <TabIcon src={isActive ? iconOn : iconOff} alt={name} />
              {name !== "업로드" && <Label isActive={isActive}>{name}</Label>}
            </>
          )}
        </StyledNavLink>
      ))}
    </BottomTabContainer>
  );
};

export default BottomTab;

const BottomTabContainer = styled.nav`
  width: 100%;
  max-width: 480px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  border-radius: 50px 50px 0px 0px;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? "#4574EC" : "#b0b0b0")};
`;

const TabIcon = styled.img`
  width: 28px;
  height: 28px;
`;

const Label = styled.span`
  font-size: 12px;
  margin-top: 4px;
  color: ${({ isActive }) => (isActive ? "#4574EC" : "#b0b0b0")};
`;
