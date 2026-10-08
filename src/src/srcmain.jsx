import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const initialPosts = [
  {
    id: 1,
    type: "হারানো",
    title: "কালো iPhone 12",
    district: "ঢাকা",
    upazila: "মিরপুর",
    area: "মিরপুর-১০",
    date: "2026-10-07",
    description:
      "মিরপুর-১০ এলাকায় একটি কালো iPhone 12 হারিয়ে গেছে। ফোনটির পেছনে কালো কভার ছিল।",
    phone: "01XXXXXXXXX",
    image: "",
    status: "অনুমোদিত"
  },
  {
    id: 2,
    type: "পাওয়া",
    title: "জাতীয় পরিচয়পত্র",
    district: "চট্টগ্রাম",
    upazila: "চট্টগ্রাম সদর",
    area: "নিউ মার্কেট",
    date: "2026-10-06",
    description:
      "নিউ মার্কেট এলাকায় একটি জাতীয় পরিচয়পত্র পাওয়া গেছে। মালিক পরিচয় নিশ্চিত করে যোগাযোগ করুন।",
    phone: "01XXXXXXXXX",
    image: "",
    status: "অনুমোদিত"
  }
];

const districts = [
  "ঢাকা",
  "চট্টগ্রাম",
  "নোয়াখালী",
  "কুমিল্লা",
  "ফেনী",
  "ময়মনসিংহ",
  "সিলেট",
  "রাজশাহী",
  "খুলনা",
  "বরিশাল",
  "রংপুর",
  "গাজীপুর"
];

