import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://sefdb02.qut.edu.au:3001";

export default function DataTable(props) {
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const navigate = useNavigate();

  function navigateTo(id) {
    props.token
      ? navigate(`/volcano/?id=${id}&token=${props.token}`)
      : navigate(`/volcano/?id=${id}`);
  }

  async function getVolcanoes(country, range) {
    const url =
      range === "None"
        ? `${API_URL}/volcanoes?country=${country}`
        : `${API_URL}/volcanoes?country=${country}&populatedWithin=${range}`;
    let res = await fetch(url);
    let data = await res.json();
    let formattedData = data.map((volcano) => ({
      id: volcano.id,
      name: volcano.name,
      country: volcano.country,
      region: volcano.region,
      subregion: volcano.subregion,
    }));

    if (gridApi) {
      // Set timeout to wait for vertical scroll bar in browser
      setTimeout(() => {
        gridApi.sizeColumnsToFit();
      }, 50);
    }
    setRowData(formattedData);
  }

  useEffect(
    () => {
      getVolcanoes(props.country, props.range);
    },
    // eslint-disable-next-line
    [props.country, props.range]
  );

  useEffect(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
    // eslint-disable-next-line
  }, [rowData]);

  const columns = [
    { headerName: "ID", field: "id", suppressSizeToFit: true, maxWidth: 100 },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      resizable: true,
    },
    { headerName: "Country", field: "country", resizable: true },
    {
      headerName: "Region",
      field: "region",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Subregion",
      field: "subregion",
      sortable: true,
      filter: true,
      resizable: true,
    },
  ];

  function onGridReady(params) {
    setGridApi(params.api);
    getVolcanoes(props.country, props.range);
  }

  return (
    <div className="ag-theme-alpine-dark formType" style={{ height: "100%" }}>
      <AgGridReact
        columnDefs={columns}
        rowData={rowData}
        pagination={true}
        paginationPageSize={15}
        domLayout={"autoHeight"}
        onGridReady={onGridReady}
        onRowClicked={(row) => navigateTo(row.data.id)}
      />
    </div>
  );
}
