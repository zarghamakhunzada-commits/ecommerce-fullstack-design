import React, { useState } from 'react';

function App() {
  const [page, setPage] = useState('home'); // 'home', 'details', 'cart'
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Luxury Men's Accessories Dataset
  const products = [
    {
      id: 1,
      title: 'Minimalist Chronograph Gold Watch',
      subtitle: 'Premium Edition',
      price: 250.00,
      badge: 'Luxury',
      imgUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      desc: 'Crafted with premium casing, scratch-resistant sapphire glass, and a sleek matte finish built for modern sophistication.'
    },
    {
      id: 2,
      title: 'Classic Leather Premium Belt',
      subtitle: 'Genuine Craftsmanship',
      price: 85.00,
      badge: 'Hot',
      imgUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      desc: 'Made from hand-selected genuine top-grain leather featuring a premium custom alloy buckle for a timeless executive look.'
    },
    {
      id: 3,
      title: 'Polished Onyx Cufflinks',
      subtitle: 'Elegance Redefined',
      price: 45.00,
      badge: 'Exclusive',
      imgUrl: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=500',
      desc: 'Stunning premium obsidian-cut studs designed to seamlessly anchor high-end bespoke double-cuff tailoring.'
    }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const openDetails = (product) => {
    setSelectedProduct(product);
    setPage('details');
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      {/* ================= PREMIUM NAVBAR ================= */}
      <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top shadow-sm py-3">
        <div className="container">
          {/* Dynamic Interactive Brand Title */}
          <a 
            className="navbar-brand fw-bold tracking-wider" 
            style={{ cursor: 'pointer', letterSpacing: '2px', fontSize: '1.4rem' }}
            onClick={() => setPage('home')}
          >
            LUXURY STORE
          </a>
          
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-3">
              <a 
                className={`nav-link fw-semibold ${page === 'home' ? 'text-white border-bottom border-white' : 'text-muted'}`} 
                style={{ cursor: 'pointer' }}
                onClick={() => setPage('home')}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link position-relative btn btn-outline-light btn-sm px-3 rounded-pill text-white`} 
                style={{ cursor: 'pointer' }}
                onClick={() => setPage('cart')}
              >
                <i className="bi bi-bag-check me-1"></i> Bag
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ================= MAIN WRAPPER ================= */}
      <main className="container py-5">
        
        {/* ================= HOME PAGE SECTION ================= */}
        {page === 'home' && (
          <div>
            {/* Agency Minimalist Hero Banner */}
            <div className="text-center bg-white border rounded-4 p-5 mb-5 shadow-sm">
              <span className="text-uppercase text-muted small fw-bold tracking-widest d-block mb-2" style={{ letterSpacing: '3px' }}>
                New Arrivals 2026
              </span>
              <h1 className="display-4 fw-bold text-dark mb-3">Bespoke Elegance</h1>
              <p className="lead text-secondary mx-auto mb-4" style={{ maxWidth: '600px' }}>
                Experience ultimate premium styling with our elite collection of fine men's accessories.
              </p>
              <button className="btn btn-dark btn-lg px-4 rounded-pill shadow-sm" onClick={() => setPage('home')}>
                Explore Collection
              </button>
            </div>

            {/* Premium Product Grid */}
            <div>
              <h2 className="fw-bold mb-4 text-dark text-center text-md-start" style={{ letterSpacing: '-0.5px' }}>
                Featured Curations
              </h2>
              <div className="row g-4">
                {products.map((product) => (
                  <div key={product.id} className="col-12 col-md-6 col-lg-4">
                    <div 
                      className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative"
                      style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                      onClick={() => openDetails(product)}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      {/* Badge */}
                      <span className="position-absolute top-0 start-0 m-3 badge bg-dark px-3 py-2 rounded-pill shadow-sm">
                        {product.badge}
                      </span>
                      
                      {/* Product Image Wrapper */}
                      <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '280px' }}>
                        <img 
                          src={product.imgUrl} 
                          alt={product.title} 
                          className="img-fluid h-100 w-100" 
                          style={{ objectFit: 'cover' }}
                        />
                      </div>

                      {/* Card Content */}
                      <div className="card-body d-flex flex-column p-4">
                        <span className="text-muted small mb-1">{product.subtitle}</span>
                        <h5 className="card-title fw-bold text-dark mb-3">{product.title}</h5>
                        
                        <div className="mt-auto d-flex align-items-center justify-content-between" onClick={(e) => e.stopPropagation()}>
                          <span className="fs-5 fw-bold text-dark">${product.price.toFixed(2)}</span>
                          <button 
                            className="btn btn-dark px-3 rounded-pill btn-sm d-flex align-items-center"
                            onClick={() => addToCart(product)}
                          >
                            Add To Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= PRODUCT DETAILS PAGE ================= */}
        {page === 'details' && selectedProduct && (
          <div className="bg-white border rounded-4 p-4 p-md-5 shadow-sm">
            <button className="btn btn-outline-dark btn-sm rounded-pill px-3 mb-4" onClick={() => setPage('home')}>
              ← Back to Collection
            </button>
            
            <div className="row g-5 align-items-center">
              <div className="col-12 col-md-6">
                <div className="rounded-4 overflow-hidden bg-light border shadow-sm">
                  <img src={selectedProduct.imgUrl} alt={selectedProduct.title} className="img-fluid w-100" style={{ maxHeight: '450px', objectFit: 'cover' }} />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <span className="text-uppercase text-muted small fw-bold tracking-wider">{selectedProduct.subtitle}</span>
                <h1 className="fw-bold text-dark display-6 my-2">{selectedProduct.title}</h1>
                <h2 className="text-dark fw-bold my-3">${selectedProduct.price.toFixed(2)}</h2>
                <hr className="text-muted my-4" />
                <p className="text-secondary lh-lg mb-4">{selectedProduct.desc}</p>
                <button className="btn btn-dark btn-lg px-5 rounded-pill shadow-sm" onClick={() => addToCart(selectedProduct)}>
                  Add to Shopping Bag
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= CART PAGE SECTION ================= */}
        {page === 'cart' && (
          <div>
            <h2 className="fw-bold mb-4 text-dark">Your Premium Shopping Bag</h2>
            <div className="row g-4">
              {/* Cart List */}
              <div className="col-12 col-lg-8">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                  {cart.length === 0 ? (
                    <div className="text-center py-5">
                      <p className="text-muted fs-5 mb-3">Your bag is currently empty.</p>
                      <button className="btn btn-dark rounded-pill px-4" onClick={() => setPage('home')}>Continue Shopping</button>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table align-middle table-borderless">
                        <thead>
                          <tr className="border-bottom text-muted small uppercase">
                            <th scope="col">Item Details</th>
                            <th scope="col" className="text-end">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map((item, index) => (
                            <tr key={index} className="border-bottom">
                              <td className="py-3">
                                <div className="d-flex align-items-center">
                                  <img src={item.imgUrl} alt={item.title} className="rounded-3 me-3" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                  <div>
                                    <h6 className="fw-bold text-dark mb-0">{item.title}</h6>
                                    <small className="text-muted">{item.subtitle}</small>
                                  </div>
                                </div>
                              </td>
                              <td className="text-end fw-bold text-dark">${item.price.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="col-12 col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white position-sticky" style={{ top: '100px' }}>
                  <h5 className="fw-bold text-dark mb-4">Order Summary</h5>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Subtotal</span>
                    <span className="fw-bold text-dark">${calculateSubtotal()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">Premium Shipping</span>
                    <span className="text-success fw-bold">Complimentary</span>
                  </div>
                  <hr className="text-muted my-3" />
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="fw-bold text-dark fs-5">Estimated Total</span>
                    <span className="fw-bold text-dark fs-4">${calculateSubtotal()}</span>
                  </div>
                  <button className="btn btn-dark btn-lg w-100 rounded-pill shadow-sm" disabled={cart.length === 0}>
                    Proceed to Secure Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;