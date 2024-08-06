import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ headline }) => {
  return (
    <div className="flex h-20 items-center justify-between py-5">
      <div className="w-1/2">
        <Breadcrumb
          aria-label="Default breadcrumb example"
          className="text-2xl"
        >
          <BreadcrumbItem icon={HiHome}>
            <Link
              to="/"
              onClick={() => {
                window.scrollTo(0, 0);
                setTimeout(() => {
                  window.location.reload();
                }, 100);
              }}
            >
              <p className="text-lg font-semibold text-black">Trang chủ</p>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-lg font-semibold text-black">{headline}</p>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="w-1/2 text-right">
        <h2 className="text-2xl font-bold text-black md:text-3xl">
          {headline}
        </h2>
      </div>
    </div>
  );
};

export default Breadcrumbs;