function App() {
  const [page, setPage] = useState("home");
  const [posts, setPosts] = useState(initialPosts);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("সব");
  const [filterDistrict, setFilterDistrict] = useState("সব");

  const [selectedPost, setSelectedPost] = useState(null);

  const [form, setForm] = useState({
    type: "হারানো",
    title: "",
    description: "",
    district: "",
    upazila: "",
    area: "",
    date: "",
    phone: "",
    image: ""
  });

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const text = `
        ${post.title}
        ${post.description}
        ${post.district}
        ${post.upazila}
        ${post.area}
      `.toLowerCase();

      const matchesSearch =
        search.trim() === "" ||
        text.includes(search.toLowerCase().trim());

      const matchesType =
        filterType === "সব" || post.type === filterType;

      const matchesDistrict =
        filterDistrict === "সব" ||
        post.district === filterDistrict;

      return matchesSearch && matchesType && matchesDistrict;
    });
  }, [posts, search, filterType, filterDistrict]);

  function updateForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleImage(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("ছবির সাইজ সর্বোচ্চ 2MB হতে হবে।");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm({
        ...form,
        image: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  function submitPost(e) {
    e.preventDefault();

    if (
      !form.title ||
      !form.description ||
      !form.district ||
      !form.upazila ||
      !form.area ||
      !form.date ||
      !form.phone
    ) {
      alert("সব প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }

    const newPost = {
      ...form,
      id: Date.now(),
      status: "পর্যালোচনাধীন"
    };

    setPosts([newPost, ...posts]);

    setForm({
      type: "হারানো",
      title: "",
      description: "",
      district: "",
      upazila: "",
      area: "",
      date: "",
      phone: "",
      image: ""
    });

    alert(
      "আপনার পোস্ট সফলভাবে জমা হয়েছে। Admin যাচাই করার পর এটি প্রকাশ করা হবে।"
    );

    setPage("search");
  }

  return (
    <div className="app">

      <header className="header">
        <div className="container nav">

          <button
            className="logo"
            onClick={() => setPage("home")}
          >
            🔎 হারানো-পাওয়া বাংলাদেশ
          </button>

          <nav>
            <button onClick={() => setPage("home")}>
              হোম
            </button>

            <button onClick={() => setPage("search")}>
              খুঁজুন
            </button>

            <button
              className="post-nav"
              onClick={() => setPage("post")}
            >
              + পোস্ট করুন
            </button>
          </nav>

        </div>
      </header>


      {page === "home" && (
        <main>

          <section className="hero">
            <div className="container hero-content">

              <div>
                <span className="badge">
                  🇧🇩 বাংলাদেশজুড়ে
                </span>

                <h1>
                  হারানো জিনিস খুঁজুন,
                  <br />
                  পাওয়া জিনিস ফিরিয়ে দিন।
                </h1>

                <p>
                  আপনার হারানো বা পাওয়া জিনিসের তথ্য
                  বাংলাদেশের মানুষের সঙ্গে শেয়ার করুন।
                </p>

                <div className="hero-buttons">

                  <button
                    className="primary"
                    onClick={() => setPage("post")}
                  >
                    📝 পোস্ট করুন
                  </button>

                  <button
                    className="secondary"
                    onClick={() => setPage("search")}
                  >
                    🔎 পোস্ট খুঁজুন
                  </button>

                </div>
              </div>

              <div className="hero-card">
                <div className="big-icon">🔎</div>
                <h3>সহজ • দ্রুত • বাংলাদেশজুড়ে</h3>
                <p>
                  অ্যাকাউন্ট ছাড়াই হারানো বা পাওয়া
                  জিনিসের পোস্ট করতে পারবেন।
                </p>
              </div>

            </div>
          </section>


          <section className="container stats">

            <div>
              <strong>{posts.length}</strong>
              <span>মোট পোস্ট</span>
            </div>

            <div>
              <strong>
                {posts.filter(p => p.type === "হারানো").length}
              </strong>
              <span>হারানো</span>
            </div>

            <div>
              <strong>
                {posts.filter(p => p.type === "পাওয়া").length}
              </strong>
              <span>পাওয়া</span>
            </div>

          </section>


          <section className="container section">

            <div className="section-heading">
              <div>
                <h2>সাম্প্রতিক পোস্ট</h2>
                <p>সর্বশেষ হারানো ও পাওয়া জিনিস</p>
              </div>

              <button
                className="link-button"
                onClick={() => setPage("search")}
              >
                সব দেখুন →
              </button>
            </div>

            <PostGrid
              posts={posts.slice(0, 3)}
              onSelect={setSelectedPost}
            />

          </section>

        </main>
      )}


      {page === "search" && (
        <main className="container page">

          <div className="page-title">
            <h1>🔎 হারানো ও পাওয়া জিনিস খুঁজুন</h1>
            <p>নাম, এলাকা অথবা জেলার মাধ্যমে খুঁজুন।</p>
          </div>


          <div className="filters">

            <input
              placeholder="যেমন: মোবাইল, মানিব্যাগ, NID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option>সব</option>
              <option>হারানো</option>
              <option>পাওয়া</option>
            </select>

            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
            >
              <option>সব</option>
              {districts.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>

          </div>


          <p className="result-count">
            {filteredPosts.length}টি পোস্ট পাওয়া গেছে
          </p>


          <PostGrid
            posts={filteredPosts}
            onSelect={setSelectedPost}
          />

        </main>
      )}


      {page === "post" && (
        <main className="container page">

          <div className="page-title">
            <h1>📝 হারানো / পাওয়া পোস্ট করুন</h1>
            <p>
              অ্যাকাউন্ট ছাড়াই পোস্ট করতে পারবেন।
            </p>
          </div>


          <form
            className="post-form"
            onSubmit={submitPost}
          >

            <div className="type-selector">

              <label
                className={
                  form.type === "হারানো"
                    ? "type active"
                    : "type"
                }
              >
                <input
                  type="radio"
                  name="type"
                  value="হারানো"
                  checked={form.type === "হারানো"}
                  onChange={updateForm}
                />
                🔴 হারানো
              </label>

              <label
                className={
                  form.type === "পাওয়া"
                    ? "type active"
                    : "type"
                }
              >
                <input
                  type="radio"
                  name="type"
                  value="পাওয়া"
                  checked={form.type === "পাওয়া"}
                  onChange={updateForm}
                />
                🟢 পাওয়া
              </label>

            </div>


            <label>
              জিনিসের নাম *
              <input
                name="title"
                value={form.title}
                onChange={updateForm}
                placeholder="যেমন: Samsung মোবাইল"
              />
            </label>


            <label>
              বিস্তারিত বিবরণ *
              <textarea
                name="description"
                value={form.description}
                onChange={updateForm}
                placeholder="জিনিসটি সম্পর্কে বিস্তারিত লিখুন..."
                rows="5"
              />
            </label>


            <div className="form-grid">

              <label>
                জেলা *
                <select
                  name="district"
                  value={form.district}
                  onChange={updateForm}
                >
                  <option value="">
                    জেলা নির্বাচন করুন
                  </option>

                  {districts.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </label>


              <label>
                উপজেলা *
                <input
                  name="upazila"
                  value={form.upazila}
                  onChange={updateForm}
                  placeholder="উপজেলা"
                />
              </label>


              <label>
                এলাকা *
                <input
                  name="area"
                  value={form.area}
                  onChange={updateForm}
                  placeholder="এলাকা / বাজার / রাস্তা"
                />
              </label>


              <label>
                তারিখ *
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={updateForm}
                />
              </label>

            </div>


            <label>
              যোগাযোগের মোবাইল নম্বর *
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={updateForm}
                placeholder="01XXXXXXXXX"
              />
            </label>


            <label>
              ছবি
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
              />
              <small>
                সর্বোচ্চ 2MB
              </small>
            </label>


            {form.image && (
              <div className="preview">
                <img
                  src={form.image}
                  alt="Preview"
                />
              </div>
            )}


            <div className="notice">
              🛡️ আপনার পোস্ট Admin যাচাই করার পর
              প্রকাশ করা হবে।
            </div>


            <button
              className="submit-button"
              type="submit"
            >
              🚀 পোস্ট জমা দিন
            </button>

          </form>

        </main>
      )}


      <footer>
        <div className="container footer-content">
          <div>
            <h3>🔎 হারানো-পাওয়া বাংলাদেশ</h3>
            <p>
              হারানো জিনিস খুঁজে পেতে এবং
              পাওয়া জিনিস মালিকের কাছে ফিরিয়ে দিতে
              আমরা একসঙ্গে কাজ করি।
            </p>
          </div>

          <div>
            <p>🇧🇩 বাংলাদেশ</p>
            <p>© 2026 হারানো-পাওয়া বাংলাদেশ</p>
          </div>
        </div>
      </footer>


      {selectedPost && (
        <div
          className="modal-bg"
          onClick={() => setSelectedPost(null)}
        >

          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close"
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>

            {selectedPost.image && (
              <img
                className="modal-image"
                src={selectedPost.image}
                alt={selectedPost.title}
              />
            )}

            <span
              className={
                selectedPost.type === "হারানো"
                  ? "tag lost"
                  : "tag found"
              }
            >
              {selectedPost.type}
            </span>

            <h2>{selectedPost.title}</h2>

            <p>{selectedPost.description}</p>

            <div className="details">

              <p>
                📍 <b>স্থান:</b>{" "}
                {selectedPost.district},{" "}
                {selectedPost.upazila},{" "}
                {selectedPost.area}
              </p>

              <p>
                📅 <b>তারিখ:</b>{" "}
                {selectedPost.date}
              </p>

              <p>
                📞 <b>যোগাযোগ:</b>{" "}
                {selectedPost.phone}
              </p>

            </div>

            <button
              className="contact-button"
              onClick={() =>
                alert(
                  `যোগাযোগ নম্বর: ${selectedPost.phone}`
                )
              }
            >
              📞 যোগাযোগ করুন
            </button>

          </div>

        </div>
      )}

    </div>
  );
}


function PostGrid({ posts, onSelect }) {

  if (posts.length === 0) {
    return (
      <div className="empty">
        <div>🔍</div>
        <h3>কোনো পোস্ট পাওয়া যায়নি</h3>
        <p>অন্য শব্দ বা এলাকা দিয়ে চেষ্টা করুন।</p>
      </div>
    );
  }


  return (
    <div className="post-grid">

      {posts.map((post) => (

        <article
          className="post-card"
          key={post.id}
          onClick={() => onSelect(post)}
        >

          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="post-image"
            />
          ) : (
            <div className="image-placeholder">
              {post.type === "হারানো" ? "🔴" : "🟢"}
            </div>
          )}


          <div className="post-body">

            <span
              className={
                post.type === "হারানো"
                  ? "tag lost"
                  : "tag found"
              }
            >
              {post.type}
            </span>

            <h3>{post.title}</h3>

            <p className="description">
              {post.description}
            </p>

            <div className="location">
              📍 {post.district} • {post.upazila}
            </div>

            <div className="post-bottom">

              <span>
                📅 {post.date}
              </span>

              <span className="view">
                বিস্তারিত →
              </span>

            </div>

          </div>

        </article>

      ))}

    </div>
  );
}


createRoot(
  document.getElementById("root")
).render(
  <App />
);
