import React from "react";
import banner from "../../assets/images/body/babyDrinkMilk.png";
import Breadcrumbs from "../../components/elements/Breadcrumb";

const AboutUs = () => {
  return (
    <>
      <Breadcrumbs headline={"Về chúng tôi"} />
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})`, height: "500px" }}
      >
        <div className="absolute inset-0 flex items-center justify-start bg-opacity-50">
          <div className="ml-10 p-6 md:w-1/2 lg:w-2/3">
            <h1 className="mb-6 text-4xl font-bold text-black md:text-6xl lg:text-7xl">
              Chào mừng đến với <br className="hidden md:block" />
              <span className="text-indigo-500">MilkJoy</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-4xl font-bold">Giới Thiệu Về MilkJoy</h1>
        <p className="mb-4 text-lg">
          Tại MilkJoy, chúng tôi cam kết mang đến những sản phẩm sữa chất lượng
          cao dành riêng cho mẹ và bé. Sứ mệnh của chúng tôi là đảm bảo rằng cả
          bạn và con yêu của bạn đều nhận được những dưỡng chất thiết yếu cần
          thiết cho một cuộc sống khỏe mạnh và hạnh phúc.
        </p>
        <h2 className="mb-4 text-2xl font-semibold">Tại Sao Chọn MilkJoy?</h2>
        <ul className="mb-4 list-inside list-disc">
          <li className="mb-2 text-lg">
            <strong>Chất Lượng Cao Cấp:</strong> Chúng tôi cung cấp một loạt các
            sản phẩm sữa được chọn lọc kỹ càng, đáp ứng các tiêu chuẩn chất
            lượng và an toàn cao nhất.
          </li>
          <li className="mb-2 text-lg">
            <strong>Dinh Dưỡng Tối Ưu:</strong> Các sản phẩm của chúng tôi được
            bổ sung các vitamin và khoáng chất thiết yếu để hỗ trợ sự phát triển
            của bé và sức khỏe của mẹ.
          </li>
          <li className="mb-2 text-lg">
            <strong>Được Các Mẹ Tin Dùng:</strong> MilkJoy là cái tên được nhiều
            mẹ tin tưởng khi muốn dành những điều tốt nhất cho con yêu của mình.
            Cam kết về chất lượng và sự hài lòng của khách hàng đã giúp chúng
            tôi xây dựng một cộng đồng khách hàng trung thành.
          </li>
          <li className="mb-2 text-lg">
            <strong>Nguồn Nguyên Liệu Tự Nhiên:</strong> Chúng tôi sử dụng các
            nguyên liệu tự nhiên, an toàn, không chứa chất bảo quản hay phụ gia
            có hại, đảm bảo sức khỏe cho cả mẹ và bé.
          </li>
          <li className="mb-2 text-lg">
            <strong>Đội Ngũ Tư Vấn Chuyên Nghiệp:</strong> Đội ngũ nhân viên của
            chúng tôi luôn sẵn sàng lắng nghe và tư vấn cho bạn những sản phẩm
            phù hợp nhất với nhu cầu dinh dưỡng của mẹ và bé.
          </li>
        </ul>
        <h2 className="mb-4 text-2xl font-semibold">Cam kết từ MilkJoy</h2>
        <p className="mb-4 text-lg">
          Chúng tôi hiểu rằng việc cung cấp những điều tốt nhất cho gia đình bạn
          là vô cùng quan trọng. Đó là lý do tại sao chúng tôi chỉ sử dụng những
          nguyên liệu tốt nhất và tuân theo quy trình kiểm soát chất lượng
          nghiêm ngặt để đảm bảo rằng mỗi sản phẩm mà bạn mua từ MilkJoy đều an
          toàn, giàu dinh dưỡng và ngon miệng.
        </p>
        <p className="text-lg">
          Cảm ơn bạn đã chọn MilkJoy. Chúng tôi rất hân hạnh được trở thành
          người bạn đồng hành trên hành trình chăm sóc sức khỏe và hạnh phúc của
          gia đình bạn.
        </p>
      </div>
    </>
  );
};

export default AboutUs;
