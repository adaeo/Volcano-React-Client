import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = "http://sefdb02.qut.edu.au:3001";

export default function Volcano(props) {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [volcanoData, setVolcanoData] = useState(null);

  useEffect(() => {
    (async () => {
      // console.log(props.token);
      const url = `${API_URL}/volcano/${id}`;

      const headers = {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.cookies.token}`,
        },
      };

      let res = props.cookies.token ? await fetch(url, headers) : await fetch(url);
      let data = await res.json();
      console.log(data);
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="containerType">
      <h3>
        {props.cookies.token ? `${id} and ${props.cookies.token}` : `${id}`}
      </h3>
    </div>
  );
}
