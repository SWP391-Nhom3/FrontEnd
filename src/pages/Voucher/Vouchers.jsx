import React, { useEffect, useState } from "react";
// import { fetchDeleteVoucher, fetchGetVoucher } from "../../data/api";
import { Button, Datepicker, Select, TextInput } from "flowbite-react";
// import { fetchGetVoucherType, fetchUpdateVoucher } from "../../data/api";
import { toast } from "react-hot-toast";
import Loading from "../../components/Loading";
import { Card, Modal, notification, Table } from "antd";
import { useNavigate } from "react-router-dom";

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const token = JSON.parse(localStorage.getItem("result"));
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    // const getVouchers = async () => {
    //   const data = await fetchGetVoucher();
    //   setVouchers(data);
    //   setLoading(false);
    // };
    // getVouchers();
    // fetchGetVoucherType().then((res) => {
    //   if (res && res.data.result) {
    //     setVoucherTypes(res.data.result);
    //   }
    // });
  }, []);

  const toggleModal = (voucher = null) => {
    setSelectedVoucher(voucher);
    setShowModal(!showModal);
  };

  const showDeleteConfirm = (voucherId) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa voucher này?",
      content: "Hành động này không thể hoàn tác.",
      onOk: async () => {
        try {
          handleDelete(voucherId);
          notification.success({
            message: "Thành công",
            description: `Xóa thành công!`,
            placement: "top",
          });
        } catch (error) {
          console.log(error);
          notification.error({
            message: "Lỗi",
            description: "Có lỗi xảy ra khi xóa voucher",
            placement: "top",
          });
        }
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: {
        style: {
          backgroundColor: "#46B5C1",
          borderColor: "#46B5C1",
        },
      },
      cancelButtonProps: {
        style: {
          backgroundColor: "#FF4D4F",
          borderColor: "#FF4D4F",
          color: "#FFFFFF",
        },
      },
      cancelText: "Đóng",
      okText: "Đồng ý",
    });
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date_input = new Date(selectedVoucher.expire_date);
    date_input.setDate(date_input.getDate() + 1);
    const updatedVoucher = {
      voucher_type: Number(selectedVoucher.voucher_type),
      membership: Number(selectedVoucher.membership),
      expire_date: date_input.toISOString(),
      discount: Number(selectedVoucher.discount),
      amount: Number(selectedVoucher.amount),
    };
    // await fetchUpdateVoucher(updatedVoucher, token, selectedVoucher._id)
    //   .then((res) => {
    //     sessionStorage.setItem("update", "true");
    //     setShowModal(false);
    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     toast.error("Cập nhật thất bại", {
    //       position: "top-right",
    //     });
    //   });
  };

  const handleDelete = async (voucherId) => {
    // await fetchDeleteVoucher(voucherId, token)
    //   .then((res) => {
    //     sessionStorage.setItem("delete", "true");
    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.error("Xóa voucher thất bại", {
    //       position: "top-right",
    //     });
    //   });
  };

  if (loading) {
    return <Loading />;
  }

  if (sessionStorage.getItem("update") === "true") {
    notification.success({
      message: "Thành công",
      description: "Mã giảm giá cập nhật thành công!",
      placement: "top",
    });
    sessionStorage.removeItem("update");
  }

  if (sessionStorage.getItem("delete") === "true") {
    notification.success({
      message: "Thành công",
      description: "Xóa mã giảm giá thành công!",
      placement: "top",
    });
    sessionStorage.removeItem("delete");
  }
  const columns = [
    {
      title: "Mã Voucher",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <div className="text-base font-semibold">{text}</div>,
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expire_date",
      key: "expire_date",
      render: (text) => formatDate(text),
      sorter: (a, b) => new Date(a.expire_date) - new Date(b.expire_date),
    },
    {
      title: "Membership",
      dataIndex: "membership",
      key: "membership",
      render: (value) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value),
      sorter: (a, b) => a.membership - b.membership,
    },
    {
      title: "Mức giảm giá (VND)",
      dataIndex: "discount",
      key: "discount",
      render: (value) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value),
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Loại Voucher",
      dataIndex: "voucher_type",
      key: "voucher_type",
      render: (type) => (type === 0 ? "User" : "Member"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="link"
            onClick={() => toggleModal(record)}
            style={{
              backgroundColor: "#55B6C3",
              fontSize: "5px",
            }}
          >
            Chỉnh sửa
          </Button>
          <Button
            type="link"
            onClick={() => showDeleteConfirm(record._id)}
            style={{
              backgroundColor: "#ff4d4f",
              fontSize: "5px",
            }}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <Card
          title={<h2 className="text-2xl font-bold">Tất cả voucher</h2>}
          style={{
            width: "90%",
            maxWidth: "70wh",
            margin: "30px auto",
            height: "full",
          }}
        >
          <div className="mb-4 flex items-center justify-between">
            <Button
              type="default"
              onClick={() => navigate(`/add-voucher`)}
              style={{ backgroundColor: "#55B6C3", fontSize: "10px" }}
            >
              Thêm voucher
            </Button>
          </div>
          <Table
            columns={columns}
            dataSource={vouchers}
            rowKey={(record) => record._id}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: vouchers.length,
              onChange: (page, pageSize) => {
                setCurrentPage(page);
                setPageSize(pageSize);
              },
            }}
            className="w-full text-left text-sm text-gray-500 rtl:text-right"
          />
        </Card>

        {showModal && selectedVoucher && (
          <div
            id="editUserModal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0"
          >
            <div className="relative max-h-full w-full max-w-2xl">
              {/* Modal content */}
              <form
                className="relative rounded-lg bg-white shadow"
                onSubmit={handleSubmit}
              >
                {/* Modal header */}
                <div className="flex items-start justify-between rounded-t border-b p-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Chỉnh sửa mã voucher
                  </h3>
                  <button
                    type="button"
                    className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                    onClick={toggleModal}
                  >
                    <svg
                      className="h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <div className="space-y-6 p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="category"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Loại Voucher
                      </label>
                      <Select
                        id="category"
                        className="w-full rounded"
                        onChange={(e) =>
                          setSelectedVoucher({
                            ...selectedVoucher,
                            voucher_type: e.target.value,
                          })
                        }
                        value={selectedVoucher.voucher_type}
                        required
                      >
                        <option value="" disabled>
                          Chọn Loại Voucher
                        </option>
                        {voucherTypes.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="amount"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Số lượng
                      </label>
                      <TextInput
                        id="amount"
                        type="number"
                        min={0}
                        value={selectedVoucher.amount}
                        name="amount"
                        placeholder="Số lượng..."
                        onChange={(e) =>
                          setSelectedVoucher({
                            ...selectedVoucher,
                            amount: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="memberShip"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        MemberShip (Đổi bằng bao nhiêu điểm)
                      </label>
                      <TextInput
                        id="memberShip"
                        type="number"
                        name="memberShip"
                        placeholder="MemberShip..."
                        min={0}
                        value={selectedVoucher.membership}
                        onChange={(e) =>
                          setSelectedVoucher({
                            ...selectedVoucher,
                            membership: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="discount"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Mức giảm giá (VND)
                      </label>
                      <TextInput
                        id="discount"
                        type="number"
                        min={0}
                        name="discount"
                        value={selectedVoucher.discount}
                        placeholder="Mức giảm giá..."
                        onChange={(e) =>
                          setSelectedVoucher({
                            ...selectedVoucher,
                            discount: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="expire_date"
                        className="mb-2 block text-sm font-medium text-gray-900"
                      >
                        Ngày hết hạn
                      </label>
                      <Datepicker
                        language="vi"
                        defaultDate={new Date(selectedVoucher.expire_date)}
                        onSelectedDateChanged={(date) =>
                          setSelectedVoucher({
                            ...selectedVoucher,
                            expire_date: date,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
                {/* Modal footer */}
                <div className="flex items-center space-x-3 rounded-b border-t border-gray-200 p-6 rtl:space-x-reverse">
                  <Button
                    type="submit"
                    className="bg-blue-700 text-white hover:bg-blue-800"
                  >
                    Lưu thay đổi
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Vouchers;
