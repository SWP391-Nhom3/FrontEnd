import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import { format } from "date-fns";
import { Button, Table, Switch, Modal, notification, Input } from "antd";
import { fetchAllUsers, fetchUserStatusById } from "../../data/api";
import Loading from "../../components/Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handleNull = (value) => (value ? value : "Chưa có thông tin");
  const { Search } = Input;

  const formatDate = (dateString) => {
    return dateString
      ? format(new Date(dateString), "dd-MM-yyyy")
      : "Chưa có thông tin";
  };
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetchAllUsers(token);
        const formattedUsers = res.data.data
          .map((user) => ({
            ...user,
            dob: formatDate(user.dob),
            roles: user.roles.map((role) => role.name).join(", "),
          }))
          .filter((user) =>
            user.roles
              .split(", ")
              .some(
                (roleName) =>
                  roleName === "MEMBER" ||
                  roleName === "STAFF" ||
                  roleName === "SHIPPER",
              ),
          );

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
  const handleSwitchChange = (checked, user, token) => {
    Modal.confirm({
      title: "Xác nhận chặn tài khoản",
      content: checked
        ? "Bạn có muốn bỏ chặn tài khoản này?"
        : "Bạn có muốn chặn tài khoản này?",
      onOk: async () => {
        try {
          console.log(user);
          user.active = checked;
          await fetchUserStatusById(user.id, token);
          setUsers((prevUsers) => {
            return prevUsers.map((u) => (u.id === user.id ? user : u));
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
  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      ellipsis: true,
      width: "10%",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      render: (text) => handleNull(text),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      ellipsis: true,
      width: "10%",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      render: (text) => handleNull(text),
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      ellipsis: true,
      width: "10%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
      width: "20%",
      render: (text) => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
          {handleNull(text)}
        </div>
      ),
    },
    {
      title: "Point",
      dataIndex: "point",
      key: "point",
      ellipsis: true,
      width: "10%",
      sorter: (a, b) => a.point - b.point,
      render: (text) => handleNull(text),
    },
    {
      title: "Role",
      dataIndex: "roles",
      key: "roles",
      ellipsis: true,
      width: "10%",
      render: (roles) => <span>{roles}</span>,
    },
    {
      title: "Status",
      key: "status",
      width: "10%",
      render: (text, record) => (
        <Switch
          checked={record.active}
          style={{ backgroundColor: record.active ? "#4A99FF" : "#898989" }}
          onChange={(checked) => handleSwitchChange(checked, record, token)}
        />
      ),
    },
  ];

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchText.toLowerCase()),
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
        style={{ width: "100%", height: "100%", overflow: "auto" }}
      >
        <div className="mb-4 flex items-center justify-between">
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
            enterButton="Tìm kiếm"
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
          onChange={handleTableChange}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default Users;
