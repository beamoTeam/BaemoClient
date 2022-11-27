import useLogout from "./useLogout"

export default function useUnAuthorized() {
  const logout = useLogout();

  return (err: any) => {
    if (err.response.status === 401) {
      alert("로그인이 만료되었습니다. 다시 로그인 해주세요");
      logout();
    }
  }
}
