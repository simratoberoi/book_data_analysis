import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [data, setData] = useState({
    topAuthors: [],
    genreRatings: [],
    yearlyRatings: [],
    maxPrice: 0,
    totalBooks: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [authorsRes, genreRes, yearlyRes, statsRes] = await Promise.all([
        fetch("http://localhost:5000/api/top-authors"),
        fetch("http://localhost:5000/api/genre-ratings"),
        fetch("http://localhost:5000/api/yearly-ratings"),
        fetch("http://localhost:5000/api/stats"),
      ]);

      if (!authorsRes.ok || !genreRes.ok || !yearlyRes.ok || !statsRes.ok) {
        throw new Error("Failed to fetch data from backend");
      }

      const [authorsData, genreData, yearlyData, statsData] = await Promise.all(
        [authorsRes.json(), genreRes.json(), yearlyRes.json(), statsRes.json()]
      );

      setData({
        topAuthors: authorsData,
        genreRatings: genreData,
        yearlyRatings: yearlyData,
        maxPrice: statsData.max_price,
        totalBooks: statsData.total_books,
      });
    } catch (err) {
      setError(err.message);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Google Sans, Roboto, Arial, sans-serif",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #4285F4",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              margin: "0 auto 16px",
            }}
          ></div>
          <div
            style={{
              fontSize: "14px",
              color: "#5f6368",
              fontWeight: "400",
            }}
          >
            Loading...
          </div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Google Sans, Roboto, Arial, sans-serif",
          backgroundColor: "#fff",
          padding: "20px",
        }}
      >
        <div
          style={{
            padding: "24px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            border: "1px solid #dadce0",
            maxWidth: "500px",
            boxShadow:
              "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
          }}
        >
          <div
            style={{
              color: "#d93025",
              fontSize: "16px",
              fontWeight: "500",
              marginBottom: "8px",
            }}
          >
            Error loading data
          </div>
          <div
            style={{
              color: "#5f6368",
              fontSize: "14px",
              marginBottom: "16px",
              lineHeight: "20px",
            }}
          >
            {error}
          </div>
          <button
            onClick={fetchData}
            style={{
              padding: "10px 24px",
              backgroundColor: "#1a73e8",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              fontFamily: "Google Sans, Roboto, Arial, sans-serif",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1557b0")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1a73e8")}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Google Sans, Roboto, Arial, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#fff",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          padding: "48px 64px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "400",
              color: "#202124",
              marginBottom: "8px",
              letterSpacing: "0",
            }}
          >
            Bestsellers Analytics
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#5f6368",
              margin: 0,
              fontWeight: "400",
            }}
          >
            Amazon Top 50 Bestselling Books (2009-2019)
          </p>
        </div>

        {/* Key Metrics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          <div
            style={{
              padding: "24px",
              backgroundColor: "#fff",
              border: "1px solid #dadce0",
              borderRadius: "8px",
              transition: "box-shadow 0.2s",
              cursor: "default",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)")
            }
            onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#5f6368",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              Total Books
            </div>
            <div
              style={{
                fontSize: "40px",
                fontWeight: "400",
                color: "#202124",
                letterSpacing: "-0.5px",
              }}
            >
              {data.totalBooks}
            </div>
          </div>
          <div
            style={{
              padding: "24px",
              backgroundColor: "#fff",
              border: "1px solid #dadce0",
              borderRadius: "8px",
              transition: "box-shadow 0.2s",
              cursor: "default",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)")
            }
            onMouseOut={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <div
              style={{
                fontSize: "14px",
                color: "#5f6368",
                marginBottom: "8px",
                fontWeight: "500",
              }}
            >
              Max Price
            </div>
            <div
              style={{
                fontSize: "40px",
                fontWeight: "400",
                color: "#202124",
                letterSpacing: "-0.5px",
              }}
            >
              ${data.maxPrice}
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Top 10 Authors */}
          <div
            style={{
              padding: "32px",
              backgroundColor: "#fff",
              border: "1px solid #dadce0",
              borderRadius: "8px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#202124",
                marginBottom: "24px",
                letterSpacing: "0",
              }}
            >
              Top 10 Authors by Number of Bestsellers
            </h2>
            <ResponsiveContainer width="100%" height={450}>
              <BarChart
                data={data.topAuthors}
                margin={{ top: 5, right: 30, left: 20, bottom: 100 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" />
                <XAxis
                  dataKey="author"
                  angle={-45}
                  textAnchor="end"
                  height={120}
                  tick={{
                    fill: "#5f6368",
                    fontSize: 12,
                    fontFamily: "Roboto, Arial, sans-serif",
                  }}
                />
                <YAxis
                  tick={{
                    fill: "#5f6368",
                    fontSize: 12,
                    fontFamily: "Roboto, Arial, sans-serif",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #dadce0",
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxShadow:
                      "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
                    fontFamily: "Roboto, Arial, sans-serif",
                  }}
                  cursor={{ fill: "rgba(66, 133, 244, 0.1)" }}
                />
                <Bar dataKey="count" fill="#4285F4" name="Books" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Genre Ratings */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              gap: "32px",
            }}
          >
            <div
              style={{
                padding: "32px",
                backgroundColor: "#fff",
                border: "1px solid #dadce0",
                borderRadius: "8px",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#202124",
                  marginBottom: "24px",
                  letterSpacing: "0",
                }}
              >
                Average Rating by Genre
              </h2>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={data.genreRatings}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ genre, rating }) =>
                      `${genre}: ${rating.toFixed(2)}`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="rating"
                  >
                    {data.genreRatings.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #dadce0",
                      borderRadius: "8px",
                      fontSize: "14px",
                      boxShadow:
                        "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
                      fontFamily: "Roboto, Arial, sans-serif",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div
              style={{
                padding: "32px",
                backgroundColor: "#fff",
                border: "1px solid #dadce0",
                borderRadius: "8px",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  color: "#202124",
                  marginBottom: "24px",
                  letterSpacing: "0",
                }}
              >
                Genre Rating Comparison
              </h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data.genreRatings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" />
                  <XAxis
                    dataKey="genre"
                    tick={{
                      fill: "#5f6368",
                      fontSize: 12,
                      fontFamily: "Roboto, Arial, sans-serif",
                    }}
                  />
                  <YAxis
                    domain={[4.5, 4.8]}
                    tick={{
                      fill: "#5f6368",
                      fontSize: 12,
                      fontFamily: "Roboto, Arial, sans-serif",
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #dadce0",
                      borderRadius: "8px",
                      fontSize: "14px",
                      boxShadow:
                        "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
                      fontFamily: "Roboto, Arial, sans-serif",
                    }}
                    cursor={{ fill: "rgba(66, 133, 244, 0.1)" }}
                  />
                  <Bar dataKey="rating" fill="#34A853" name="Avg Rating" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Yearly Rating Trend */}
          <div
            style={{
              padding: "32px",
              backgroundColor: "#fff",
              border: "1px solid #dadce0",
              borderRadius: "8px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#202124",
                marginBottom: "24px",
                letterSpacing: "0",
              }}
            >
              Average Rating Trend by Year
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={data.yearlyRatings}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e8eaed" />
                <XAxis
                  dataKey="year"
                  tick={{
                    fill: "#5f6368",
                    fontSize: 12,
                    fontFamily: "Roboto, Arial, sans-serif",
                  }}
                />
                <YAxis
                  domain={[4.5, 4.8]}
                  tick={{
                    fill: "#5f6368",
                    fontSize: 12,
                    fontFamily: "Roboto, Arial, sans-serif",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #dadce0",
                    borderRadius: "8px",
                    fontSize: "14px",
                    boxShadow:
                      "0 1px 2px 0 rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)",
                    fontFamily: "Roboto, Arial, sans-serif",
                  }}
                  cursor={{ fill: "rgba(66, 133, 244, 0.1)" }}
                />
                <Legend
                  wrapperStyle={{
                    fontFamily: "Roboto, Arial, sans-serif",
                    fontSize: "14px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#4285F4"
                  strokeWidth={2}
                  name="Avg Rating"
                  dot={{ fill: "#4285F4", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "64px",
            paddingTop: "24px",
            borderTop: "1px solid #e8eaed",
            textAlign: "center",
            color: "#5f6368",
            fontSize: "12px",
          }}
        >
          Data Analysis Dashboard • Built with React & Recharts
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
