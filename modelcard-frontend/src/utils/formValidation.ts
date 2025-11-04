export const formValidation = {
  validationErrorMsg: (formName: string, state = '') => {
    switch (formName) {
      case 'name':
        return '모델명을 입력해주세요.';
      case 'description':
        return '한 줄 설명을 입력해주세요.';
      case 'performance_score':
        return '성능 값을 숫자로 입력해주세요.';
      case 'performance_metric':
        return '지표 값을 입력해주세요.';
      case 'size':
        return 'Weight 모델 파일의 크기(Byte 기준)를 숫자로 입력하세요.';
      case 'model_type_id':
        return '분야를 선택해주세요.';
      case 'task_id':
        return 'Task를 선택해주세요.';
      case 'framework_id':
        return 'framework를 선택해주세요.';
      case 'license_id':
        return 'license를 선택해주세요.';
      case 'git_url':
        return `${state} Repository github 링크를 첨부해주세요.`;
      default:
        return '필수 값을 입력해주세요.';
    }
  },
};
