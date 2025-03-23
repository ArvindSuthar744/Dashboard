import React, { useEffect, useState } from "react";

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news data from the API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://stock.indianapi.in/news", {
          headers: {
            "X-Api-Key": "sk-live-R2ERns4SNecrIvTJgi0h8omuqbfDdryNUswPP2m5",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }

        const data = await response.json();
        setNews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);


  

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 overflow-y-auto no-scrollbar">
      <h1 className="text-3xl font-bold text-center mb-8">Stock Market News</h1>
      {/* Scrollable News Container */}
      <div className="h-[80vh] overflow-y-auto no-scrollbar ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white flex rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={article.image_url}
                alt={article.title}
                className="h-48 w-[20vw] object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                <p className="text-gray-600 mb-4">{article.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {article.source}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(article.pub_date).toLocaleDateString()}
                  </span>
                </div>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
