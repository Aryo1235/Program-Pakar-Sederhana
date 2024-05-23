<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    // Format pesan yang akan disimpan dalam file teks
    $data = "Nama: $name\nEmail: $email\nPesan: $message\n\n";
    
    // Lokasi file teks untuk menyimpan data
    $file = "pesan.txt";
    
    // Buka file untuk menulis
    $handle = fopen($file, "a");
    
    // Tulis data ke dalam file
    fwrite($handle, $data);
    
    // Tutup file
    fclose($handle);
    
    // Redirect kembali ke halaman sebelumnya atau halaman sukses
    header("Location: index.html");
    exit;
}
?>
