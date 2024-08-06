import { Footer } from "flowbite-react";
import { FaTruck, FaCartPlus, FaPercentage, FaThumbsUp } from "react-icons/fa";
import logo from "../../assets/images/logo/Logo.png";

export default function MainFooter() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="flex justify-around">
          <div className="mb-5 flex items-center">
            <FaCartPlus className="mr-2 text-3xl" />
            <span>Hàng Luôn Được Cập Nhật</span>
          </div>
          <div className="mb-5 flex items-center">
            <FaTruck className="mr-2 text-3xl" />
            <span>Miễn Phí Giao Hàng Nội Thành</span>
          </div>
          <div className="mb-5 flex items-center">
            <FaPercentage className="mr-2 text-3xl" />
            <span>Luôn Có Ưu Đãi</span>
          </div>
          <div className="mb-5 flex items-center">
            <FaThumbsUp className="mr-2 text-3xl" />
            <span>Bình Ổn Giá Thị Trường</span>
          </div>
        </div>
        <div className="mb-8 border-t border-gray-300"></div>
        <div className="flex items-center justify-between">
          <div>
            <Footer.Brand href="/" src={logo} alt="MomBabyMilk Logo" />
          </div>
          <div className="flex space-x-8">
            <div>
              <Footer.Title title="Về MOMBABYMILK" />
              <Footer.LinkGroup col>
                <Footer.Link href="/about_us">Về chúng tôi</Footer.Link>
                <Footer.Link href="/contact">Liên hệ</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Chính sách" />
              <Footer.LinkGroup col>
                <Footer.Link href="/exchange_policy">
                  Chính sách đổi hàng
                </Footer.Link>
                <Footer.Link href="/privacy_policy">
                  Chính sách bảo mật
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by="MomBabyMilk" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center"></div>
        </div>
      </div>
    </Footer>
  );
}
