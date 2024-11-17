import React, { useEffect, useState } from "react";
import "./EstimateIndicator.css";
import {
  fetchStatisticsStatus,
  saveMeasuring,
  saveServiceMeasuring,
  saveIncidentMeasuring,
} from "../../../../../api/ContractManagerService";
import { fetchAllContractName } from "../../../../../api/CommonService";
import { FaAsterisk } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import IndicatorTable from "../../../../feature/table/IndicatorTable";
import "react-datepicker/dist/react-datepicker.css";
import { deleteStatistics } from "../../../../../api/ContractManagerService";

const EstimateIndicator = () => {
  const [selectedAgreementId, setSelectedAgreementId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    // 이전 달로 설정
    now.setMonth(now.getMonth() - 1);
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  });

  // 현재 달의 이전 달까지만 선택 가능하도록 max 값 설정
  const getMaxSelectableMonth = () => {
    const now = new Date();
    now.setMonth(now.getMonth() - 1); // 현재 달의 이전 달로 설정
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  };

  const [contracts, setContracts] = useState([]);
  const [data, setData] = useState({
    unCalculatedStatistics: [],
    calculatedStatistics: [],
  });

  // Fetch contracts data
  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await fetchAllContractName();
        if (data && Array.isArray(data)) {
          console.log(
            "Fetched contract names:",
            data.map((contract) => contract.contractName)
          );
          setContracts(data);
          if (data.length > 0) {
            setSelectedAgreementId(data[0].contractId);
          }
        }
      } catch (error) {
        console.error("Failed to fetch contracts: ", error);
      }
    };
    fetchContracts();
  }, []);

  useEffect(() => {
    if (selectedAgreementId && selectedDate) {
      handleMeasureClick(selectedAgreementId, selectedDate);
    }
  }, [selectedAgreementId, selectedDate]);

  const handleAgreementChange = (e) => {
    setSelectedAgreementId(e.target.value);
  };

  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMeasureClick = async (contractId, selectedDate) => {
    try {
      console.log("contractId", contractId, "selectedDate", selectedDate);
      const fetchedData = await fetchStatisticsStatus(contractId, selectedDate);

      console.log("Fetched Data:", fetchedData);
      if (fetchedData.success) {
        setData(fetchedData.data);
      } else {
        throw new Error("Unsuccessful response from API");
      }
    } catch (error) {
      alert("조회 불가");
      console.error("Error details:", error);
    }
  };

  const handleEstimateClick = async ({ evaluationItemId, date }) => {
    try {
      console.log("evaluationItemId", evaluationItemId, "date", date);
      const response = await saveMeasuring({ evaluationItemId, date });
      console.log("response:", response);
      if (response) {
        alert("측정 완료");
      } else {
        throw new Error("측정 실패");
      }
    } catch (error) {
      alert("측정할 수 있는 데이터가 없습니다.");
      console.error("Error details:", error);
    }
  };

  const handleEstimateServiceClick = async ({ evaluationItemId, date }) => {
    try {
      console.log("evaluationItemId", evaluationItemId, "date", date);
      const response = await saveServiceMeasuring({ evaluationItemId, date });
      console.log("response:", response);
      if (response) {
        alert("측정 완료");
      } else {
        throw new Error("측정 실패");
      }
    } catch (error) {
      alert("측정할 수 있는 데이터가 없습니다.");
      console.error("Error details:", error);
    }
  };

  const handleEstimateIncidentClick = async ({ evaluationItemId, date }) => {
    try {
      console.log("evaluationItemId", evaluationItemId, "date", date);
      const response = await saveIncidentMeasuring({ evaluationItemId, date });
      console.log("response:", response);
      if (response) {
        alert("측정 완료");
      } else {
        throw new Error("측정 실패");
      }
    } catch (error) {
      alert("측정할 수 있는 데이터가 없습니다.");
      console.error("Error details:", error);
    }
  };

  const navigate = useNavigate();

  const handleDetailClick = (evaluationItemId) => {
    navigate(
      `/contractManager/autoCal?evaluationItemId=${evaluationItemId}&date=${selectedDate}`
    );
  };

  const handleDeleteStatistics = async (evaluationItemId, date) => {
    const response = await deleteStatistics(evaluationItemId, date);
    if (response) {
      alert("삭제되었습니다.");
      const updatedData = await fetchStatisticsStatus(
        selectedAgreementId,
        selectedDate
      );
      if (updatedData.success) {
        setData(updatedData.data);
      } else {
        alert("데이터를 갱신할 수 없습니다.");
      }
    } else {
      alert("삭제 실패");
    }
  };

  return (
    <div>
      <div className="topIndex">
        <FaAsterisk className="star" />
        협약서
        <select
          className="criteria2"
          value={selectedAgreementId || ""}
          onChange={handleAgreementChange}
        >
          {contracts.map((contract) => (
            <option key={contract.contractId} value={contract.contractId}>
              {contract.contractName}
            </option>
          ))}
        </select>
        <input
          type="month"
          className="criteria2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={getMaxSelectableMonth()} // 현재 달의 이전 달까지만 선택 가능
        />
      </div>

      <div className="eContainer">
        <div className="eSection">
          <h2 className="eSectionTitle">미계산</h2>
          <div className="tableList">
            {data.unCalculatedStatistics.map((item, index) => (
              <div
                className={`eCard ${index % 2 === 0 ? "eOddRow" : "eEvenRow"}`}
                key={item.evaluationItemId}
              >
                <div className="eCardContent">
                  <div className="eCheckboxWrapper">
                    <input
                      type="checkbox"
                      checked={checkedItems[item.evaluationItemId] || false}
                      onChange={() =>
                        handleCheckboxChange(item.evaluationItemId)
                      }
                      className="eCheckbox"
                    />
                    <span className="eText">{item.category}</span>
                  </div>
                  {checkedItems[item.evaluationItemId] &&
                    item.category === "서비스 가동률" && (
                      <button
                        className="eMeasureButton"
                        onClick={async () => {
                          await handleEstimateClick({
                            evaluationItemId: item.evaluationItemId,
                            date: selectedDate,
                          });
                          await handleMeasureClick(
                            selectedAgreementId,
                            selectedDate
                          );
                        }}
                      >
                        측정하기
                      </button>
                    )}
                  {checkedItems[item.evaluationItemId] &&
                    item.category === "서비스요청 적기처리율" && (
                      <button
                        className="eMeasureButton"
                        onClick={async () => {
                          await handleEstimateServiceClick({
                            evaluationItemId: item.evaluationItemId,
                            date: selectedDate,
                          });
                          await handleMeasureClick(
                            selectedAgreementId,
                            selectedDate
                          );
                        }}
                      >
                        측정하기
                      </button>
                    )}
                  {checkedItems[item.evaluationItemId] &&
                    item.category === "장애 적기처리율" && (
                      <button
                        className="eMeasureButton"
                        onClick={async () => {
                          await handleEstimateIncidentClick({
                            evaluationItemId: item.evaluationItemId,
                            date: selectedDate,
                          });
                          await handleMeasureClick(
                            selectedAgreementId,
                            selectedDate
                          );
                        }}
                      >
                        측정하기
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="eContainer">
        <h2 className="eSectionTitle">계산 완료</h2>
        {data.calculatedStatistics.length > 0 ? (
          <div className="tableList">
            <IndicatorTable
              initialData={data.calculatedStatistics}
              handleDetail={handleDetailClick}
              handleDeleteStatistics={handleDeleteStatistics}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EstimateIndicator;
