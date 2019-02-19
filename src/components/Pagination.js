import React from "react";

class Pagination extends React.Component {
  state = {
    currentPage: [1, 2, 3],
    page: 1
  };

  handleClick = (index, str) => {
    let newTab = [...this.state.currentPage];

    if (index === this.state.currentPage[0]) {
      if (this.state.currentPage[0] !== 1) {
        const currentPageCopy = newTab.map(page => {
          return (page = page - 1);
        });
        this.setState(
          {
            page: this.state.currentPage[0],
            currentPage: currentPageCopy
          },
          () => {
            this.props.moveToPage(this.state.page);
          }
        );
      }
    }
    if (index === this.state.currentPage[1]) {
      this.setState(
        {
          page: this.state.currentPage[1]
        },
        () => {
          this.props.moveToPage(this.state.page);
        }
      );
    }
    if (index === this.state.currentPage[2]) {
      const currentPageCopy = newTab.map(page => {
        return (page = page + 1);
      });
      this.setState(
        {
          page: this.state.currentPage[2],
          currentPage: currentPageCopy
        },
        () => {
          this.props.moveToPage(this.state.page);
        }
      );
    }
    if (index === "previous" && this.state.page > 1) {
      if (this.state.page === 2) {
        this.setState(
          {
            page: this.state.page - 1
          },
          () => {
            this.props.moveToPage(this.state.page);
          }
        );
      } else {
        const currentPageCopy = newTab.map(page => {
          return (page = page - 1);
        });
        this.setState(
          {
            page: this.state.page - 1,
            currentPage: currentPageCopy
          },
          () => {
            this.props.moveToPage(this.state.page);
          }
        );
      }
    }
    if (index === "next") {
      if (this.state.page !== 1) {
        const currentPageCopy = newTab.map(page => {
          return (page = page + 1);
        });
        this.setState(
          {
            page: this.state.page + 1,
            currentPage: currentPageCopy
          },
          () => {
            this.props.moveToPage(this.state.page);
          }
        );
      } else {
        this.setState(
          {
            page: this.state.page + 1
          },
          () => {
            this.props.moveToPage(this.state.page);
          }
        );
      }
    }
  };

  render() {
    return (
      <>
        <div className="container">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <button
                  onClick={() => {
                    this.handleClick("previous");
                  }}
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li className="page-item">
                <button
                  onClick={() => {
                    this.handleClick(this.state.currentPage[0]);
                  }}
                  className="page-link"
                  href="#"
                >
                  {this.state.currentPage[0]}
                </button>
              </li>
              <li className="page-item">
                <button
                  onClick={() => {
                    this.handleClick(this.state.currentPage[1]);
                  }}
                  className="page-link"
                  href="#"
                >
                  {this.state.currentPage[1]}
                </button>
              </li>
              <li className="page-item">
                <button
                  onClick={() => {
                    this.handleClick(this.state.currentPage[2]);
                  }}
                  className="page-link"
                  href="#"
                >
                  {this.state.currentPage[2]}
                </button>
              </li>
              <li className="page-item">
                <button
                  onClick={() => {
                    this.handleClick("next");
                  }}
                  className="page-link"
                  href="#"
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

export default Pagination;
