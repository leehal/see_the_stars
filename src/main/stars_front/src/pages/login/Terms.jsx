import { useState } from "react";
import styled from "styled-components";
import { GoCheckCircle, GoCheckCircleFill } from "react-icons/go";

const TermBox = styled.div`
  overflow-y: scroll;
  border: 3px solid black;
  padding: 10px;
  width: 300px;
  height: 100px;
`;

const Div = styled.div`
  display: flex;
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  justify-content: flex-start;
  align-content: center;
  gap: 5px;
  label {
    cursor: pointer;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  width: 110px;
  height: 40px;
  font-size: 25px;
  color: #000;
  background: linear-gradient(to bottom, #f0f0f0, #dcdcdc);
  border: 2px solid #fff;
  border-top-color: #ccc;
  border-left-color: #ccc;
  border-right-color: #333;
  border-bottom-color: #333;
  padding-top: 8px;
  box-shadow: 1px 1px 0 0 #000;
  cursor: pointer;
  outline: none;
  &:active {
    border-top-color: #333;
    border-left-color: #333;
    border-right-color: #ccc;
    border-bottom-color: #ccc;
    background: linear-gradient(to bottom, #dcdcdc, #f0f0f0);
  }
`;

const Terms = ({ setIsAgree }) => {
  const [checkedItems, setCheckedItems] = useState({
    all: false,
    essential1: false,
    essential2: false,
  });

  const onChangeAll = (e) => {
    const { checked } = e.target;
    setCheckedItems({
      all: checked,
      essential1: checked,
      essential2: checked,
    });
  };

  const onChangeCheck = (e) => {
    const { id, checked } = e.target;
    setCheckedItems((prev) => {
      const updatedItems = {
        ...prev,
        [id]: checked,
      };

      const allChecked = updatedItems.essential1 && updatedItems.essential2;
      return {
        ...updatedItems,
        all: allChecked,
      };
    });
  };

  return (
    <>
      <Div>
        <label for="all">
          {checkedItems.all ? <GoCheckCircleFill /> : <GoCheckCircle />}
        </label>
        <input
          type="checkbox"
          id="all"
          checked={checkedItems.all}
          onChange={onChangeAll}
          hidden
        />
        <label for="all">전체 동의하기</label>
      </Div>
      <Div>
        <label for="essential1">
          {checkedItems.essential1 ? <GoCheckCircleFill /> : <GoCheckCircle />}
        </label>
        <input
          type="checkbox"
          id="essential1"
          checked={checkedItems.essential1}
          onChange={onChangeCheck}
          hidden
        />
        <label for="essential1">[필수] 서비스 이용약관 동의</label>
      </Div>
      <TermBox>
        제1장 총칙 제1조 목적 본 약관은 행정안전부가 공공데이터 포털(이하
        “포털”)에서 제공하는 모든 서비스(이하 “서비스”)의 이용조건 및 절차,
        회원·제공기관·공공데이터활용지원센터(이하 “센터”)의 권리, 의무,
        책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다. 제2조 용어의
        정의 본 약관에서 사용하는 용어의 정의는 다음과 같습니다. ① “포털”이란
        행정안전부가 공공데이터법 제21조에 따라 공공데이터의 효율적 제공을
        위하여 구축·관리하는 공공데이터 통합제공시스템을 의미합니다. ②
        “목록등록관리시스템”이란 행정안전부가 공공데이터법 제18조에 따라
        공공데이터의 체계적 관리 등을 위하여 구축·운영하는 공공데이터
        업무시스템을 의미합니다. ③ “회원”이란 “일반회원”, “기업회원”, “기관회원”
        모두를 지칭합니다. ④ “일반회원”이란 “포털”의 회원가입절차에 따라
        이용약관에 동의하고 가입을 완료한 개인 또는 법인으로서 “포털”이 제공하는
        서비스를 이용할 수 있는 자를 의미합니다. ⑤ “기업회원”이란 “포털”의
        회원가입절차에 따라 기업 또는 단체를 대리하여 그 소속 직원이 이용약관에
        동의하고 가입을 완료한 기업 또는 단체로서 “포털”이 제공하는 서비스를
        이용할 수 있는 자를 의미합니다. ⑥ “기관회원”이란 “일반회원”과 “기업회원”
        중 “기관회원”으로 전환신청을 완료했거나, “목록등록관리시스템”의
        회원가입절차에 따라 “공공기관”을 대리하여 그 소속 직원이 이용약관에
        동의하고 가입을 완료한 공공기관으로서 “포털”이 제공하는 서비스를 이용할
        수 있는 자를 의미합니다. ⑦ “공공기관”이란 공공데이터법 제2조제1호에 따른
        공공기관을 의미합니다. ⑧ “제공기관”이란 “포털”을 통해 공공데이터를 제공
        중인 “공공기관”을 의미합니다. ⑨ “센터”란 공공데이터법 제13조에 따라
        “포털”의 구축·관리 및 활용 촉진의 업무 등 공공데이터와 관련된 업무를
        수행하는 한국지능정보사회진흥원에 설치된 공공데이터활용지원센터를
        의미합니다. ⑩ 본 약관에서 정의하지 않은 용어는 관련 법령 및 서비스
        안내에서 정의하거나 일반적인 개념에 의합니다. 제3조 약관의 효력과 변경 ①
        센터는 회원이 본 약관의 내용을 쉽게 알 수 있도록 포털에 게시하거나
        기타의 방법으로 공지하고, 본 약관에 동의한 회원 모두에게 그 효력이
        발생합니다. ② 센터는 필요한 경우 관련 법령을 위배하지 않는 범위에서 본
        약관을 변경할 수 있습니다. 본 약관을 변경할 경우 시행일자 7일 전까지
        변경사항을 명시하여 포털에 공지하며, 회원이 가입 시 제공한 이메일 주소로
        통지합니다. 다만, 오탈자 등 경미한 자구 수정이나 명백한 오류를 바로잡는
        변경은 예외로 합니다. ③ 약관 변경 공지 후 회원이 변경된 약관에 동의하지
        않는 경우 이용계약을 해지(회원탈퇴)할 수 있습니다. 회원이 명시적으로
        약관 변경에 대한 거부의사를 표시하지 아니하면, 변경된 약관에 동의한
        것으로 간주합니다. 제4조 약관외 준칙 본 약관에 규정되지 않은 사항은
        공공데이터법, 개인정보보호법, 저작권법, 약관규제법, 정보통신망법 등
        관계법령과 개인정보처리방침 및 행정안전부가 별도로 정한 지침에 따르며,
        법령 및 지침에 정하는 바가 없는 경우에는 일반 관례에 따릅니다. 제2장
        이용조건 및 절차 제5조 이용 계약의 성립 및 제한 ① 이용 계약은 회원이
        되고자 하는 이용자(이하 “신청자”)가 온라인으로 포털에서 제공하는 소정의
        회원가입 신청 양식에서 요구하는 사항을 기록한 본 약관 및 개인정보의
        수집·이용에 동의하고 센터가 신청자의 회원가입 신청에 대하여 승인함으로써
        성립합니다. ② 신청자가 회원가입 시 일반회원, 기업회원, 기관회원의 가입
        절차를 이해하여 각 가입 화면 중 “동의함”버튼을 클릭하면 본 약관을 충분히
        읽고 동의하여 회원가입하는 것으로 간주됩니다. ③ 본 약관 제2조 제7항의
        공공기관은 법인으로 회원가입 후 본 약관 제2조 제8항에 따른 제공기관으로
        전환이 가능합니다. ④ 센터는 다음 각 호에 해당하는 이용계약에 대하여는
        회원가입에 대한 승낙을 하지 않거나, 회원가입을 해지할 수 있습니다.    
        1. 다른 사람의 명의를 사용하여 신청하였을 때     2. 회원 가입 신청서의
        내용을 허위로 기재 또는 허위의 자료를 제출하였거나 기타 센터가 정한
        이용신청요건이 미비되었을 때     3. 포털을 이용하여 법령과 본 약관이
        금지하는 행위를 하였거나 사회의 안녕 질서 혹은 미풍양속을 저해할
        목적으로 신청하였을 때     4. 다른 사람의 포털 서비스 이용을 방해하거나
        그 정보를 도용하는 행위를 하였을 때     5. 서비스 부정이용 행위에 대한
        제재조치를 취하기 전 이를 회피하기 위해 탈퇴한 사실이 존재하였을 때    
        6. 센터가 회원의 본 약관 위반 등 귀책사유로 이용계약을 해지하였던 회원이
        재가입을 신청하는 경우     7. 기업회원의 경우, 소속 기업 및 담당자의
        직위가 확인되지 않거나 퇴사하는 경우     8. 기타 센터가 정한 제공기관의
        공유정책 및 업무처리 기준에 위배되었을 때 ⑤ 회원가입 후 위 제4항 각 호의
        사실이 밝혀진 경우, 센터는 이용계약의 해지, 해당회원 ID를 삭제하거나
        회원을 강제탈퇴 조치하며, 필요할 경우 관계법령에 따른 형사처벌이나
        행정제재를 위한 법률절차를 진행할 수 있습니다. ⑥ 센터는 다음 각 호에
        해당하는 경우에 그 사유가 해소가 되는 경우까지 회원가입에 대한 승낙을
        유보할 수 있습니다.     1. 기술상의 장애사유로 인한 서비스 중단     2.
        전기통신사업법에 의한 기간통신사업자가 전기통신 서비스를 중지하는 경우  
          3. 전시, 사변, 천재지변 또는 이에 준하는 국가 비상상태가 발생거나
        발생할 우려가 있는 경우     4. 긴급한 설비의 장애 또는 서비스 이용의
        폭주 등 기타 서비스를 제공할 수 없는 사유가 발생한 경우 ⑦ 회원이
        이용계약을 해지하고자 하는 때(회원탈퇴)에는 회원 본인이 포털에서
        회원탈퇴를 신청할 수 있으며, 센터는 즉시 회원탈퇴 처리를 합니다.
        회원탈퇴로 인해 발생하는 불이익에 대한 책임은 회원 본인에게 있습니다.
        제6조 회원정보 사용에 대한 동의 ① 회원의 개인정보는 개인정보보호법 등
        관련 법령에 의해 보호됩니다. ② 회원정보는 다음과 같이 이용, 관리,
        보호됩니다.     1. 개인정보의 이용 : 센터는 회원의 개인정보를 본인의
        동의 없이 이용하거나 제3자에게 제공하지 않습니다. 단, 관련 법률의 규정에
        의해 허용되는 경우에는 예외로 합니다.     2. 개인정보의 관리 : 회원은
        개인정보의 보호 및 관리를 위하여 포털 서비스의 개인정보관리 기능을 통해
        수시로 개인정보를 수정·삭제할 수 있습니다.     3. 개인정보의 보호 :
        회원의 개인정보는 전적으로 회원의 ID와 비밀번호에 의해 관리하고 오직
        회원만이 열람 수정 및 삭제할 수 있습니다. 따라서 타인에게 회원의 ID와
        비밀번호를 알려주어서는 안되며 이용 종료 시에는 반드시 접속을 종료해야
        합니다.     4. 개인정보의 폐기 : 회원 탈퇴 시 센터는 포털에 등록된
        회원정보를 즉시 폐기합니다. 제7조 회원의 정보 보안 ① 회원이 포털의
        회원가입 절차를 완료하는 순간부터 회원은 ID와 비밀번호 등 관련 정보를
        안전하게 관리할 책임이 있으며, 자신의 정보 및 계정(ID, 비밀번호 등) 등을
        타인에게 제공하여서는 아니 되고, 해당 책임을 다하지 않음으로써 발생하는
        결과에 대한 모든 책임은 회원이 부담합니다. ② 회원은 자신의 ID나
        비밀번호가 부정하게 사용되었다는 사실을 발견한 경우 즉시 센터에
        신고하여야 합니다. 신고를 하지 않음으로 인해 발생한 결과에 대한 모든
        책임은 회원이 부담합니다. ③ 회원은 포털 서비스를 정상적으로 종료하지
        아니하여 제3자가 회원에 관한 정보를 이용하게 되는 등의 결과가 발생하는
        경우 관련 손해 등 법적 문제에 대하여 센터는 책임을 지지 않습니다. 제8조
        포털 서비스의 이용시간 ① 포털 서비스 이용시간은 센터의 업무상 또는
        기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다. ②
        센터는 제1항의 이용시간에도 불구하고 정기점검 등 포털의 원활한 운영을
        위해 필요하다고 판단되는 경우 포털에 미리 공지 후 서비스 이용을 제한할
        수 있습니다. 제9조 포털 서비스의 중단 ① 센터는 국가비상사태, 정전,
        설비장애, 기타 불가항력에 의한 사유로 포털 서비스의 원활한 제공이
        어렵다고 판단되는 경우, 관련 법령에 근거하여 업무절차나 시스템의 개선이
        필요한 경우, 기타 포털 서비스의 계속적 제공이 어려운 경우 포털 서비스를
        일시적 또는 영구적으로 중단할 수 있으며, 영구적 중단의 경우 3개월전
        회원에게 공지하여야 합니다. ② 센터는 포털서비스의 원활한 운영을 위하여
        필요하다고 판단되는 경우 사전 고지 후 서비스를 일시적으로 수정, 변경 및
        중단할 수 있습니다. 제10조 게시물의 관리 센터는 포털의 원활한 운영을
        위하여 다음 각 호의 경우 회원이 게시한 글, 사진, 동영상 및 각종 파일,
        링크 등 일체의 정보(이하 “게시물”)를 사전 통지 없이 삭제할 수 있습니다.
            1. 본 서비스 약관에 위배되거나 상용 또는 불법, 음란, 저속하다고
        판단되는 게시물을 게시한 경우     2. 다른 회원 또는 제3자를 비방하거나
        중상모략으로 명예를 손상시키는 내용인 경우     3. 공공질서 및 미풍양속에
        위반되는 내용인 경우     4. 범죄적 행위에 결부된다고 인정되는 내용일
        경우     5. 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우     6.
        기타 관계 법령에 위배되는 경우 제11조 서비스의 이용제한 ① 회원이
        제공하는 정보의 내용이 허위인 것으로 판명되거나, 그러하다고 의심할 만한
        합리적인 사유가 발생할 경우 센터는 회원의 서비스 이용을 일부 또는 전부
        중지할 수 있으며, 센터는 이로 인해 센터의 고의 또는 중대한 과실 없이
        회원 및 제3자에게 발생하는 불이익에 대해 책임을 부담하지 아니합니다. ②
        센터는 회원이 본 약관을 위배했다고 판단될 경우 서비스의 이용을 제한할 수
        있으며, 해당 이용제한으로 인해 발생한 손해에 대해 책임을 지지 않습니다
        제3장 권리·의무 및 책임 제12조 회원 ① 회원이 포털 서비스를 이용함에
        있어서 작성한 게시물에 대한 저작권 등 법령상 보호되는 권리는 회원에게
        귀속됩니다. ② 회원은 게시물 작성 시 타인의 저작권 등 관련 법령에
        위반되는 정보가 포함되지 않도록 주의하여야 하며, 이와 관련하여 발생하는
        민, 형사상의 책임은 회원이 부담하여야 합니다. ③ 회원 가입 시에 요구되는
        정보는 정확하게 기입하여야 합니다. 또한 이미 제공된 회원에 대한 정보가
        정확한 정보가 되도록 유지, 갱신하여야 합니다. ④ 회원은 포털 서비스
        이용과 관련하여 다음 각 호의 행위를 하여서는 안됩니다.     1. 자신의 ID
        및 비밀번호를 제3자에게 이용하게 하거나 다른 회원의 ID를 부정 사용하는
        행위     2. 회원정보 또는 포털에 게시된 정보를 허위로 변경하는 행위    
        3. 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위     4. 선량한
        풍속, 기타 사회질서를 해하는 행위     5. 타인의 명예를 훼손하거나
        모욕하는 행위     6. 타인의 지식재산권 등의 권리를 침해하는 행위     7.
        해킹 또는 유사 프로그램을 실행하거나 정상적인 운영을 방해하는 행위(예:
        해킹 또는 바이러스의 유포행위, 디도스 공격 등)     8. 광고성 정보 등
        포털 서비스와 무관한 정보를 지속적으로 게시하는 행위     9. 기타
        서비스의 안정적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위 ⑤ 본
        조 제4항에 해당하는 행위를 한 회원에 대하여 센터는 다음 각 호의 조치를
        취할 수 있습니다. 다만, 센터가 취할 수 있는 조치는 아래 각 호에 한정되지
        아니하며, 회사가 조치를 취할 수 있는 회원의 행위 역시 본 조 제4항의
        경우에 한정되지 않습니다.     1. 특정 서비스 이용 제한     2. 이용계약
        해지     3. 손해배상청구 제13조 센터 ① 센터는 공공데이터법 등 포털
        서비스의 근거 법령에 따라 적법하게 관련 업무를 수행하여야 하며, 지속적,
        안정적으로 서비스를 제공하기 위해 노력할 의무가 있습니다. ② 센터는
        회원의 개인정보를 본인의 동의 없이 이용하거나 타인에게 제공하지
        않습니다. 다만, 개인정보보호법 등 관련 법령에 의하여 허용되는 경우에는
        예외로 합니다. ③ 센터는 회원이 안전하게 포털 서비스를 이용할 수 있도록
        회원의 개인정보를 보호해야 합니다. ④ 센터는 회원의 귀책사유로 인한
        서비스 이용 장애에 대하여 책임을 지지 않습니다. 제14조 제공기관 ①
        제공기관은 보유·관리하는 공공데이터가 공공데이터법 제17조에 따른
        제공대상에 해당하는 경우, 관련 절차에 따라 제공목록을 등록하고 해당
        데이터를 포털에 등록하여야 합니다. ② 제공기관은 회원이 제공목록에
        등록되지 않은 공공데이터를 공공데이터법 제27조에 따라 제공신청할 경우
        법률에 규정된 절차 및 기준을 준수하여 제공여부를 결정해야 하며,
        공공데이터 제공 여부를 결정한 때에는 지체없이 결정 내용을 회원에게
        알려야 합니다. ③ 제공기관은 포털에서 제공하는 공공데이터를 현행화하여
        제공하고, 회원이 신고한 공공데이터 등록 누락, 오류신고, 이용불편사항
        등에 대해서 조치를 취해야 합니다. ④ 제공기관은 다음 각 호에 해당할 경우
        공공데이터의 제공을 중단할 수 있습니다.     1. 이용자가 공공데이터 제공
        시 공표된 이용요건을 위반하여 공공기관 본래의 업무수행에 상당한 지장을
        초래할 우려가 있는 경우     2. 공공데이터의 이용이 제3자의 권리를
        현저하게 침해하는 경우     3. 공공데이터를 범죄 등의 불법행위에 악용하는
        경우     4. 공공데이터법 제20조에 따라 제공기관이 행정안전부장관에게
        공공데이터 목록의 제외를 요청한 경우     5. 그 밖에 공공데이터법
        제29조에 따라 공공데이터분쟁조정위원회가 정하는 경우 ⑤ 오픈 API 방식으로
        제공되는 공공데이터의 이용과 관련하여, 제공기관은 특정 회원의 이용형태로
        인해 제공기관의 업무에 지장을 초래하거나 제공시스템의 성능 저하 등의
        문제가 발생할 경우 서비스 이용을 제한할 수 있습니다. 제4장 기타 제15조
        포털 서비스에 대한 지식재산권 ① 포털 서비스에 대한 지식재산권은
        원칙적으로 센터에 귀속됩니다. 다만 계약 등 달리 정함이 있는 경우
        그러하지 않습니다. ② 포털 자료실 메뉴에 게시된 정보는 공공데이터
        제공결정을 통한 것이 아니며, 공공기관 및 제3자의 지식재산이 포함될 수
        있습니다. 따라서 이용 시 관련 권리가 침해되지 않도록 유의하여야 합니다.
        ③ 회원은 센터의 명시적인 사전 승인 없이 포털 서비스에 대한 지식재산을
        이용하거나 제3자로 하여금 이용하게 해서는 안됩니다. 제16조 면책조항 ①
        제공기관은 공공데이터의 제공과 관련하여 공공데이터의 품질, 공공데이터의
        제공중단 등 공공데이터법 제36조에서 규정하는 사유로 이용자 또는
        제3자에게 손해가 발생한 경우 그에 대한 책임을 지지 않습니다. ②
        공공데이터법 제36조제3항에 따라 이용자는 제3자의 권리가 포함된
        공공데이터가 제공된 경우 이를 이용하였더라도 진정한 권리자에게 발생한
        손해에 대하여 책임을 지지 않습니다. 다만 제3자의 권리가 포함된 사실을
        인지하고 이용한 경우는 제외됩니다. ③ 센터는 제9조에 따라 서비스가
        중지되는 등의 사유로 회원의 포털 서비스 이용과 관련하여 회원 또는
        제3자에게 손해가 발생하더라도 책임을 지지 않습니다. 다만 해당 손해가
        센터의 고의 또는 중과실, 범죄행위 등으로 인해 발생한 경우에는 예외로
        합니다. 제17조 관할법원 ① 포털과 회원 간에 발생한 서비스 이용에 관한
        분쟁에 대하여는 대한민국 법을 적용하며, 본 분쟁으로 인한 소는
        민사소송법에 따른 관할 법원에 제기합니다. 부칙 본 약관은 2023년 6월
        8일부터 시행됩니다.
      </TermBox>
      <Div>
        <label for="essential2">
          {checkedItems.essential2 ? <GoCheckCircleFill /> : <GoCheckCircle />}
        </label>
        <input
          type="checkbox"
          id="essential2"
          checked={checkedItems.essential2}
          onChange={onChangeCheck}
          hidden
        />
        <label for="essential2">[필수] 개인정보 수집 및 이용 동의</label>
      </Div>
      <TermBox>
        제1조(개인정보의 처리목적) ① 행정안전부가 개인정보 보호법 제32조에 따라
        등록․공개하는 개인정보파일의 처리목적은 다음과 같습니다.   1. 개인정보
        파일명 : 공공데이터포털회원정보 개인정보의 처리목적 수집방법 보유근거
        보유기간 관련법령 공공데이터포털 이용 및 공공데이터 활용 관리,
        공공데이터 정책 반영, 공공데이터 제공 운영실태 평가 수행 등의 목적
        공공데이터포털 누리집 개인정보 보호법 제15조제1항, 제39조의6제1항
        탈퇴시까지 공공데이터법 제9조, 제14조, 제21조제3항, 동법 시행령 제10조,
        제14조의2제1항, 제16조제4항   2. 개인정보 파일명 : 공공데이터포털
        데이터제공요청 신청자정보 개인정보의 처리목적 수집방법 보유근거 보유기간
        관련법령 공공데이터 제공신청 접수 및 처리 공공데이터포털 누리집
        공공기록물법 시행령 제26조제1항 10년 공공데이터법 제27조제1항, 동법
        시행령 제21조, 동법 시행규칙 별지 제9호서식   3. 개인정보 파일명 :
        공공데이터 제공분쟁조정 신청자정보 개인정보의 처리목적 수집방법 보유근거
        보유기간 관련법령 공공데이터 제공 관련 분쟁조정 신청 및 처리, 공공데이터
        정책 반영 공공데이터포털 누리집 공공기록물법 시행령 제26조제1항 5년
        공공데이터법 제31조제2항, 동법 시행규칙 제10조 제2조(처리하는 개인정보의
        항목) ① 행정안전부는 다음의 개인정보 항목을 처리하고 있습니다.   1.
        공공데이터포털회원정보 일반회원 기업회원 기관회원 필수항목 성명, 아이디,
        비밀번호, 이메일, 휴대폰번호 성명, 기업명, 아이디, 비밀번호, 이메일,
        휴대폰번호, 기업 대표자명 성명, 아이디, 비밀번호, 이메일, 휴대폰번호,
        인증서등록, 사용자기관/업종분류, 기관명, 전화번호, 소속부서명 선택항목
        전화번호 전화번호 -   2. 공공데이터포털 데이터제공요청 신청자정보
        필수항목 선택항목 성명, 생년월일, 주소, 전화번호, 이메일 사업자 (법인,
        단체 등록번호)   3. 공공데이터 제공분쟁조정 신청자정보 필수항목 선택항목
        성명, 생년월일, 주소, 전화번호, 이메일 사업자 (법인, 단체 등록번호)
        개인정보 수집 및 이용에 동의하지 않을 시에 회원가입이 되지 않습니다.
        개인정보 제3자 제공 동의 동의 제3조(개인정보의 제3자 제공에 관한 사항)  
        ① 행정안전부는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서
        명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등
        ｢개인정보 보호법｣ 제17조 및 제18조에 해당하는 경우에만 개인정보를
        제3자에게 제공합니다.   ② 행정안전부는다음과 같이 개인정보를 제3자에게
        제공하고 있습니다. 제공받는 자 제공목적 제공항목 보유 및 이용기간
        관련근거 공공데이터를 제공하는 공공기관 공공데이터 활용 처리, 개선·개발,
        오류접수·수정, 문의응대 등 관리 성명(단체명 및 대표자 성명), 아이디,
        휴대폰번호, 이메일 2년 공공데이터법 제26조 개인정보 수집 및 이용에
        동의하지 않을 시에 회원가입이 되지 않습니다.
      </TermBox>
      <Button
        disabled={!(checkedItems.essential1 & checkedItems.essential2)}
        onClick={() => setIsAgree(true)}
      >
        다음
      </Button>
    </>
  );
};
export default Terms;
