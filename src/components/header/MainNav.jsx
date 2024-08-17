import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useProductContext } from "../../context/ProductContext";

export function MainNav() {
  const { products } = useProductContext();
  const bestSellers = products.sort((a, b) => b.sales - a.sales);
  return (
    <Navbar fluid rounded>
      <div className="mr-3 h-6 sm:h-9"></div>
      <div className="flex md:order-2"></div>
      <Navbar.Collapse>
        <Navbar.Link active className="text-lg">
          <Link
            to="/"
            onClick={() => {
              window.scrollTo(0, 0);
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }}
          >
            Trang chủ
          </Link>
        </Navbar.Link>
        <Navbar.Link className="text-lg">
          <Link to="/filter" onClick={() => window.scrollTo(0, 0)}>
            Tất Cả Sản Phẩm
          </Link>
        </Navbar.Link>
        <Navbar.Link className="text-lg">
          <Link
            to="/list-products"
            state={{ products: bestSellers, headline: "Sản Phẩm Bán Chạy" }}
            onClick={() => window.scrollTo(0, 0)}
          >
            Sản Phẩm Bán Chạy
          </Link>
        </Navbar.Link>
        <Navbar.Link className="text-lg">
          <Link to="/order-tracking" onClick={() => window.scrollTo(0, 0)}>
            Theo Dõi Đơn Hàng
          </Link>
        </Navbar.Link>
        <Navbar.Link className="text-lg">
          <Link to="/news" onClick={() => window.scrollTo(0, 0)}>
            Tin Tức
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
