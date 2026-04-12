export default function Home() {
  const examples = [
    {
      title: "Örnek 1: Çember + Üstel Denklem",
      eq1: "x² + y² - 4 = 0",
      eq2: "e^x + y - 1 = 0",
      text: "Geometrik denklem ile transcendental denklem birleşir. Newton yöntemi burada güçlüdür ama başlangıç noktasına duyarlıdır.",
      source:
        "Burden & Faires, Numerical Analysis; Dennis & Schnabel, Numerical Methods for Unconstrained Optimization and Nonlinear Equations",
    },
    {
      title: "Örnek 2: Sinüs + Parabolik Sistem",
      eq1: "sin(x) + y² - 1 = 0",
      eq2: "x² + y - 1 = 0",
      text: "Trigonometrik ve polinom yapı bir aradadır. Bazı başlangıçlarda hızlı, bazılarında kırılgan davranış gösterir.",
      source: "Stoer & Bulirsch, Introduction to Numerical Analysis",
    },
    {
      title: "Örnek 3: Kübik ve Çoklu Kök Davranışı",
      eq1: "x³ - 3xy² - 1 = 0",
      eq2: "3x²y - y³ = 0",
      text: "Birden fazla kök içerir. Başlangıç noktasına göre farklı köklere gitmesi bakımından çok öğreticidir.",
      source:
        "Ortega & Rheinboldt, Iterative Solution of Nonlinear Equations in Several Variables",
    },
  ];

  const cards = [
    {
      title: "Jacobian matrisi",
      text: "Çok değişkenli Newton yönteminde her adım, sistemin o noktadaki lineer yaklaşımına dayanır.",
    },
    {
      title: "Başlangıç noktası",
      text: "Aynı denklem sistemi için farklı başlangıç noktaları farklı köklere, yavaş yakınsamaya ya da başarısızlığa yol açabilir.",
    },
    {
      title: "Yakınsama davranışı",
      text: "Adım büyüklüğü ve artık normu birlikte izlendiğinde yöntemin karakteri daha net anlaşılır.",
    },
  ];

  return (
    <main
      style={{
        fontFamily: "Arial, sans-serif",
        background:
          "radial-gradient(circle at top left, #ecfeff, transparent 30%), radial-gradient(circle at top right, #dbeafe, transparent 28%), linear-gradient(to bottom, #f8fafc, #ffffff, #f8fafc)",
        minHeight: "100vh",
        color: "#0f172a",
      }}
    >
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 24px 40px 24px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "10px 16px",
            border: "1px solid #dbe4ee",
            borderRadius: 999,
            background: "#ffffff",
            fontSize: 14,
            fontWeight: 600,
            boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
          }}
        >
          Altıgen Zeka • Çok Değişkenli Newton Yöntemi
        </div>

        <h1
          style={{
            fontSize: 52,
            lineHeight: 1.08,
            margin: "24px 0 18px 0",
            maxWidth: 900,
          }}
        >
          Çok değişkenli Newton yöntemini
          <span style={{ color: "#475569" }}> daha görünür ve sezgisel </span>
          hale getiren öğretim aracı
        </h1>

        <p
          style={{
            maxWidth: 820,
            fontSize: 18,
            lineHeight: 1.7,
            color: "#475569",
            marginBottom: 28,
          }}
        >
          İstanbul Medeniyet Üniversitesi / Üretken Yapay Zeka Uygulamaları
          kapsamında geliştirilen bu web sitesi, çok değişkenli Newton
          yöntemini örnek sistemler, temel kavramlar ve öğretici açıklamalar
          üzerinden erişilebilir bir biçimde sunmak için tasarlanmıştır.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 24,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700 }}>3</div>
            <div style={{ color: "#475569", marginTop: 6 }}>
              kaynaklı örnek problem
            </div>
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700 }}>Temel</div>
            <div style={{ color: "#475569", marginTop: 6 }}>
              Newton mantığı ve Jacobian vurgusu
            </div>
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 700 }}>Derslik</div>
            <div style={{ color: "#475569", marginTop: 6 }}>
              öğrenciye gösterilebilir öğretim materyali
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "10px 24px 20px 24px",
        }}
      >
        <h2 style={{ fontSize: 34, marginBottom: 10 }}>Temel fikir</h2>
        <p
          style={{
            color: "#475569",
            fontSize: 17,
            lineHeight: 1.8,
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          Çok değişkenli Newton yöntemi, lineer olmayan denklem sistemlerini
          çözmek için her adımda sistemi yerel olarak lineerleştirir. Bu
          lineerleştirme Jacobian matrisi üzerinden yapılır. Yöntem çoğu zaman
          çok hızlıdır; ancak başarısı yalnızca formüle değil, seçilen başlangıç
          noktasına ve Jacobian yapısına da bağlıdır.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              style={{
                background: "#fff",
                borderRadius: 22,
                padding: 22,
                boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: 22 }}>{card.title}</h3>
              <p style={{ marginBottom: 0, color: "#475569", lineHeight: 1.75 }}>
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 24px 20px 24px",
        }}
      >
        <h2 style={{ fontSize: 34, marginBottom: 10 }}>Seçilen örnekler</h2>
        <p
          style={{
            color: "#475569",
            fontSize: 17,
            lineHeight: 1.8,
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          Aşağıdaki sistemler, yöntemin farklı yönlerini görünür kılmak için
          seçilmiştir. Her biri öğretim açısından farklı bir pencere açar.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
          }}
        >
          {examples.map((ex) => (
            <div
              key={ex.title}
              style={{
                background: "#fff",
                borderRadius: 24,
                padding: 24,
                boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: 24 }}>{ex.title}</h3>

              <div
                style={{
                  background: "#f8fafc",
                  borderRadius: 16,
                  padding: 16,
                  fontFamily: "Courier New, monospace",
                  marginBottom: 16,
                  color: "#334155",
                }}
              >
                <div>{ex.eq1}</div>
                <div style={{ marginTop: 8 }}>{ex.eq2}</div>
              </div>

              <p style={{ color: "#475569", lineHeight: 1.75 }}>{ex.text}</p>

              <div
                style={{
                  marginTop: 16,
                  padding: 14,
                  border: "1px solid #e2e8f0",
                  borderRadius: 16,
                  background: "#ffffff",
                  color: "#475569",
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                <strong style={{ color: "#0f172a" }}>Kaynak:</strong> {ex.source}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 24px 20px 24px",
        }}
      >
        <h2 style={{ fontSize: 34, marginBottom: 10 }}>
          Manuel çözüm mantığı
        </h2>
        <p
          style={{
            color: "#475569",
            fontSize: 17,
            lineHeight: 1.8,
            maxWidth: 920,
            marginBottom: 24,
          }}
        >
          İlk örnek için el ile çözüm yapılırken izlenen düşünce çizgisi
          aşağıdaki gibidir. Buradaki amaç yalnızca sonuca ulaşmak değil,
          Newton adımının nasıl kurulduğunu görünür kılmaktır.
        </p>

        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
          }}
        >
          <div style={{ display: "grid", gap: 14 }}>
            {[
              "F(x,y) = [x² + y² - 4, e^x + y - 1]^T biçiminde yazılır.",
              "Jacobian matrisi J(x,y) = [[2x, 2y], [e^x, 1]] olarak bulunur.",
              "Bir başlangıç noktası seçilir. Örneğin (x₀, y₀) = (1, 1).",
              "Bu noktada F(x₀, y₀) ve J(x₀, y₀) hesaplanır.",
              "J(x_k, y_k) Δ_k = -F(x_k, y_k) lineer sistemi çözülerek Newton adımı elde edilir.",
              "Yeni nokta (x_{k+1}, y_{k+1}) = (x_k, y_k) + Δ_k olarak güncellenir.",
              "Adımlar tekrarlandıkça köke yakınsama gözlenir ya da başlangıç noktasına bağlı olarak sorunlu davranış ortaya çıkabilir.",
            ].map((step, i) => (
              <div
                key={i}
                style={{
                  background: "#f8fafc",
                  borderRadius: 16,
                  padding: 16,
                  color: "#334155",
                  lineHeight: 1.7,
                }}
              >
                <strong>Adım {i + 1}.</strong> {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 24px 20px 24px",
        }}
      >
        <h2 style={{ fontSize: 34, marginBottom: 10 }}>Kaynakça</h2>
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: 24,
            boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
            color: "#475569",
            lineHeight: 1.9,
            fontSize: 16,
          }}
        >
          <div>1. Richard L. Burden, J. Douglas Faires, <em>Numerical Analysis</em>.</div>
          <div>2. J. E. Dennis Jr., Robert B. Schnabel, <em>Numerical Methods for Unconstrained Optimization and Nonlinear Equations</em>.</div>
          <div>3. Josef Stoer, Roland Bulirsch, <em>Introduction to Numerical Analysis</em>.</div>
          <div>4. James M. Ortega, Werner C. Rheinboldt, <em>Iterative Solution of Nonlinear Equations in Several Variables</em>.</div>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 24px 70px 24px",
        }}
      >
        <h2 style={{ fontSize: 34, marginBottom: 10 }}>
          Bu web sitesi neyi amaçlıyor?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 22,
              padding: 22,
              boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Kavramı görünür kılmak</h3>
            <p style={{ color: "#475569", lineHeight: 1.75, marginBottom: 0 }}>
              Newton iterasyonunun yalnızca formül olmadığını, başlangıç noktası
              ve Jacobian yapısına bağlı olarak farklı davranışlar
              gösterebildiğini görünür hale getirir.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 22,
              padding: 22,
              boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Deneyi erişilebilir yapmak</h3>
            <p style={{ color: "#475569", lineHeight: 1.75, marginBottom: 0 }}>
              Öğrencinin çok değişkenli Newton yöntemini yalnızca teorik değil,
              örnek sistemler ve çözüm mantığı üzerinden de takip etmesini
              hedefler.
            </p>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 22,
              padding: 22,
              boxShadow: "0 6px 24px rgba(15,23,42,0.06)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>Öğretimi desteklemek</h3>
            <p style={{ color: "#475569", lineHeight: 1.75, marginBottom: 0 }}>
              Bu site, sınıf içinde doğrudan açılıp gösterilebilecek, yeniden
              kullanılabilir ve sade bir öğretim materyali sunar.
            </p>
          </div>
        </div>
      </section>

      <footer
        style={{
          borderTop: "1px solid #e2e8f0",
          background: "rgba(255,255,255,0.7)",
          textAlign: "center",
          padding: "22px 16px",
          color: "#475569",
          fontSize: 14,
        }}
      >
        Altıgen Zeka | İstanbul Medeniyet Üniversitesi | 2026
      </footer>
    </main>
  );
}
