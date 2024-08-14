import { useEffect, useState } from "react";
import Loader from "../../assets/loading2.gif";
// import { fetchGetAllVoucher, fetchGetMe, fetchRefreshToken } from "../../data/api";
import { Button } from "flowbite-react";
import { ImGift } from "react-icons/im";

const Accumulate = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [point, setPoint] = useState(0);
  const token = JSON.parse(localStorage.getItem("result"));
  //!FETCH GET PROFILE
  // const getMeProfile = async () => {
  //   await fetchGetMe(token)
  //     .then((res) => {
  //       setPoint(res.data.result.member_ship);
  //     })
  //     .catch(async (error) => {
  //       if (error.response.status === 401) {
  //         await fetchRefreshToken(token)
  //           .then(async (res) => {
  //             localStorage.setItem("result", JSON.stringify(res.data.result));
  //             await getMeProfile();
  //           })
  //           .catch((error) => {
  //             if (error.response.status === 401) {
  //               localStorage.removeItem("user");
  //               localStorage.removeItem("result");
  //             }
  //           });
  //       }
  //     });
  // };

  // useEffect(() => {
  //   getMeProfile();
  // }, []);

  //!! FETCH GET VOUCHER
  // useEffect(() => {
  //   const getVouchers = async () => {
  //     try {
  //       const data = await fetchGetAllVoucher();
  //       const currentDate = new Date();
  //       const sortedVouchers = data.data.result
  //         .filter((voucher) => voucher.voucher_type === 1)
  //         .filter((voucher) => new Date(voucher.expire_date) > currentDate) // Filter vouchers that have not expired
  //         .sort((a, b) => {
  //           const userMembership = Number(point);
  //           if (
  //             userMembership >= a.membership &&
  //             userMembership < b.membership
  //           ) {
  //             return -1;
  //           } else if (
  //             userMembership < a.membership &&
  //             userMembership >= b.membership
  //           ) {
  //             return 1;
  //           } else {
  //             return new Date(a.expire_date) - new Date(b.expire_date);
  //           }
  //         });
  //       setVouchers(sortedVouchers);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //     }
  //   };
  //   getVouchers();
  // }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <img src={Loader} alt="loading" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Đổi quà tặng</h1>
          <p>Dùng membership tích lũy để đổi quà tại MomBabyMilk Shop</p>
        </div>
        <div>
          <Button
            color="light"
            size={"lg"}
            disabled
            className="font-semibold text-blue-500"
          >
            <ImGift className="mr-2 h-5 w-5" />
            Điểm tích lũy:{" "}
            {Number(point).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </Button>
        </div>
      </div>
      <hr className="my-4" />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3">
          {vouchers.map((voucher, index) => (
            <div
              key={voucher._id}
              className="max-w-sm transform cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition duration-500 hover:scale-105 hover:shadow-2xl"
            >
              <div
                className={`flex h-20 items-center justify-between ${
                  Number(point) < voucher.membership
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              >
                <h1 className="mx-3 rounded-full border-2 px-4 py-2 text-white">
                  {index + 1}
                </h1>
                <p className="mr-20 text-lg text-white">
                  VR{voucher._id.substring(voucher._id.length - 5)}
                </p>
                <p className="mr-4 text-lg font-thin text-white">
                  {Number(voucher.discount).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <p className="ml-16 py-6 text-lg tracking-wide">
                Điểm để đổi:{" "}
                {Number(voucher.membership).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              <div className="mb-2 flex justify-between px-5 text-sm text-gray-600">
                <p>
                  Hết hạn: {new Date(voucher.expire_date).toLocaleDateString()}
                </p>
                <p>Số lượng: {voucher.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accumulate;
