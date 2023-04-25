import React, { useEffect, useState } from "react";
import LineChart from "react-linechart";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
} from "react-leaflet";
import LeafLet from "leaflet";

delete LeafLet.Icon.Default.prototype._getIconUrl;

LeafLet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Charts = () => {
  const data = [
    {
      color: "steelblue",
      points: [
        { x: 10, y: 10 },
        { x: 1, y: 1 },
        {
          x: 13,
          y: 13,
        },
      ],
    },
  ];
  const [dataDayWise, setDataDayWise] = useState([]);
  const [chartData, setChartData] = useState(data);
  const [countryWise, setCountryWise] = useState([]);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((x) => x.json())
      .then((x) => {
        let arr = Object.entries(x.cases);
        arr = arr.sort((a, b) => {
          return new Date(a[0]).getTime() - new Date(b[0]).getTime();
        });
        arr = arr.map((curArr) => {
          return {
            x: new Date(curArr[0]).getTime(),
            y: curArr[1],
          };
        });
        setDataDayWise(arr.slice(0, 10));
      });
  }, []);

  useEffect(() => {
    setChartData(() => {
      return [
        {
          color: "steelblue",
          points: dataDayWise,
        },
      ];
    });
  }, [dataDayWise]);
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((x) => x.json())
      .then((x) => {
        setCountryWise(x);
      });
  }, []);
  return (
    <div className="w-full  flex flex-col">
      <div className="w-full">
        <LineChart
          width={600}
          height={400}
          data={chartData}
          xDisplay={(dis) => {
            return new Date(dis).toDateString().slice(4);
          }}
        />
      </div>
      {countryWise.length > 0 && ( //getounds got err while auto resizing and late render. so using two components
        <MapContainer
          zoom={13}
          scrollWheelZoom={false}
          style={{
            height: "400px",
            width: "100%",
            backgroundColor: "white",
            marginTop: "80px",
            marginBottom: "90px",
          }}
          bounds={
            countryWise.length > 0
              ? [
                  countryWise?.map(({ countryInfo: { lat, long } }) => {
                    return [lat, long];
                  }),
                ]
              : [[33, 65]]
          }
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup>
            {countryWise?.map(
              ({
                countryInfo: { lat, long },
                country,
                active,
                deaths,
                recovered,
              }) => {
                return (
                  <Marker position={[lat, long]}>
                    <Popup>
                      country: {country}
                      <br /> active: {active} <br />
                      recovered: {recovered}
                      <br />
                      deaths: {deaths}
                    </Popup>
                  </Marker>
                );
              }
            )}
          </FeatureGroup>
        </MapContainer>
      )}
      {countryWise.length === 0 && ( //it is for loading time with dummmy bounds
        <MapContainer
          zoom={13}
          scrollWheelZoom={false}
          style={{
            height: "400px",
            backgroundColor: "white",
            marginTop: "80px",
            marginBottom: "90px",
          }}
          bounds={[[33, 65]]}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup>
            {countryWise?.map(
              ({
                countryInfo: { lat, long },
                country,
                active,
                deaths,
                recovered,
              }) => {
                return (
                  <Marker position={[lat, long]}>
                    <Popup>
                      country: {country}
                      <br /> active: {active} <br />
                      recovered: {recovered}
                      <br />
                      deaths: {deaths}
                    </Popup>
                  </Marker>
                );
              }
            )}
          </FeatureGroup>
        </MapContainer>
      )}
    </div>
  );
};

export default Charts;
