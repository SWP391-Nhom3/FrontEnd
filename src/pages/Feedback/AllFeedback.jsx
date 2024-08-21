import {
  Avatar,
  Badge,
  Button,
  Card,
  List,
  Rate,
  Table,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { fetchAllReplyFeedback } from "../../data/api";
import ReplyFeedback from "../../components/Feedback/ReplyFeedback";
import Loading from "../../components/Loading";
import { Comment } from "@ant-design/compatible";

const AllFeedback = () => {
  const [products, setProducts] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [response, setResponse] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

  const { Text } = Typography;

  const handleExpand = (expanded, record) => {
    const keys = expanded ? [record.id] : [];
    setExpandedRowKeys(keys);
  };
  //!! FETCH Product, allfeedback, allusers !!
  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbackData = await fetchAllReplyFeedback();
        setFeedback(feedbackData.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  const columns = [
    {
      title: "Hình Ảnh Sản Phẩm",
      dataIndex: "coverImageUrl",
      key: "coverImageUrl",
      render: (text, record) => (
        <img
          src={record.review.product.coverImageUrl}
          alt="product"
          style={{ width: 100, height: 100 }}
        />
      ),
      width: "20%",
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "product_name",
      key: "product_name",
      render: (text, record) => (
        <span style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
          {record.review.product.name}
        </span>
      ),
      width: "40%",
    },
    // {
    //   title: "Đánh Giá Mới Nhất",
    //   dataIndex: "comment",
    //   key: "comment",
    //   render: (text, record) => {
    //     return <span>{formatDate(record.comment)}</span>;
    //   },
    //   sorter: (a, b) =>
    //     new Date(a.comment) - new Date(b.comment),
    //   width: "20%",
    // },
    {
      title: "Đánh Giá",
      dataIndex: "rating",
      key: "rating",
      render: (text, record) => {
        return (
          <div>
            <Rate allowHalf disabled value={record.review.rating} />
            <div>{record.review.rating.toFixed(1)} / 5 ( đánh giá)</div>
          </div>
        );
      },
      width: "20%",
      fontSize: "20px",
    },
  ];

  const renderComments = (feedback) => {
    return (
      <Comment
        author={
          <Text type="secondary" style={{ fontSize: "15px" }}>
            {feedback.review.user.firstName || "Không xác định"}
          </Text>
        }
        avatar={
          <Avatar>{feedback.review.user.firstName.charAt(0) || "?"}</Avatar>
        }
        content={
          <>
            <span
              style={{
                fontSize: "15px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
                {feedback.review.comment}
              </p>
            </span>
          </>
        }
        datetime={formatDate(feedback.review.createdAt)}
        actions={[
          <Button
            type="default"
            onClick={() => {
              setSelectedFeedback(feedback);
              setModalOpen(true);
            }}
            style={{
              backgroundColor: "#55B6C3",
              fontSize: "15px",
              color: "white",
            }}
            disabled={feedback.replyText}
          >
            Trả lời
          </Button>,
        ]}
      >
        {feedback.replyText && renderReplies(feedback)}
      </Comment>
    );
  };

  const renderReplies = (feedback) => {
    return (
      <Comment
        author={
          <Text type="secondary" style={{ fontSize: "15px" }}>
            {feedback.user.firstName || "Không xác định"}
          </Text>
        }
        avatar={<Avatar>{feedback.user.firstName?.charAt(0) || "?"}</Avatar>}
        content={
          <p style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
            {feedback.replyText}
          </p>
        }
        datetime={formatDate(feedback.createdAt)}
      />
    );
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

  const expandedRowRender = (record) => {
    return <div>{renderComments(record)}</div>;
  };
  return (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
    >
      <Card
        title={<h2 className="text-2xl font-bold">Tất cả đánh giá</h2>}
        style={{
          width: "90%",
          maxWidth: "70wh",
          margin: "30px auto",
          minHeight: "70vh",
        }}
      >
        <Table
          columns={columns}
          dataSource={feedback}
          expandable={{
            expandedRowRender,
            rowExpandable: (record) => record,
            expandedRowKeys,
            onExpand: handleExpand,
          }}
          rowKey="id"
        />
        {modalOpen && (
          <ReplyFeedback
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            selectedFeedback={selectedFeedback}
            response={response}
            setResponse={setResponse}
          />
        )}
      </Card>
    </div>
  );
};

export default AllFeedback;
