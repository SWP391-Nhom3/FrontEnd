import React, { useEffect, useState, useRef } from "react";
import { Button, TextInput } from "flowbite-react";
import { imageDb } from "../../data/firebase.config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
// import {
//   fetchProducts,
//   fetchUpdateNews,
//   fetchUploadNews,
// } from "../../data/api";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Col, Input, notification, Row, Select, Upload } from "antd";
import { Card } from 'primereact/card'
import { PlusOutlined } from '@ant-design/icons';
import { HStack } from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
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

const AddNews = () => {
  const [news_name, setNews_name] = useState("");

  const [products, setProducts] = useState([]);

  const [description, setDescription] = useState("");

  const [selectedProductId, setSelectedProductId] = useState("");

  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);

  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState('');

  const { Option } = Select;

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
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
    placeholder: "Type or paste your content here!",
  };

  const token = JSON.parse(localStorage.getItem("result"));

  useEffect(() => {
    // Gọi API để lấy dữ liệu category
    // fetchProducts()
    //   .then((data) => {
    //     console.log(data);
    //     setProducts(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // Gọi API để lấy dữ liệu brand

    listAll(ref(imageDb, "files")).then((imgs) => {
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl(url);
        });
      });
    });
  }, []);

  useEffect(() => {
    // Lấy ngày và thời gian hiện tại
    const now = new Date();
    const formattedDateTime = now.toLocaleString();

    setCurrentDateTime(formattedDateTime);

    // Lấy thông tin người dùng từ local storage

    const user = JSON.parse(localStorage.getItem("user"));
    setUsername(user.username);

  }, []);


  const handleChangeSelectedProduct = (value) => {
    setSelectedProductId(value);
    console.log(selectedProductId);
  };

  const handleChangeNewsName = (event) => {
    setNews_name(event.target.value);
  };

  async function uploadImage(news, id) {
    if (img !== null) {
      const imgRef = ref(imageDb, `news_img/${v4()}`);
      const snapshot = await uploadBytes(imgRef, img);
      const url = await getDownloadURL(snapshot.ref);

      news.img_url = url;
      await sendURL(news, id);
    }
  }
  //!! FETCH UPDATE NEW!!
  // const sendURL = async (news, id) => {
  //   return await fetchUpdateNews(news, token, id);
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const news = {
      product_id: selectedProductId,
      news_name,
      description,
    };
    // !! FETCH UPLOAD NEWS !!
    // await fetchUploadNews(news, token)
    //   .then(async (res) => {
    //     console.log(res.data);
    //     const id = res.data.result.insertedId;
    //     await uploadImage(news, id);
    //   })
    //   .then((data) => {
    //     notification.success({
    //       message: "Thêm bài viết thành công!",
    //       placement: "top",
    //     });
    //     form.reset();
    //     setDescription("");
    //     setNews_name("");
    //     setSelectedProductId("");
    //     setFileList([]);
    //   })
    //   .catch((error) => {
    //     console.log(error.response);
    //   });
  };

  const handleChange = ({ fileList: newFileList }) => {
    // Only keep the latest file in the list
    setFileList(newFileList.slice(-1));
    if (newFileList.length > 0) {
      setImg(newFileList[0].originFileObj);
    } else {
      setImg(null);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
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
        title={<h2 className="text-2xl font-bold">Thêm bài viết</h2>}
        style={{ width: '90%', maxWidth: '70wh', margin: '30px auto', minHeight: '70vh' }}
      >
        <form onSubmit={handleSubmit}>
          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="img" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Hình ảnh</label>
            </Col>
            <Col span={18}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={() => false}
              >
                {fileList.length < 1 && (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải hình ảnh</div>
                  </div>
                )}
              </Upload>
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="img" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Tiêu đề</label>
            </Col>
            <Col span={18}>
              <TextInput
                id="news_name"
                type="text"
                name="news_name"
                placeholder="Nhập tiêu đề"
                style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                onChange={handleChangeNewsName}
                required
              />
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="img" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Ngày tạo</label>
            </Col>
            <Col span={18}>
              <Input
                readOnly
                value={currentDateTime}
                className="w-full"
                style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
              />
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="img" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Nhân viên</label>
            </Col>
            <Col span={18}>
              <Input
                readOnly
                value={username}
                className="w-full"
                style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
              />
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="product" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Sản phẩm</label>
            </Col>
            <Col span={18}>
              <Select
                id="product"
                className="w-full"
                onChange={handleChangeSelectedProduct}
                style={{ height: '50px', fontSize: '15px', backgroundColor: '#F9F9F6', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                placeholder="Chọn sản phẩm"
                required
              >
                {products.map((option) => (
                  <Option key={option._id} value={option._id}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img
                        src={option.imgUrl}
                        style={{ width: 20, height: 20, marginRight: 10 }}
                        alt={option.product_name}
                      />
                       {option.product_name}
                    </div>
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>

          <Row justify="space-around" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }}>
            <Col span={4}>
              <label htmlFor="" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Nội dung bài viết</label>
            </Col>
            <Col span={18}>
              <div>
                <div className="main-container">
                  <div
                    className="editor-container editor-container_inline-editor"
                    ref={editorContainerRef}
                  >
                    <div className="editor-container__editor">
                      <div ref={editorRef}>
                        {isLayoutReady && (
                          <CKEditor
                            data={description}
                            onChange={handleEditorChange}
                            editor={InlineEditor}
                            config={editorConfig}
                          />
                        )}
                      </div>
                    </div>
                    {/* <div dangerouslySetInnerHTML={{ __html: description }} />  */}
                  </div>
              </div>
            </div>

            </Col>
          </Row>
          <br />
          <br />
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
              <Button
                type="default"
                htmlType="submit"
                style={{
                  backgroundColor: "#55B6C3",
                  fontSize: "10px",
                }}
              >
                Lưu
              </Button>
            </HStack>
          </Row>
        </form>
      </Card>
    </div>
  );
};

export default AddNews;
