## 모달이 좀 복잡함

1. `ModalPortal`안에 `ModalContainer`가 모달을 감싸고 있음.

2. 일반 모달, 시트 모달 등 여러 형태의 모달이 있기 때문에 `Portal`로 감싸고
Container의 Children으로 모달을 넘겨주는 형식.

3. 모달은 전역 상태로 관리하며, setter함수에 모달 컴포넌트 자체를 넘겨 렌더링


** 초기에 클릭해도 모달이 안열리는 버그 있음

모달이 열리는 조건 
1. modalState === true, ( 여기는 문제없이 잘 바뀜. )
2. 모달을 제어하는 dom에 event fire
