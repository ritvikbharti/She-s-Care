import React, { useEffect, useState } from "react";
import api from "../../utils/api"; // ✅ shared axios instance
import { toast } from "react-toastify";
import { Card, CardContent } from "../../components/Card1";
import { Button } from "../../components/button1";
import { Input } from "../../components/input";

export default function ReportHistory() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      // ✅ Token is auto-attached by the api interceptor
      // ✅ Backend now filters by userId (see reportRoutes fix)
      const res = await api.get("/api/reports/my");
      setReports(res.data);
    } catch (error) {
      toast.error("Failed to load report history");
    } finally {
      setLoading(false);
    }
  };

  const deleteReport = async (id) => {
    try {
      await api.delete(`/api/reports/${id}`);
      toast.success("Report deleted");
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (error) {
      toast.error("Failed to delete report");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = reports.filter((r) =>
    new Date(r.createdAt).toLocaleString().toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <p className="text-white text-center mt-10">Loading reports...</p>;

  return (
    <div className="w-full ml-32 mr-10 text-white bg-dark-600 relative top-10 p-10 rounded-3xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">
          Your <span className="text-green-400">Test Report History</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          View, track and manage your previous PCOS prediction reports.
        </p>
      </div>

      <div className="bg-dark-400 p-4 rounded-xl mb-8 flex gap-4 items-center text-black">
        <Input
          placeholder="Search reports by date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
      </div>

      {filteredReports.length === 0 ? (
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg">No reports found.</p>
          <p className="text-gray-500 text-sm mt-2">
            Take the PCOS test to generate your first report.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report, index) => (
            <Card key={report._id}>
              <CardContent className="p-6 bg-dark-400 rounded-xl">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold">Report #{filteredReports.length - index}</h3>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      report.detected ? "bg-red-500 text-white" : "bg-green-500 text-white"
                    }`}
                  >
                    {report.detected ? "PCOS Detected" : "Not Detected"}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {new Date(report.createdAt).toLocaleString()}
                </p>

                <p className="text-yellow-400 font-medium mt-2">
                  Risk: {report.riskPercentage?.toFixed(2)}%
                </p>

                {/* Progress bar */}
                <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
                  <div
                    className={`h-2 rounded-full ${report.detected ? "bg-red-500" : "bg-green-500"}`}
                    style={{ width: `${Math.min(report.riskPercentage, 100)}%` }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                  {Object.entries(report.inputs || {}).map(([key, value]) => (
                    <p key={key} className="bg-dark-600 px-2 py-1 rounded-md">
                      <span className="font-semibold">{key}:</span> {value}
                    </p>
                  ))}
                </div>

                <Button
                  className="w-full mt-4 bg-red-600"
                  onClick={() => deleteReport(report._id)}
                >
                  Delete Report
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}