import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";

export const fetchContractInfo = async (contractId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`/common/contract/${contractId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);

    if (response.data.success) {
      console.log(response);

      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(
      "ERROR: ",
      error.response ? error.response.data : error.message
    );
  }
};

export const fetchAllContractName = async () => {
  try {
    const token = localStorage.getItem("accessToken"); // 토큰 가져오기

    const response = await axios.get("/common/all-contract-name", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      console.log(response.data.data);

      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
  }
};

export const fetchServiceInfo = async (evaluationItemId) => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`/common/detail/${evaluationItemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success) {
      console.log(response.data.data);

      return response.data.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("ERROR: ", error.response.data);
  }
};