import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { format } from "date-fns";
import { Button, Table, Switch, Modal, notification, Input } from "antd";
import { fetchAllUsers, fetchUpdateUser } from "../../data/api";
import Loading from "../../components/Loading";

const Users = () => {
  const [Users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("result"));

  const { Search } = Input;
  const formatDate = (dateString) => {
    return dateString
      ? format(new Date(dateString), "dd-MM-yyyy")
      : "Chưa có thông tin";
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = JSON.parse(localStorage.getItem("result"));
        const res = await fetchAllUsers(result);
        const formattedUsers = res.data.users.map((user) => ({
          ...user,
          full_name: user.full_name || "Chưa có thông tin",
          date_of_birth: formatDate(user.date_of_birth),
          phone: user.phone || "Chưa có thông tin",
          address: user.address || "Chưa có thông tin",
        }));

        setUsers(formattedUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleSwitchChange = (checked, user, token) => {
    Modal.confirm({
      title: "Xác nhận chặn tài khoản",
      content: checked
        ? "Bạn có muốn bỏ chặn tài khoản này?"
        : "Bạn có muốn chặn tài khoản này?",
      onOk: async () => {
        try {
          user.isActive = checked;
          await fetchUpdateUser(user, token, user._id);
          setUsers((prevUsers) => {
            return prevUsers.map((u) => (u._id === user._id ? user : u));
          });

          notification.success({
            message: "Thành công",
            description: `Thay đổi thành công! ${
              checked
                ? "Tài khoản đã hoạt động bình thường"
                : "Tài khoản đã bị chặn"
            }`,
            placement: "top",
          });
        } catch (error) {
          console.log(error);
          notification.error({
            message: "Lỗi",
            description: "Có lỗi xảy ra khi thay đổi trạng thái tài khoản",
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

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Họ và tên",
      dataIndex: "full_name",
      key: "full_name",
      ellipsis: true,
      width: "15%",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.full_name.localeCompare(b.full_name),
    },
    {
      title: "Ngày sinh",
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      ellipsis: true,
      width: "10%",
      sorter: (a, b) => new Date(a.date_of_birth) - new Date(b.date_of_birth),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      ellipsis: true,
      width: "10%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      width: "20%",
      render: (text) => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Vai trò",
      dataIndex: "role_name",
      key: "role_name",
      ellipsis: true,
      width: "10%",
      sorter: (a, b) => a.role_name.localeCompare(b.role_name),
    },
    {
      title: "Tình trạng",
      dataIndex: "isActive",
      key: "isActive",
      render: (text, record) => (
        <Switch
          checked={record.isActive}
          style={{ backgroundColor: record.isActive ? "#4A99FF" : "#898989" }}
          onChange={(checked) => handleSwitchChange(checked, record, token)}
        />
      ),
      width: "10%",
      sorter: (a, b) => a.isActive - b.isActive,
    },
  ];

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredUsers = Users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchText.toLowerCase()) &&
      (user.role_name === "Member" || user.role_name === "Staff")
  );

  if (loading) return <Loading />;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <Card
        title="Tất cả người dùng"
        subTitle=""
        footer=""
        header=""
        className=""
        style={{ width: "100%", height: "100%", overflow: "auto" }}
      >
        <div className="flex justify-between items-center mb-4">
          <Button
            type="primary"
            size="large"
            style={{ backgroundColor: "#46B5C1", height: "100%" }}
            onClick={() => navigate("/add-staff")}
          >
            Thêm nhân viên
          </Button>
          <Search
            placeholder="Nhập tên người dùng"
            allowClear
            enterButton={
              <Button style={{ backgroundColor: "#55B6C3", color: "white" }}>
                Tìm kiếm
              </Button>
            }
            size="large"
            onSearch={onSearch}
            style={{ width: "40%" }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: filteredUsers.length,
          }}
          scroll={{ x: "100%" }}
          onChange={handleTableChange}
          style={{ overflowX: "auto", flexGrow: 1 }}
          rowKey="email"
        />
      </Card>
    </div>
  );
};

export default Users;
