import { Modal, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { fetchUploadReplyFeedback } from "../../data/api";

const ReplyFeedback = ({
  modalOpen,
  setModalOpen,
  selectedFeedback,
  response,
  setResponse,
}) => {
  // !!Fetch Uploadfeedback!!
  const handleOk = async () => {
    const token = localStorage.getItem("accessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    await fetchUploadReplyFeedback(
      user.id,
      selectedFeedback.id,
      response,
      token,
    )
      .then((res) => {
        notification.success({
          message: "Trả lời thành công",
          placement: "top",
        });
        setModalOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
