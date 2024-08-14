import { Button, Table, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import Loader from "../../assets/loading2.gif";
import { FaFilter } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
// import { fetchDeleteFeedback, fetchGetFeedbackByUser, fetchUpdateFeedback } from "../../data/api";
import RenderRating from "../elements/RenderRating";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import toast from "react-hot-toast";

const Feedback = () => {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [filter, setFilter] = useState([]);
  const [textFilter, setTextFilter] = useState("");
  const [startFilter, setStartFilter] = useState("");
  const [endFilter, setEndFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const products = JSON.parse(localStorage.getItem("products"));
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const token = JSON.parse(localStorage.getItem("result"));

  // useEffect(() => {
  //   const findProductById = (product_id) => {
  //     return products.find((product) => product._id === product_id);
  //   };

  //   const getReviews = async () => {
  //     try {
  //       //!! FETCH FEEDBACK BY USER !!
  //       // const feedbackData = await fetchGetFeedbackByUser(user._id);
  //       const reviews = feedbackData.data.result;

  //       const updatedReviews = await Promise.all(
  //         reviews.map(async (item) => {
  //           const product = findProductById(item.product_id);
  //           return { ...item, product };
  //         })
  //       );

  //       setReviews(updatedReviews);
  //       setFilter(updatedReviews);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };

  //   getReviews();
  // }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const openFeedbackModal = (feedback) => {
    setCurrentFeedback(feedback);
    setShowModal(true);
  };

  const closeFeedbackModal = () => {
    setShowModal(false);
    setCurrentFeedback(null);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleFeedbackChange = (e) => {
    setCurrentFeedback({ ...currentFeedback, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (newRating) => {
    setCurrentFeedback({ ...currentFeedback, rating: newRating });
  };
  //!! SUBMIT FEEDBACK !!
  // const submitFeedback = async () => {
  //   if (currentFeedback.rating === 0 || currentFeedback.description === "") {
  //     toast.error("Vui lòng nhập đủ thông tin đánh giá và mô tả sản phẩm.");
  //     return;
  //   }
  //   await fetchUpdateFeedback(currentFeedback._id, currentFeedback, token)
  //     .then(() => {
  //       toast.success("Cập nhật thành công");
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error("Cập nhật thất bại");
  //     });
  //   closeFeedbackModal();
  // };
  //!! FETCH DELETE FEEDBACK!!
  // const deleteFeedback = async () => {
  //   await fetchDeleteFeedback(currentFeedback._id, token)
  //     .then(() => {
  //       toast.success("Xóa đánh giá thành công");
  //       window.location.reload();
  //     })
  //     .catch(() => {
  //       toast.error("Xóa đánh giá thất bại");
  //     });
  //   closeDeleteModal();
  //   closeFeedbackModal();
  // };

  const handleSubmitFilter = (e) => {
    e.preventDefault();
    let filteredReviews = reviews;

    if (textFilter) {
      filteredReviews = filteredReviews.filter((review) =>
        review.description.toLowerCase().includes(textFilter.toLowerCase()),
      );
    }

    if (startFilter) {
      filteredReviews = filteredReviews.filter(
        (review) => new Date(review.created_at) >= new Date(startFilter),
      );
    }

    if (endFilter) {
      filteredReviews = filteredReviews.filter(
        (review) => new Date(review.created_at) <= new Date(endFilter),
      );
    }

    setFilter(filteredReviews);
    setCurrentPage(1); // Reset to first page when applying filters
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filter.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filter.length / itemsPerPage);

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
        <h1 className="text-2xl font-semibold">Bình luận của tôi</h1>
        <p>Hiển thị thông tin các đánh giá của bạn tại MomBabyMilk Shop</p>
      </div>
      <hr className="my-4" />
      <div className="space-y-4">
        <form className="flex space-x-4" onSubmit={handleSubmitFilter}>
          <input
            type="text"
            placeholder="Nội dung đánh giá..."
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
            className="w-3/6 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Từ ngày"
            value={startFilter}
            onChange={(e) => setStartFilter(e.target.value)}
            className="w-1/6 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            placeholder="Đến ngày"
            value={endFilter}
            onChange={(e) => setEndFilter(e.target.value)}
            className="w-1/6 rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="flex items-center rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
          >
            <FaFilter className="mr-2" />
            Lọc
          </button>
        </form>
        <div className="overflow-x-auto">
          <Table hoverable className="border">
            <Table.Head>
              <Table.HeadCell className="w-1/7 border">
                Ngày viết
              </Table.HeadCell>
              <Table.HeadCell className="w-2/7 border">Nội dung</Table.HeadCell>
              <Table.HeadCell className="w-1/7 border">Đánh giá</Table.HeadCell>
              <Table.HeadCell className="w-2/7 border">
                Trả lời từ MomBabyMilk
              </Table.HeadCell>
              <Table.HeadCell className="w-1/7 border">
                <span className="sr-only"></span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <Table.Row key={item._id} className="border bg-white">
                    <Table.Cell className="whitespace-nowrap border font-medium text-gray-900">
                      {formatDate(item.created_at)}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border font-medium text-gray-900">
                      {item.description}
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border font-medium text-gray-900">
                      <RenderRating rating={item.rating} />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap border font-medium text-gray-900">
                      {item.reply_feedback !== null
                        ? item.reply_feedback.description
                        : ""}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        color="light"
                        size={"md"}
                        className="mx-auto"
                        onClick={() => openFeedbackModal(item)}
                      >
                        Chi tiết
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="7" className="text-center">
                    Bạn chưa đánh giá sản phẩm nào hết!
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
                : "bg-white text-blue-500"
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
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
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
                : "bg-white text-blue-500"
            }`}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight className="h-6" />
          </button>
        </div>
      </div>

      {currentFeedback && (
        <Modal show={showModal} onClose={closeFeedbackModal}>
          <Modal.Header className="text-xl font-semibold">
            Đánh giá sản phẩm:
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <img
                  src={currentFeedback.product.imgUrl}
                  alt={currentFeedback.product.product_name}
                  className="mx-auto h-32 w-32 object-cover"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700 dark:text-gray-200">
                  Tên sản phẩm:
                </label>
                <input
                  type="text"
                  value={currentFeedback.product.product_name}
                  className="mt-1 w-full rounded border p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-gray-700 dark:text-gray-200">
                  Nội dung feedback:
                </label>
                <textarea
                  name="description"
                  className="mt-1 w-full rounded border p-2"
                  rows="5"
                  value={currentFeedback.description}
                  onChange={handleFeedbackChange}
                />
              </div>
              <div className="flex items-center">
                <label className="mr-4 block text-xl font-medium text-gray-700 dark:text-gray-200">
                  Đánh giá:
                </label>
                <RenderRating
                  rating={currentFeedback.rating}
                  onRatingChange={handleRatingChange}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button color="blue" size={"md"} onClick={submitFeedback}>
              <RxUpdate className="mr-1 text-lg" /> Cập nhật
            </Button>
            <Button color="failure" size={"md"} onClick={openDeleteModal}>
              <AiOutlineDelete className="mr-1 text-lg" /> Xóa
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal show={showDeleteModal} onClose={closeDeleteModal}>
        <Modal.Header className="text-xl font-semibold">
          Xác nhận xóa đánh giá
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn xóa đánh giá này không?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="failure" size={"md"} onClick={deleteFeedback}>
            Xóa
          </Button>
          <Button color="gray" size={"md"} onClick={closeDeleteModal}>
            Hủy bỏ
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Feedback;
