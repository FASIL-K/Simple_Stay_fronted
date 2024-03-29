import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { UserUrl } from "../../../constants/constants";


function AdminLandingPage() {
  const [userCount, setuserCount] = useState(null);
  const [revenues, setRevenues] = useState(null);
  const [conferenceSales, setConferenceSales] = useState(null);
  const [coworkSales, setCoworkSales] = useState(null);
  const [premiumPlanSales, setPremiumPlanSales] = useState(null);

  useEffect(() => {
    const baseUrl = `${UserUrl}dashboard/`;

    axios
      .get(`${baseUrl}usercount/user/`)
      .then((response) => {
        setuserCount(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching user count:", error);
      });

    axios
      .get(`${baseUrl}premium/`)
      .then((response) => {
        console.log(response,"eeeeeeeeeeeeeeeeeeeeeeeeeeee");
        setRevenues(response.data);
      })
      .catch((error) => {
        console.error("Error while  fetching data:", error);
      });
    // axios
    //   .get(`${baseUrl}conference/`)
    //   .then((response) => {
    //     setConferenceSales(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching conference data:", error);
    //   });
    // axios
    //   .get(`${baseUrl}cowork/`)
    //   .then((response) => {
    //     console.log(response.data);
    //     setCoworkSales(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching co-work data:", error);
    //   });
    axios
      .get(`${baseUrl}premiumplan/`)
      .then((response) => {
        console.log(response,"rspppppppppppppppppp");
        setPremiumPlanSales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching premium data:", error);
      });
  }, []);
  const conferenceChartOptions = {
    chart: {
      id: "conference-bar",
    },
    xaxis: {
      categories: conferenceSales
        ? conferenceSales.map((data) => data.created_date)
        : [],
    },
  };

  const conferenceChartSeries = [
    {
      name: "Conference Sales",
      data: conferenceSales
        ? conferenceSales.map((data) => data.total_sales)
        : [],
    },
  ];

  const coworkChartOptions = {
    chart: {
      id: "cowork-bar",
    },
    xaxis: {
      categories: coworkSales
        ? coworkSales.map((data) => data.created_date)
        : [],
    },
  };

  const coworkChartSeries = [
    {
      name: "Co-work Sales",
      data: coworkSales ? coworkSales.map((data) => data.total_sales) : [],
    },
  ];

  const PremiumDonutChartOptions = {
    labels: premiumPlanSales
      ? premiumPlanSales.map((data) => data.package__name)
      : [],
  };

  const PremiumDonutChartSeries = premiumPlanSales
    ? premiumPlanSales.map((data) => data.total_purchase)
    : [];
  return (
    <div>
      <>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold">Users</h2>
              <p className="text-xl">
                Active Users:{" "}
                {userCount && userCount.users && userCount.users.length >= 2
                  ? userCount.users[1]
                  : null}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold">Owners</h2>
              <p className="text-xl">
                Active Owners:{" "}
                {userCount && userCount.users && userCount.users.length >= 2
                  ? userCount.users[0]
                  : null}
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold">Premium Revenue</h2>

              <p className="text-xl">Total Sales: {revenues?.data[0]?.total_price || "N/A"}</p>
            </div>
           
            <div className="p-4 bg-white rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold">Rent</h2>
              <p className="text-xl">
                Total Rent Propertys:{" "}
                {revenues?.data[1]?.rent_count || "N/A"}
              </p>
            </div>
        
          </div>
        </div>
        <br />

        <div className="flex justify-end margin-right">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg shadow-md text-center">
              <h2 className="text-xl font-semibold">PG/CO-living</h2>
              <p className="text-xl">
                Total PG/CO-living:{" "}
                {revenues?.data[2]?.pg_count || "N/A"}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">
              Conference Sales Chart (Daily)
            </h2>
            <Chart
              options={conferenceChartOptions}
              series={conferenceChartSeries}
              type="bar"
              width="100%"
            />
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">
              Co-work Sales Chart (Daily)
            </h2>
            <Chart
              options={coworkChartOptions}
              series={coworkChartSeries}
              type="bar"
              width="100%"
            />
          </div> */}
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Premium Chart</h2>
            <p>* Based on purchase count</p>
            <Chart
              options={PremiumDonutChartOptions}
              series={PremiumDonutChartSeries}
              type="donut"
              width="100%"
            />
          </div>
        </div>
      </>
    </div>
  );
}

export default AdminLandingPage;


