import React, { useEffect, useState } from "react";
// import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { Table, Tag } from "antd";
import Column from "antd/es/table/Column";
import { SyncOutlined } from "@ant-design/icons";
import Loading from "../../components/Loading";
import { fetchOrders } from "../../data/api";
const AwaitOrder = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderData = await fetchOrders();
        setOrders(orderData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    getOrders();
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
        title="Đơn chờ xác nhận"
        style={{ width: "90%", marginTop: "50px", height: "75vh" }}
      >
        <div>
          <Table
            dataSource={orders.filter(
              (item) => item.orderStatus.name === "Chờ xác nhận",
            )}
            rowKey={(item) => item.id}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: orders.filter(
                (item) => item.orderStatus.name === "Chờ xác nhận",
              ).length,
              onChange: (page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              },
            }}
            bordered
          >
            <Column title="Mã Đơn Hàng" dataIndex={"id"} key="id" />
            <Column
              title="Ngày Đặt"
              dataIndex={"requiredDate"}
              render={(required_date) => formatDate(required_date)}
              sorter={(a, b) =>
                new Date(a.order.required_date) -
                new Date(b.order.required_date)
              }
              key="required_date"
            />
            <Column
              title="Phương Thức Thanh Toán"
              dataIndex={"paymentMethod"}
              key="payment_method"
              render={(paymentMethod) => `Thanh toán - ${paymentMethod}`}
            />
            <Column
              title="Trạng Thái"
              key="status"
              render={() => (
                <Tag
                  bordered={false}
                  icon={<SyncOutlined spin />}
                  color="warning"
                >
                  Đang Xác Nhận
                </Tag>
              )}
            />
            <Column
              title="Chi Tiết Đơn Hàng"
              key="detail"
              render={(text, item) => (
                <Link
                  to="/await-order-detail"
                  state={{ order: item }}
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

export default AwaitOrder;
