require('dotenv').config();
const mongoose = require('mongoose');

// Koneksi MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Article = require('./models/Article');
const Video = require('./models/Video');

// Artikel Wisata Indonesia
const articleTitles = [
    "Perkembangan Game Survival di Tahun 2025",
    "Bagaimana AI Mengubah Cara Kita Bekerja",
    "Drama Politik di Balik Pemilu Nasional",
    "Mengulas Kekuatan PS6 dan Fitur Terbarunya",
    "Peran Teknologi dalam Pendidikan Digital",
    "Game Mobile yang Menghasilkan Miliaran Rupiah",
    "Kontroversi Undang-Undang Cipta Kerja",
    "Metaverse: Dunia Baru atau Sekadar Tren?",
    "Strategi Politik di Era Disinformasi",
    "5 Game Indie Terbaik Tahun Ini",
    "Kebijakan Perlindungan Data Pribadi di Indonesia",
    "Revolusi Teknologi Quantum dan Dampaknya",
    "Polemik Anggaran Pertahanan dalam Politik Global",
    "Cloud Gaming: Masa Depan atau Sekadar Gimmick?",
    "Bagaimana Pemilu Dapat Dipengaruhi oleh Bot Media Sosial"
];


const articles = articleTitles.map(title => ({
    title,
    content: `Artikel ini membahas tentang "${title}", silahkan dibaca dengn seksama...`,
    createdAt: new Date()
}));

// Video Wisata Indonesia (YouTube)
const videoList = [
    { title: "Cara bikin cowok tersenyum 😊 - Unboxing & Gaming di Nintendo Switch 2!", url: "https://www.youtube.com/watch?v=B07XihrV7-g" },
    { title: "INI DIA YANG DITUNGGU! Nintendo Switch 2 Unboxing Indonesia (Mario Kart World Bundle) 2025", url: "https://www.youtube.com/watch?v=1ZyzkizSSDA" },
    { title: "PEREMPUAN TERKUAT DI KOREA UTARA, ADIK KIM JONG UN YG AKAN JADI PRESIDEN SELANJUTNYA? | Kim Yo Jong", url: "https://www.youtube.com/watch?v=xyG4-PoHStc" },
    { title: "THAILAND - KAMBOJA MENUJU PERANG? Baku Tembak Mematikan Di Perbatasan! Panas! | Learning By Googling", url: "https://www.youtube.com/watch?v=g34h87PB6GA" },
    { title: "RAMEN 80 RIBU ! 🤯 WORTH IT ??! KUAHNYA GAK MASUK AKAL ...!", url: "https://www.youtube.com/watch?v=uy_Arhjyf0A" },
    { title: "RoadCraft - Transforming an Old Muddy Path into a New Road (4K)", url: "https://www.youtube.com/watch?v=xpyZLRpseOA" },
    { title: "Uni Soviet Bubar Karena Demokrasi? Sampai Dianggap Bencana Geopolitik Terbesar! | LearningByGoogling", url: "https://www.youtube.com/watch?v=23GKXugMAVM&t=432s" },
    { title: "Pertaruhan Hidup Mati Jaguar Di Tengah Krisis Identitas", url: "https://www.youtube.com/watch?v=xSNbgTFKqJc&t=36s" },
    { title: "Buah Simalakama Tesla: Elon or No Elon?", url: "https://www.youtube.com/watch?v=aayuJIjkb7Q&t=37s" },
    { title: "Apa Yang Bikin QRIS Ditakuti Amerika?", url: "https://www.youtube.com/watch?v=pjRTDx43UeQ" },
    { title: "Kuliah S2 Buat Apa?", url: "https://www.youtube.com/watch?v=qVgNdMvHvIQ" },
    { title: "Aku membuat AI dari nol.", url: "https://www.youtube.com/watch?v=WLmY9icEOQk" },
    { title: "Transaksi Mudah Bikin QRIS Mendunia | Explained", url: "https://www.youtube.com/watch?v=Qu2nV_-WrZQ" },
    { title: "First Principle Thinking: Cara Berpikir Para Disruptor Industri", url: "https://www.youtube.com/watch?v=X8_8yYEJRlI" },
    { title: "Dijepit Perang Tarif AS-China, Gimana NASIB ASIA TENGGARA? Jadi Sasaran Empuk! |Learning By Googling", url: "https://www.youtube.com/watch?v=6trY1WoTE2s" }
];

const videos = videoList.map(v => ({
    title: v.title,
    url: v.url,
    createdAt: new Date()
}));

// Seeder
async function seedDB() {
    try {
        await Article.deleteMany({});
        await Video.deleteMany({});
        await Article.insertMany(articles);
        await Video.insertMany(videos);
        console.log('✅ Seeder wisata berhasil dijalankan (15 artikel & 15 video)');
    } catch (err) {
        console.error('❌ Gagal seeding:', err);
    } finally {
        mongoose.connection.close();
    }
}

seedDB();
