import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrders } from "../../data/api";
import { Card } from "antd";
import Column from "antd/es/table/Column";
import { Table, Tag } from "antd";
import {
  CheckCircleOutlined,
  SyncOutlined,
  SmileOutlined,
  CloseCircleOutlined,
  TruckOutlined,
  CalendarOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Loading from "../../components/Loading";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

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

  const getStatusTag = (status) => {
    switch (status) {
      case "Chờ xác nhận":
        return (
          <Tag bordered={false} icon={<SyncOutlined spin />} color="warning">
            Đang Xác Nhận
          </Tag>
        );
      case "Đang giao hàng":
        return (
          <Tag bordered={false} icon={<TruckOutlined />} color="processing">
            Đang giao hàng
          </Tag>
        );
      case "Hoàn thành":
        return (
          <Tag bordered={false} icon={<SmileOutlined />} color="green">
            Đã Hoàn Thành
          </Tag>
        );
      case "Đặt trước":
        return (
          <Tag bordered={false} icon={<CalendarOutlined />} color="magenta">
            Đặt trước
          </Tag>
        );
      case "Đã hủy":
        return (
          <Tag bordered={false} icon={<CloseCircleOutlined />} color="error">
            Đã Hủy
          </Tag>
        );
      case "Giao hàng không thành công":
        return (
          <Tag
            bordered={false}
            icon={<ExclamationCircleOutlined />}
            color="gray"
          >
            Giao hàng không thành công
          </Tag>
        );
      default:
        return <Tag></Tag>;
    }
  };

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
        title="Tất cả đơn hàng"
        style={{ width: "90%", marginTop: "50px", height: "full" }}
      >
        <div>
          <Table
            dataSource={orders}
            rowKey={(item) => item.id}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: orders.length,
              onChange: (page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              },
              showSizeChanger: false,
            }}
            bordered
          >
            <Column title="Mã Đơn Hàng" dataIndex={"id"} key="id" />
            <Column
              title="Ngày Đặt"
              key="required_date"
              render={(text, record) =>
                record.orderStatus.name === "Đặt trước"
                  ? formatDate(record.createdAt)
                  : formatDate(record.requiredDate)
              }
              sorter={(a, b) =>
                new Date(a.order.required_date) -
                new Date(b.order.required_date)
              }
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
              render={(text, record) => getStatusTag(record.orderStatus.name)}
            />
            <Column
              title="Chi Tiết Đơn Hàng"
              key="detail"
              render={(text, item) => (
                <Link
                  to={
                    item.orderStatus.name === "Chờ xác nhận"
                      ? "/await-order-detail"
                      : "/order-detail"
                  }
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

export default Orders;
