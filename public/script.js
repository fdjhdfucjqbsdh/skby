document.addEventListener("DOMContentLoaded", () => {
    const torForm = document.getElementById('tor-form');
    const torList = document.getElementById('tor-list');

    // Fungsi untuk mendapatkan semua tor dari backend
    const getTor = async () => {
        try {
            const response = await fetch('http://localhost:3000/tor');
            const tor = await response.json();
            displayTor(tor);
        } catch (error) {
            console.error("Error fetching tor:", error);
        }
    };

    // Fungsi untuk menampilkan daftar tor di halaman
    const displayTor = (tor) => {
        torList.innerHTML = '';  // Kosongkan daftar sebelum diisi
        tor.forEach(tor => {
            const li = document.createElement('li');
            li.textContent = `${tor.name} - ${tor.size} - ${tor.category}`;
            torList.appendChild(li);
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
            const response = await fetch('http://localhost:3000/tor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            alert(result.message);
            getTor();  // Ambil kembali daftar tor setelah menambahkannya
            torForm.reset();  // Reset formulir
        } catch (error) {
            console.error("Error adding tor:", error);
        }
    };

    // Mengambil daftar tor ketika halaman pertama kali dimuat
    getTor();

    // Menangani submit formulir
    torForm.addEventListener('submit', handleFormSubmit);
});
