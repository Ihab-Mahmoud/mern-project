/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const PageBtnContainer = ({ jobsData }) => {
  const { numOfPages, currentPage } = jobsData;
  console.log(currentPage);

  const location = useLocation();
  const navigate = useNavigate();

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handleSelectPage(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageBtns = () => {
    let pages = [];
    // add first page btn
    pages.push(
      addPageButton({
        pageNumber: 1,
        activeClass: Number(currentPage) === 1,
      })
    );

    // add dots
    if (Number(currentPage) > 3) {
      pages.push(
        <span key="dot-1" className="dots page-btn">
          ...
        </span>
      );
    }
    // add before current page btn
    if (Number(currentPage) > 2) {
      pages.push(
        addPageButton({
          pageNumber: Number(currentPage) - 1,
          activeClass: false,
        })
      );
    }
    // add current page btn
    if (
      Number(currentPage) !== 1 &&
      Number(currentPage) !== Number(numOfPages)
    ) {
      pages.push(
        addPageButton({
          pageNumber: Number(currentPage),
          activeClass: true,
        })
      );
    }

    // add after current page btn
    if (Number(currentPage) < Number(numOfPages) - 1) {
      pages.push(
        addPageButton({
          pageNumber: Number(currentPage) + 1,
          activeClass: false,
        })
      );
    }
    // add dots
    if (Number(currentPage) < Number(numOfPages) -2) {
      pages.push(
        <span key="dot-2" className="dots page-btn">
          ...
        </span>
      );
    }
    // add last page btn
    pages.push(
      addPageButton({
        pageNumber: Number(numOfPages),
        activeClass: Number(currentPage) === Number(numOfPages),
      })
    );
    return pages;
  };

  const handleSelectPage = (pageNumber) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", pageNumber);
    navigate(`${location.pathname}?${searchParams}`);
  };
  return (
    <Wrapper>
      <button
        onClick={() => {
          let newPage = Number(currentPage) - 1;
          if (newPage < 1) {
            newPage = numOfPages;
          }
          handleSelectPage(newPage);
        }}
        className="btn prev-btn"
      >
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className="btn-container">{renderPageBtns()}</div>
      <button
        onClick={() => {
          let newPage = Number(currentPage) + 1;
          if (newPage > numOfPages) {
            newPage = 1;
          }
          handleSelectPage(newPage);
        }}
        className="btn prev-btn"
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
