import React, { useEffect, useState } from "react";
import "../../../../../styles/Content.css";
import { FaBars } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import RequestManagementBottom from "../requestManagement/RequestManagementBottom/RequestManageBottom";
import RequestManagementTop from "../requestManagement/RequestManagementTop/RequestManagementTop";
import {
  fetchContractInfo,
  fetchIndicators,
} from "../../../../../api/CommonService";
import ContractHeaderV3 from "../../../../common/header/ContractHeaderV3";

const RequestManagementContent = ({ isNavOpen, toggleNav, effectClass }) => {
  //상태 정의
  const [selectedAgreementId, setSelectedAgreementId] = useState(
    localStorage.getItem("selectedAgreementId") || null
  );
  const [selectedDate, setSelectedDate] = useState(
    localStorage.getItem("selectedDate") || ""
  );
  //콜백 함수 정의
  const handleContractSelection = (agreementId, date) => {
    setSelectedAgreementId(agreementId);
    setSelectedDate(date);

    //localStorage에 값 저장
    localStorage.setItem("selectedAgreementId", agreementId);
    localStorage.setItem("selectedDate", date);
  };

  useEffect(() => {
    const savedAgreementId = localStorage.getItem("selectedAgreementId");
    const savedDate = localStorage.getItem("selectedDate");

    if (savedAgreementId) setSelectedAgreementId(savedAgreementId);
    if (savedDate) setSelectedDate(savedDate);
  }, []);

  return (
    <div
      className={`pageContent pageContentOffcanvas${effectClass} ${
        isNavOpen ? "jsOpened" : ""
      }`}
    >
      <button
        className={`navOpenBtn ${isNavOpen ? "jsHidden" : ""}`}
        onClick={toggleNav}
      >
        <FaBars />
      </button>

      {/* 프로필 및 환영 메시지 추가 */}
      <div className="profileSection">
        <div className="profileInfo">
          <IoPersonCircle className="profileImg" />
          <span className="welcomeText">관리자님 환영합니다</span>
        </div>
      </div>
      <hr className="divider" />
      <div className="content">
        <div className="contentBox">
          <ContractHeaderV3
            onContractSelect={handleContractSelection}
            onDateSelect={setSelectedDate}
            setSelectedAgreementId={setSelectedAgreementId}
            selectedAgreementId={selectedAgreementId}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <RequestManagementTop
            selectedDate={selectedDate}
            selectedAgreementId={selectedAgreementId}
          />
          <RequestManagementBottom
            agreementId={selectedAgreementId}
            date={selectedDate}
          />
        </div>
      </div>
    </div>
  );
};

export default RequestManagementContent;
