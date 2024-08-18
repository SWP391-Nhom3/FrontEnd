import { Modal, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
// import { fetchUploadFeedback } from "../../data/api";

const ReplyFeedback = ({
  modalOpen,
  setModalOpen,
  selectedFeedback,
  response,
  setResponse,
}) => {
  // !!Fetch Uploadfeedback!!
  // const handleOk =async () => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   const token = JSON.parse(localStorage.getItem("result"));
  //   console.log("Phản hồi:", response);
  //   setModalOpen(false);
  //   setResponse("");
  //   console.log(selectedFeedback);
  //   const data = {
  //     feedback_id: selectedFeedback._id,
  //     product_id: selectedFeedback.product_id,
  //     description: response,
  //     rating: selectedFeedback.rating,
  //     user_id: user._id,
  //   };
  //   console.log(data);
  //   await fetchUploadFeedback(data, token).then((res) => {
  //     console.log(res.data);
  //     console.log("uyeh reply xong rồi");
  //     window.location.reload();
  //     notification.success({
  //       message: "Trả lời thành công",
  //       placement: 'top',
  //     })
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // };

  const handleCancel = () => {
    setModalOpen(false);
    setResponse("");
  };
  return (
    <Modal
      title="Trả lời đánh giá"
      centered
      open={modalOpen}
      onCancel={handleCancel}
      onOk={handleOk}
      okText="Gửi câu trả lời"
      cancelText="Đóng"
      okButtonProps={{
        style: {
          backgroundColor: "#46B5C1",
          borderColor: "#46B5C1",
        },
      }}
      cancelButtonProps={{
        style: {
          backgroundColor: "#FF4D4F",
          borderColor: "#FF4D4F",
          color: "#FFFFFF",
        },
      }}
    >
      <p>Trả lời đánh giá của: {selectedFeedback.username}</p>
      <TextArea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        rows={4}
        placeholder="Nhập câu trả lời của bạn"
      />
    </Modal>
  );
};

export default ReplyFeedback;
