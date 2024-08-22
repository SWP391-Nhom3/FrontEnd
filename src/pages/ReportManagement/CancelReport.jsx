import React, { useEffect, useState } from "react";
// import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import {
  CheckCircleOutlined,
  SmileFilled,
  SyncOutlined,
} from "@ant-design/icons";
import Loading from "../../components/Loading";
import {
  fetchGetReportByActionType,
  fetchGetReportByStatus,
  fetchOrders,
} from "../../data/api";
const CancelReport = () => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  useEffect(() => {
    fetchGetReportByActionType("NO_ACTION").then((res) => {
      setReport(res.data.data);
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "80vh" }}>
      <Card
        title="Tất cả đơn không giải quyết"
        style={{ width: "90%", marginTop: "50px", height: "75vh" }}
      >
        <div>
          <Table
            dataSource={report}
            rowKey={(item) => item.id}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: report.length,
              onChange: (page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              },
            }}
            bordered
          >
            <Column
              title="Mã Đơn Hàng"
              dataIndex={"order.id"}
              key="id"
              render={(text, record) => record.order.id}
            />
            <Column
              title="Ngày tạo đơn"
              dataIndex={"createdAt"}
              render={(required_date) => formatDate(required_date)}
              sorter={(a, b) =>
                new Date(a.order.required_date) -
                new Date(b.order.required_date)
              }
              key="required_date"
            />
            <Column title="Lý do khiếu nại" dataIndex={"reason"} key="reason" />
            <Column
              title="Trạng Thái"
              key="status"
              render={() => (
                <Tag
                  bordered={false}
                  icon={<CheckCircleOutlined />}
                  color="success"
                >
                  Đã xử lý
                </Tag>
              )}
            />
            <Column
              title="Chi Tiết Đơn khiếu nại"
              key="detail"
              render={(text, item) => (
                <Link
                  to="/report-detail"
                  state={{ report: item }}
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Chi Tiết
                </Link>
              )}
            />
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default CancelReport;
