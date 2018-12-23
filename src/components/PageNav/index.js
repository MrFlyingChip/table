import React, { Component } from 'react';

const PageNav = ({goOnPage, currentPage, maxPages}) => {
    function createLi(page){
        return <li><a href={"#"} onClick={goOnPage.bind(this, page)} className={(page === currentPage) ? 'active' : ''}>{page + 1}</a></li>
    }

    function generateNav() {
        let pagesNav = [];
        pagesNav.push(createLi(0));
        if(currentPage - 3 <= 0) {
            const reachedMaxPage = (maxPages < 5);
            let endPage = 5;
            if(reachedMaxPage) {
                endPage = maxPages;
            }
            for (let i = 1; i < endPage; i++) {
                pagesNav.push(createLi(i));
            }
            if(!reachedMaxPage){
                pagesNav.push(<li><a href={"#"} className={'disabled'}>...</a></li>);
            }
        } else if(currentPage + 3 >= maxPages) {
            pagesNav.push(<li><a href={"#"} className={'disabled'}>...</a></li>);
            for (let i = maxPages - 5; i < maxPages; i++) {
                pagesNav.push(createLi(i));
            }
        } else {
            pagesNav.push(<li><a href={"#"} className={'disabled'}>...</a></li>);
            for (let i = currentPage - 1; i < currentPage + 2; i++) {
                pagesNav.push(createLi(i));
            }
            pagesNav.push(<li><a href={"#"} className={'disabled'}>...</a></li>);
            pagesNav.push(createLi(maxPages - 1));
        }

        return pagesNav;
    }

    return (
        <div className={'app-header'}>
            <nav>
                <ul>
                    <li><a href={'#'}
                           onClick={goOnPage.bind(this, currentPage - 1)}
                           className={(currentPage === 0) ? "disabled" : ''}>Previous</a></li>
                    {generateNav()}
                    <li><a href={'#'}
                           onClick={goOnPage.bind(this, currentPage + 1)}
                           className={(currentPage === maxPages - 1) ? "disabled" : ''}>Next</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default PageNav;
