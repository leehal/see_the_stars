import AxiosInstance from "./AxiosInstance";

const LOGO = "/party";

const PartyAxiosApi = {
  pnameList: async () => {
    return await AxiosInstance.get(LOGO + "/list");
  },
  partyCreate: async (nickList, pname1) => {
    console.log(nickList);
    console.log(pname1);

    const pSaveDto = {
      nick: nickList,
      pname: pname1,
    };
    return await AxiosInstance.post(LOGO + "/save", pSaveDto);
  },
  allUsers: async () => {
    return await AxiosInstance.get(LOGO + "/alluser");
  },
  calendarPno: async (pno) => {
    return await AxiosInstance.get(LOGO + `/calendar?pno=${pno}`);
  },
  pnoMemberList: async (pno) => {
    return await AxiosInstance.get(LOGO + `/pmember/${pno}`);
  },
  partyMemDibs: async (member) => {
    const list = {
      memberResDtos: member,
    };
    return await AxiosInstance.post(LOGO + `/memDibs`, list);
  },
  calendarCreate: async (pno, nick, date, fields) => {
    const save = {
      pno: pno,
      nick: nick,
      date: date,
      dtos: fields,
    };
    return await AxiosInstance.post(LOGO + "/csave", save);
  },
  oneDayView: async (pno, date) => {
    console.log(" 정보 " + pno + " " + date);
    return await AxiosInstance.get(LOGO + `/calendarOne/${pno}/${date}`);
  },
  updatePname: async (pno, pname) => {
    return await AxiosInstance.post(LOGO + `/pnameup/${pno}/${pname}`);
  },
  updateCos: async (cano, caddr, cacontent, cplace) => {
    const update = {
      cano: cano,
      caContent: cacontent,
      caddr: caddr,
      cplace: cplace,
    };
    return await AxiosInstance.post(LOGO + "/cosup", update);
  },
  cosOneSave: async (caddr, cacontent, pno, todate, cplace) => {
    const save = {
      caContent: cacontent,
      caddr: caddr,
      calenderPno: pno,
      caDate: todate,
      cplace: cplace,
    };
    return await AxiosInstance.post(LOGO + "/onesave", save);
  },
  cosDelete: async (cano) => {
    return await AxiosInstance.post(LOGO + `/cosdelete/${cano}`);
  },
  partyMemberAdd: async (pno, nickList) => {
    const dto = {
      nick: nickList,
      pno: pno,
    };
    return await AxiosInstance.post(LOGO + `/pmemup`, dto);
  },
  deletepno: async (pno) => {
    return await AxiosInstance.post(LOGO + `/pout/${pno}`);
  },
};
export default PartyAxiosApi;
