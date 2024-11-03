import React, { useState } from "react";
import "./GradeInputTable.css";
import { CgMenuGridO } from "react-icons/cg";
import { FaPlus } from "react-icons/fa6";

const GradeInputTable = ({ initialData, onDataChange }) => {
  const [data, setData] = useState(initialData || []);
  const [minInclusive, setMinInclusive] = useState(
    initialData.length === 0 ? true : initialData[0].minInclusive
  );
  const [maxInclusive, setMaxInclusive] = useState(
    initialData.length === 0 ? false : initialData[0].maxInclusive
  );

  //span값 변경 및 모든 데이터 값 변경
  const handleMin = (value) => {
    const newValue = value === "true";
    setMinInclusive(newValue);
    const updateData = data.map((item) => ({
      ...item,
      minInclusive: newValue,
    }));
    setData(updateData);
    onDataChange(updateData);
  };

  const handleMax = (value) => {
    const newValue = value === "true";
    setMaxInclusive(newValue);
    const updateData = data.map((item) => ({
      ...item,
      maxInclusive: newValue,
    }));
    setData(updateData);
    onDataChange(updateData);
  };

  const addDataRow = () => {
    const updatedData = [
      ...data,
      {
        grade: "",
        min: "",
        max: "",
        minInclusive: minInclusive,
        maxInclusive: maxInclusive,
      },
    ];
    setData(updatedData);
  };

  const handleData = (index, field, value) => {
    const updateData = [...data];
    updateData[index] = {
      ...updateData[index],
      [field]: value,
    };
    setData(updateData);
    onDataChange(updateData);
  };

  const [showDeleteMenu, setShowDeleteMenu] = useState(
    Array(data.length).fill(false)
  );

  //삭제 메뉴 토글 함수
  const toggleDeleteMenu = (index) => {
    const updatedShowDeleteMenu = [...showDeleteMenu];
    updatedShowDeleteMenu[index] = !updatedShowDeleteMenu[index];
    setShowDeleteMenu(updatedShowDeleteMenu);
  };

  // 데이터 삭제 함수
  const deleteData = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
    onDataChange(updatedData);
    const updatedShowDeleteMenu = showDeleteMenu.filter((_, i) => i !== index);
    setShowDeleteMenu(updatedShowDeleteMenu);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th className="deleteCol"></th>
            <th> 서비스 수준 등급 </th>
            <th className="tableSelect">
              최소
              <select
                className="standardSelect"
                name="minStandard"
                value={minInclusive}
                onChange={(e) => handleMin(e.target.value)}
              >
                <option value="true">이상</option>
                <option value="false">초과</option>
              </select>
            </th>
            <th className="tableSelect">
              최대
              <select
                className="standardSelect"
                name="maxStandard"
                value={maxInclusive}
                onChange={(e) => handleMax(e.target.value)}
              >
                <option value="false">미만</option>
                <option value="true">이하</option>
              </select>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="deleteCol">
                <CgMenuGridO
                  className="inputDeleteIcon"
                  onClick={() => toggleDeleteMenu(index)}
                />
                {showDeleteMenu[index] && (
                  <button
                    className="deleteTableButton"
                    onClick={() => deleteData(index)}
                  >
                    삭제
                  </button>
                )}
              </td>
              <td>
                <input
                  type="text"
                  className="fullInput"
                  value={item.grade}
                  onChange={(e) => handleData(index, "grade", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  className="standardInput"
                  value={item.min}
                  onChange={(e) => handleData(index, "min", e.target.value)}
                />
                <span>{minInclusive ? "이상" : "초과"}</span>
              </td>
              <td>
                <input
                  type="number"
                  className="standardInput"
                  value={item.max}
                  onChange={(e) => handleData(index, "max", e.target.value)}
                />
                <span>{maxInclusive ? "이하" : "미만"}</span>
              </td>
            </tr>
          ))}
          <tr>
            <td className="deleteCol"></td>
            <td className="plusRow">
              <FaPlus className="plusIcon" onClick={addDataRow} />
              <span>새 평가 항목</span>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default GradeInputTable;