import axios from "axios";

const fetchCheatingRecords = async () => {
  try {
    const response = await axios.get("/api/cheatings"); 
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchCheatingRecords;
