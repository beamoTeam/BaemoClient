import { useHistory } from "react-router-dom";

export function useNavigate() {
  const history = useHistory();

  const navigate = (url: string, props = { replace: false }) => {
    const { replace } = props;

    if (replace) {
      history.replace(url);
    } else {
      history.push(url);
    }
  };

  return navigate;
}
