import { Container, Row } from "reactstrap";
import { Bar } from "react-chartjs-2";

// eslint-disable-next-line
import Chart from "chart.js/auto"; // Required import for above;

export default function PopulationChart(props) {
  function BarGraph(props) {
    const labels = ["5km", "10km", "30km", "100km"];
    const volcanoRawData = [
      props.volcano.population_5km,
      props.volcano.population_10km,
      props.volcano.population_30km,
      props.volcano.population_100km,
    ];
    const volcanoData = volcanoRawData.map((pop) => {
      return parseInt(pop);
    });

    return (
      <Container className="containerType">
        <Row>
          <h1>Population by Distance</h1>
        </Row>
        <Row>
          <Bar
            data={{
              labels: labels,
              datasets: [
                {
                  // data label
                  label: "population count",
                  data: volcanoData,
                  // bar color
                  backgroundColor: ["#f86624", "#f86624", "#f86624", "#f86624"],
                  // bar border
                  borderColor: ["#f86624", "#f86624", "#f86624", "#f86624"],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: "#fff",
                    font: {
                      size: 14,
                    },
                  },
                },
              },
              maintainAspectRatio: true,
              scales: {
                yAxes: {
                  ticks: {
                    // set y to always start 0
                    beginAtZero: true,
                    color: "#fff",
                  },
                },
                xAxes: {
                  ticks: {
                    color: "#fff",
                  },
                },
              },
            }}
          />
        </Row>
      </Container>
    );
  }

  if (!props.cookies.token) {
    return (
      <Container className="containerType chartType vertical-center ">
        <h1 className="margin-center">Create an account to see this chart!</h1>
      </Container>
    );
  } else {
    return (
      <Container className="containerType chartType vertical-center">
        <BarGraph volcano={props.volcano} />
      </Container>
    );
  }
}
