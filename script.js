const url = 'https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json';
const itemsPerPage = 10;
let currentPage = 1;
let data = [];

const fetchData = async () => {
    try {
        const response = await fetch(url);
        data = await response.json();
        renderPagination();
        renderContent(currentPage);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const renderContent = (page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const items = data.slice(start, end);

    const contentTbody = document.getElementById('content');
    contentTbody.innerHTML = items.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
        </tr>
    `).join('');
};

const renderPagination = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginationUl = document.getElementById('pagination');
    paginationUl.innerHTML = '';

    const firstButton = document.createElement('button');
    firstButton.innerText = 'First';
    firstButton.disabled = currentPage === 1;
    firstButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage = 1;
            updatePagination();
        }
    });
    paginationUl.appendChild(firstButton);

    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });
    paginationUl.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.toggle('active', i === currentPage);
        button.addEventListener('click', () => {
            currentPage = i;
            updatePagination();
        });
        paginationUl.appendChild(button);
    }

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });
    paginationUl.appendChild(nextButton);

    const lastButton = document.createElement('button');
    lastButton.innerText = 'Last';
    lastButton.disabled = currentPage === totalPages;
    lastButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage = totalPages;
            updatePagination();
        }
    });
    paginationUl.appendChild(lastButton);
};

const updatePagination = () => {
    renderContent(currentPage);
    renderPagination();
};

fetchData();
