import axios from "axios";

const LOGO = "/travel";

const TravelAxiosApi = {
  travelList: async (page, category, city, name) => {
    const travels = {
      page: page,
      category: category,
      city: city,
      name: name,
    };
    return await axios.post(LOGO + `/travellist`, travels);
  },
  travel: async (tno) => {
    return await axios.get(LOGO + `/travel?tno=${tno}`);
  },
};
export default TravelAxiosApi;
