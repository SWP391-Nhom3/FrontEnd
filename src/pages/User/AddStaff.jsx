import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import { Textarea } from 'flowbite-react';
import { InputMask } from 'primereact/inputmask';
import { Card } from 'primereact/card';
import { Col, DatePicker, Row, message, notification, } from 'antd';
import { useNavigate } from 'react-router-dom';
import { fetchUploadStaff, getDistricts, getProvinces, getWards } from '../../data/api';
import { Button, HStack, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import moment from 'moment';





const AddStaff = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(null);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("result"));
  // const [province, setProvince] = useState('');
  // const [district, setDistrict] = useState('');
  // const [ward, setWard] = useState('');
  const [selectedProvince, setSelectedProvince] = useState({
    id: "",
    name: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    name: "",
  });
  const [selectedWard, setSelectedWard] = useState({ id: "", name: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPasswordClick = () => setShowPassword(!showPassword);
  const handleShowConfirmPasswordClick = () => setShowConfirmPassword(!showConfirmPassword);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const isoDate = date ? date.toISOString() : null;

    const staff = {
      full_name: fullname,
      email: email,
      date_of_birth: isoDate,
      password: password,
      confirm_password: confirmPassword,
      country: 'Việt Nam',
      province: selectedProvince.name,
      district: selectedDistrict.name,
      ward: selectedWard.name,
      address: address + ', ' + selectedWard.name + ', ' + selectedDistrict.name + ', ' + selectedProvince.name,
      phone: phone,
      membership: 0,
      username: username,
    };

    if (password !== confirmPassword) {
      notification.error({
        message: "Mật khẩu và xác nhận mật khẩu không khớp!",
        placement: "top",
      });
      return;
    }

    await fetchUploadStaff(staff, token)
      .then((res) => {
        notification.success({
          message: res.data.message,
          placement: "top",
        });
        //reset form:
        setFullname('');
        setEmail('');
        setPhone('');
        setDate(null);
        setAddress('');
        setPassword('');
        setConfirmPassword('');
        setUsername('');
        setSelectedProvince({ id: "", name: "" });
        setSelectedDistrict({ id: "", name: "" });
        setSelectedWard({ id: "", name: "" });
      })
      .catch((error) => {
        console.log(error);
        notification.success({
          message: "Thêm nhân viên thất bại",
          placement: "top",
        });
      });
  };

  const [provinces, setProvinces] = useState([]);
  useEffect(() => {
    const getProvince = async () => {
      try {
        const provinceList = await getProvinces();
        setProvinces(provinceList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProvince();
  }, []);

  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const getDistrict = async (id) => {
      try {
        const districtList = await getDistricts(id);
        setDistricts(districtList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getDistrict();
  }, []);

  const [wards, setWards] = useState([]);
  useEffect(() => {
    const getWard = async () => {
      try {
        const wardList = await getWards();
        setWards(wardList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getWard();
  }, []);



  const handleProvinceSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    setSelectedProvince({ id, name });
    console.log(selectedProvince);

    setDistricts(await getDistricts(Number(id)));
  };

  const handleDistrictSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    console.log(selectedDistrict);

    setSelectedDistrict({ id, name });
    setWards(await getWards(Number(id)));
  };

  const handleWardSelect = async (item) => {
    const id = item.target.value;
    const name = item.target.options[item.target.selectedIndex].text;
    console.log(selectedWard);
    setSelectedWard({ id, name });
  };


  const handleDateChange = (date, dateString) => {
    const selectedDate = moment(dateString, 'DD/MM/YYYY');
    const currentDate = moment();
    const age = currentDate.diff(selectedDate, 'years');

    if (age < 18) {
      message.error('Tuổi phải trên 18.');
      setDate(null); // Reset the date
    } else {
      console.log(date, dateString);
      setDate(date); // Update the state with the new value
    }
  };



  return (
    <div style={{ display: 'flex', justifyContent: 'center', minHeight: '100vh' }}>
      <Card
        title="Thêm nhân viên mới"
        style={{ width: '90%', maxWidth: '1200px', margin: '30px auto' }}
        className='h-full'
      >
        <form onSubmit={handleSubmit}>
          {/* Row with 3 cols */}
          <Row justify="space-between" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }} gutter={[40, 8]} >
            <Col span={8}>
              <Row align="middle">
                <Col span={6}>
                  <label htmlFor="fullname" style={{ fontSize: '15px', color: '#1F5070', fontWeight: 'bold' }}>Họ và tên</label>
                </Col>
                <Col span={18}>
                  <InputText
                    id="fullname"
                    type="text"
                    className="w-full"
                    style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                    name="fullname"
                    placeholder="Nhập họ và tên"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required />
                </Col>
              </Row>
            </Col>

            <Col span={8}>
              <Row align={'middle'}>
                <Col span={6}>
                  <label htmlFor="" style={{ fontSize: '15px', color: '#1F5070', fontWeight: 'bold' }}>Username</label>
                </Col>
                <Col span={18}>
                  <InputText
                    id="username"
                    type="text"
                    className="w-full"
                    style={{ width: '100%', height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                    name="username"
                    placeholder="Nhập tên người dùng"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Col>
              </Row>
            </Col>

            <Col span={8}>
              <Row align="middle">
                <Col span={6}>
                  <label htmlFor="phone" style={{ fontSize: '15px', color: '#1F5070', fontWeight: 'bold', width: '100%' }}>Số điện thoại</label>
                </Col>
                <Col span={18}>
                  <InputMask
                    id="phone"
                    mask="9999999999"
                    placeholder="Nhập số điện thoại"
                    className="w-full border border-gray-300 rounded-md"
                    style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem', width: '100%' }}
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Row with 2 cols */}
          <Row justify="space-between" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }} gutter={[40, 8]}>
            <Col span={12}>
              <Row align="middle">
                <Col span={4}>
                  <label htmlFor="email" style={{ fontSize: '15px', color: '#1F5070', fontWeight: 'bold' }}>Email</label>
                </Col>
                <Col span={20}>
                  <InputText
                    id="email"
                    type="text"
                    className="w-full border"
                    style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem', width: '100%' }}
                    name="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </Col>
              </Row>
            </Col>


            <Col span={12}>
              <Row align="middle">
                <Col span={4}>
                  <label htmlFor="" style={{ fontSize: '15px', color: '#1F5070', fontWeight: 'bold' }}>Ngày sinh</label>
                </Col>
                <Col span={20}>
                  <DatePicker
                    value={date}
                    placeholder="Nhập ngày sinh"
                    format="DD/MM/YYYY"
                    onChange={handleDateChange}
                    style={{ width: '100%', height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                    required
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Row with 2 cols */}
          <Row justify="space-between" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }} gutter={[40, 8]}>
            <Col span={12}>
              <Row align={'middle'}>
                <Col span={4}>
                  <label htmlFor="email" style={{ fontSize: '15px', color: '#1F5070', fontWeight: 'bold' }}>Mật khẩu</label>
                </Col>
                <Col span={20} style={{ display: 'flex' }}>
                  <InputGroup className="relative flex items-center w-full">
                    <Input
                      className="w-full h-12 border-2 border-[rgba(0,0,0,0.2)]"
                      style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem', width: '100%' }}
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                    />
                    <InputRightElement className="absolute mr-3 h-full flex items-center justify-center">
                      <Button
                        h="2.5rem"
                        size="sm"
                        onClick={handleShowPasswordClick}
                        fontSize={'1.5rem'}
                      >
                        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row align={'middle'}>
                <Col span={4}>
                  <label htmlFor="confirm_password" style={{ fontSize: '15px', color: '#1F5070', fontWeight: 'bold' }}>Xác nhận mật khẩu</label>
                </Col>
                <Col span={20} style={{ display: 'flex' }}>
                  <InputGroup className="relative flex items-center w-full">
                    <Input
                      className="w-full h-12 border-2 border-[rgba(0,0,0,0.2)]"
                      style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirm_password"
                      name="confirm_password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Xác nhận mật khẩu"
                    />
                    <InputRightElement className="absolute mr-3 h-full flex items-center justify-center">
                      <Button h='3rem'
                        onClick={handleShowConfirmPasswordClick}
                        fontSize={'1.5rem'}
                      >
                        {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Row with 3 cols */}
          <Row justify="space-between" align="middle" style={{ marginBottom: '40px', marginTop: '20px' }} gutter={[40, 8]} >
            <Col span={8}>
              <Row align="middle">
                <Col span={6}>
                  <label htmlFor="province" style={{ fontSize: '15px', color: '#1F5070', fontWeight: 'bold' }}>Tỉnh <br /> (Thành phố)</label>
                </Col>
                <Col span={18}>
                  <select
                    id="province"
                    onChange={handleProvinceSelect}
                    className='w-full'
                    style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                    required
                  >
                    <option value="">Chọn tỉnh/thành phố</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            </Col>

            <Col span={8}>
              <Row align={'middle'}>
                <Col span={6}>
                  <label htmlFor="district" style={{ fontSize: '15px', color: '#1F5070', fontWeight: 'bold' }}>Quận <br />(Huyện)</label>
                </Col>
                <Col span={18}>
                  <select
                    id="district"
                    className=" w-full"
                    style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                    onChange={handleDistrictSelect}
                    required
                  >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            </Col>

            <Col span={8}>
              <Row align="middle">
                <Col span={6}>
                  <label htmlFor="ward" style={{ fontSize: '15px', color: '#1F5070', fontWeight: 'bold' }}>Phường <br />(Xã)</label>
                </Col>
                <Col span={18}>
                  <select
                    id="ward"
                    className="w-full"
                    style={{ height: '50px', fontSize: '15px', border: '1px solid #6b7280', borderRadius: '0.375rem' }}
                    onChange={handleWardSelect}
                    required
                  >
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((ward) => (
                      <option key={ward.id} value={ward.id}>
                        {ward.name}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row justify="space-between" align="middle" style={{ marginBottom: '40px' }}>
            <Col span={2}>
              <label htmlFor="address" style={{ fontSize: '17px', color: '#1F5070', fontWeight: 'bold' }}>Địa chỉ cụ thể</label>
            </Col>
            <Col span={22}>
              <Textarea
                id="address"
                placeholder="Nhập địa chỉ cụ thể"
                onChange={(e) => setAddress(e.target.value)}
                style={{ width: '100%', border: '1px solid #6b7280', borderRadius: '0.375rem', fontSize: '15px' }}
                required
                value={address}
              />
            </Col>
          </Row>
          <Row justify="end" align="middle">
            <HStack spacing={10}>
              <Button
                onClick={() => navigate(-1)}
                sx={{
                  borderWidth: '2px',
                  color: '#46B5C1',
                  borderColor: '#46B5C1',
                  height: '40px',
                  fontSize: '15px',
                  padding: '0 20px', // Increased padding
                  borderRadius: '10px', // Rounded corners
                  marginRight: '10px',
                }}
              >
                Quay về trang danh sách
              </Button>
              <Button
                type="submit"
                sx={{
                  backgroundColor: '#46B5C1',
                  borderColor: '#46B5C1',
                  height: '40px',
                  fontSize: '15px',
                  color: 'white',
                  padding: '0 20px', // Increased padding
                  borderRadius: '10px', // Rounded corners
                }}
              >
                Lưu nhân viên
              </Button>
            </HStack>
          </Row>
        </form>
      </Card>
    </div>
  )
}

export default AddStaff