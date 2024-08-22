import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "flowbite-react";
import {
    Card,
    Col,
    Divider,
    Row,
    Select,
    Steps,
    Typography,
    notification,
} from "antd";
import {
    fetchUpdateReport,
} from "../../data/api";
import { Option } from "antd/es/mentions";
import TextArea from "antd/es/input/TextArea";

const ReportDetail = () => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"));

    const [report, setReport] = useState(location.state?.report || {});
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(true);
    const isAuthenticatedStaff = localStorage.getItem("isStaff") === "true";



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

    const handleSubmit = async () => {
        if (report.actionType === 'UNKNOWN') {
            notification.warning({
                message: "Vui lòng chọn hướng giải quyết",
                placement: "top",
            })
            return;
        }
        if (report.note === null) {
            notification.warning({
                message: "Vui lòng nhập ghi chú gửi tới khách hàng",
                placement: "top",
            })
            return;
        }
        const rp = {
            staffId: user.id,
            actionType: report.actionType,
            note: report.note,
        }
        console.log(rp);
        try {
            await fetchUpdateReport(report.id, rp);
            notification.success({
                message: "Gửi phản hồi đơn khiếu nại thành công",
                placement: "top",
            })
            navigate('/complete-report');
        } catch (error) {
            notification.success({
                message: "Gửi phản hồi đơn khiếu nại thất bại. Vui lòng thử lại",
                placement: "top",
            })
        }
    };

    const { Text } = Typography;

    return (
        <div style={{ height: "120vh" }}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Row justify="center" style={{ width: "100%", marginTop: "50px" }}>
                    <Col span={22} style={{ display: "flex", justifyContent: "center" }}>
                        <Card
                            style={{ width: "100%" }}
                            title={<h2 className="text-2xl font-bold">Đơn khiếu nại</h2>}
                        >
                            <div>
                                <div style={{
                                    marginBottom: "10px",
                                }}>
                                    <Text
                                        type="secondary"
                                        style={{
                                            fontSize: "15px",
                                            display: "inline-block",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Ngày làm đơn:
                                    </Text>
                                    <Text
                                        strong
                                        style={{ fontSize: "17px", display: "inline-block" }}
                                    >
                                        {formatDate(report.createdAt)}
                                    </Text>
                                </div>
                                <div style={{
                                    marginBottom: "10px",
                                }}>                                    <Text
                                    type="secondary"
                                    style={{
                                        fontSize: "15px",
                                        display: "inline-block",
                                        marginRight: "10px",
                                    }}
                                >
                                        Trạng thái đơn khiếu nại:
                                    </Text>
                                    <Text
                                        strong
                                        style={{ fontSize: "17px", display: "inline-block" }}
                                    >
                                        {report.status === 'PENDING' ? 'Đang xử lý' : report.status === 'COMPLETED' ? 'Đã xử lý' : ""}
                                    </Text>
                                </div>
                                <div style={{
                                    marginBottom: "10px",
                                }}>                                    <Text
                                    type="secondary"
                                    style={{
                                        fontSize: "15px",
                                        display: "inline-block",
                                        marginRight: "10px",
                                    }}
                                >
                                        Lý do gửi đơn:
                                    </Text>
                                    <Text
                                        strong
                                        style={{ fontSize: "17px", display: "inline-block" }}
                                    >
                                        {report.reason}
                                    </Text>
                                </div>
                                <div style={{
                                    marginBottom: "10px",
                                }}>                                    <Text
                                    type="secondary"
                                    style={{
                                        fontSize: "15px",
                                        display: "inline-block",
                                        marginRight: "10px",
                                    }}
                                >
                                        Hướng giải quyết:
                                    </Text>
                                    <Text
                                        strong
                                        style={{ fontSize: "17px", display: "inline-block" }}
                                    >
                                        {report.actionType === "NO_ACTION"
                                            ? "Không giải quyết"
                                            : report.actionType === "CREATE_VOUCHER"
                                                ? "Tặng voucher"
                                                : report.actionType === "CREATE_ORDER"
                                                    ? "Đền bù sản phẩm"
                                                    : report.actionType === "REFUND"
                                                        ? "Hoàn tiền"
                                                        : report.actionType === "OTHER"
                                                            ? "Khác"
                                                            : report.actionType === "UNKNOWN"
                                                                ? "Chưa xử lý"
                                                                : report.actionType}
                                    </Text>
                                </div>
                                <div style={{
                                    marginBottom: "10px",
                                }}>                                    
                                <Text
                                    type="secondary"
                                    style={{
                                        fontSize: "15px",
                                        marginRight: "10px",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                        Nhân viên phụ trách:
                                    </Text>
                                    <Text
                                        strong
                                        style={{ fontSize: "17px", display: "inline-block" }}
                                    >
                                        { report.staff? (report.staff.firstName ? report.staff.firstName : report.staff.email) : ""}
                                    </Text>
                                </div>
                                <div style={{
                                    marginBottom: "10px",
                                }}>                                    <Text
                                    type="secondary"
                                    style={{
                                        fontSize: "15px",
                                        marginRight: "10px",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                        Ghi chú của nhân viên:
                                    </Text>
                                    <Text
                                        strong
                                        style={{ fontSize: "17px", display: "inline-block" }}
                                    >
                                        {report.note}
                                    </Text>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <Row justify="space-between" style={{ flexGrow: 1 }}>
                    <Col span={15}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                height: "90vh",
                            }}
                        >
                            <Card
                                title={
                                    <h1 className="text-2xl font-bold">
                                        Chi tiết đơn hàng: #{report.order.id}
                                    </h1>
                                }
                                style={{
                                    width: "90%",
                                    marginTop: "50px",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                    <Button
                                        outline
                                        onClick={() => navigate(-1)}
                                        style={{ fontSize: "15px", marginBottom: "20px" }}
                                    >
                                        Về trang danh sách
                                    </Button>
                                </div>
                                <div
                                    style={{
                                        overflowY: "auto",
                                        maxHeight: "60vh",
                                        flexGrow: 1,
                                        justifyContent: "space-between",
                                    }}
                                >
                                    {report.order.orderDetails.map((item) => (
                                        <Card
                                            type="inner"
                                            key={item.product.id}
                                            className={`mb-4 rounded-lg border border-[rgba(0,0,0,0.2)] bg-white shadow-sm`}
                                            style={{ marginBottom: "10px", padding: "10px" }}
                                        >
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <img
                                                    className="h-20 w-20 dark:hidden"
                                                    src={item.product.coverImageUrl}
                                                    alt={item.product.name}
                                                />
                                                <img
                                                    className="hidden h-20 w-20 dark:block"
                                                    src={item.product.coverImageUrl}
                                                    alt={item.product.name}
                                                />
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    <div className="text-end md:order-4 md:w-32">
                                                        <p className="text-base font-bold text-gray-900 dark:text-white">
                                                            {Number(item.product.price).toLocaleString(
                                                                "vi-VN",
                                                                {
                                                                    style: "currency",
                                                                    currency: "VND",
                                                                },
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                    <p className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                                                        {item.product.name}
                                                    </p>
                                                    <div className="flex items-start gap-4 text-lg">
                                                        x{item.quantity} sản phẩm
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col span={9}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                height: "75vh",
                            }}
                        >
                            <Card
                                title={
                                    <h1 className="text-2xl font-bold">Thông tin đơn hàng:</h1>
                                }
                                style={{
                                    width: "90%",
                                    marginTop: "50px",
                                    height: "auto",
                                    minHeight: "350px",
                                }}
                            >
                                <div>
                                    <div
                                        style={{
                                            marginBottom: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: "15px",
                                                display: "inline-block",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Ngày Đặt:
                                        </Text>
                                        <Text
                                            strong
                                            style={{ fontSize: "17px", display: "inline-block" }}
                                        >
                                            {formatDate(report.order.requiredDate)}
                                        </Text>
                                    </div>
                                    <div
                                        style={{
                                            marginBottom: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: "15px",
                                                display: "inline-block",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Tên khách hàng:
                                        </Text>
                                        <Text
                                            strong
                                            style={{ fontSize: "17px", display: "inline-block" }}
                                        >
                                            {report.order.fullName}
                                        </Text>
                                    </div>
                                    <div
                                        style={{
                                            marginBottom: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: "15px",
                                                display: "inline-block",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Email:
                                        </Text>
                                        <Text
                                            strong
                                            style={{ fontSize: "17px", display: "inline-block" }}
                                        >
                                            {report.order.email}
                                        </Text>
                                    </div>
                                    <div
                                        style={{
                                            marginBottom: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: "15px",
                                                display: "inline-block",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Số Điện Thoại:
                                        </Text>
                                        <Text
                                            strong
                                            style={{ fontSize: "17px", display: "inline-block" }}
                                        >
                                            {report.order.phone}
                                        </Text>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: "15px",
                                                marginRight: "10px",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            Địa chỉ:
                                        </Text>
                                        <Text
                                            strong
                                            style={{ fontSize: "17px", textAlign: "right" }}
                                        >
                                            {report.order.address}
                                        </Text>
                                    </div>
                                    <div
                                        style={{
                                            marginBottom: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: "15px",
                                                display: "inline-block",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Phương thức thanh toán:
                                        </Text>
                                        <Text
                                            strong
                                            style={{ fontSize: "17px", display: "inline-block" }}
                                        >
                                            {report.order.paymentMethod}
                                        </Text>
                                    </div>
                                </div>
                                <Divider />
                                <div>
                                    <div
                                        style={{
                                            marginBottom: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: "15px",
                                                display: "inline-block",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Giá gốc:
                                        </Text>
                                        <Text
                                            strong
                                            style={{ fontSize: "17px", display: "inline-block" }}
                                        >
                                            {" "}
                                            {Number(
                                                report.order.totalPrice - report.order.shipFee,
                                                // + order.order.voucher_fee
                                            ).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </Text>
                                    </div>
                                    <div
                                        style={{
                                            marginBottom: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: "15px",
                                                display: "inline-block",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Giảm giá:
                                        </Text>
                                        {/* <Text strong style={{ fontSize: '17px', display: 'inline-block' }}>{order.order.voucher_code}</Text> */}
                                        <Text
                                            strong
                                            style={{ fontSize: "17px", display: "inline-block" }}
                                        >
                                            {" "}
                                            {/* {Number(order.voucher_fee).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })} */}
                                        </Text>
                                    </div>
                                    <div
                                        style={{
                                            marginBottom: "10px",
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: "15px",
                                                display: "inline-block",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Phí vận chuyển:
                                        </Text>
                                        <Text
                                            strong
                                            style={{ fontSize: "17px", display: "inline-block" }}
                                        >
                                            {Number(report.order.shipFee).toLocaleString("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </Text>
                                    </div>
                                </div>
                                <Divider />
                                <div
                                    style={{ display: "flex", justifyContent: "space-between" }}
                                >
                                    <Text
                                        strong
                                        style={{
                                            fontSize: "17px",
                                            display: "inline-block",
                                            marginRight: "10px",
                                        }}
                                    >
                                        Tổng giá trị:
                                    </Text>
                                    <Text
                                        strong
                                        style={{ fontSize: "17px", display: "inline-block" }}
                                    >
                                        {Number(report.order.totalPrice).toLocaleString("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        })}
                                    </Text>
                                </div>

                                {isAuthenticatedStaff && (
                                    <div
                                        style={{ display: "flex", justifyContent: "space-between" }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: "17px",
                                                display: "inline-block",
                                                marginRight: "10px",
                                            }}
                                        >
                                            Nhân viên giao hàng:
                                        </Text>
                                        <Text
                                            strong
                                            style={{ fontSize: "17px", display: "inline-block" }}
                                        >
                                            {report.order.shipper
                                                ? report.order.shipper.firstName
                                                    ? report.order.shipper.firstName
                                                    : report.order.shipper.email
                                                : ""}
                                        </Text>
                                    </div>
                                )}
                            </Card>
                        </div>
                    </Col>

                </Row>
            </div>
        </div>
    );
};

export default ReportDetail;
