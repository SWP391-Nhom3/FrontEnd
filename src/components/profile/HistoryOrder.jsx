import { FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { fetchOrders } from "../../data/api";
import { Link } from "react-router-dom";
import Loader from "../../assets/loading2.gif";

const HistoryOrder = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    orderId: "",
    minPrice: "",
    maxPrice: "",
    fromDate: "",
    toDate: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const products = JSON.parse(localStorage.getItem("products")) || [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const getProductName = (productId) => {
    const product = products.find((product) => product._id === productId);
    return product ? product.product_name : "Unknown Product";
  };
  useEffect(() => {
    const getOrders = async () => {
      try {
        const orderData = await fetchOrders();
        const filteredData = orderData.data.filter((order) => {
          if (order.member) {
            return order.member.id === user.id;
          } else {
            return false;
          }
        });

        setOrders(filteredData);
        setFilteredOrders(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleFilter = () => {
    let updatedOrders = [...orders];

    if (filters.orderId) {
      updatedOrders = updatedOrders.filter((item) =>
        item.id.includes(filters.orderId),
      );
    }

    if (filters.minPrice) {
      updatedOrders = updatedOrders.filter(
        (item) => item.totalPrice >= Number(filters.minPrice),
      );
    }

    if (filters.maxPrice) {
      updatedOrders = updatedOrders.filter(
        (item) => item.totalPrice <= Number(filters.maxPrice),
      );
    }

    if (filters.fromDate) {
      updatedOrders = updatedOrders.filter(
        (item) => new Date(item.requiredDate) >= new Date(filters.fromDate),
      );
    }

    if (filters.toDate) {
      updatedOrders = updatedOrders.filter(
        (item) => new Date(item.requiredDate) <= new Date(filters.toDate),
      );
    }

    setFilteredOrders(updatedOrders);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <img src={Loader} alt="loading" />
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Lịch sử đơn hàng</h1>
        <p>Hiển thị thông tin các sản phẩm bạn đã mua tại MilkJoy Shop</p>
      </div>
      <hr className="my-4" />
      <div className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="Mã đơn hàng"
            name="orderId"
            value={filters.orderId}
            onChange={handleFilterChange}
            className="w-1/6 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="number"
            placeholder="Số tiền từ"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            className="w-1/6 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="number"
            placeholder="Số tiền đến"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            className="w-1/6 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="date"
            placeholder="Từ ngày"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
            className="w-1/6 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <input
            type="date"
            placeholder="Đến ngày"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
            className="w-1/6 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            className="flex items-center rounded-md bg-primary-500 p-2 text-white hover:bg-primary-600"
            onClick={handleFilter}
          >
            <FaFilter className="mr-2" />
            Lọc
          </button>
        </div>
        <div className="overflow-x-auto">
          <Table hoverable className="border">
            <Table.Head>
              <Table.HeadCell className="w-1/24 border">
                Ngày đặt
              </Table.HeadCell>
              <Table.HeadCell className="w-1/24 border">
                Mã đơn hàng
              </Table.HeadCell>
              <Table.HeadCell className="w-5/12 border">
                Sản phẩm
              </Table.HeadCell>
              <Table.HeadCell className="w-2/12 border">
                Tổng tiền
              </Table.HeadCell>
              <Table.HeadCell className="w-3/12 border">
                Trạng thái
              </Table.HeadCell>
              <Table.HeadCell className="w-2/12 border">
                <span className="sr-only">Chi tiết</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <Table.Row
                    key={item.requiredDate}
                    className="border bg-white"
                  >
                    <Table.Cell className="whitespace-nowrap border font-medium text-gray-900">
  {item.requiredDate ? formatDate(item.requiredDate) : formatDate(item.createdAt)}
</Table.Cell>

                    <Table.Cell className="whitespace-nowrap border font-medium text-gray-900">
                      {item.id}
                    </Table.Cell>
                    <Table.Cell className="border">
                      {item.orderDetails.map((detail) => (
                        <p className="mb-3 text-gray-900" key={detail.id}>
                          - {detail.product.name}
                        </p>
                      ))}
                    </Table.Cell>
                    <Table.Cell className="border">
                      {Number(item.totalPrice).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border font-medium text-gray-900">
                      {item.orderStatus.name}
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        to="/order-detail-customer"
                        state={{ order: item }}
                        onClick={() => window.scrollTo(0, 0)}
                        className="font-medium text-cyan-600 hover:underline"
                      >
                        Chi tiết
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="6" className="text-center">
                    Bạn chưa mua đơn hàng nào hết!
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
        <div className="mx-4 mt-6 flex items-center justify-end space-x-1">
          <button
            onClick={handlePrevClick}
            className={`rounded border px-2 py-1 ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-300"
                : "bg-white text-primary-500"
            }`}
            disabled={currentPage === 1}
          >
            <FaChevronLeft className="h-6" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handleClick(index + 1)}
              className={`rounded border px-3 py-1 ${
                index + 1 === currentPage
                  ? "bg-primary-500 text-white"
                  : "bg-white text-primary-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextClick}
            className={`rounded border px-2 py-1 ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-300"
                : "bg-white text-primary-500"
            }`}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight className="h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryOrder;
