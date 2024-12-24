document.addEventListener("DOMContentLoaded", () => {
    const torrentForm = document.getElementById('torrent-form');
    const torrentList = document.getElementById('torrent-list');

    // Fungsi untuk mendapatkan semua torrent dari backend
    const getTorrents = async () => {
        try {
            const response = await fetch('http://localhost:3000/torrents');
            const torrents = await response.json();
            displayTorrents(torrents);
        } catch (error) {
            console.error("Error fetching torrents:", error);
        }
    };

    // Fungsi untuk menampilkan daftar torrent di halaman
    const displayTorrents = (torrents) => {
        torrentList.innerHTML = '';  // Kosongkan daftar sebelum diisi
        torrents.forEach(torrent => {
            const li = document.createElement('li');
            li.textContent = `${torrent.name} - ${torrent.size} - ${torrent.category}`;
            torrentList.appendChild(li);
        });
    };

    // Fungsi untuk menangani submit form
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            magnet_link: document.getElementById('magnet-link').value,
            size: document.getElementById('size').value,
            category: document.getElementById('category').value,
        };

        try {
            const response = await fetch('http://localhost:3000/torrents', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            alert(result.message);
            getTorrents();  // Ambil kembali daftar torrent setelah menambahkannya
            torrentForm.reset();  // Reset formulir
        } catch (error) {
            console.error("Error adding torrent:", error);
        }
    };

    // Mengambil daftar torrent ketika halaman pertama kali dimuat
    getTorrents();

    // Menangani submit formulir
    torrentForm.addEventListener('submit', handleFormSubmit);
});
