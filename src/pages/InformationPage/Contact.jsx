import React from "react";
import Breadcrumbs from "../../components/elements/Breadcrumb";

const Contact = () => {
  return (
    <>
      <Breadcrumbs headline="Liên hệ" />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h1 className="text-2xl font-bold">CỬA HÀNG SỮA ONLINE MilkJoy</h1>
            <p>
              <strong>Địa chỉ:</strong> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh
              Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh.
            </p>
            <p>
              <strong>Điện thoại:</strong> 090 7089078
            </p>
            <p>
              <strong>Email:</strong> pass10diemswp391@gmail.com
            </p>

            <h2 className="mt-8 text-xl font-semibold">
              Liên hệ với chúng tôi
            </h2>
            <form className="mt-4 space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Nội dung"
                  rows="4"
                  className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-orange-500 p-2 text-white hover:bg-orange-600"
                >
                  Gửi liên hệ của bạn
                </button>
              </div>
            </form>
          </div>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15674.440041588125!2d106.809883!3d10.8411276!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1720286824829!5m2!1svi!2s"
              width="600"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-120 w-full rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
