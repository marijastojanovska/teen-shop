import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import Modal from './Modal';

export default function ProductModal({ open, onClose, product }){
  const dispatch = useDispatch();
  const [addedOpen, setAddedOpen] = useState(false);
  if (!open || !product) return null;
  return (
    <>
      <Modal open={open} onClose={onClose} title={product.name} width={720}>
        <div className="product-modal">
          <img src={product.image} alt={product.name} className="pm-image" />
          <div className="pm-info">
            <div className="pm-price">${(product.price||0).toFixed(2)}</div>
            <div className="pm-desc">{product.description}</div>
            {product.sizes?.length ? <div className="pm-field"><b>Големини:</b> {product.sizes.join(', ')}</div> : null}
            {product.colors?.length ? <div className="pm-field"><b>Боји:</b> {product.colors.join(', ')}</div> : null}
            <button className="btn" onClick={() => { dispatch(addToCart({ product, qty: 1 })); setAddedOpen(true); }}>Додај во кошничка</button>
          </div>
        </div>
      </Modal>
      <Modal open={addedOpen} onClose={() => setAddedOpen(false)} title="Успешно!">
        <p>Производот е додаден во кошничката.</p>
      </Modal>
    </>
  );
}
