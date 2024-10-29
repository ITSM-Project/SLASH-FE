import React from "react";
import Dropdown from "./RequestDropdown";
import CheckBox from "../../common/CheckBox";

const RequestInfoForm = ({
  formState,
  updateFormState,
  taskTypes,
  systemTypes,
  equipmentOptions,
  taskDetailOptions,
  handleSystemChange,
  handleEquipmentChange,
}) => {
  const renderLabel = (label) => (
    <label>
      <span className="required">*</span> {label}
    </label>
  );

  const renderDropdown = (label, items, selectedItem, onSelect) => (
    <Dropdown
      items={items}
      label={selectedItem || `${label}`}
      onSelect={onSelect}
    />
  );

  return (
    <div className="requestInfoBox">
      <div className="requestHeader">
        <h3>요청 정보</h3>
        {formState.taskType === "장애 요청" && (
          <CheckBox
            id="serviceRelevanceCheckbox"
            label="서비스 제공 여부"
            checked={formState.isServiceRelevance}
            onChange={(checked) =>
              updateFormState("isServiceRelevance", checked)
            }
          />
        )}
      </div>

      <table className="requestTable">
        <tbody>
          <tr>
            <td>{renderLabel("시스템 유형")}</td>
            <td>
              {renderDropdown(
                "시스템",
                systemTypes,
                formState.selectedSystem,
                handleSystemChange
              )}
            </td>
            <td>{renderLabel("장비 유형")}</td>
            <td>
              {renderDropdown(
                "장비",
                equipmentOptions,
                formState.selectedEquipment,
                handleEquipmentChange
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="requestTable">
        <tbody>
          <tr>
            <td>{renderLabel("업무유형")}</td>
            <td>
              {renderDropdown(
                "업무",
                taskDetailOptions,
                formState.taskDetail,
                (value) => updateFormState("taskDetail", value)
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RequestInfoForm;
