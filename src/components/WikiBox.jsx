import { useEffect, useState } from "react";
import { Container } from "reactstrap";

const wikiURL = "https://en.wikipedia.org/w/api.php?origin=*";

export default function WikiBox(props) {
  const [volcanoExtract, setVolcanoExtract] = useState(null);
  const [articleLink, setArticleLink] = useState(null);

  function ArticleLink(props) {
    if (props.link) {
      return (
        <a href={props.link} target="_blank" rel="noreferrer noopener">
          [Wikipedia Link]
        </a>
      );
    }
  }

  async function getWikiTitle(volcano) {
    let searchURL = wikiURL;

    let searchQuery = volcano.name.includes("Volcan")
      ? `${volcano.name}`
      : `${volcano.name}%20volcano%20${volcano.country}}`;

    // Very specific edge case due to Wikipedia search
    if (volcano.country === "DR Congo") {
      searchQuery = `${volcano.name}%20volcano%20$Congo`;
    }
    if (volcano.country === "Undersea") {
      return [null, null];
    }

    const params = {
      action: "query",
      list: "search",
      format: "json",
      utf8: "1",
      srlimit: "2",
      srsearch: searchQuery,
    };

    Object.keys(params).forEach((key) => {
      searchURL += "&" + key + "=" + params[key];
    }); // Build URL

    let res = await fetch(searchURL, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    console.log(data);
    let search = await data.query.search[0];
    if (data.query.search.length > 1) {
      if (search.title.includes("List of volcanoes")) {
        search = await data.query.search[1];
      }
    } else {
      return [null, null];
    }

    return await [search.title, search.pageid];
  }

  async function getWikiExtract(title, pageid) {
    if (!title || !pageid) {
      return "Couldn't find a Wikipedia article!";
    }

    let extractURL = wikiURL;

    const params = {
      action: "query",
      prop: "extracts",
      exsentences: "15",
      exlimit: "1",
      exintro: "1",
      titles: title,
      explaintext: "1",
      format: "json",
    };

    Object.keys(params).forEach((key) => {
      extractURL += "&" + key + "=" + params[key];
    }); // Build URL

    let res = await fetch(extractURL, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    let extract = await data.query.pages[pageid].extract;
    return extract;
  }

  useEffect(() => {
    (async () => {
      const [title, pageid] = await getWikiTitle(props.volcano);
      const extract = await getWikiExtract(title, pageid);
      if (title) {
        setArticleLink(`https://en.wikipedia.org/wiki/${title}`);
      }
      setVolcanoExtract(extract);
    })();
    // eslint-disable-next-line
  }, []);

  if (volcanoExtract) {
    return (
      <Container className="container-type wiki-box">
        <h3>Summary</h3>
        <p>
          {`${volcanoExtract} `} <ArticleLink link={articleLink} />
        </p>
      </Container>
    );
  } else {
    return (
      <Container className="container-type wiki-box">
        <h2>Fetching Wikipedia Article...Please Wait...</h2>
      </Container>
    );
  }
}
