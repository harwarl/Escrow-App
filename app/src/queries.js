import axios from "axios";
import { queryClient } from ".";
const api_url = "https://escrow-server-4xle.onrender.com";

// const axiosInstance = axios.create({
//   baseUrl: api_url,
//   timeout: 1000,
// });

//Get all the contracts
export const getContracts = () => {
  return {
    queryKey: ["contracts"],
    queryFn: async () => {
      const response = await axios.get(`${api_url}/contracts`);
      return response.data.contracts;
    },
  };
};

//Add a new contract to the database
export const postContract = () => {
  return {
    mutationFn: async (newContract) => {
      const contract = await axios.post(`${api_url}/contracts`, newContract);
      return contract;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contracts"]);
    },
  };
};

//update the approval status of a project
export const updateContract = () => {
  return {
    mutationFn: async ({ contractId, status, refunded }) => {
      let adjustObject = {};
      if (status) {
        adjustObject.status = true;
      }
      if (refunded) {
        adjustObject.refunded = true;
      }
      return await axios.patch(
        `${api_url}/contracts/${contractId}`,
        adjustObject
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["contracts"]);
    },
  };
};
