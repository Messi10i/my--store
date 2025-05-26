document.addEventListener('DOMContentLoaded', () => {
  // Size selection
  const sizeBoxes = document.querySelectorAll('.size-box');
  sizeBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentProduct = box.closest('.product-card');
      parentProduct.querySelectorAll('.size-box').forEach(sibling => {
        sibling.classList.remove('selected');
      });
      box.classList.add('selected');
    });
  });

  // Color selection
  const colorBoxes = document.querySelectorAll('.color-box');
  colorBoxes.forEach(box => {
    box.addEventListener('click', (e) => {
      e.stopPropagation();
      const parentProduct = box.closest('.product-card');
      parentProduct.querySelectorAll('.color-box').forEach(sibling => {
        sibling.style.borderColor = 'transparent';
      });
      box.style.borderColor = '#007bff';
    });
  });

  // Product card click
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('product-card')) {
        const product = {
          name: this.querySelector('h3').textContent,
          price: this.querySelector('.price').textContent,
          img: this.querySelector('img').src,
          description: this.dataset.description || ""
        };
        
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        window.location.href = 'product.html';
      }
    });
  });

  // Mobile menu toggle
  document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('active');
  });

  // Add to Cart functionality
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // جلوگیری از رفتن به product.html
      const card = button.closest('.product-card');

      const name = card.querySelector('h3').textContent;
      const price = card.querySelector('.price').textContent;
      const img = card.querySelector('img').src;
      const description = card.dataset.description || '';
      const selectedSize = card.querySelector('.size-box.selected')?.dataset.size || '';
      const selectedColor = card.querySelector('.color-box[style*="border-color"]')?.dataset.color || '';

      const item = { name, price, img, description, size: selectedSize, color: selectedColor };

      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));

      alert('Product added to your cart!');
    });
  });
});
