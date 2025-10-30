import { MODEL_STATES } from '@/constants/modelStates';

export const commonUtils = {

  /**
     * @description 모델 state 에 맞는 상태이름 리턴 함수
     * @param state
     */
  getStateName: (state:string | undefined) => {
    switch (state) {
      case MODEL_STATES.PROJECT:
        return 'Project';
      case MODEL_STATES.STAGING:
        return 'Staging';
      case MODEL_STATES.OPERATING:
        return 'Operation';
      default:
        return '';
    }
  },

  /**
     * @description number 타입 체크
     * @param value
     */
  isValidNum: (value:string) => /^\d*\.?\d*$/.test(value),

  /**
     * @description 문자열 공백 체크
     * @param value
     */
  isBlank: (value:string) => value.length < 1,

  /**
     * @description SelectBox 값 설정됐는지 체크
     * @param value
     */
  isValidSel: (value:string) => Number(value) > 0,

  /**
     * @description gitLab repo 주소 validation 체크
     * @param value
     */
  isValidSurroLink: (value:string) => /^https:\/\/gitlab\.surromind\.ai\/[^\s]*$/.test(value),
};
