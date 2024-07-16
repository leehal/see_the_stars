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
};
export default TravelAxiosApi;
