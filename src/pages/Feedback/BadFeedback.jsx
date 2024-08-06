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
// import { fetchAllFeedback, fetchAllUsers, fetchProducts } from "../../data/api";
import ReplyFeedback from "../../components/Feedback/ReplyFeedback";
import Loading from "../../components/Loading";
import { Comment } from "@ant-design/compatible";

const BadFeedback = () => {
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
    const keys = expanded ? [record._id] : [];
    setExpandedRowKeys(keys);
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const [productData, feedbackData, usersData] = await Promise.all([
    //       fetchProducts(),
    //       fetchAllFeedback(),
    //       fetchAllUsers(JSON.parse(localStorage.getItem("result"))),
    //     ]);
    //     setProducts(productData);
    //     setFeedback(feedbackData.data.result);
    //     setUsers(usersData.data.users);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //     setLoading(false);
    //   }
    // };
    // fetchData();
  }, []);

  useEffect(() => {
    if (products.length > 0 && feedback.length > 0 && users.length > 0) {
      const mergedProducts = products
        .map((product) => {
          const productFeedback = feedback
            .filter((item) => item.product_id === product._id)
            .map((fb) => {
              const user = users.find((user) => user._id === fb.user_id);
              if (!user) {
                console.warn(`No user found for user_id: ${fb.user_id}`);
              }
              let replyFeedbackWithUsername = null;
              if (fb.reply_feedback) {
                const replyUser = users.find(
                  (user) => user._id === fb.reply_feedback.user_id,
                );
                replyFeedbackWithUsername = {
                  ...fb.reply_feedback,
                  username: replyUser ? replyUser.username : "Unknown",
                };
              }

              return {
                ...fb,
                username: user ? user.username : "Unknown",
                reply_feedback: replyFeedbackWithUsername,
              };
            });
          if (productFeedback.length > 0) {
            const latestFeedback = productFeedback.reduce((latest, current) => {
              return new Date(latest.created_at) > new Date(current.created_at)
                ? latest
                : current;
            }, productFeedback[0]);

            const latestFeedbackDate = new Date(
              latestFeedback.created_at,
            ).toISOString();
            return {
              ...product,
              feedback: productFeedback,
              latestFeedbackDate,
            };
          } else {
            return null;
          }
        })
        .filter((product) => product !== null);

      setProducts(mergedProducts);
    }
  }, [feedback, users]);

  if (loading) {
    return <Loading />;
  }

  const columns = [
    {
      title: "Hình Ảnh Sản Phẩm",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (text, record) => (
        <img
          src={record.imgUrl}
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
          {record.product_name}
        </span>
      ),
      width: "40%",
    },
    {
      title: "Đánh Giá Mới Nhất",
      dataIndex: "latestFeedbackDate",
      key: "latestFeedbackDate",
      render: (text, record) => {
        return <span>{formatDate(record.latestFeedbackDate)}</span>;
      },
      sorter: (a, b) =>
        new Date(a.latestFeedbackDate) - new Date(b.latestFeedbackDate),
      width: "20%",
    },
    {
      title: "Đánh Giá",
      dataIndex: "rating",
      key: "rating",
      render: (text, record) => {
        const noReply = record.feedback
          ? record.feedback.filter((fb) => !fb.reply_feedback).length
          : 0;
        return (
          <div>
            <Rate allowHalf disabled value={record.rating} />
            <div>
              {record.rating.toFixed(1)} / 5 ({record.reviewer} đánh giá)
            </div>
            {noReply > 0 && (
              <Badge count={noReply} style={{ backgroundColor: "#f5222d" }} />
            )}
          </div>
        );
      },
      width: "20%",
      fontSize: "20px",
    },
  ];

  const expandedRowRender = (record) => {
    return <div>{renderComments(record.feedback)}</div>;
  };
  const renderComments = (feedback) => {
    return (
      <List
        dataSource={feedback}
        itemLayout="horizontal"
        renderItem={(item) => (
          <Comment
            author={
              <Text type="secondary" style={{ fontSize: "15px" }}>
                {item.username || "Không xác định"}
              </Text>
            }
            avatar={<Avatar>{item.username.charAt(0) || "?"}</Avatar>}
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
                    {item.description}
                  </p>
                  <div style={{ marginRight: "10%" }}>
                    <Rate
                      style={{ fontSize: "20px" }}
                      disabled
                      defaultValue={item.rating}
                    />
                  </div>
                </span>
              </>
            }
            datetime={formatDate(item.created_at)}
            actions={[
              // eslint-disable-next-line react/jsx-key
              <Button
                type="default"
                onClick={() => {
                  setSelectedFeedback(item);
                  setModalOpen(true);
                }}
                style={{
                  backgroundColor: "#55B6C3",
                  fontSize: "15px",
                  color: "white",
                }}
                disabled={item.reply_feedback}
              >
                Trả lời
              </Button>,
            ]}
          >
            {item.reply_feedback && renderReplies(item.reply_feedback)}
          </Comment>
        )}
      />
    );
  };

  const renderReplies = (reply) => {
    return (
      <Comment
        author={
          <Text type="secondary" style={{ fontSize: "15px" }}>
            {reply.username || "Không xác định"}
          </Text>
        }
        avatar={<Avatar>{reply.username?.charAt(0) || "?"}</Avatar>}
        content={
          <p style={{ wordBreak: "break-word", whiteSpace: "normal" }}>
            {reply.description}
          </p>
        }
        datetime={formatDate(reply.created_at)}
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

  return (
    <div
      style={{ display: "flex", justifyContent: "center", minHeight: "100vh" }}
    >
      <Card
        title={<h2 className="text-2xl font-bold">Đánh giá tiêu cực</h2>}
        style={{
          width: "90%",
          maxWidth: "70wh",
          margin: "30px auto",
          minHeight: "70vh",
        }}
      >
        <Table
          columns={columns}
          dataSource={products.filter((product) => product.rating < 3)}
          expandable={{
            expandedRowRender,
            rowExpandable: (record) =>
              record.feedback && record.feedback.length > 0,
            expandedRowKeys,
            onExpand: handleExpand,
          }}
          rowKey="_id"
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

export default BadFeedback;
