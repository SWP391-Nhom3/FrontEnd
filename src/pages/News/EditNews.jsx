import React, { useEffect, useState, useRef } from "react";
import { Button } from "flowbite-react";
import { imageDb } from "../../data/firebase.config";
// import {
//   deleteObject,
//   getDownloadURL,
//   listAll,
//   ref,
//   uploadBytes,
// } from "firebase/storage";
import { v4 } from "uuid";
import {
  fetchAllUsers,
  fetchNewsByID,
  fetchProducts,
  fetchUploadNews,
} from "../../data/api";
import { Col, Input, notification, Row, Select, Upload } from "antd";
import { Card } from "primereact/card";

import { useLocation, useNavigate } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";

import {
  InlineEditor,
  AccessibilityHelp,
  Autosave,
  Bold,
  Code,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  Highlight,
  Italic,
  Paragraph,
  RemoveFormat,
  SelectAll,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Undo,
} from "ckeditor5";

import "./ckeditor.css";
import { PlusOutlined } from "@ant-design/icons";
import { HStack } from "@chakra-ui/react";

const EditNews = () => {
  const [products, setProducts] = useState([]);

  const [selectedProductId, setSelectedProductId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [isChanged, setIsChanged] = useState(false);
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [user_id, setUser_id] = useState("");
  const [dayCreated, setDayCreated] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = location.state?.id;
  const [news, setNews] = useState(null);
  const [imgUrlOld, setImgUrlOld] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const { Option } = Select;

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const editorConfig = {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "selectAll",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "subscript",
        "superscript",
        "code",
        "removeFormat",
        "|",
        "specialCharacters",
        "highlight",
        "|",
        "accessibilityHelp",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autosave,
      Bold,
      Code,
      Essentials,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Highlight,
      Italic,
      Paragraph,
      RemoveFormat,
      SelectAll,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Subscript,
      Superscript,
      Underline,
      Undo,
    ],
    fontFamily: {
      supportAllValues: true,
    },
    fontSize: {
      options: [10, 12, 14, "default", 18, 20, 22],
      supportAllValues: true,
    },
    initData: content,
    placeholder: "Type or paste your content here!",
  };

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangeSelectedProduct = (value) => {
    setSelectedProductId(value);
    console.log(selectedProductId);
  };

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };
  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await fetchNewsByID(id);
        const newsData = response;
        setNews(newsData);
        setTitle(newsData.title);
        setContent(newsData.content);
        setSelectedProductId(newsData.product.id);
        setImgUrlOld(newsData.imgUrl);
        if (newsData.imgUrl) {
          setFileList([
            {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: newsData.imgUrl,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [id]);

  const handleChange = ({ fileList: newFileList }) => {
    setIsChanged(true);
    setFileList(newFileList.slice(-1));
    if (newFileList.length > 0) {
      setImg(newFileList[0].originFileObj);
    } else {
      setImg(null);
    }
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
      <div>
        <link
          rel="stylesheet"
          href="https://cdn.ckeditor.com/ckeditor5/42.0.0/ckeditor5.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.ckeditor.com/ckeditor5-premium-features/42.0.0/ckeditor5-premium-features.css"
        />
      </div>
      <Card
        title={<h2 className="text-2xl font-bold">Chi tiết bài viết</h2>}
        style={{
          width: "90%",
          maxWidth: "70wh",
          margin: "30px auto",
          minHeight: "70vh",
        }}
      >
        <form>
          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="image"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Hình ảnh
              </label>
            </Col>
            <Col span={18}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={() => false}
              >
                {fileList.length >= 1 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải hình ảnh</div>
                  </div>
                )}
              </Upload>
            </Col>
          </Row>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="news_name"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Tiêu đề
              </label>
            </Col>
            <Col span={18}>
              <Input
                value={title}
                onChange={handleChangeTitle}
                className="w-full"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
              />
            </Col>
          </Row>
          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="product_id"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Tên sản phẩm
              </label>
            </Col>
            <Col span={18}>
              <Select
                value={selectedProductId}
                onChange={handleChangeSelectedProduct}
                className="w-full"
                style={{
                  height: "50px",
                  fontSize: "15px",
                  border: "1px solid #6b7280",
                  borderRadius: "0.375rem",
                }}
              >
                {products.map((product) => (
                  <Option key={product.id} value={product.id}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={product.coverImageUrl}
                        style={{ width: 20, height: 20, marginRight: 10 }}
                        alt={product.name}
                      />
                      {product.name}
                    </div>
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>

          <Row
            justify="space-around"
            align="middle"
            style={{ marginBottom: "40px", marginTop: "20px" }}
          >
            <Col span={4}>
              <label
                htmlFor="description"
                style={{
                  fontSize: "17px",
                  color: "#1F5070",
                  fontWeight: "bold",
                }}
              >
                Mô tả
              </label>
            </Col>
            <Col span={18}>
              {isLayoutReady && (
                <CKEditor
                  editor={InlineEditor}
                  data={content}
                  config={editorConfig}
                  onChange={handleEditorChange}
                />
              )}
            </Col>
          </Row>

          <Row justify="center" align="middle">
            <HStack spacing={10}>
              <Button
                type="default"
                onClick={() => navigate("/all-blog")}
                style={{
                  borderColor: "#55B6C3",
                  color: "#55B6C3",
                  fontSize: "10px",
                  backgroundColor: "white",
                }}
              >
                Quay về trang danh sách
              </Button>
            </HStack>
          </Row>
        </form>
      </Card>
    </div>
  );
};

export default EditNews;
