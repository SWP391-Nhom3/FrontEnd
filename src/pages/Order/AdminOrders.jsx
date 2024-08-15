import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { fetchOrder } from "../../data/api";
import { Card } from "primereact/card";
import Column from "antd/es/table/Column";
import { Table, Tag } from "antd";
import { CheckCircleOutlined, SyncOutlined, SmileOutlined , CloseCircleOutlined } from '@ant-design/icons';
import Loading from "../../components/Loading";

const ApprovedOrder = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  //!! FETCH ORDER!!
  // useEffect(() => {
  //   const getOrders = async () => {
  //     try {
  //       const orderData = await fetchOrder();
  //       setOrders(orderData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //       setLoading(false);
  //     }
  //   };

  //   getOrders();
  // }, []);

  const getStatusTag = (status) => {
    switch (status) {
      case 0:
        return <Tag bordered={false} icon={<SyncOutlined spin />} color="orange">Đang Xác Nhận</Tag>;
      case 1:
        return <Tag bordered={false} icon={<CheckCircleOutlined />} color="processing">Đã Xác Nhận</Tag>;
      case 2:
        return <Tag bordered={false} icon={<SmileOutlined  />} color="green">Đã Hoàn Thành</Tag>;
      case 3:
        return <Tag bordered={false} icon={<CloseCircleOutlined />} color="red">Đã Hủy</Tag>;
      default:
        return <Tag></Tag>;
    }
  };

  if (loading) {
    return <Loading/>
  }
 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
    };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '80vh' }}>
      <Card title="Tất cả đơn hàng" style={{ width: '90%', marginTop: '50px', height: 'full' }}>
        <div>
          <Table
            dataSource={orders}
            rowKey={item => item.order._id}
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
            <Column title="Mã Đơn Hàng" dataIndex={['order', '_id']} key="order_id" />
            <Column title="Ngày Đặt" dataIndex={['order', 'required_date']} render={required_date => formatDate(required_date)} sorter={(a, b) => new Date(a.order.required_date) - new Date(b.order.required_date)} key="required_date" />
            <Column
              title="Phương Thức Thanh Toán"
              dataIndex={['order', 'payment_method']}
              key="payment_method"
              render={payment_method => `Thanh toán - ${payment_method}`}
            />
            <Column
              title="Trạng Thái"
              key="status"
              render={(text, record) => getStatusTag(record.order.status)}
              sorter={(a, b) => a.order.status - b.order.status}
              />
            <Column
              title="Chi Tiết Đơn Hàng"
              key="detail"
              render={(text, item) => (
                <Link
                to={item.order.status === 0 ? "/await-orderDetail" : "/order-detail"}
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

export default ApprovedOrder;
