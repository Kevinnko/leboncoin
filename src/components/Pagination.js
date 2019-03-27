import React from "react";

class Pagination extends React.Component {
  state = {
    page: this.props.currentPage
  };

  handleClick = (index, str) => {
    let newTab = this.props.pagesTab;

    // si on clique sur un numéro de page :
    if (index !== "previous" && index !== "next") {
      this.setState(
        {
          page: index
        },
        () => {
          this.props.moveToPage(index);
        }
      );
    }

    // si on clique sur previous ou next
    //  - à condition que this.state.page > 0 et < this.state.currentPage.length
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
        const pagesTabCopy = newTab.map(page => {
          return (page = page - 1);
        });
        this.setState(
          {
            page: this.state.page - 1,
            pagesTab: pagesTabCopy
          },
          () => {
            this.props.moveToPage(this.state.page);
          }
        );
      }
    }

    if (index === "next" && this.state.page < this.props.pagesTab.length) {
      if (this.state.page !== 1) {
        const pagesTabCopy = newTab.map(page => {
          return (page = page + 1);
        });

        this.setState(
          {
            page: this.state.page + 1,
            currentPage: pagesTabCopy
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
    const pagesLink = [];
    for (let i = 0; i < this.props.totalPages; i++) {
      pagesLink.push(
        <li key={i} className="page-item">
          <button
            aria-pressed="false"
            onClick={() => this.handleClick(i + 1)}
            className={
              i + 1 === this.props.currentPage
                ? "page-link selected"
                : "page-link"
            }
            disabled={i + 1 === this.props.currentPage ? true : false}
          >
            {i + 1}
          </button>
        </li>
      );
    }
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
                  <span style={{ fontSize: 13 }} aria-hidden="true">
                    &laquo;
                  </span>
                </button>
              </li>
              {pagesLink}

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
