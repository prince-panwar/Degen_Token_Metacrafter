import { useState } from "react";

const Shop = () => {
  // Sample data for game items (you can replace this with actual data)
  const gameItems = [
    { id: 1, name: "Goku", imageUrl: "https://w0.peakpx.com/wallpaper/152/62/HD-wallpaper-goku-anime-black-pink.jpg" },
    { id: 2, name: "Gojo", imageUrl: "https://funmauj.b-cdn.net/test/1532557.jpg" },
    { id: 3, name: "kyojiro", imageUrl: "https://images5.alphacoders.com/131/1310856.jpg" },
    { id: 4, name: "Sasuke", imageUrl: "https://4kwallpapers.com/images/walls/thumbs_2t/10772.png" },
    { id: 5, name: "Tanjiro", imageUrl: "https://wallpapercave.com/wp/wp11412229.jpg" },
    { id: 6, name: "Zoro", imageUrl: "https://e0.pxfuel.com/wallpapers/983/564/desktop-wallpaper-one-piece-zoro-zorro-roronoa-black-background-zoro-one-piece-blood-zoro-dark.jpg" },
    { id: 7, name: "Sanji", imageUrl: "https://c4.wallpaperflare.com/wallpaper/1014/87/705/one-piece-anime-sanji-wallpaper-preview.jpg" },
    { id: 8, name: "Luffy", imageUrl: "https://e0.pxfuel.com/wallpapers/350/113/desktop-wallpaper-luffy-black-background.jpg" },
    { id: 9, name: "Naruto", imageUrl: "https://w0.peakpx.com/wallpaper/165/898/HD-wallpaper-naruto-black-dark-anime-night.jpg" },
   
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const handleBuyClick = () => {
    // Implement your buy logic here
    alert(`You bought ${selectedItem.name}`);
  };

  return (
    <div className="shop-container">
    {gameItems.map((item, index) => (
      <div key={item.id} className={`item-card ${selectedItem && selectedItem.id === item.id ? 'selected' : ''}`} onClick={() => handleCardClick(item)}>
        <img src={item.imageUrl} alt={item.name} />
        <p>{item.name}</p>
        {selectedItem && selectedItem.id === item.id && (
          <button className="buy-button" onClick={handleBuyClick}>
            Buy
          </button>
        )}
      </div>
    ))}
  </div>
);
};

export default Shop;

