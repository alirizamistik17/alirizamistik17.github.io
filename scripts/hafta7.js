document.addEventListener("DOMContentLoaded", () => {
    // 1. Tema Değiştirme (Tema Butonu)
    const themeBtn = document.getElementById("themeBtn");
    const heroTitle = document.getElementById("heroTitle");

    if(themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            
            // Footer'u dinamik tema ile uyumlu hale getirme
            const footer = document.querySelector("footer");
            
            // Başlık rengi karanlık temada beyaz olmalı
            if(document.body.classList.contains("dark-theme")) {
                themeBtn.textContent = "Açık Temaya Geç";
                themeBtn.classList.replace("btn-outline-dark", "btn-light");
                if(heroTitle) heroTitle.classList.remove("text-dark");
                if(heroTitle) heroTitle.classList.add("text-white");
                if(footer) footer.classList.replace("bg-light", "bg-dark");
            } else {
                themeBtn.textContent = "Koyu Temaya Geç";
                themeBtn.classList.replace("btn-light", "btn-outline-dark");
                if(heroTitle) heroTitle.classList.remove("text-white");
                if(heroTitle) heroTitle.classList.add("text-dark");
                if(footer) footer.classList.replace("bg-dark", "bg-light");
            }
        });
    }

    // 2. Form Özeti Alma
    const kayitFormu = document.getElementById("kayitFormu");
    const sonucAlani = document.getElementById("sonucAlani");
    const hataMesaji = document.getElementById("hataMesaji");

    if(kayitFormu) {
        kayitFormu.addEventListener("submit", (e) => {
            e.preventDefault(); // Sayfa yenilenmesini engelle

            // Verileri Form Elemanlarından Oku
            const adSoyad = document.getElementById("adSoyad").value.trim();
            const email = document.getElementById("email").value.trim();
            const bolum = document.getElementById("bolum").value.trim();
            const sinif = document.getElementById("sinif").value;
            const oturum = document.getElementById("oturum").value;
            
            // Radio button seçimi
            const oturumTuruSecim = document.querySelector('input[name="oturumTuru"]:checked');
            const oturumTuru = oturumTuruSecim ? oturumTuruSecim.value : "";
            
            // Yeni eklenen alanlar
            const mesaj = document.getElementById("mesaj").value.trim();
            const onayKutusu = document.getElementById("onayKutusu").checked;

            // Basit Doğrulama (Eksik Alan Kontrolü)
            if(!adSoyad || !email || !bolum || !sinif || !oturum || !oturumTuru || !onayKutusu) {
                hataMesaji.textContent = "Lütfen tüm zorunlu alanları (onay kutusu dâhil) doldurup kontrol ediniz!";
                hataMesaji.classList.remove("d-none"); // Hatayı Göster
                sonucAlani.innerHTML = ""; // Varsa eski sonucu temizle
                return;
            }

            // Eksik yoksa hatayı gizle
            hataMesaji.classList.add("d-none");

            // Başarılı Sonuç Ekranı (JS ile HTML Oluşturma)
            const htmlSonuc = `
                <div class="alert alert-success shadow-sm rounded-4" role="alert">
                    <h4 class="alert-heading fw-bold mb-3">✅ Başvuru Alındı!</h4>
                    <p>Merhaba <strong class="text-success">${adSoyad}</strong>, <strong>${oturum}</strong> oturumuna (${oturumTuru}) kaydınız başarıyla yapılmıştır.</p>
                    <hr>
                    <div class="row mt-3">
                        <div class="col-sm-6 text-dark">
                            <ul class="list-unstyled mb-0">
                                <li class="mb-2"><span class="text-secondary fw-semibold">E-posta:</span><br> ${email}</li>
                                <li><span class="text-secondary fw-semibold">Bölüm / Sınıf:</span><br> ${bolum} - ${sinif}</li>
                            </ul>
                        </div>
                        <div class="col-sm-6 text-dark mt-3 mt-sm-0">
                            <span class="text-secondary fw-semibold">Seçilen Oturum:</span><br>
                            <span class="badge bg-success mt-1 fs-6">${oturum} (${oturumTuru})</span>
                            ${mesaj ? `<div class="mt-3"><span class="text-secondary fw-semibold">Bırakılan Mesaj:</span><br><p class="text-muted small mt-1 mb-0 border-start border-2 border-primary ps-2">"${mesaj}"</p></div>` : ''}
                        </div>
                    </div>
                </div>
            `;
            
            // Oluşturulan HTML'i ekrana bas
            sonucAlani.innerHTML = htmlSonuc;
            
            // Olay bittikten sonra formu sıfırla (opsiyonel)
            kayitFormu.reset();
        });
    }
});
